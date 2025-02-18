const express = require("express");
const connectDB = require("./src/database/signup.database");
const User = require("./src/model/signup.user")
const bcrypt = require("bcrypt");




const app = express();


app.use(express.json());

app.post("/signup", async (req, res) => {
  // const user = new User({
  //   name: "Dharmik",
  //   email: "dharmik@gmail.com",
  //   enrollment: "22012011131",
  //   password: "dharmik@123"
    // }
//   console.log(req.body);
    
  const user = new User(req.body);

  try {
    
        const {name,email,enrollment,password,userOtp} = req.body
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        const user = new User({
            name,
            email,
            enrollment,
            password: passwordHash
        });
    
    function generateOTP() {
      return Math.floor(1000 + Math.random() * 9000); // Ensures 4-digit OTP
    }

    // const generatedOtp = generateOTP();  
    // console.log(generatedOtp);
    const generatedOtp = 1234; 


    await user.save();
    if (generatedOtp == userOtp) {
      console.log("valid otp");
      
           res.send("user saved sucessfully");
        }
    // res.send("user saved sucessfully");
  } catch (err) {
    res.status(400).send("user not saved: " + err);
  }
});

app.get("/signup", async (req, res) => {
  const userDB = req.body.enrollment;

  try {
    // console.log(await User.find({ enrollment: userDB }));//fetch all user with same enrollment
    // let arr = await User.find({ enrollment: userDB }); //store it to arr
    // console.log(arr);
    // console.log(await User.find({}));//fetch all user from db

    res.send("user fetch sucessfully");
  } catch (err) {
    res.status(400).send("user not fetched: " + err);
  }
});


app.post("/login",  async (req, res) => {
  
  try {
    const user = req.body;
    const findUser = await User.findOne({ enrollment: user.enrollment });
    if (!findUser) {
      throw new Error("user Not Found");
    }
    console.log(findUser);
    const { password } = findUser;
    console.log(findUser.password);
    

    const isPasswordCorrect =  bcrypt.compare(user.password, findUser.password);
    // console.log("ispasword: ",isPasswordCorrect);
    console.log(user.password);

    bcrypt.hash(user.password, findUser.password).then(function (isPasswordCorrect) {
       console.log(isPasswordCorrect);
      if (isPasswordCorrect === findUser.password) {
        console.log("welcome to home page ");
        
        res.send("login Sucessfull...");
      } else {
        res.send("Enter Valid Credential");
      }
    });
    
  } catch (err) {
    res.status(400).send("user not fetched: " + err);
  }
});


app.delete("/user", async (req, res) => {
  const userDelet = req.body.name;
  try {
    console.log(User.deleteOne({ name: userDelet }));

    await User.deleteOne({ name: userDelet });
    res.send("User Deleted Sucessfully: ");
  } catch (err) {
    res.status(401).send("User not found: ", err);
  }
});

app.patch("/user", async (req, res) => {
  // const userUpdate = req.body.enrollment;
  const userEnrollment = req.body.enrollment;

  const data = req.body;
  console.log(userEnrollment);
  console.log(data);

  try {
    await User.findOneAndUpdate({ enrollment: userEnrollment }, data);
    res.send("User Updated Sucessfully: ");
  } catch (err) {
    res.status(400).send("User not Found: ");
  }
});


connectDB()
  .then(() => {
    console.log("connection sucessfull");
    app.listen(3000, () => {
      console.log("port listen at 3000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed: ", err);
  });



// http://localhost:8080/WebApplication1_129/calc_129?WSDL