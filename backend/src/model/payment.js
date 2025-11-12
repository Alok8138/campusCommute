const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String },
  status: { type: String, default: "created" },
  amount: { type: Number },
  currency: { type: String },
  receipt: { type: String },
  notes: { type: Object },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Payment", paymentSchema);






// dharmik

// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     paymentId: {
//       type: String,
//     },
//     orderId: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       required: true,
//     },
//     receipt: {
//       type: String,
//       required: true,
//     },
//     notes: {
//       name: {
//         type: String,
//       },
//       enrollment: {
//         type: String,
//       },

//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Payment", paymentSchema);
