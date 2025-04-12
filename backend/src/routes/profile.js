const express = require("express");
const multer = require("multer");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const { validateEditProfileData } = require('../util/signup.user.validation');

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});



profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    console.log("Fetching Profile for User:", req.user); // Debugging log
    if (!req.user) {
      console.error("User not found in session");
      return res.status(400).json({ message: "User not found" });
    }
    res.send(req.user);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(400).send("ERROR : " + err.message);
  }
});
// profileRouter.get("/profile/view", userAuth, async (req, res) => {
//   try {
//     console.log("Fetching Profile for User:", req.user); // Debugging log
//     if (!req.user) {
//       return res.status(400).json({ message: "User not found" });
//     }
//     res.send(req.user);
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

profileRouter.patch("/profile/edit", userAuth, upload.single("image"), async (req, res) => {
  try {
    console.log("Logged-in User Before Update:", req.user); // Debugging log

    if (!req.user) {
      throw new Error("User not found");
    }

    if (!validateEditProfileData(req)) {
      throw new Error("Invalid fields in update request.");
    }

    const loggedInUser = req.user;

    if (req.body.name) {
      loggedInUser.name = req.body.name;
    }

    if (req.body.enrollment) {
      console.log("Updating Enrollment:", req.body.enrollment);
      loggedInUser.enrollment = req.body.enrollment;
    }

    if (req.file) {
      loggedInUser.profileUrl = req.file.buffer;
    }

    await loggedInUser.save();

    console.log("Updated User:", loggedInUser); // Debugging log

    res.json({ message: "Profile updated!", data: loggedInUser });
  } catch (err) {
    console.error("Error in profile edit:", err.message);
    res.status(400).json({ message: `ERROR: ${err.message}` });
  }
});
// profileRouter.patch("/profile/edit", userAuth, upload.single("image"), async (req, res) => {
//   try {
//     console.log("Logged-in User Before Update:", req.user); // Debugging log

//     if (!req.user) {
//       throw new Error("User not found");
//     }

//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid fields in update request.");
//     }

//     const loggedInUser = req.user;

//     if (req.body.name) {
//       loggedInUser.name = req.body.name;
//     }

//     if (req.body.enrollment) {
//       console.log("Updating Enrollment:", req.body.enrollment);
//       loggedInUser.enrollment = req.body.enrollment;
//     }

//     if (req.file) {
//       loggedInUser.profileUrl = req.file.buffer;
//     }

//     await loggedInUser.save();

//     console.log("Updated User:", loggedInUser); // Debugging log

//     res.json({ message: "Profile updated!", data: loggedInUser });
//   } catch (err) {
//     console.error("Error in profile edit:", err.message);
//     res.status(400).json({ message: `ERROR: ${err.message}` });
//   }
// });

// profileRouter.get("/profile/view", userAuth, async (req, res) => {
//   try {
//     const user = req.user;
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("ERROR : " + err.message);
//   }
// });

// profileRouter.patch("/profile/edit", userAuth, upload.single("image"), async (req, res) => {
//   try {
//     console.log("Logged-in User Before Update:", req.user); // Debugging log

//     if (!req.user) {
//       throw new Error("User not found");
//     }

//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid fields in update request.");
//     }

//     const loggedInUser = req.user;

//     if (req.body.name) {
//       loggedInUser.name = req.body.name;
//     }

//     if (req.body.enrollment) {
//       console.log("Updating Enrollment:", req.body.enrollment);
//       loggedInUser.enrollment = req.body.enrollment;
//     }

//     if (req.file) {
//       loggedInUser.profileUrl = req.file.buffer;
//     }

//     await loggedInUser.save();

//     console.log("Updated User:", loggedInUser); // Debugging log

//     res.json({ message: "Profile updated!", data: loggedInUser });
//   } catch (err) {
//     console.error("Error in profile edit:", err.message);
//     res.status(400).json({ message: `ERROR: ${err.message}` });
//   }
// });

// profileRouter.patch("/profile/edit", userAuth, upload.single("image"), async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); // Debugging log

//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid fields in update request.");
//     }   

//     const loggedInUser = req.user;

//     if (req.body.name) {
//       loggedInUser.name = req.body.name;
//     }

//     if (req.body.enrollment) {
//       console.log("Updating Enrollment:", req.body.enrollment); // Debugging log
//       loggedInUser.enrollment = req.body.enrollment;
//     }

//     if (req.file) {
//       loggedInUser.profileUrl = req.file.buffer; // Store as binary Buffer in MongoDB
//     }

//     await loggedInUser.save();
//     res.json({ message: "Profile updated!", data: loggedInUser });
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });


// profileRouter.patch("/profile/edit", userAuth, upload.single("image"), async (req, res) => {
//   try {
//     if (!validateEditProfileData(req)) {
//       throw new Error("Invalid ")
//     }   
//     const loggedInUser = req.user;
//     if (req.body.name) {
//       loggedInUser.name = req.body.name;
//     }

//     if (req.body.enrollment) {
//       loggedInUser.enrollment = req.body.enrollment;
//     }
//     if (req.file) {
//       loggedInUser.profileUrl = req.file.buffer; // Store as binary Buffer in MongoDB
//     }
    
//     await loggedInUser.save();
//     res.json({ message: "Profile updated!", data: loggedInUser });
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error", error: err.message });
//   }
// });

module.exports = profileRouter;