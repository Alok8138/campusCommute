const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../util/signup.user.validation");
const User = require("../model/signup.user");
const bcrypt = require("bcrypt");




authRouter.post("/signup", async (req, res) => {
  // const user = new User({
  //   name: "Dharmik",
  //   email: "dharmik@gmail.com",
  //   enrollment: "22012011131",
  //   password: "dharmik@123"
  // }
  //   console.log(req.body);

  const user = new User(req.body);

  try {
    const { name, email, enrollment, password, userOtp } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new User({
      name,
      email,
      enrollment,
      password: passwordHash,
    });

    function generateOTP() {
      return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit OTP
    }

    const generatedOtp = generateOTP();
    // console.log(generatedOtp);

    await user.save();
    if (generatedOtp == userOtp) {
      // console.log("valid otp");

      res.send("user saved sucessfully");
    }
    res.send("user saved sucessfully");
  } catch (err) {
    // res.status(400).send("user not saved: " + err);
    res.status(400).send("Please Login User Already Exist");
  }
});

// authRouter.get("/signup", async (req, res) => {
//   const userDB = req.body.enrollment;

//   try {
//     // console.log(await User.find({ enrollment: userDB }));//fetch all user with same enrollment
//     // let arr = await User.find({ enrollment: userDB }); //store it to arr
//     // console.log(arr);
//     // console.log(await User.find({}));//fetch all user from db

//     res.send("user fetch sucessfully");
//   } catch (err) {
//     res.status(400).send("user not fetched: " + err);
//   }
// });

authRouter.post("/login", async (req, res) => {
 
  try {
    const user = req.body;
    const findUser = await User.findOne({ enrollment: user.enrollment });
    if (!findUser) {
      throw new Error("user Not Found");
    }
    console.log(findUser);
    const { password } = findUser;
    // console.log(findUser.password);

    // const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
    const isPasswordCorrect = await findUser.validatePassword(user.password);
    console.log(isPasswordCorrect);

    // console.log("ispasword: ",isPasswordCorrect);
    // console.log(user.password);

    const token = await findUser.getJWT();
    console.log("token: ", token);

    res.cookie("token", token);

    bcrypt
      .hash(user.password, findUser.password)
      .then(function (isPasswordCorrect) {
        //  console.log(isPasswordCorrect);
        if (isPasswordCorrect === findUser.password) {
          // res.send("login Sucessfull...");
          res.send(findUser);
        } else {
          res.send("Enter Valid Credential");
        }
      });
  } catch (err) {
    res.status(400).send("user not fetched: " + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});


module.exports = authRouter;