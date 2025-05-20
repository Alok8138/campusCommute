const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const defaultImagePath = path.join(__dirname, "../image/DefaultProfileImage.png");
const defaultImageBuffer = fs.readFileSync(defaultImagePath); // Read default image

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    enrollment: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
      validate: {
        validator: (v) => /^\d{5,11}$/.test(v),
        message: "Enrollment must be 5-11 digits",
      },
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String, // Changed to String to match verification logic
      select: false,
    },
    otpExpiry: {
      type: Date,
      select: false,
    },

    profileUrl: {
      type: Buffer, // Store image as Buffer
      default: defaultImageBuffer, // Set default image as Buffer
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.otp;
        delete ret.otpExpiry;
        return ret;
      },
    },
  }
);

// Virtual for OTP validity check
userSchema.virtual("isOTPValid").get(function () {
  return this.otpExpiry && this.otpExpiry > Date.now();
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      enrollment: this.enrollment,
      email: this.email,
    },
    process.env.JWT_SECRET || "fallback_secret_key",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// Password validation method
userSchema.methods.validatePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
