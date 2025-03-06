const express = require("express");
const connectDB = require("./src/database/signup.database");
const User = require("./src/model/signup.user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./src/middleware/auth")

const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
// const adminRoutes = require("./src/routes/adminRoutes");
const app = express();
const cors = require("cors")


require("dotenv").config();


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    
  })
);
app.use(express.json());
app.use(cookieParser());





app.use("/", authRouter);
app.use("/", profileRouter);
// app.use("/", adminRoutes);
// app.use("/", requestRouter);
// app.use("/", userRouter);
// app.use("/", paymentRouter);
// app.use("/", chatRouter);




// app.post("/signup", async (req, res) => {
//   // const user = new User({
//   //   name: "Dharmik",
//   //   email: "dharmik@gmail.com",
//   //   enrollment: "22012011131",
//   //   password: "dharmik@123"
//     // }
// //   console.log(req.body);
    
//   const user = new User(req.body);

//   try {
//         const {name,email,enrollment,password,userOtp} = req.body
//         const passwordHash = await bcrypt.hash(password, 10);
//         // console.log(passwordHash);
//         const user = new User({
//             name,
//             email,
//             enrollment,
//             password: passwordHash
//         });
    
//     function generateOTP() {
//       return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit OTP
//     }

//     const generatedOtp = generateOTP();  
//     // console.log(generatedOtp);
    
    


//     await user.save();
//     if (generatedOtp == userOtp) {
//       // console.log("valid otp");
      
//            res.send("user saved sucessfully");
//         }
//     // res.send("user saved sucessfully");
//   } catch (err) {
//     res.status(400).send("user not saved: " + err);
//   }
// });

// app.get("/signup", async (req, res) => {
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


// app.post("/login",  async (req, res) => {
  
//   try {
//     const user = req.body;
//     const findUser = await User.findOne({ enrollment: user.enrollment });
//     if (!findUser) {
//       throw new Error("user Not Found");
//     }
//     console.log(findUser);
//     const { password } = findUser;
//     // console.log(findUser.password);
    
    
//     // const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
//     const isPasswordCorrect = await findUser.validatePassword(user.password);
//     console.log(isPasswordCorrect);
    
//     // console.log("ispasword: ",isPasswordCorrect);
//     // console.log(user.password);

  
//     const token = await findUser.getJWT();
//     console.log("token: ",token);
    
//     res.cookie("token", token);


//     bcrypt.hash(user.password, findUser.password).then(function (isPasswordCorrect) {
//       //  console.log(isPasswordCorrect);
//       if (isPasswordCorrect === findUser.password) {
        
     
//         res.send("login Sucessfull...");
//       } else {
//         res.send("Enter Valid Credential");
//       }
//     });
    
//   } catch (err) {
//     res.status(400).send("user not fetched: " + err);
//   }
// });

// app.post("/logout", async (req, res) => {
//   res.cookie("token", null, {
//     expires: new Date(Date.now()),
//   });
//   res.send("Logout Successful!!");
// });





// app.get("/profile",userAuth, async (req, res) => {
  

//  try{const user = req.user
//     console.log(user);
//     res.send(user);
//   }catch (err) {
//     res.status(404).send("ERROR : ",err)
//   }
// });


// app.delete("/user", async (req, res) => {
//   const userDelet = req.body.name;
//   try {
//     // console.log(User.deleteOne({ name: userDelet }));


//     await User.deleteOne({ name: userDelet });
//     res.send("User Deleted Sucessfully: ");
//   } catch (err) {
//     res.status(401).send("User not found: ", err);
//   }
// });

// app.patch("/user", async (req, res) => {
//   // const userUpdate = req.body.enrollment;
//   const userEnrollment = req.body.enrollment;

//   const data = req.body;
//   console.log(userEnrollment);
//   console.log(data);

//   try {
//     await User.findOneAndUpdate({ enrollment: userEnrollment }, data);
//     res.send("User Updated Sucessfully: ");
//   } catch (err) {
//     res.status(400).send("User not Found: ");
//   }
// });


connectDB()
  .then(() => {
    console.log("connection sucessfull");
    app.listen(process.env.PORT, () => {
      console.log("port listen at 3000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed: ", err);
  });



// http://localhost:8080/WebApplication1_129/calc_129?WSDL