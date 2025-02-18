const mongoose = require("mongoose")

const connectDB = async () => {
  // "mongodb+srv://alokp8494:ym1tPlYFI8lTEyRA@signup.tpwmr.mongodb.net/userCollection"
  // "mongodb+srv://alokp8494:ym1tPlYFI8lTEyRA@signup.tpwmr.mongodb.net/transportation"
  // "mongodb+srv://alokp8494:ym1tPlYFI8lTEyRA@signup.tpwmr.mongodb.net/?retryWrites=true&w=majority&appName=signup"
  // "mongodb+srv://Alok:diGgRqVag54rYILG@busschedule.wuw5k.mongodb.net/Signup"
  await mongoose.connect(
    "mongodb+srv://Alok:diGgRqVag54rYILG@busschedule.wuw5k.mongodb.net/Signup"
  );
};

module.exports = connectDB;