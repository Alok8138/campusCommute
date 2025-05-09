
const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busNumber: String,
  source: String,
  destination: String,
  city: String,
  departureTime: String,
  arrivalTime: String,
  fees: Number,
});

module.exports = mongoose.model("Bus", busSchema);