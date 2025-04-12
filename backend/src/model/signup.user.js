const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const fs = require("fs");
const path = require("path");

const defaultImagePath = path.join(__dirname, "../image/DefaultProfileImage.png");
const defaultImageBuffer = fs.readFileSync(defaultImagePath); // Read default image

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
      type: Buffer, // Store image as Buffer
      default: defaultImageBuffer, // Set default image as Buffer
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ enrollment: user.enrollment }, "Alok@123", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};


module.exports = mongoose.model("User", userSchema);
