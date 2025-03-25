const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};


const validateEditProfileData = (req) => {
  const allowedEditFields = ["name", "email", "enrollment", "profileUrl"];
  const requestFields = Object.keys(req.body);

  console.log("Incoming fields:", requestFields); // Debugging log

  const isEditAllowed = requestFields.every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

// const validateEditProfileData = (req) => {
//   const allowedEditFields = ["name", "email","enrollment", "profileUrl"];

//   const isEditAllowed = Object.keys(req.body).every((field) =>
//     allowedEditFields.includes(field)
//   );

//   return isEditAllowed;
// };

module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
