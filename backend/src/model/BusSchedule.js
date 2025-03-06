// const mongoose = require("mongoose");

// // Schema for individual bus details
// const busSchema = new mongoose.Schema({
//   Bus_no: { type: String, required: true },
//   Deport_time: { type: String, required: true },
//   Source: { type: String, required: true },
//   Destination: { type: String, required: true },
// });

// // Schema for city-wise bus schedules
// const busScheduleSchema = new mongoose.Schema({
//   city: { type: String, required: true, unique: true },
//   buses: { type: [busSchema], required: true }, 
// });


// const BusSchedule =
//   mongoose.models.BusSchedule ||
//   mongoose.model("BusSchedule", busScheduleSchema);

// module.exports = BusSchedule;
