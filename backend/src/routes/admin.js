const express = require("express");
const adminRouter = express.Router();
const Bus = require("../model/BusSchedule");










//read
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







//create
adminRouter.post("/admin/addbuses", async (req, res) => {
  try {
    const { busNumber, source, destination, city, departureTime, arrivalTime ,fees} =
      req.body;

    // Validate required fields
    if (
      !busNumber ||
      !source ||
      !destination ||
      !city ||
      !departureTime ||
      !arrivalTime ||
      !fees
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
      fees,
    });

    await newBus.save();
    res.status(201).send("your bus saved sucessfully!");
  } catch (error) {
    console.error("Error creating new bus entry:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// adminRouter.post('/admin/price')
// [{"city":{
// "a":20000,
// "b":30000
// }}]

//updata

// delete
module.exports = adminRouter;