const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const fs = require("fs");
const path = require("path");


const adminSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password must be stronger.");
        }
      },
    },
    // secretkey: {
    //   type: String,
    //   required: true,
    //   default: "Admin@5657",
    // },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true} // 🔥 Force using "admin" collection
);



adminSchema.methods.getJWT = async function () {
  const admin = this;

  const token = await jwt.sign({ id: admin.id }, "Alok@123", {
    expiresIn: "7d",
  });

  return token;
};

adminSchema.methods.validatePassword = async function (passwordInputByAdmin) {
  const admin = this;
  const passwordHash = admin.password;
console.log(admin, "  ", passwordHash)

  const isPasswordValid = await bcrypt.compare(
    passwordInputByAdmin,
    passwordHash
  );

  return isPasswordValid;
};


module.exports = mongoose.model("Admin", adminSchema);
