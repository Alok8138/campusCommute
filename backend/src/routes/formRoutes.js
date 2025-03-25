const express = require("express");
const busrouter = express.Router();
const BusPass = require("../model/BusPass"); // Import schema

// POST route to store form data in MongoDB
busrouter.post("/submit-form", async (req, res) => {
  try {
    const formData = req.body;
    console.log("Received data:", formData);

    // Required fields validation
    const requiredFields = [
      "srNo", "date", "regNo", "name", "enrollmentNo", "branch", "semester", 
      "address", "phone", "parentPhone", "email", "bloodGroup", "shift", "city", "stand", "feeAmount"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }
    
    // Validate phone numbers
    if (!/^[0-9]{10}$/.test(formData.phone) || !/^[0-9]{10}$/.test(formData.parentPhone)) {
      return res.status(400).json({ message: "Invalid phone number format. Must be 10 digits." });
    }
    
    // Validate email
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    
    // Ensure feeAmount is a valid number
    formData.feeAmount = Number(formData.feeAmount);
    if (isNaN(formData.feeAmount) || formData.feeAmount <= 0) {
      return res.status(400).json({ message: "Invalid fee amount." });
    }
    
    // Save form data to MongoDB
    const newBusPass = new BusPass(formData);
    await newBusPass.save();
    
    console.log("Form data saved successfully!");
    return res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = busrouter;


// const express = require("express");
// const busrouter = express.Router();
// const BusPass = require("../model/BusPass"); // Import schema

// // POST route to store form data in MongoDB
// busrouter.post("/submit-form", async (req, res) => {
//   try {
//     const formData = req.body;
//     console.log("Received data:", formData);

//     // Validate required fields (Match exact frontend field names)
//     if (
//       !formData.srNo ||   
//       !formData.date ||
//       !formData.regNo ||
//       !formData.name ||
//       !formData.enrollmentNo ||
//       !formData.branch ||
//       !formData.semester ||
//       !formData.address ||
//       !formData.phone ||         // ✅ Fix field name
//       !formData.parentPhone ||   // ✅ Fix field name
//       !formData.email ||
//       !formData.bloodGroup ||
//       !formData.shift ||
//       !formData.city ||
//       !formData.stand ||
//       !formData.feeAmount
//     ) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     // Save form data to MongoDB
//     const newBusPass = new BusPass(formData);
//     await newBusPass.save();
    
//     console.log("Form data saved successfully!");
//     return res.status(201).json({ message: "Form submitted successfully!" });
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     return res.status(500).json({ message: "Server error. Try again later." });
//   }
// });

// module.exports = busrouter;
