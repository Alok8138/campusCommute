const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    start_date: {
      type: Date,
      required: true,
      trim: true,
    },
    end_date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const CollegeDetails = mongoose.model("CollegeDetails", CollegeSchema);

module.exports = CollegeDetails;
