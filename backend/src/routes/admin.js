const express = require("express");
const adminRouter = express.Router();
const Bus = require("../model/BusSchedule");
const Admin = require("../model/adminsignup");
const bcrypt = require('bcrypt');
const BusPass = require("../model/busPass")
const CollegeDetails = require("../model/CollegeDetails");
const { adminAuth } = require("../middleware/admin_auth");

const SECRET_KEY = process.env.SECRET_KEY || "GOJO";

adminRouter.post("/admin/signup", async (req, res) => {
  try {
    const { secretkey, id, password, name } = req.body; // Add 'name'

    // Check if the secret key matches
    if (secretkey !== SECRET_KEY) {
      return res.status(403).json({ message: "Invalid Secret Key" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ id });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      id,
      password: passwordHash,
      name,      // Include name from request
    });
    // const newAdmin = new Admin({
    //   id,
    //   password: passwordHash,
    // });

    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error signing up: " + err.message });
  }
});



adminRouter.post("/admin/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    // Find admin by ID
    const findUser = await Admin.findOne({ id });
    if (!findUser) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    // Compare password
    const isPasswordCorrect = await findUser.validatePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = await findUser.getJWT();

    // Set admin token cookie with explicit options so it can be cleared reliably
    // Note: sameSite is set to 'lax' for local dev. If you serve frontend from a different
    // origin and need cross-site cookies, use sameSite: 'none' and secure: true (HTTPS required).
    res.cookie("token_admin", token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    res.json({ 
      message: "Login Successful", 
      token,
      user: {
        id: findUser.id,
        name: findUser.name
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in: " + err.message });
  }
});

// Verification endpoint for frontend auth guard
adminRouter.get("/admin/verify", adminAuth, async (req, res) => {
  try {
    res.json({ 
      success: true, 
      message: "Token is valid",
      user: {
        id: req.admin.id,
        name: req.admin.name
      }
    });
  } catch (err) {
    res.status(401).json({ success: false, message: "Token verification failed" });
  }
});



// In admin.js - Update the logout endpoint
// adminRouter.post("/admin/logout", (req, res) => {
//   try {
//     // Clear the admin token cookie with proper options
//     res.clearCookie("token_admin", {
//       path: '/',
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict'
//     });
    
//     res.json({ success: true, message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error logging out" });
//   }
// });



// // Logout endpoint
// adminRouter.post("/admin/logout", (req, res) => {
//   try {
//     res.clearCookie("token_admin");
//     res.json({ success: true, message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error logging out" });
//   }
// });



// Protected admin endpoint for managing buses
adminRouter.get("/admin/getbuses", adminAuth, async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    const buses = await Bus.find({ city: city });
    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found for the specified city" });
    }
    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Public endpoint for fetching buses by city (no auth required)
adminRouter.get("/getbuses", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) {
      return res.status(400).json({ message: "City parameter is required" });
    }

    const buses = await Bus.find({ city: city });
    if (buses.length === 0) {
      return res
        .status(404)
        .json({ message: "No buses found for the specified city" });
    } else {
        console.log(buses);  
    }

    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




adminRouter.post("/admin/addbuses", adminAuth, async (req, res) => {
  try {
    const { busNumber, source, destination, city, departureTime, arrivalTime } = req.body;
    console.log(req.body);
    // Validate required fields
    if (!busNumber || !source || !destination || !city || !departureTime || !arrivalTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate that departureTime and arrivalTime are in correct format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(departureTime) || !timeRegex.test(arrivalTime)) {
      return res.status(400).json({ message: "Invalid time format. Use HH:mm (e.g., 08:30)" });
    }

    const newBus = new Bus({
      busNumber,
      source,
      destination,
      city,
      departureTime,
      arrivalTime,
    });

    await newBus.save();
    res.status(201).send("Your bus was saved successfully!");
  } catch (error) {
    console.error("Error creating new bus entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





adminRouter.get("/admin/getallbuses", adminAuth, async (req, res) => {
  try {
    const buses = await Bus.find(); // Fetch all buses from the buses collection
    res.json(buses);
  } catch (error) {
    console.error("Error fetching all buses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


adminRouter.put("/admin/updatebus/:id", adminAuth, async (req, res) => {
  try {
    const { busNumber, source, destination, city, departureTime, arrivalTime } = req.body;

    // Validate required fields
    if (!busNumber || !source || !destination || !city || !departureTime || !arrivalTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate time format (HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!timeRegex.test(departureTime) || !timeRegex.test(arrivalTime)) {
      return res.status(400).json({ message: "Invalid time format. Use HH:mm (e.g., 08:30)" });
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      { busNumber, source, destination, city, departureTime, arrivalTime },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({ message: "Bus updated successfully", updatedBus });
  } catch (error) {
    res.status(500).json({ message: "Error updating bus: " + error.message });
  }
});




// Delete a bus
adminRouter.delete("/admin/deletebus/:id", adminAuth, async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bus: " + error.message });
  }
});





// Route to fetch student data
adminRouter.get("/admin/getstudents", adminAuth, async (req, res) => {
  try {
    const students = await BusPass.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


adminRouter.post("/admin/addCollege", adminAuth, async (req, res) => {
  try {
    const { college, branch, semester, start_date, end_date } = req.body;

    if (!college || !branch || !semester || !start_date || !end_date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCollege = new CollegeDetails({
      college,
      branch,
      semester,
      start_date,
      end_date,
    });

    await newCollege.save();
    res.status(201).json({ message: "College details added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding college details: " + error.message });
  }
});

// Delete a bus
adminRouter.delete("/admin/deleteCollege/:id", adminAuth, async (req, res) => {
  try {
    const deletedCollege = await CollegeDetails.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCollege) {
      return res.status(404).json({ message: "College not found" });
    }
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bus: " + error.message });
  }
});

adminRouter.put("/admin/updateCollege/:id", adminAuth, async (req, res) => {
  try {
    const { college, branch, semester, start_date, end_date } = req.body;

    const updatedCollege = await CollegeDetails.findByIdAndUpdate(
      req.params.id,
      { college, branch, semester, start_date, end_date },
      { new: true, runValidators: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json({ message: "College updated successfully", updatedCollege });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating college: " + error.message });
  }
});

adminRouter.get("/admin/addCollege", adminAuth, async (req, res) => {
  try {
    const colleges = await CollegeDetails.find();
    res.json(colleges);
  } catch (error) {
    console.error("Error fetching colleges:", error);
    res
      .status(500)
      .json({ message: "Error fetching colleges: " + error.message });
  }
});

// Get all students
adminRouter.get("/admin/getstudents", adminAuth, async (req, res) => {
  try {
    const users = await require('../model/signup.user').find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students: " + error.message });
  }
});

module.exports = adminRouter;