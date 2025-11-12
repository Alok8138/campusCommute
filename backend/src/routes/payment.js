



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
    return res.status(400).json({ error: "orderId and paymentId are required" });
  }


  try {
    // 1) Update payment record
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status: status || "paid" },
      { new: true }
    );


    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }


    // 2) Ensure the user exists (userAuth should have populated req.user)
    const user = req.user; // userAuth middleware sets req.user
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }


    // 3) Find existing BusPass (created by form submission) and update with payment info
    const enrollment = user.enrollment || payment.notes?.enrollment;
    if (!enrollment) {
      return res.status(400).json({ error: "Enrollment number not found" });
    }


    // Find the existing BusPass created by the form submission
    let busPass = await BusPass.findOne({ enrollmentNo: enrollment });


    // Define duration (days). Use your desired validity period. In your code you used 150.
    const VALIDITY_DAYS = 150;
    const issueDate = new Date();
    const expiryDate = addDays(issueDate, VALIDITY_DAYS);


    if (busPass) {
      // Update existing BusPass with payment info
      // Preserve existing college, branch, semester from form submission
      busPass.paymentRef = paymentId;
      busPass.issueDate = issueDate;
      busPass.expiryDate = expiryDate;
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
      // College, branch, and semester should already be set from form submission
      // Don't overwrite them - they're preserved from the original form
      await busPass.save();
    } else {
      // If no BusPass exists (shouldn't happen in normal flow, but handle it)
      const busPassData = {
        userId: user._id,
        enrollmentNo: enrollment,
        name: user.name,
        college: "",
        branch: "",
        semester: "",
        stand: payment.notes?.stand || "",
        city: payment.notes?.city || "",
        issueDate,
        expiryDate,
        paymentRef: paymentId,
      };
      busPass = await BusPass.create(busPassData);
    }


    // 4) Return success + pass info
    return res.json({
      success: true,
      payment,
      busPass: {
        id: busPass._id,
        issueDate: busPass.issueDate,
        expiryDate: busPass.expiryDate,
      },
    });
  } catch (error) {
    console.error("Error in /payment/success:", error);
    return res.status(500).json({ error: "Server error while recording payment/pass" });
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
