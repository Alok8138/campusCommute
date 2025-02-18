const mongoose = require("mongoose")
const validator = require("validator")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      require: true,
      lowercase: true,
    },
    enrollment: {
      type: "Number",
      require: true,
      unique: true,
      validate(value) {
        let val = value.toString();

        if (!(val.length === 5 || val.length === 11)) {
          // Corrected condition
          throw new Error(
            "Enter Valid Enrollment or Employee ID (must be 5 or 11 digits)"
          );
        }
      },
      maxlen: 11,
      trim: true,
    },
    email: {
      type: "String",
      require: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Your Email is Not valid ");
        }
      },
    },
    password: {
      type: "String",
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("weak Password ");
        }
      },
    },
    profileUrl: {
      type: String,
      trim: true,
      default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid Photo URL");
        }
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);