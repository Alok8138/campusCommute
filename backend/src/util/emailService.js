const nodemailer = require("nodemailer");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("./EmailTemplet");


const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification OTP",
      // html: `<p>Your verification OTP is: <strong>${otp}</strong></p>`,
      html: Verification_Email_Template.replace("{verificationCode}", otp),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }
};

const senWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Alok" <alokp8494@gmail.com>',

      to: email, // list of receivers
      subject: "Welcome Email", // Subject line
      text: "Welcome Email", // plain text body
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("Email send Successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
};

module.exports = { sendVerificationEmail, senWelcomeEmail };
