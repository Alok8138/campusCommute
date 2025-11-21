const mongoose = require("mongoose");


const busPassSchema = new mongoose.Schema({
  // New simplified schema
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrollmentNo: { type: String, required: true, index: true }, // Changed from unique to index
  name: { type: String, required: true },
  college: { type: String },
  branch: { type: String },
  semester: { type: String },
  stand: { type: String },
  city: { type: String },
  
  // Payment info
  issueDate: { type: Date },
  expiryDate: { type: Date },
  paymentRef: { type: String }, // razorpay paymentId
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  
  // Additional fields for compatibility with form
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  parentPhone: { type: String },
  bloodGroup: { type: String },
  note: { type: String },
  feeAmount: { type: Number },
  regNo: { type: String },
  date: { type: Date },
  shift: { type: String },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure indexes are properly set
busPassSchema.index({ enrollmentNo: 1 });

module.exports = mongoose.model("BusPass", busPassSchema);








//dharmik
// const mongoose = require("mongoose");

// const BusPassSchema = new mongoose.Schema(
//   {
//     srNo: {
//       type: String,
//       required: true,
//       unique: true, 
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     regNo: {
//       type: String,
//       required: true,
//       unique: true, // Ensure each registration number is unique
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     enrollmentNo: {
//       type: String,
//       required: true,
//     },
//     college: {
//       type: String,
//       required: true,
//     },
//     branch: {
//       type: String,
//       required: true,
//     },
//     semester: {
//       type: String,
//       default: "1st semester",
//       required: true,
//     },
//     shift: {
//       type: String,
//       enum: ["1st Shift", "2nd Shift"], // Limit options to these values
//       default: "1st Shift",
//     },
//     address: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return /^\d{10}$/.test(v); // Validate for 10-digit phone number
//         },
//         message: (props) => `${props.value} is not a valid phone number!`,
//       },
//     },
//     parentPhone: {
//       type: String,
//       // required: true,
//       validate: {
//         validator: function (v) {
//           return /^\d{10}$/.test(v); // Validate for 10-digit phone number
//         },
//         message: (props) =>
//           `${props.value} is not a valid parent's phone number!`,
//       },
//     },
//     email: {
//       type: String,
//       required: true,
//       match: [/.+\@.+\..+/, "Please fill a valid email address"], // Basic email format validation
//     },
//     bloodGroup: {
//       type: String,
//       enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Limit options to these values
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     stand: {
//       type: String,
//       required: true,
//     },
//     note: {
//       type: String,
//       default: "",
//     },
//     feeAmount: {
//       type: Number,
//       required: true, // Ensure fee amount is provided
//     },
//   },
//   { timestamps: true }
// ); // Automatically manage createdAt and updatedAt fields

// const BusPass = mongoose.model("BusPass", BusPassSchema);

// module.exports = BusPass;
