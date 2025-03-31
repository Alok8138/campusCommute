const express = require("express");
const adminRouter = express.Router();
const Bus = require("../model/BusSchedule");
const Admin = require("../model/adminsignup");
const bcrypt = require('bcrypt');
const BusPass = require("../model/BusPass")


const SECRET_KEY = "Gojo";

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

    res.cookie("token_admin", token, { httpOnly: true });
    res.json({ message: "Login Successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in: " + err.message });
  }
});




adminRouter.get("/admin/getbuses", async (req, res) => {
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




adminRouter.post("/admin/addbuses", async (req, res) => {
  try {
    const { busNumber, source, destination, city, departureTime, arrivalTime } = req.body;

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



// adminRouter.post("/admin/addbuses", async (req, res) => {
//   try {
//     const { busNumber, source, destination, city, departureTime, arrivalTime } =
//       req.body;

//     // Validate required fields
//     if (
//       !busNumber ||
//       !source ||
//       !destination ||
//       !city ||
//       !departureTime ||
//       !arrivalTime
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newBus = new Bus({
//       busNumber,
//       source,
//       destination,
//       city,
//       departureTime,
//       arrivalTime,
//     });

//     await newBus.save();
//     res.status(201).send("your bus saved sucessfully!");
//   } catch (error) {
//     console.error("Error creating new bus entry:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


//Get All Buses



adminRouter.get("/admin/getallbuses", async (req, res) => {
  try {
    const buses = await Bus.find(); // Fetch all buses from the buses collection
    res.json(buses);
  } catch (error) {
    console.error("Error fetching all buses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


adminRouter.put("/admin/updatebus/:id", async (req, res) => {
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



// Update a bus
// adminRouter.put("/admin/updatebus/:id", async (req, res) => {
//   try {
//     const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedBus) {
//       return res.status(404).json({ message: "Bus not found" });
//     }
//     res.json({ message: "Bus updated successfully", updatedBus });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating bus: " + error.message });
//   }
// });

// Delete a bus
adminRouter.delete("/admin/deletebus/:id", async (req, res) => {
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
adminRouter.get("/admin/getstudents", async (req, res) => {
  try {
    const students = await BusPass.find();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = adminRouter;