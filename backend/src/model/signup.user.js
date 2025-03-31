// const mongoose = require("mongoose")
// const validator = require("validator")
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt')
// const fs = require("fs");
// const path = require("path");

// const defaultImagePath = path.join(__dirname, "../image/DefaultProfileImage.png");
// const defaultImageBuffer = fs.readFileSync(defaultImagePath); // Read default image

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: "String",
//       require: true,
//       lowercase: true,
//     },
//     enrollment: {
//       type: "Number",
//       require: true,
//       unique: true,
//       validate(value) {
//         let val = value.toString();

//         if (!(val.length === 5 || val.length === 11)) {
//           // Corrected condition
//           throw new Error(
//             "Enter Valid Enrollment or Employee ID (must be 5 or 11 digits)"
//           );
//         }
//       },
//       maxlen: 11,
//       trim: true,
//     },
//     email: {
//       type: "String",
//       require: true,
//       lowercase: true,
//       unique: true,
//       trim: true,
//       validate(value) {
//         if (!validator.isEmail(value)) {
//           throw new Error("Your Email is Not valid ");
//         }
//       },
//     },
//     password: {
//       type: "String",
//       require: true,
//       validate(value) {
//         if (!validator.isStrongPassword(value)) {
//           throw new Error("weak Password ");
//         }
//       },
//     },
//     profileUrl: {
//       type: Buffer, // Store image as Buffer
//       default: defaultImageBuffer, // Set default image as Buffer
//     },
//   },
//   { timestamps: true }
// );

// userSchema.methods.getJWT = async function () {
//   const user = this;

//   const token = await jwt.sign({ enrollment: user.enrollment }, "Alok@123", {
//     expiresIn: "1d",
//   });

//   return token;
// };

// userSchema.methods.validatePassword = async function (passwordInputByUser) {
//   const user = this;
//   const passwordHash = user.password;

//   const isPasswordValid = await bcrypt.compare(
//     passwordInputByUser,
//     passwordHash
//   );

//   return isPasswordValid;
// };


// module.exports = mongoose.model("User", userSchema);
























// const mongoose = require("mongoose");
// const validator = require("validator");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//     },
//     enrollment: {
//       type: String, // Changed to String to preserve leading zeros
//       required: [true, "Enrollment number is required"],
//       unique: true,
//       validate: {
//         validator: function (value) {
//           return /^\d{5}$|^\d{11}$/.test(value);
//         },
//         message: "Enrollment must be 5 or 11 digits",
//       },
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       validate: {
//         validator: validator.isEmail,
//         message: "Invalid email format",
//       },
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       validate: {
//         validator: validator.isStrongPassword,
//         message:
//           "Password must contain at least 8 characters with a mix of uppercase, lowercase, numbers, and symbols",
//       },
//     },
//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//     otp: {
//       type: Number,
//       select: false, // Won't appear in query results by default
//     },
//     otpExpiry: {
//       type: Date,
//       select: false,
//     },
//     profileUrl: {
//       type: String,
//       default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
//       validate: {
//         validator: validator.isURL,
//         message: "Invalid profile URL",
//       },
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // Add index for faster query on enrollment and email
// userSchema.index({ enrollment: 1, email: 1 }, { unique: true });

// // JWT Generation Method
// userSchema.methods.generateAuthToken = function () {
//   return jwt.sign(
//     { _id: this._id, enrollment: this.enrollment },
//     process.env.JWT_SECRET || "your_jwt_secret_here",
//     { expiresIn: "1d" }
//   );
// };

// // Password Validation Method
// userSchema.methods.validatePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// // Hash password before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Virtual for checking if OTP is valid
// userSchema.virtual("isOTPValid").get(function () {
//   return this.otpExpiry > Date.now();
// });

// module.exports = mongoose.model("User", userSchema);

















const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      type: String,
      default: "https://example.com/default-profile.png",
      validate: {
        validator: validator.isURL,
        message: "Invalid profile URL",
      },
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

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ enrollment: 1 }, { unique: true });

// Virtual for OTP validity check
userSchema.virtual("isOTPValid").get(function () {
  return this.otpExpiry && this.otpExpiry > Date.now();
});

// Password hashing middleware
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password =  bcrypt.hash(this.password, salt);
//     next(); 
//   } catch (err) {
//     next(err);
//   }
// });

// JWT Generation Method
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
