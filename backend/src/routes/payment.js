const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../util/razorpay");
const Payment = require("../model/payment");
const User = require("../model/signup.user");
const BusPass = require("../model/busPass");


// 1. Create Order
paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  const { amount, currency = "INR", receipt, stand, city } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        name: req.user.name,
        email: req.user.email,
        city: req.user.city,
        enrollment: req.user.enrollment,
        stand,
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

// 2. Store Payment ID after success
paymentRouter.post("/payment/success", userAuth, async (req, res) => {
  const { orderId, paymentId, status } = req.body;

  if (!orderId || !paymentId) {
    return res.status(400).json({ error: "orderId and paymentId are required" });
  }

  try {
    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status: status || "paid" },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }
    res.json({ success: true, payment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ error: "Failed to update payment record" });
  }
});

module.exports = paymentRouter;
