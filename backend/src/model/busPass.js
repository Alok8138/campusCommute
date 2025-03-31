// const mongoose = require("mongoose");

// const BusPassSchema = new mongoose.Schema({
//   srNo: String,
//   date: Date,
//   regNo: String,
//   name: String,
//   enrollmentNo: String,
//   college: String,
//   branch: String,
//   semester: String,
//   shift: String,
//   address: String,
//   phone: String,
//   parentPhone: String,
//   email: String,
//   bloodGroup: String,
//   city: String,
//   stand: String,
//   note: String,
//   feeAmount: Number,
// });

// module.exports = mongoose.model("BusPass", BusPassSchema);





// const mongoose = require("mongoose");

// const BusPassSchema = new mongoose.Schema(
//   {
//     srNo: {
//       type: String,
//       required: true,
//       unique: true, // Ensure each serial number is unique
//     },
//     date: {
//       type: Date,
//       required: true,
//       validate: {
//         validator: function (v) {
//           return v instanceof Date && !isNaN(v);
//         },
//         message: (props) => `${props.value} is not a valid date!`,
//       },
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
//       required: true,
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
//       required: true,
//       min: [0, "Fee amount cannot be negative"], // Ensure fee amount is non-negative
//     },
//   },
//   { timestamps: true }
// ); // Automatically manage createdAt and updatedAt fields

// // Create a model
// const BusPass = mongoose.model("BusPass", BusPassSchema);

// module.exports = BusPass;


















const mongoose = require("mongoose");

const BusPassSchema = new mongoose.Schema(
  {
    srNo: {
      type: String,
      // required: true,
      // unique: true, // Ensure each serial number is unique
    },
    date: {
      type: Date,
      // required: true,
    },
    regNo: {
      type: String,
      // required: true,
      // unique: true, // Ensure each registration number is unique
    },
    name: {
      type: String,
      // required: true,
    },
    enrollmentNo: {
      type: String,
      // required: true,
    },
    college: {
      type: String,
      // required: true,
    },
    branch: {
      type: String,
      // required: true,
    },
    semester: {
      type: String,
      // required: true,
    },
    shift: {
      type: String,
      enum: ["1st Shift", "2nd Shift"], // Limit options to these values
      default: "1st Shift",
    },
    address: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate for 10-digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    parentPhone: {
      type: String,
      // required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v); // Validate for 10-digit phone number
        },
        message: (props) =>
          `${props.value} is not a valid parent's phone number!`,
      },
    },
    email: {
      type: String,
      // required: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Basic email format validation
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Limit options to these values
    },
    city: {
      type: String,
      // required: true,
    },
    stand: {
      type: String,
      // required: true,
    },
    note: {
      type: String,
      default: "",
    },
    feeAmount: {
      type: Number,
      // required: true, // Ensure fee amount is provided
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

const BusPass = mongoose.model("BusPass", BusPassSchema);

module.exports = BusPass;
