



// payment.js (or wherever your paymentRouter is defined)
const express = require("express");
const paymentRouter = express.Router();
const razorpayInstance = require("../util/razorpay");
const Payment = require("../model/payment");
const BusPass = require("../model/busPass");
const User = require("../model/signup.user");
const { userAuth } = require("../middleware/auth");


// Helper to add days
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}


// POST /payment/create - Create Razorpay order
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const { amount, currency = "INR", receipt, stand, city } = req.body;


  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }


  try {
    const options = {
      amount: amount * 100, // Convert to paise (Razorpay expects amount in smallest currency unit)
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        name: req.user.name,
        email: req.user.email,
        enrollment: req.user.enrollment,
        stand: stand || "",
        city: city || "",
      },
    };


    const order = await razorpayInstance.orders.create(options);


    // Save order to DB (without paymentId yet)
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });
    const savedPayment = await payment.save();


    res.json({
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});


// POST /payment/success
paymentRouter.post("/payment/success", userAuth, async (req, res) => {
  const { orderId, paymentId, status } = req.body;


  if (!orderId || !paymentId) {
    console.error("Missing required fields - orderId:", orderId, "paymentId:", paymentId);
    return res.status(400).json({ error: "orderId and paymentId are required" });
  }


  try {
    // 0) Get enrollment from user first (more reliable)
    const user = req.user; // userAuth middleware sets req.user
    if (!user) {
      console.error("User not found in request");
      return res.status(401).json({ error: "Unauthorized" });
    }
    
    const enrollment = user.enrollment;
    if (!enrollment) {
      console.error("User has no enrollment number:", user);
      return res.status(400).json({ error: "User enrollment number not found" });
    }

    console.log("Processing payment success - orderId:", orderId, "enrollment:", enrollment);

    // 1) Update payment record
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status: status || "paid" },
      { new: true }
    );


    if (!payment) {
      console.error("Payment record not found for orderId:", orderId);
      return res.status(404).json({ error: "Payment record not found" });
    }

    console.log("Updated payment record with paymentId:", paymentId);


    // 2) Find existing BusPass (created by form submission) and update with payment info
    let busPass = await BusPass.findOne({ enrollmentNo: enrollment });

    if (!busPass) {
      console.error("No BusPass found for enrollment:", enrollment, "- this should have been created during form submission");
      return res.status(404).json({ error: "Bus pass application not found. Please submit the form first." });
    }

    console.log("Found existing BusPass, updating with payment info...");

    // Define duration (days). Use your desired validity period. In your code you used 150.
    const VALIDITY_DAYS = 150;
    const issueDate = new Date();
    const expiryDate = addDays(issueDate, VALIDITY_DAYS);

    // Update existing BusPass with payment info
    // Preserve existing college, branch, semester from form submission
    busPass.paymentRef = paymentId;
    busPass.issueDate = issueDate;
    busPass.expiryDate = expiryDate;
    busPass.paymentStatus = 'completed';
    busPass.updatedAt = new Date();
    busPass.userId = user._id;
    
    // Update stand and city from payment notes if provided, otherwise preserve existing
    if (payment.notes?.stand) {
      busPass.stand = payment.notes.stand;
    }
    if (payment.notes?.city) {
      busPass.city = payment.notes.city;
    }
    
    // Ensure name is set if not already
    if (!busPass.name && user.name) {
      busPass.name = user.name;
    }

    console.log("BusPass data before save:", {
      enrollmentNo: busPass.enrollmentNo,
      paymentStatus: busPass.paymentStatus,
      expiryDate: busPass.expiryDate
    });

    const savedPass = await busPass.save();
    
    console.log("Successfully saved BusPass:", savedPass._id, "- expiryDate:", savedPass.expiryDate);

    // 3) Return success + pass info
    return res.json({
      success: true,
      payment,
      busPass: {
        id: savedPass._id,
        issueDate: savedPass.issueDate,
        expiryDate: savedPass.expiryDate,
        paymentStatus: savedPass.paymentStatus,
      },
    });
  } catch (error) {
    console.error("Error in /payment/success:", error.message);
    console.error("Stack trace:", error.stack);
    return res.status(500).json({ error: "Server error while recording payment/pass", details: error.message });
  }
});


module.exports = paymentRouter;







// dharmik
// const express = require("express");
// const { userAuth } = require("../middleware/auth");
// const paymentRouter = express.Router();
// const razorpayInstance = require("../util/razorpay");
// const Payment = require("../model/payment");
// const User = require("../model/signup.user");
// const BusPass = require("../model/busPass");


// // 1. Create Order
// paymentRouter.post("/payment/create", userAuth, async (req, res) => {
//   const { amount, currency = "INR", receipt, stand, city } = req.body;

//   if (!amount) {
//     return res.status(400).json({ error: "Amount is required" });
//   }

//   try {
//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: receipt || `receipt_${Date.now()}`,
//       notes: {
//         name: req.user.name,
//         email: req.user.email,
//         city: req.user.city,
//         enrollment: req.user.enrollment,
//         stand,
//       },
//     };

//     const order = await razorpayInstance.orders.create(options);

//     // Save order to DB (without paymentId yet)
//     const payment = new Payment({
//       userId: req.user._id,
//       orderId: order.id,
//       status: order.status,
//       amount: order.amount,
//       currency: order.currency,
//       receipt: order.receipt,
//       notes: order.notes,
//     });
//     const savedPayment = await payment.save();

//     res.json({
//       amount: order.amount,
//       currency: order.currency,
//       keyId: process.env.RAZORPAY_KEY_ID,
//       orderId: order.id,
//       payment: savedPayment,
//     });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Failed to create payment order" });
//   }
// });

// // 2. Store Payment ID after success
// paymentRouter.post("/payment/success", userAuth, async (req, res) => {
//   const { orderId, paymentId, status } = req.body;

//   if (!orderId || !paymentId) {
//     return res.status(400).json({ error: "orderId and paymentId are required" });
//   }

//   try {
//     const payment = await Payment.findOneAndUpdate(
//       { orderId },
//       { paymentId, status: status || "paid" },
//       { new: true }
//     );
//     if (!payment) {
//       return res.status(404).json({ error: "Payment record not found" });
//     }
//     res.json({ success: true, payment });
//   } catch (error) {
//     console.error("Error updating payment:", error);
//     res.status(500).json({ error: "Failed to update payment record" });
//   }
// });

// module.exports = paymentRouter;
