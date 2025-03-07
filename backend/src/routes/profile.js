// const express = require("express");
// const profileRouter = express.Router();

// const { userAuth } = require("../middleware/auth");
// const { validateEditProfileData } = require("../util/signup.user.validation");












const express = require("express");
const multer = require("multer");
const path = require("path");

const profileRouter = express.Router();

const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require("../util/signup.user.validation");





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Rename the file to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Accept only image files
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 }, // Limit file size to 2MB
});






profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  console.log(res);

  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    console.log(req.body);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.name}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
