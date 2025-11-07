

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/signup.user");
const {sendVerificationEmail} = require("../util/emailService");
const authRouter = express.Router();


// ============== Signup Route ============== //
authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, enrollment, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { enrollment }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  OTP and hash password
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 14 * 60 * 1000; // 14 minutes
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new unverified user
    const newUser = new User({
      name,
      email,
      enrollment,
      password: passwordHash,
      isVerified: false,
      otp,
      otpExpiry,
    });

    await newUser.save();

    //  JWT token with user data
    const token = jwt.sign({ enrollment, email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send verification email
    await sendVerificationEmail(email, otp);

    // Return token to client
    res.status(201).json({
      message: "OTP sent to email",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// ============== Login Route ============== //
authRouter.post("/login", async (req, res) => {
  try {
    const { enrollment, password } = req.body;

    // Find user by enrollment
    const user = await User.findOne({ enrollment }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified.",
      });
    }

    //  JWT token
    const token = jwt.sign(
      { userId: user._id, enrollment: user.enrollment },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        enrollment: user.enrollment,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// ============== Logout Route ============== //
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});









// ============== Verify OTP Route ============== //
authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication token required" });

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (!decodedToken) return res.status(401).json({ message: "Invalid or expired token" });

      const { enrollment } = decodedToken;
      const user = await User.findOne({ enrollment }).select("+otp +otpExpiry");
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      const authToken = jwt.sign(
        { userId: user._id, enrollment: user.enrollment },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Set HTTP-only cookie
      res.cookie("token", authToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Verification successful",
        user: { name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});








module.exports = authRouter;

// const express = require("express");

// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/signup.user");
// const {sendVerificationEmail} = require("../util/emailService");
// const authRouter = express.Router();


// // ============== Signup Route ============== //
// authRouter.post("/signup", async (req, res) => {
//   try {
//     const { name, email, enrollment, password } = req.body;

//     // Check for existing user
//     const existingUser = await User.findOne({
//       $or: [{ email }, { enrollment }],
//     });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     //  OTP and hash password
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 14 * 60 * 1000; // 14 minutes
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create a new unverified user
//     const newUser = new User({
//       name,
//       email,
//       enrollment,
//       password: passwordHash,
//       isVerified: false,
//       otp,
//       otpExpiry,
//     });

//     await newUser.save();

//     //  JWT token with user data
//     const token = jwt.sign({ enrollment, email }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     // Send verification email
//     await sendVerificationEmail(email, otp);

//     // Return token to client
//     res.status(201).json({
//       message: "OTP sent to email",
//       token,
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });



// // ============== Login Route ============== //
// authRouter.post("/login", async (req, res) => {
//   try {
//     const { enrollment, password } = req.body;

//     // Find user by enrollment
//     const user = await User.findOne({ enrollment }).select("+password");

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     if (!user.isVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Account not verified.",
//       });
//     }

//     //  JWT token
//     const token = jwt.sign(
//       { userId: user._id, enrollment: user.enrollment },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     // Set secure HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//         enrollment: user.enrollment,
//         createdAt: user.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });


// // ============== Logout Route ============== //
// authRouter.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//   });

//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });









// // ============== Verify OTP Route ============== //
// authRouter.post("/verify-otp", async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Authentication token required" });

//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       if (!decodedToken) return res.status(401).json({ message: "Invalid or expired token" });

//       const { enrollment } = decodedToken;
//       const user = await User.findOne({ enrollment }).select("+otp +otpExpiry");
//       if (!user) return res.status(404).json({ message: "User not found" });

//       if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
//         return res.status(400).json({ message: "Invalid or expired OTP" });
//       }

//       user.isVerified = true;
//       user.otp = undefined;
//       user.otpExpiry = undefined;
//       await user.save();

//       const authToken = jwt.sign(
//         { userId: user._id, enrollment: user.enrollment },
//         process.env.JWT_SECRET,
//         { expiresIn: "24h" }
//       );

//       // Set HTTP-only cookie
//       res.cookie("token", authToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       });

//       res.status(200).json({
//         message: "Verification successful",
//         user: { name: user.name, email: user.email },
//       });
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });








// module.exports = authRouter;
