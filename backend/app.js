const express = require("express");
const connectDB = require("./src/database/signup.database");
const User = require("./src/model/signup.user")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const { userAuth } = require("./src/middleware/auth")

const authRouter = require("./src/routes/auth")
const profileRouter = require("./src/routes/profile")
const adminRoutes = require("./src/routes/admin");
const app = express();
const cors = require("cors");
const busPassRouter = require("./src/routes/busPass");
const paymentRouter = require("./src/routes/payment");
const razorpay = require("razorpay");

const admintokenRoutes = require('./src/routes/admin_routes');
// const llmRouter = require("./src/routes/llm");

// Load environment variables
require("dotenv").config();

// CORS Configuration
// Ensure we have a sensible default for FRONTEND_PORT so the origin
// doesn't become "http://localhost:undefined" which breaks credentialed requests.
const FRONTEND_PORT = process.env.FRONTEND_PORT || 5173;
app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(cookieParser());





app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", adminRoutes);
app.use("/", busPassRouter);
app.use("/", paymentRouter);

app.use("/", admintokenRoutes);

// LLM / chatbot route
// app.use("/", llmRouter);




connectDB()
  .then(async () => {
    console.log("connection sucessfull");
    
    // Clean up old indexes from previous schema
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection("buspasses");
        try {
          await collection.dropIndex("srNo_1");
          console.log("✓ Cleaned up old srNo_1 index");
        } catch (e) {
          // Index doesn't exist, that's fine
        }
        try {
          await collection.dropIndex("regNo_1");
          console.log("✓ Cleaned up old regNo_1 index");
        } catch (e) {
          // Index doesn't exist, that's fine
        }
      }
    } catch (error) {
      console.warn("Warning: Could not clean up indexes:", error.message);
    }
    
    app.listen(process.env.PORT, () => {
      console.log("port listen at 3000");
    });
  })
  .catch((err) => {
    console.error("Connection Failed: ", err);
  });
  
  
  
  
// const express = require("express");
// const connectDB = require("./src/database/signup.database");
// const User = require("./src/model/signup.user")
// const bcrypt = require("bcrypt");
// const cookieParser = require("cookie-parser")
// const jwt = require("jsonwebtoken")
// const { userAuth } = require("./src/middleware/auth")

// const authRouter = require("./src/routes/auth")
// const profileRouter = require("./src/routes/profile")
// const adminRoutes = require("./src/routes/admin");
// const app = express();
// const cors = require("cors");
// const busPassRouter = require("./src/routes/busPass");
// const paymentRouter = require("./src/routes/payment");
// const razorpay = require("razorpay");

// const admintokenRoutes = require('./src/routes/admin_routes');
// // const llmRouter = require("./src/routes/llm");

// require("dotenv").config();

// const FRONTEND_PORT = process.env.FRONTEND_PORT

// app.use(
//   cors({
//     origin: `http://localhost:${FRONTEND_PORT}` || "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());





// app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", adminRoutes);
// app.use("/", busPassRouter);
// app.use("/", paymentRouter);

// app.use("/", admintokenRoutes);

// // LLM / chatbot route
// // app.use("/", llmRouter);




// connectDB()
//   .then(() => {
//     console.log("connection sucessfull");
//     app.listen(process.env.PORT, () => {
//       console.log("port listen at 3000");
//     });
//   })
//   .catch((err) => {
//     console.error("Connection Failed: ", err);
//   });



