// const express = require("express");
// const BusSchedule = require("../model/BusSchedule");

// const router = express.Router();

// // POST: Add or Update Bus Schedules
// router.post("/addBusSchedule", async (req, res) => {
//   try {
//     let { city, buses } = req.body;

//     // 🚀 Ensure `buses` is an array and not a string
//     if (typeof buses === "string") {
//       try {
//         buses = JSON.parse(buses);
//       } catch (error) {
//         return res
//           .status(400)
//           .json({
//             message: "Invalid format for buses. Must be an array of objects.",
//           });
//       }
//     }

//     // Validate input
//     if (!city || !Array.isArray(buses) || buses.length === 0) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "City and buses data are required and must be in correct format.",
//         });
//     }

//     // Find if the city already exists
//     let cityData = await BusSchedule.findOne({ city });

//     if (cityData) {
//       // Check for duplicates and add only new buses
//       buses.forEach((bus) => {
//         const exists = cityData.buses.some(
//           (existingBus) =>
//             existingBus.Bus_no === bus.Bus_no &&
//             existingBus.Deport_time === bus.Deport_time &&
//             existingBus.Source === bus.Source &&
//             existingBus.Destination === bus.Destination
//         );
//         if (!exists) {
//           cityData.buses.push(bus);
//         }
//       });

//       await cityData.save();
//       return res
//         .status(200)
//         .json({ message: "Bus schedule updated!", data: cityData });
//     } else {
//       // If city does not exist, create new record
//       const newBusSchedule = new BusSchedule({ city, buses });
//       await newBusSchedule.save();
//       return res
//         .status(201)
//         .json({
//           message: "New city added with bus schedule!",
//           data: newBusSchedule,
//         });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
