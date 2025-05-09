const jwt = require("jsonwebtoken");
const User = require("../model/signup.user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj =  jwt.verify(token, process.env.JWT_SECRET);

    const { enrollment } = decodedObj;

      const user = await User.findOne({ enrollment: enrollment });
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
};

module.exports = {
  userAuth,
};


