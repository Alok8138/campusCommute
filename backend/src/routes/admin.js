const express = require("express");
const adminRouter = express.Router();
const Bus = require("../model/BusSchedule");
const Admin = require("../model/adminsignup");
const bcrypt = require('bcrypt');


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

// authRouter.post("/admin", async (req, res) => {


//   const user = new Admin(req.body);

//   try {
//     const { id, password } = req.body;
//     const passwordHash = await bcrypt.hash(password, 10);
//     // console.log(passwordHash);
//     const user = new Admin({
//       id,
//       password: passwordHash,
//     });

//     // function generateOTP() {
//     //   return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit OTP
//     // }

//     // const generatedOtp = generateOTP();
//     // console.log(generatedOtp);

//     // await user.save();
//     // if (generatedOtp == userOtp) {
//     //   // console.log("valid otp");

//     //   res.send("user saved sucessfully");
//     // }
//     res.send("user saved sucessfully");
//   } catch (err) {
//     // res.status(400).send("user not saved: " + err);
//     res.status(400).send("Please Login User Already Exist");
//   }
// });


// Admin Login Route


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
// authRouter.post("/admin/login", async (req, res) => {
 
//   try {
//     const admin = req.body;
//     const findUser = await Admin.findOne({ id: admin.id });
//     if (!findUser) {
//       throw new Error("Admin Not Found");
//     }
//     console.log(findUser);
//     const { password } = findUser;
//     // console.log(findUser.password);

//     // const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
//     const isPasswordCorrect = await findUser.validatePassword(admin.password);
//     console.log(isPasswordCorrect);

//     // console.log("ispasword: ",isPasswordCorrect);
//     // console.log(user.password);

//     const token = await findUser.getJWT();
//     console.log("token_admin: ", token);

//     res.cookie("token_admin", token);

//     bcrypt
//       .hash(admin.password, findUser.password)
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
//     res.status(400).send("Admin not fetched: " + err);
//   }
// });






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
    const { busNumber, source, destination, city, departureTime, arrivalTime } =
      req.body;

    // Validate required fields
    if (
      !busNumber ||
      !source ||
      !destination ||
      !city ||
      !departureTime ||
      !arrivalTime
    ) {
      return res.status(400).json({ message: "All fields are required" });
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
    res.status(201).send("your bus saved sucessfully!");
  } catch (error) {
    console.error("Error creating new bus entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = adminRouter;