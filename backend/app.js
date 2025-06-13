const express = require("express");
const connectDB = require("./src/database/signup.database");
const User = require("./src/model/signup.user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./src/middleware/auth")

const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const adminRoutes = require("./src/routes/admin");
const app = express();
const cors = require("cors");
const busrouter = require("./src/routes/formRoutes");


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
app.use("/", adminRoutes);
app.use("/", busrouter);


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

//////////////////////////////////

// http://localhost:8080/WebApplication1_129/calc_129?WSDL