// const express = require("express");
// const authRouter = express.Router();

// const { validateSignUpData } = require("../util/signup.user.validation");
// const User = require("../model/signup.user");
// const bcrypt = require("bcrypt");

// authRouter.post("/signup", async (req, res) => {

//   const user = new User(req.body);

//   try {
//     const { name, email, enrollment, password, userOtp } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     // console.log(passwordHash);
//     const user = new User({
//       name,
//       email,
//       enrollment,
//       password: passwordHash,
//     });

//     function generateOTP() {
//       return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit OTP
//     }

//     const generatedOtp = generateOTP();
//     // console.log(generatedOtp);

//     await user.save();
//     if (generatedOtp == userOtp) {
//       // console.log("valid otp");

//       res.send("user saved sucessfully");
//     }
//     res.send("user saved sucessfully");
//   } catch (err) {
//     // res.status(400).send("user not saved: " + err);
//     res.status(400).send("Please Login User Already Exist");
//   }
// });

// // authRouter.get("/signup", async (req, res) => {
// //   const userDB = req.body.enrollment;

// //   try {
// //     // console.log(await User.find({ enrollment: userDB }));//fetch all user with same enrollment
// //     // let arr = await User.find({ enrollment: userDB }); //store it to arr
// //     // console.log(arr);
// //     // console.log(await User.find({}));//fetch all user from db

// //     res.send("user fetch sucessfully");
// //   } catch (err) {
// //     res.status(400).send("user not fetched: " + err);
// //   }
// // });

// authRouter.post("/login", async (req, res) => {

//   try {
//     const user = req.body;
//     const findUser = await User.findOne({ enrollment: user.enrollment });
//     if (!findUser) {
//       throw new Error("user Not Found");
//     }
//     console.log(findUser);
//     const { password } = findUser;
//     // console.log(findUser.password);

//     // const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
//     const isPasswordCorrect = await findUser.validatePassword(user.password);
//     console.log(isPasswordCorrect);

//     // console.log("ispasword: ",isPasswordCorrect);
//     // console.log(user.password);

//     const token = await findUser.getJWT();
//     console.log("token: ", token);

//     res.cookie("token", token);

//     bcrypt
//       .hash(user.password, findUser.password)
//       .then(function (isPasswordCorrect) {
//         //  console.log(isPasswordCorrect);
//         if (isPasswordCorrect === findUser.password) {
//           // res.send("login Sucessfull...");
//           res.send(findUser);
//         } else {
//           res.send("Enter Valid Credential");
//         }
//       });
//   } catch (err) {
//     res.status(400).send("user not fetched: " + err);
//   }
// });

// authRouter.post("/logout", async (req, res) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//   });
//   res.send("Logout Successful!!");
// });

// module.exports = authRouter;

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/signup.user");
// const sendVerificationEmail = require("../util/emailService");

// const authRouter = express.Router();

// authRouter.post("/signup", async (req, res) => {
//   try {
//     const { name, email, enrollment, password } = req.body;

//     // Check existing user
//     const existingUser = await User.findOne({
//       $or: [{ email }, { enrollment }],
//     });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

//     // Create unverified user
//     const passwordHash = await bcrypt.hash(password, 10);
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

//     // Generate JWT token with user data
//     const token = jwt.sign(
//       {
//         enrollment: enrollment,
//         email: email,
//       },
//       "your-jwt-secret",
//       { expiresIn: "15m" }
//     );

//     // Send verification email
//     await sendVerificationEmail(email, otp);

//     // Return token to client
//     res.status(201).json({
//       message: "OTP sent to email",
//       token: token, // Client will send this back for verification
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // OTP Verification API - User only enters OTP
// authRouter.post("/verify-otp", async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const token = req.headers.authorization?.split(" ")[1] || req.body.token;

//     if (!token) {
//       return res.status(401).json({ message: "Authentication token required" });
//     }

//     // Decode token to get enrollment
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, "your-jwt-secret");
//     } catch (tokenError) {
//       console.error("Token verification failed:", tokenError);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const { enrollment } = decodedToken;

//     // Find user by enrollment
//     const user = await User.findOne({ enrollment });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check OTP validity
//     if (user.otp.toString() !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;
//     await user.save();

//     // Generate authentication token for the user
//     const authToken = jwt.sign(
//       { userId: user._id, enrollment: user.enrollment },
//       "your-jwt-secret",
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       message: "Verification successful",
//       user: { name: user.name, email: user.email },
//       token: authToken,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = authRouter;

// Import required modules
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/signup.user");
// const sendVerificationEmail = require("../util/emailService");

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

//     // Generate OTP as string
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 14 * 60 * 1000; // 14 minutes

//     // Hash the password
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

//     // Generate JWT token with user data
//     const token = jwt.sign(
//       { enrollment, email },
//       process.env.JWT_SECRET,
//       { expiresIn: "15m" }
//     );

//     // Send verification email
//     await sendVerificationEmail(email, otp);

//     // Return token to client
//     res.status(201).json({
//       message: "OTP sent to email",
//       token, // Client will send this back for verification
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ============ OTP Verification Route ============ //
// authRouter.post("/verify-otp", async (req, res) => {
//   try {
//     const { otp } = req.body;
//     console.log("otp",otp);
//     const token = req.headers.authorization?.split(" ")[1] || req.body.token;
//     console.log("token",token);
//     if (!token) {
//       return res.status(401).json({ message: "Authentication token required" });
//     }

//     // Decode token to get enrollment
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, "your-jwt-secret");
//     } catch (tokenError) {
//       console.error("Token verification failed:", tokenError);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const { enrollment } = decodedToken;
//     // console.log("enrollment",enrollment);

//     // Find user by enrollment
//     const user = await User.findOne({ enrollment }).select("+otp +otpExpiry");
//     console.log(user.otp);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check OTP validity
//     const receivedOTP = otp?.toString()?.trim();

//     if (!receivedOTP || receivedOTP.length !== 6) {
//       return res.status(400).json({ message: "Invalid OTP format" });
//     }

//     if (!user.otp || user.otp !== receivedOTP) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Check if OTP has expired
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // Mark user as verified and clear OTP fields
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     await user.save();

//     // Generate authentication token for the user
//     const authToken = jwt.sign(
//       { userId: user._id, enrollment: user.enrollment },
//       "your-jwt-secret",
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       message: "Verification successful",
//       user: { name: user.name, email: user.email },
//       token: authToken,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // authRouter.post("/login", async (req, res) => {
// //   try {
// //     const user = req.body;
// //     const findUser = await User.findOne({ enrollment: user.enrollment });
// //     if (!findUser) {
// //       throw new Error("user Not Found");
// //     }
// //     console.log(findUser);
// //     const { password } = findUser;
// //     // console.log(findUser.password);

// //     // const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
// //     const isPasswordCorrect = await findUser.validatePassword(user.password);
// //     console.log(isPasswordCorrect);

// //     // console.log("ispasword: ",isPasswordCorrect);
// //     // console.log(user.password);

// //     const token = await findUser.getJWT();
// //     console.log("token: ", token);

// //     res.cookie("token", token);

// //     bcrypt
// //       .hash(user.password, findUser.password)
// //       .then(function (isPasswordCorrect) {
// //         //  console.log(isPasswordCorrect);
// //         if (isPasswordCorrect === findUser.password) {
// //           // res.send("login Sucessfull...");
// //           res.send(findUser);
// //         } else {
// //           res.send("Enter Valid Credential");
// //         }
// //       });
// //   } catch (err) {
// //     res.status(400).send("user not fetched: " + err);
// //   }
// // });

// // authRouter.post("/logout", async (req, res) => {
// //   res.cookie("token", null, {
// //     expires: new Date(Date.now()),
// //   });
// //   res.send("Logout Successful!!");
// // });

// authRouter.post("/login", async (req, res) => {
//   try {
//     const { enrollment, password } = req.body;
//     console.log("Login request:", req.body);

//     // Find user by enrollment
//     const findUser = await User.findOne({ enrollment });
//     console.log("Found user:", findUser);
//     if (!findUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Validate password
//     const isPasswordCorrect = await findUser.validatePassword(password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = findUser.generateAuthToken(); // Ensure this method exists in your User model
//     console.log("Generated token:", token);

//     // Set token in cookie (optional)
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     });

//     // Send user data (excluding sensitive information)
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: findUser._id,
//         name: findUser.name,
//         email: findUser.email,
//         enrollment: findUser.enrollment,
//         isVerified: findUser.isVerified,
//       },
//       token, // Optionally send the token in response
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Logout API
// authRouter.post("/logout", async (req, res) => {
//   try {
//     res.cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Use secure cookies in production
//     });

//     res.status(200).json({ message: "Logout successful!" });
//   } catch (err) {
//     console.error("Logout error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../model/signup.user");
// const sendVerificationEmail = require("../util/emailService");

// const authRouter = express.Router();

// // ============== Signup Route ============== //
// authRouter.post("/signup", async (req, res) => {
//   try {
//     const { name, email, enrollment, password } = req.body;
//     // console.log("Signup request:", req.body);
//     // Check for existing user
//     const existingUser = await User.findOne({
//       $or: [{ email }, { enrollment }],
//     });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Generate OTP as string
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiry = Date.now() + 14 * 60 * 1000; // 14 minutes

//     // Hash the password
//     const passwordHash = await bcrypt.hash(password, 10);

//     // Create a new unverified user
//     const newUser = new User({
//       name,
//       email,
//       enrollment,
//       password:passwordHash,
//       isVerified: false,
//       otp,
//       otpExpiry,
//     });

//     await newUser.save();

//     // Generate JWT token with user data
//     const token = jwt.sign({ enrollment, email }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });

//     // Send verification email
//     await sendVerificationEmail(email, otp);

//     // Return token to client
//     res.status(201).json({
//       message: "OTP sent to email",
//       token, // Client will send this back for verification
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// authRouter.post("/verify-otp", async (req, res) => {
//   try {
//     const { otp } = req.body;

//     // Decode token to get enrollment (if you're still using it)
//     const token = req.headers.authorization?.split(" ")[1];
//     console.log("token", token);

//     if (!token) {
//       return res.status(401).json({ message: "Authentication token required" });
//     }

//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("decodedToken", decodedToken);
//     } catch (tokenError) {
//       console.error("Token verification failed:", tokenError);
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }

//     const { enrollment } = decodedToken;

//     // Find user by enrollment
//     const user = await User.findOne({ enrollment }).select("+otp +otpExpiry");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     console.log("user", user);
//     // Check OTP validity
//     const receivedOTP = otp?.toString()?.trim();

//     if (!receivedOTP || receivedOTP.length !== 6) {
//       return res.status(400).json({ message: "Invalid OTP format" });
//     }

//     if (!user.otp || user.otp !== receivedOTP) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // Check if OTP has expired
//     if (Date.now() > user.otpExpiry) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // Mark user as verified and clear OTP fields
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpiry = undefined;

//     await user.save();

//     // Generate authentication token for the user after successful verification
//     const authToken = jwt.sign(
//       { userId: user._id, enrollment: user.enrollment },
//       "your-jwt-secret",
//       { expiresIn: "24h" }
//     );

//     res.status(200).json({
//       message: "Verification successful",
//       user: { name: user.name, email: user.email },
//       token: authToken,
//     });
//   } catch (error) {
//     console.error("Verify OTP error:", error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ============== Login Route ============== //
// authRouter.post("/login", async (req, res) => {
//   try {
//     const { enrollment, password } = req.body;

//     // 1. Find user by enrollment
//     const user = await User.findOne({ enrollment }).select("+password");
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found. Please sign up first.",
//       });
//     }

//     // 2. Check verification status
//     if (!user.isVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Account not verified. Check your email for verification OTP.",
//       });
//     }

//     // 3. Validate password

//     // const isPasswordValid =  bcrypt.compare(String(password), user.password);
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log("isPasswordValid", isPasswordValid);
//     console.log("Entered Password:", password);
//     console.log("Hashed Password:", user.password);
//     // console.log(password, "  " ,user.password);

//     // if (password !== user.password) {
//     //   return res.status(401).json({
//     //     success: false,
//     //     message: "Invalid credentials",
//     //   });
//     // }


//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // 4. Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         enrollment: user.enrollment,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );
//     console.log("Generated token:", token);

//     // 5. Set secure HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     });

//     // 6. Send response with essential user data
//     res.status(200).json({
//       success: true,
//       user: {
//         name: user.name,
//         email: user.email,
//         enrollment: user.enrollment,
//         createdAt: user.createdAt,
//       },
      
//     });
//     // res.send(user);
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
//   // Clear authentication cookie
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });

//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully",
//   });
// });

// module.exports = authRouter;
















































































































//dummy


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/signup.user");
const sendVerificationEmail = require("../util/emailService");

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

    // Generate OTP and hash password
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

    // Generate JWT token with user data
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

// ============== Verify OTP Route ============== //
authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { otp } = req.body;

    // Decode token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication token required" });
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const { enrollment } = decodedToken;

      // Find user by enrollment
      const user = await User.findOne({ enrollment }).select("+otp +otpExpiry");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Validate OTP
      if (!user.otp || user.otp !== otp || Date.now() > user.otpExpiry) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Mark user as verified and clear OTP fields
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;

      await user.save();

      // Generate authentication token for the user after successful verification
      const authToken = jwt.sign(
        { userId: user._id, enrollment: user.enrollment },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Verification successful",
        user: { name: user.name, email: user.email },
        token: authToken,
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

    // Generate JWT token
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

module.exports = authRouter;
