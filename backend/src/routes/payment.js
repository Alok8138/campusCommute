const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../util/razorpay");
const Payment = require("../model/payment");
const User = require("../model/signup.user");
const BusPass = require("../model/busPass");
// const razorpay = require("razorpay");
// const { membershipAmount } = require("../util/constants");
// const {
//   validateWebhookSignature,
// } = require("razorpay/dist/util/razorpay-utils");

// paymentRouter.post("/payment/create", userAuth, async (req, res) => {
//   try {
//     const { city } = req.body;
//     const { name, email } = req.user;

//     const order = await razorpayInstance.orders.create({
//       amount: 50 * 100,
//       currency: "INR",
//       receipt: "receipt#1",
//       notes: {
//         name,
//         email,
//         city: city,
//         // enrollment,
//       },
//     });

//     // Save it in my database
//     console.log(order);

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

//     // Return back my order details to frontend
//     res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
    //   }
    











    // try {
    //     const order = await razorpayInstance.orders.create({
    //         amount: 5000,
    //         currency: "INR",
    //         receipt: "receipt#1",
    //         notes: {
    //             "name": "alok",
    //             "email": "aj9494@gmail.com",
    //             "city": "visnagar"
    //         },
    //     });
    //     // Save it in my database

    //     console.log(order);

    //     res.json({order});



    // } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    // }




// });

// paymentRouter.post("/payment/webhook", async (req, res) => {
//   try {
//     console.log("Webhook Called");
//     const webhookSignature = req.get("X-Razorpay-Signature");
//     console.log("Webhook Signature", webhookSignature);

//     const isWebhookValid = validateWebhookSignature(
//       JSON.stringify(req.body),
//       webhookSignature,
//       process.env.RAZORPAY_WEBHOOK_SECRET
//     );

//     if (!isWebhookValid) {
//       console.log("INvalid Webhook Signature");
//       return res.status(400).json({ msg: "Webhook signature is invalid" });
//     }
//     console.log("Valid Webhook Signature");

//     // Udpate my payment Status in DB
//     const paymentDetails = req.body.payload.payment.entity;

//     const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
//     payment.status = paymentDetails.status;
//     await payment.save();
//     console.log("Payment saved");

//     const user = await User.findOne({ _id: payment.userId });
//     user.isPremium = true;
//     user.membershipType = payment.notes.membershipType;
//     console.log("User saved");

//     await user.save();

//     // Update the user as premium

//     // if (req.body.event == "payment.captured") {
//     // }
//     // if (req.body.event == "payment.failed") {
//     // }

//     // return success response to razorpay

//     return res.status(200).json({ msg: "Webhook received successfully" });
//   } catch (err) {
//     return res.status(500).json({ msg: err.message });
//   }
// });

// paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
//   const user = req.user.toJSON();
//   console.log(user);
//   if (user.isPremium) {
//     return res.json({ ...user });
//   }
//   return res.json({ ...user });
// });

// module.exports = paymentRouter;




// =============================================================================================================================================================




// working fine
paymentRouter.post("/payment/create",userAuth, async (req, res) => {
    const { amount, currency = "INR", receipt } = req.body;
    console.log("user",req.body);

  // Validate input
  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const options = {
      amount: amount * 100, // Convert to smallest currency unit (e.g., paise for INR)
      currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: {
            name: req.user.name,
            email: req.user.email,
            city: req.user.city,
            enrollment: req.user.enrollment,
        }
      
    };

    // Create order in Razorpay
    const order = await razorpayInstance.orders.create(options);

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
      // Send back the order details
      res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
      
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create payment order" });
  }
});

module.exports = paymentRouter;
