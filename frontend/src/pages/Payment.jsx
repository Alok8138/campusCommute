import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Payment = () => {
  const loadRazorpay = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpay();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(BASE_URL + "/create-order", {
        amount: 5000, // Amount in paise (5000 = ₹50.00)
        currency: "INR",
      });

      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
        amount: amount,
        currency: currency,
        name: "CampusCommute",
        description: "Bus Pass Payment",
        order_id: order_id,
        handler: async (response) => {
          alert("Payment Successful! Transaction ID: " + response.razorpay_payment_id);
          await axios.post(BASE_URL + "/verify-payment", response);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Proceed with Payment</h2>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
