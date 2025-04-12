const express = require("express");
const busPassRouter = express.Router();
const BusPass = require("../model/busPass");
const User = require("../model/signup.user")
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");






busPassRouter.post('/submit-form', async (req, res) => {
  try {
      console.log(req.body);
      const newApplication = new BusPass(req.body); // Create a new bus pass application
      await newApplication.save(); // Save the application to the database

      res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
      console.error('Error:', error);

      if (error.name === 'ValidationError') { // Handle validation errors
          return res.status(400).json({ message: error.message });
      }

      res.status(500).json({ message: "Error submitting form." });
  }
});




// const pdfFolderPath = "D:\\CP\\pdf";
// if (!fs.existsSync(pdfFolderPath)) {
//   fs.mkdirSync(pdfFolderPath, { recursive: true }); // Create the folder if it doesn't exist
// }

// // Middleware to validate ObjectId format
// const validateObjectId = (req, res, next) => {
//   console.log("Incoming ID:", req.params.id);
//   const busPassId = req.params.id.trim();
//   if (!mongoose.Types.ObjectId.isValid(busPassId)) {
//     return res.status(400).json({ error: "Invalid ID format" });
//   }
//   next();
// };

// // GET route to download bus pass as PDF
// busPassRouter.get(
//   "/download-bus-pass/:id",
//   userAuth,
//   validateObjectId,
//   async (req, res) => {
//     try {
//       const enrollment = req.user.enrollment;
//       const busPassId = req.params.id.trim();

//       // Fetch bus pass and verify ownership
//       const busPassData = await BusPass.findOne({ enrollmentNo: enrollment });
//       // Fetch bus pass user
//       const user = await User.findOne({ enrollment: enrollment });
//       console.log("User Data:", user);
//       console.log("Bus Pass Data:", busPassData);
//       if (!busPassData) {
//         return res
//           .status(404)
//           .json({ error: "Bus pass not found or unauthorized" });
//       }

//       // Calculate expiry date (150 days from application date)
//       const issueDate = busPassData.createdAt || new Date();
//       const expiryDate = new Date(issueDate);
//       expiryDate.setDate(expiryDate.getDate() + 150);

//       // Format dates
//       const formattedIssueDate = issueDate.toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//       const formattedExpiryDate = expiryDate.toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });

//       // Determine theme based on enrollment number length
//       const isYellowTheme = busPassData.enrollmentNo.toString().length === 5;

//       // Theme colors based on enrollment length
//       const colors = isYellowTheme
//         ? {
//             primary: "#f57f17", // dark yellow
//             secondary: "#ffb300", // amber
//             accent: "#ff6f00", // amber dark
//             light: "#fff8e1", // light yellow
//             ultraLight: "#fffde7", // very light yellow
//             text: "#3e2723", // dark brown
//             highlight: "#ff8f00", // amber light
//             danger: "#d84315", // orange dark
//             background: "#fffde7", // yellowish white
//             footerBg: "#f57f17", // dark yellow
//           }
//         : {
//             primary: "#1565c0", // dark blue
//             secondary: "#0288d1", // blue
//             accent: "#01579b", // dark blue
//             light: "#e3f2fd", // light blue
//             ultraLight: "#e0f7fa", // very light blue
//             text: "#263238", // dark blue-grey
//             highlight: "#0277bd", // blue light
//             danger: "#d32f2f", // red
//             background: "#ffffff", // white
//             footerBg: "#0277bd", // light blue
//           };

//       // Create PDF document with theme-based styling
//       const doc = new PDFDocument({
//         size: "A4",
//         margin: 50,
//         info: {
//           Title: "CampusCommute Bus Pass",
//           Author: "CampusCommute System",
//           Subject: `Bus Pass for ${busPassData.name}`,
//         },
//       });

//       const filePath = path.join(pdfFolderPath, `bus-pass-${enrollment}.pdf`);
//       doc.pipe(fs.createWriteStream(filePath));

//       // Create a theme-based gradient background
//       const gradient = doc.linearGradient(
//         0,
//         0,
//         doc.page.width,
//         doc.page.height
//       );
//       gradient.stop(0, colors.ultraLight).stop(1, colors.background);
//       doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);

//       // Add a decorative border with rounded corners
//       doc
//         .roundedRect(15, 15, doc.page.width - 30, doc.page.height - 30, 10)
//         .lineWidth(3)
//         .strokeOpacity(0.8)
//         .stroke(colors.primary);

//       // Add a second inner border for a premium look
//       doc
//         .roundedRect(25, 25, doc.page.width - 50, doc.page.height - 50, 8)
//         .lineWidth(1)
//         .strokeOpacity(0.5)
//         .stroke(colors.accent);

//       // Header with project name
//       doc
//         .fontSize(30)
//         .font("Helvetica-Bold")
//         .fillColor(colors.primary)
//         .text("CAMPUSCOMMUTE", 50, 45, { align: "center" });

//       // Subtitle with theme styling
//       doc
//         .fontSize(18)
//         .font("Helvetica-Bold")
//         .fillColor(colors.highlight)
//         .text("OFFICIAL BUS PASS", 50, 85, { align: "center" });

//       // Add a decorative horizontal line with shadow effect
//       doc.lineWidth(4);
//       doc.strokeOpacity(0.3);
//       doc
//         .moveTo(100, 114)
//         .lineTo(doc.page.width - 100, 114)
//         .stroke(colors.accent);

//       doc.lineWidth(2);
//       doc.strokeOpacity(1);
//       doc
//         .moveTo(100, 110)
//         .lineTo(doc.page.width - 100, 110)
//         .stroke(colors.secondary);

//       // Student details section with theme styling
//       const detailsTop = 140;
//       const labelWidth = 120;

//       // Add student photo placeholder with theme styling
//       doc
//         .roundedRect(50, detailsTop, 100, 120, 5)
//         .lineWidth(1)
//         .stroke(colors.secondary);
//       doc
//         .fontSize(10)
//         .fillColor(colors.accent)
//         .text("Student Photo", 50, detailsTop + 125, {
//           width: 100,
//           align: "center",
//         });

//       // Details with themed formatting
//       const detailsX = 180;

//       // Improved function to add field with label and value
//       function addField(label, value, y) {
//         doc
//           .font("Helvetica-Bold")
//           .fillColor(colors.accent)
//           .text(label, detailsX, y)
//           .font("Helvetica")
//           .fillColor(colors.text)
//           .text(value, detailsX + labelWidth, y);
//       }

//       // Background for details section
//       doc
//         .roundedRect(
//           detailsX - 10,
//           detailsTop - 10,
//           doc.page.width - detailsX - 40,
//           160,
//           5
//         )
//         .fillOpacity(0.1)
//         .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//       doc.fillOpacity(1);

//       // Add all fields including the stand
     
//       addField("Name:", busPassData.name, detailsTop);
//       addField("Enrollment No:", busPassData.enrollmentNo, detailsTop + 25);
//       addField("College:", busPassData.college, detailsTop + 50);
//       addField("Branch:", busPassData.branch, detailsTop + 75);
//       addField("Semester:", busPassData.semester, detailsTop + 100);
//       addField("Stand:", busPassData.stand, detailsTop + 125);

//       // Validity section with theme design
//       const validityTop = 300;

//       // Badge-style header for validity
//       doc
//         .roundedRect(doc.page.width / 2 - 70, validityTop, 140, 30, 15)
//         .fill(colors.highlight);
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(16)
//         .fillColor("#ffffff")
//         .text("VALIDITY PERIOD", doc.page.width / 2 - 250, validityTop + 8, {
//           align: "center",
//         });

//       // Create a themed validity box
//       doc
//         .roundedRect(50, validityTop + 40, doc.page.width - 100, 70, 10)
//         .fillAndStroke(colors.light, colors.secondary);

//       doc
//         .fontSize(14)
//         .fillColor(colors.accent)
//         .font("Helvetica-Bold")
//         .text("Issue Date:", 70, validityTop + 55)
//         .font("Helvetica")
//         .fillColor(colors.primary)
//         .text(formattedIssueDate, 70 + labelWidth, validityTop + 55);

//       doc
//         .font("Helvetica-Bold")
//         .fillColor(colors.accent)
//         .text("Expiry Date:", 70, validityTop + 85)
//         .font("Helvetica-Bold")
//         .fillColor(colors.danger)
//         .text(formattedExpiryDate, 70 + labelWidth, validityTop + 85);

//       // Terms and conditions section with theme styling
//       const termsTop = validityTop + 130;

//       // Create a decorative terms header
//       doc
//         .roundedRect(50, termsTop, doc.page.width - 100, 25, 5)
//         .fillOpacity(0.8)
//         .fill(colors.light);
//       doc.fillOpacity(1);

//       doc
//         .font("Helvetica-Bold")
//         .fontSize(14)
//         .fillColor(colors.accent)
//         .text("Terms & Conditions", 55, termsTop + 7);

//       // Add decorative bullet points
//       const terms = [
//         "This pass must be carried at all times while using campus transportation.",
//         "Pass is non-transferable and valid only for the named student.",
//         "Lost passes must be reported immediately.",
//         "The pass must be presented upon request by authorized personnel.",
//       ];

//       doc.font("Helvetica").fontSize(10).fillColor(colors.text);

//       terms.forEach((term, i) => {
//         const y = termsTop + 40 + i * 15;

//         // Draw custom bullet with theme color
//         doc.circle(60, y + 4, 2).fill(colors.secondary);

//         // Add term text
//         doc.text(term, 70, y, {
//           width: doc.page.width - 140,
//         });
//       });

//       // Footer with signature
//       const footerY = doc.page.height - 170;

//       // Draw CampusCommute logo with theme
//       doc
//         .roundedRect(50, footerY, 150, 60, 5)
//         .fillOpacity(0.1)
//         .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//       doc.fillOpacity(1);

//       doc
//         .fontSize(16)
//         .font("Helvetica-Bold")
//         .fillColor(colors.highlight)
//         .text("CampusCommute", 50, footerY + 20, {
//           width: 150,
//           align: "center",
//         });

//       // Create a random signature for Alok Patel
//       function drawSignature(x, y) {
//         // Start point
//         doc.moveTo(x, y + 20);

//         // Create random curves for signature effect
//         doc.bezierCurveTo(x + 10, y - 10, x + 20, y + 20, x + 40, y);

//         doc.bezierCurveTo(x + 60, y - 15, x + 70, y + 10, x + 90, y - 5);

//         doc.bezierCurveTo(x + 110, y - 15, x + 120, y + 5, x + 130, y);

//         // Draw the signature path
//         doc
//           .strokeColor(isYellowTheme ? "#8d6e63" : "#000080")
//           .lineWidth(1.5)
//           .stroke();

//         // Add printed name below signature
//         doc
//           .fontSize(10)
//           .fillColor(colors.accent)
//           .text("Alok Patel", x, y + 15, { width: 130, align: "center" });
//       }

//       // Signature box with theme
//       doc
//         .roundedRect(400, footerY, 150, 60, 5)
//         .fillOpacity(0.1)
//         .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//       doc.fillOpacity(1);

//       // Add the signature
//       drawSignature(410, footerY + 10);

//       // Add "Authorized Signature" text
//       doc
//         .fontSize(10)
//         .fillColor(colors.accent)
//         .text("Authorized Signature", 400, footerY + 45, {
//           width: 150,
//           align: "center",
//         });

//       // Add a subtle watermark with theme color
//       doc.rotate(45, { origin: [doc.page.width / 2, doc.page.height / 2] });
//       doc
//         .fontSize(70)
//         .fillOpacity(0.04)
//         .fillColor(colors.accent)
//         .text(
//           "CampusCommute",
//           doc.page.width / 2 - 250,
//           doc.page.height / 2 - 30,
//           {
//             align: "center",
//           }
//         );
//       doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
//       doc.fillOpacity(1);

//       // Add a decorative footer with theme color
//       doc
//         .rect(0, doc.page.height - 40, doc.page.width, 40)
//         .fillOpacity(0.8)
//         .fill(colors.footerBg);
//       doc.fillOpacity(1);

//       // Page numbers and generation info
//       doc
//         .fontSize(10)
//         .fillColor("#ffffff")
//         .text(
//           `Generated on: ${new Date().toLocaleString()}`,
//           50,
//           doc.page.height - 25
//         )
//         .text(
//           `www.campuscommute.com`,
//           doc.page.width / 2 - 70,
//           doc.page.height - 25
//         )
//         .text(`ID: ${busPassId}`, doc.page.width - 150, doc.page.height - 25);

//       // Add a theme indicator
//       const themeText = isYellowTheme ? "Faculty Pass" : "Student Pass";
//       doc
//         .fontSize(10)
//         .fillColor("#ffffff")
//         .text(themeText, doc.page.width - 150, doc.page.height - 60);

//       // Finalize the document
//       doc.end();

//       console.log(`PDF created at ${filePath}`);

//       // Wait for PDF creation to finish before responding
//       doc.on("finish", () => {
//         console.log(`PDF created at ${filePath}`);

//         // Check if file exists before attempting to download
//         if (!fs.existsSync(filePath)) {
//           return res.status(404).send("File not found.");
//         }

//         // Send the file for download
//         res.download(filePath, (err) => {
//           if (err) {
//             console.error("Error downloading file:", err);
//             return res.status(500).send("Error downloading file.");
//           }
//           fs.unlinkSync(filePath); // Clean up after sending
//           console.log("File deleted after sending.");
//         });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );

// module.exports = busPassRouter;

// =====================================================================================================



const pdfFolderPath = "D:\\CP\\pdf";
if (!fs.existsSync(pdfFolderPath)) {
  fs.mkdirSync(pdfFolderPath, { recursive: true }); // Create the folder if it doesn't exist
}

// Middleware to validate ObjectId format
const validateObjectId = (req, res, next) => {
  console.log("Incoming ID:", req.params.id);
  const busPassId = req.params.id.trim();
  if (!mongoose.Types.ObjectId.isValid(busPassId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
};

const axios = require("axios"); // Import axios for HTTP requests
// GET route to download bus pass as PDF
busPassRouter.get(
  "/download-bus-pass/:id",
  userAuth,
  validateObjectId,
  async (req, res) => {
    try {
      const enrollment = req.user.enrollment;
      const busPassId = req.params.id.trim();

      // Fetch bus pass and verify ownership
      const busPassData = await BusPass.findOne({ enrollmentNo: enrollment });
      // Fetch bus pass user
      const user = await User.findOne({ enrollment: enrollment });
      console.log("User Data:", user);
      console.log("Bus Pass Data:", busPassData);
      if (!busPassData) {
        return res
          .status(404)
          .json({ error: "Bus pass not found or unauthorized" });
      }

      // Calculate expiry date (150 days from application date)
      const issueDate = busPassData.createdAt || new Date();
      const expiryDate = new Date(issueDate);
      expiryDate.setDate(expiryDate.getDate() + 150);

      // Format dates
      const formattedIssueDate = issueDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const formattedExpiryDate = expiryDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      // Determine theme based on enrollment number length
      const isYellowTheme = busPassData.enrollmentNo.toString().length === 5;

      // Theme colors based on enrollment length
      const colors = isYellowTheme
        ? {
            primary: "#f57f17", // dark yellow
            secondary: "#ffb300", // amber
            accent: "#ff6f00", // amber dark
            light: "#fff8e1", // light yellow
            ultraLight: "#fffde7", // very light yellow
            text: "#3e2723", // dark brown
            highlight: "#ff8f00", // amber light
            danger: "#d84315", // orange dark
            background: "#fffde7", // yellowish white
            footerBg: "#f57f17", // dark yellow
          }
        : {
            primary: "#1565c0", // dark blue
            secondary: "#0288d1", // blue
            accent: "#01579b", // dark blue
            light: "#e3f2fd", // light blue
            ultraLight: "#e0f7fa", // very light blue
            text: "#263238", // dark blue-grey
            highlight: "#0277bd", // blue light
            danger: "#d32f2f", // red
            background: "#ffffff", // white
            footerBg: "#0277bd", // light blue
          };

      // Create PDF document with theme-based styling
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        info: {
          Title: "CampusCommute Bus Pass",
          Author: "CampusCommute System",
          Subject: `Bus Pass for ${busPassData.name}`,
        },
      });

      const filePath = path.join(pdfFolderPath, `bus-pass-${enrollment}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));

      // Create a theme-based gradient background
      const gradient = doc.linearGradient(
        0,
        0,
        doc.page.width,
        doc.page.height
      );
      gradient.stop(0, colors.ultraLight).stop(1, colors.background);
      doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);

      // Add a decorative border with rounded corners
      doc
        .roundedRect(15, 15, doc.page.width - 30, doc.page.height - 30, 10)
        .lineWidth(3)
        .strokeOpacity(0.8)
        .stroke(colors.primary);

      // Add a second inner border for a premium look
      doc
        .roundedRect(25, 25, doc.page.width - 50, doc.page.height - 50, 8)
        .lineWidth(1)
        .strokeOpacity(0.5)
        .stroke(colors.accent);

      // Header with project name
      doc
        .fontSize(30)
        .font("Helvetica-Bold")
        .fillColor(colors.primary)
        .text("CAMPUSCOMMUTE", 50, 45, { align: "center" });

      // Subtitle with theme styling
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor(colors.highlight)
        .text("OFFICIAL BUS PASS", 50, 85, { align: "center" });

      // Add a decorative horizontal line with shadow effect
      doc.lineWidth(4);
      doc.strokeOpacity(0.3);
      doc
        .moveTo(100, 114)
        .lineTo(doc.page.width - 100, 114)
        .stroke(colors.accent);

      doc.lineWidth(2);
      doc.strokeOpacity(1);
      doc
        .moveTo(100, 110)
        .lineTo(doc.page.width - 100, 110)
        .stroke(colors.secondary);

      // Student details section with theme styling
      const detailsTop = 140;
      const labelWidth = 120;

      // Add student photo with error handling for different storage formats
      const photoX = 50;
      const photoY = detailsTop;
      const photoWidth = 100;
      const photoHeight = 120;

      // Create a border for the photo
      doc
        .roundedRect(photoX, photoY, photoWidth, photoHeight, 5)
        .lineWidth(1)
        .stroke(colors.secondary);

      try {
        // PHOTO INTEGRATION - Handle different image storage formats
        if (user && user.profileUrl) {
          // Case: If photo is stored as a binary with base64 data
          if (
            typeof user.profileUrl === "object" &&
            user.profileUrl["$binary"] &&
            user.profileUrl["$binary"].base64
          ) {
            const base64Data = user.profileUrl["$binary"].base64;
            const imgBuffer = Buffer.from(base64Data, "base64");

            // Embed the image into the PDF
            doc.image(imgBuffer, photoX, photoY, {
              width: photoWidth,
              height: photoHeight,
              fit: [photoWidth, photoHeight],
              align: "center",
              valign: "center",
            });
          } else {
            throw new Error("Invalid profileUrl format");
          }
        } else {
          throw new Error("No valid profile URL available");
        }
      } catch (photoError) {
        console.error("Error adding photo:", photoError.message);

        // Display placeholder text in case of error
        doc
          .fontSize(10)
          .fillColor(colors.accent)
          .text("Student Photo", photoX, photoY + photoHeight / 2 - 5, {
            width: photoWidth,
            align: "center",
          });
      }

      // Details with themed formatting
      const detailsX = 180;

      // Improved function to add field with label and value
      function addField(label, value, y) {
        doc
          .font("Helvetica-Bold")
          .fillColor(colors.accent)
          .text(label, detailsX, y)
          .font("Helvetica")
          .fillColor(colors.text)
          .text(value, detailsX + labelWidth, y);
      }

      // Background for details section
      doc
        .roundedRect(
          detailsX - 10,
          detailsTop - 10,
          doc.page.width - detailsX - 40,
          160,
          5
        )
        .fillOpacity(0.1)
        .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
      doc.fillOpacity(1);

      // Add all fields including the stand
      addField("Name:", busPassData.name, detailsTop);
      addField("Enrollment No:", busPassData.enrollmentNo, detailsTop + 25);
      addField("College:", busPassData.college, detailsTop + 50);
      addField("Branch:", busPassData.branch, detailsTop + 75);
      addField("Semester:", busPassData.semester, detailsTop + 100);
      addField("Stand:", busPassData.stand, detailsTop + 125);

      // Validity section with theme design
      const validityTop = 300;

      // Badge-style header for validity
      doc
        .roundedRect(doc.page.width / 2 - 70, validityTop, 140, 30, 15)
        .fill(colors.highlight);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#ffffff")
        .text("VALIDITY PERIOD", doc.page.width / 2 - 250, validityTop + 8, {
          align: "center",
        });

      // Create a themed validity box
      doc
        .roundedRect(50, validityTop + 40, doc.page.width - 100, 70, 10)
        .fillAndStroke(colors.light, colors.secondary);

      doc
        .fontSize(14)
        .fillColor(colors.accent)
        .font("Helvetica-Bold")
        .text("Issue Date:", 70, validityTop + 55)
        .font("Helvetica")
        .fillColor(colors.primary)
        .text(formattedIssueDate, 70 + labelWidth, validityTop + 55);

      doc
        .font("Helvetica-Bold")
        .fillColor(colors.accent)
        .text("Expiry Date:", 70, validityTop + 85)
        .font("Helvetica-Bold")
        .fillColor(colors.danger)
        .text(formattedExpiryDate, 70 + labelWidth, validityTop + 85);

      // Terms and conditions section with theme styling
      const termsTop = validityTop + 130;

      // Create a decorative terms header
      doc
        .roundedRect(50, termsTop, doc.page.width - 100, 25, 5)
        .fillOpacity(0.8)
        .fill(colors.light);
      doc.fillOpacity(1);

      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .fillColor(colors.accent)
        .text("Terms & Conditions", 55, termsTop + 7);

      // Add decorative bullet points
      const terms = [
        "This pass must be carried at all times while using campus transportation.",
        "Pass is non-transferable and valid only for the named student.",
        "Lost passes must be reported immediately.",
        "The pass must be presented upon request by authorized personnel.",
      ];

      doc.font("Helvetica").fontSize(10).fillColor(colors.text);

      terms.forEach((term, i) => {
        const y = termsTop + 40 + i * 15;

        // Draw custom bullet with theme color
        doc.circle(60, y + 4, 2).fill(colors.secondary);

        // Add term text
        doc.text(term, 70, y, {
          width: doc.page.width - 140,
        });
      });

      // Footer with signature
      const footerY = doc.page.height - 170;

      // Draw CampusCommute logo with theme
      doc
        .roundedRect(50, footerY, 150, 60, 5)
        .fillOpacity(0.1)
        .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
      doc.fillOpacity(1);

      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fillColor(colors.highlight)
        .text("CampusCommute", 50, footerY + 20, {
          width: 150,
          align: "center",
        });

      // Create a random signature for Alok Patel
      function drawSignature(x, y) {
        // Start point
        doc.moveTo(x, y + 20);

        // Create random curves for signature effect
        doc.bezierCurveTo(x + 10, y - 10, x + 20, y + 20, x + 40, y);

        doc.bezierCurveTo(x + 60, y - 15, x + 70, y + 10, x + 90, y - 5);

        doc.bezierCurveTo(x + 110, y - 15, x + 120, y + 5, x + 130, y);

        // Draw the signature path
        doc
          .strokeColor(isYellowTheme ? "#8d6e63" : "#000080")
          .lineWidth(1.5)
          .stroke();

        // Add printed name below signature
        doc
          .fontSize(10)
          .fillColor(colors.accent)
          .text("Alok Patel", x, y + 15, { width: 130, align: "center" });
      }

      // Signature box with theme
      doc
        .roundedRect(400, footerY, 150, 60, 5)
        .fillOpacity(0.1)
        .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
      doc.fillOpacity(1);

      // Add the signature
      drawSignature(410, footerY + 10);

      // Add "Authorized Signature" text
      doc
        .fontSize(10)
        .fillColor(colors.accent)
        .text("Authorized Signature", 400, footerY + 45, {
          width: 150,
          align: "center",
        });

      // Add a subtle watermark with theme color
      doc.rotate(45, { origin: [doc.page.width / 2, doc.page.height / 2] });
      doc
        .fontSize(70)
        .fillOpacity(0.04)
        .fillColor(colors.accent)
        .text(
          "CampusCommute",
          doc.page.width / 2 - 250,
          doc.page.height / 2 - 30,
          {
            align: "center",
          }
        );
      doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
      doc.fillOpacity(1);

      // Add a decorative footer with theme color
      doc
        .rect(0, doc.page.height - 40, doc.page.width, 40)
        .fillOpacity(0.8)
        .fill(colors.footerBg);
      doc.fillOpacity(1);

      // Page numbers and generation info
      doc
        .fontSize(10)
        .fillColor("#ffffff")
        .text(
          `Generated on: ${new Date().toLocaleString()}`,
          50,
          doc.page.height - 25
        )
        .text(
          `www.campuscommute.com`,
          doc.page.width / 2 - 70,
          doc.page.height - 25
        )
        .text(`ID: ${busPassId}`, doc.page.width - 150, doc.page.height - 25);

      // Add a theme indicator
      const themeText = isYellowTheme ? "Faculty Pass" : "Student Pass";
      doc
        .fontSize(10)
        .fillColor("#ffffff")
        .text(themeText, doc.page.width - 150, doc.page.height - 60);

      // Finalize the document
      doc.end();

      console.log(`PDF created at ${filePath}`);

      // Wait for PDF creation to finish before responding
      doc.on("finish", () => {
        console.log(`PDF created at ${filePath}`);

        // Check if file exists before attempting to download
        if (!fs.existsSync(filePath)) {
          return res.status(404).send("File not found.");
        }

        // Send the file for download
        res.download(filePath, (err) => {
          if (err) {
            console.error("Error downloading file:", err);
            return res.status(500).send("Error downloading file.");
          }
          fs.unlinkSync(filePath); // Clean up after sending
          console.log("File deleted after sending.");
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = busPassRouter;
