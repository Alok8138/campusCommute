const express = require("express");
const busPassRouter = express.Router();
const BusPass = require("../model/busPass");
const mongoose = require("mongoose");
const SystemConfig = require("../model/SystemConfig");
const { userAuth } = require("../middleware/auth");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");






busPassRouter.post('/submit-form', userAuth, async (req, res) => {
  try {
      console.log(req.body);
     
      // Check if user already has an active pass
      const enrollmentNo = req.body.enrollmentNo;
      if (enrollmentNo) {
        const existingPass = await BusPass.findOne({ enrollmentNo: enrollmentNo });
       
        if (existingPass) {
          // Check if the pass is still active (not expired)
          let expiryDate;
          if (existingPass.expiryDate) {
            expiryDate = new Date(existingPass.expiryDate);
          } else {
            // Use admin-set end date if available
            const endDateStr = await SystemConfig.getConfig("passEndDate", null);
            if (endDateStr) {
              expiryDate = new Date(endDateStr);
            } else {
              // Fallback: use issue date + 180 days if no end date is configured
              const issueDate = existingPass.issueDate || existingPass.createdAt || new Date();
              expiryDate = new Date(issueDate);
              expiryDate.setDate(expiryDate.getDate() + 180);
            }
          }
         
          const now = new Date();
          const isActive = now <= expiryDate;
         
          if (isActive) {
            const formattedExpiryDate = expiryDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return res.status(409).json({
              message: `You already have an active bus pass. It expires on ${formattedExpiryDate}. Please wait until it expires to apply for a new one.`
            });
          }
        }
      }
     
      // Create bus pass application (without payment info - will be added after successful payment)
      // Set issue date to the date when form is submitted (or the date from form if provided)
      const issueDate = req.body.date ? new Date(req.body.date) : new Date();
      
      const applicationData = {
        userId: req.user._id,
        enrollmentNo: req.body.enrollmentNo,
        name: req.body.name,
        college: req.body.college,
        branch: req.body.branch,
        semester: req.body.semester,
        stand: req.body.stand,
        city: req.body.city,
        // Additional fields from form
        regNo: req.body.regNo,
        bloodGroup: req.body.bloodGroup,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        parentPhone: req.body.parentPhone,
        note: req.body.note,
        feeAmount: req.body.feeAmount,
        date: issueDate,
        shift: req.body.shift,
        issueDate: issueDate, // Set issue date when form is submitted
        paymentRef: null, // Will be populated after payment
      };

      const newApplication = new BusPass(applicationData);
      await newApplication.save();

      res.status(201).json({ 
        message: "Form submitted successfully! Please complete payment.",
        busPassId: newApplication._id
      });
  } catch (error) {
      console.error('Error:', error);


      if (error.name === 'ValidationError') { // Handle validation errors
          return res.status(400).json({ message: error.message });
      }


      res.status(500).json({ message: "Error submitting form." });
  }
});








// Folder for temporary PDFs
const pdfFolderPath = "D:\\CP\\pdf";
if (!fs.existsSync(pdfFolderPath)) {
  fs.mkdirSync(pdfFolderPath, { recursive: true });
}


busPassRouter.get("/download-bus-pass", userAuth, async (req, res) => {
  try {
    const enrollment = req.user.enrollment;
    const profilePhotoBuffer = req.user.profileUrl; // Get Buffer from userAuth


    const busPassData = await BusPass.findOne({ enrollmentNo: enrollment });
    if (!busPassData) {
      return res
        .status(404)
        .json({ error: "Bus pass not found or unauthorized" });
    }


    // Dates - Use issueDate and expiryDate from busPassData if available, otherwise calculate
    let issueDate;
    let expiryDate;
    if (busPassData.issueDate) {
      issueDate = new Date(busPassData.issueDate);
    } else {
      issueDate = busPassData.createdAt || new Date();
    }
   
    if (busPassData.expiryDate) {
      expiryDate = new Date(busPassData.expiryDate);
    } else {
      // Use admin-set end date if available
      const endDateStr = await SystemConfig.getConfig("passEndDate", null);
      if (endDateStr) {
        expiryDate = new Date(endDateStr);
      } else {
        // Fallback: use issue date + 180 days if no end date is configured
        expiryDate = new Date(issueDate);
        expiryDate.setDate(expiryDate.getDate() + 180);
      }
    }


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


    // Theme
    const isYellowTheme = busPassData.enrollmentNo.toString().length === 5;
    const colors = isYellowTheme
      ? {
          primary: "#f57f17",
          secondary: "#ffb300",
          accent: "#ff6f00",
          light: "#fff8e1",
          ultraLight: "#fffde7",
          text: "#3e2723",
          highlight: "#ff8f00",
          danger: "#d84315",
          background: "#fffde7",
          footerBg: "#f57f17",
        }
      : {
          primary: "#1565c0",
          secondary: "#0288d1",
          accent: "#01579b",
          light: "#e3f2fd",
          ultraLight: "#e0f7fa",
          text: "#263238",
          highlight: "#0277bd",
          danger: "#d32f2f",
          background: "#ffffff",
          footerBg: "#0277bd",
        };


    // PDF
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
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);


    // --- Background ---
    doc.save();
    const gradient = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
    gradient.stop(0, colors.ultraLight).stop(1, colors.background);
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);
    doc.restore();


    // --- Borders ---
    doc.save();
    doc
      .roundedRect(15, 15, doc.page.width - 30, doc.page.height - 30, 10)
      .lineWidth(3)
      .strokeOpacity(0.8)
      .stroke(colors.primary);
    doc.restore();


    doc.save();
    doc
      .roundedRect(25, 25, doc.page.width - 50, doc.page.height - 50, 8)
      .lineWidth(1)
      .strokeOpacity(0.5)
      .stroke(colors.accent);
    doc.restore();


    // --- Header ---
    doc
      .fontSize(30)
      .font("Helvetica-Bold")
      .fillColor(colors.primary)
      .text("CAMPUSCOMMUTE", 50, 45, { align: "center" });
    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .fillColor(colors.highlight)
      .text("OFFICIAL BUS PASS", 50, 85, { align: "center" });


    // --- Decorative Line ---
    doc.save();
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
    doc.restore();


    // --- Student Details ---
    const detailsTop = 140,
      labelWidth = 120,
      detailsX = 180;


    // --- Profile Photo ---
    doc.save();
    doc
      .roundedRect(50, detailsTop, 100, 120, 5)
      .lineWidth(1)
      .stroke(colors.secondary);
    // Try to embed the image from buffer (handle Mongoose Binary and Buffer)
    try {
      let imgBuffer = null;
      if (profilePhotoBuffer) {
        // If Mongoose returns a Binary object, it may have a `.buffer` property
        if (profilePhotoBuffer.buffer && !(Buffer.isBuffer(profilePhotoBuffer))) {
          imgBuffer = Buffer.from(profilePhotoBuffer.buffer);
        } else if (Buffer.isBuffer(profilePhotoBuffer)) {
          imgBuffer = profilePhotoBuffer;
        } else {
          // fallback: try to create a buffer from whatever was stored
          imgBuffer = Buffer.from(profilePhotoBuffer);
        }
      }

      if (imgBuffer && imgBuffer.length > 0) {
        doc.image(imgBuffer, 50, detailsTop, {
          width: 100,
          height: 120,
          fit: [100, 120],
          align: "center",
          valign: "center",
        });
      } else {
        doc
          .fontSize(10)
          .fillColor(colors.accent)
          .text("No Photo", 50, detailsTop + 50, { width: 100, align: "center" });
      }
    } catch (err) {
      console.error("Error embedding profile photo:", err);
      doc
        .fontSize(10)
        .fillColor(colors.accent)
        .text("Photo Not Found", 50, detailsTop + 50, {
          width: 100,
          align: "center",
        });
    }
    doc.restore();


    // Details background
    doc.save();
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
    doc.restore();


    // Add fields
    function addField(label, value, y) {
      // Handle empty/undefined values
      const displayValue = value || "N/A";
      doc
        .font("Helvetica-Bold")
        .fillColor(colors.accent)
        .text(label, detailsX, y)
        .font("Helvetica")
        .fillColor(colors.text)
        .text(displayValue, detailsX + labelWidth, y);
    }
    addField("Name:", busPassData.name || "N/A", detailsTop);
    addField("Enro. No:", busPassData.enrollmentNo || "N/A", detailsTop + 25);
    addField("College:", busPassData.college || "N/A", detailsTop + 50);
    addField("Branch:", busPassData.branch || "N/A", detailsTop + 75);
    addField("Semester:", busPassData.semester || "N/A", detailsTop + 100);
    addField("Stand:", busPassData.stand || "N/A", detailsTop + 125);


    // --- Validity Section ---
    const validityTop = 300;
    doc.save();
    doc
      .roundedRect(doc.page.width / 2 - 70, validityTop, 140, 30, 15)
      .fill(colors.highlight);
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#fff")
      .text("VALIDITY PERIOD", doc.page.width / 2 - 250, validityTop + 8, {
        align: "center",
      });
    doc.restore();


    doc.save();
    doc
      .roundedRect(50, validityTop + 40, doc.page.width - 100, 70, 10)
      .fillAndStroke(colors.light, colors.secondary);
    doc.restore();


    doc
      .fontSize(14)
      .fillColor(colors.accent)
      .font("Helvetica-Bold")
      .text("Issue Date:", 70, validityTop + 55)
      .font("Helvetica")
      .fillColor(colors.primary)
      .text(formattedIssueDate, 70 + labelWidth, validityTop + 55)
      .font("Helvetica-Bold")
      .fillColor(colors.accent)
      .text("Expiry Date:", 70, validityTop + 85)
      .font("Helvetica-Bold")
      .fillColor(colors.danger)
      .text(formattedExpiryDate, 70 + labelWidth, validityTop + 85);


    // --- Terms & Conditions ---
    const termsTop = validityTop + 130;
    doc.save();
    doc
      .roundedRect(50, termsTop, doc.page.width - 100, 25, 5)
      .fillOpacity(0.8)
      .fill(colors.light);
    doc.restore();


    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor(colors.accent)
      .text("Terms & Conditions", 55, termsTop + 7);


    const terms = [
      "This pass must be carried at all times while using campus transportation.",
      "Pass is non-transferable and valid only for the named student.",
      "Lost passes must be reported immediately.",
      "The pass must be presented upon request by authorized personnel.",
    ];
    doc.font("Helvetica").fontSize(10).fillColor(colors.text);
    terms.forEach((term, i) => {
      const y = termsTop + 40 + i * 15;
      doc.save();
      doc.circle(60, y + 4, 2).fill(colors.secondary);
      doc.restore();
      doc.text(term, 70, y, { width: doc.page.width - 140 });
    });


    // --- Footer with signature ---
    const footerY = doc.page.height - 170;


    // Logo box
    doc.save();
    doc
      .roundedRect(50, footerY, 150, 60, 5)
      .fillOpacity(0.1)
      .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
    doc.restore();
    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor(colors.highlight)
      .text("CampusCommute", 50, footerY + 20, { width: 150, align: "center" });


    // Signature box
    doc.save();
    doc
      .roundedRect(400, footerY, 150, 60, 5)
      .fillOpacity(0.1)
      .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
    doc.restore();


    // Draw signature
    function drawSignature(x, y) {
      doc.save();
      doc.moveTo(x, y + 20);
      doc.bezierCurveTo(x + 10, y - 10, x + 20, y + 20, x + 40, y);
      doc.bezierCurveTo(x + 60, y - 15, x + 70, y + 10, x + 90, y - 5);
      doc.bezierCurveTo(x + 110, y - 15, x + 120, y + 5, x + 130, y);
      doc
        .strokeColor(isYellowTheme ? "#8d6e63" : "#000080")
        .lineWidth(1.5)
        .stroke();
      doc
        .fontSize(10)
        .fillColor(colors.accent)
        .text("campusCommute", x, y + 15, { width: 130, align: "center" });
      doc.restore();
    }
    drawSignature(410, footerY + 10);


    doc
      .fontSize(10)
      .fillColor(colors.accent)
      .text("Authorized Signature", 400, footerY + 45, {
        width: 150,
        align: "center",
      });


    // --- Watermark ---
    doc.save();
    doc.rotate(45, { origin: [doc.page.width / 2, doc.page.height / 2] });
    doc
      .fontSize(70)
      .fillOpacity(0.04)
      .fillColor(colors.accent)
      .text(
        "CampusCommute",
        doc.page.width / 2 - 250,
        doc.page.height / 2 - 30,
        { align: "center" }
      );
    doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
    doc.fillOpacity(1);
    doc.restore();


    // --- Decorative footer ---
    doc.save();
    doc
      .rect(0, doc.page.height - 40, doc.page.width, 40)
      .fillOpacity(0.8)
      .fill(colors.footerBg);
    doc.restore();


    // --- Footer info ---
    doc
      .fontSize(10)
      .fillColor("#fff")
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
      .text(
        `Enrollment: ${busPassData.enrollmentNo}`,
        doc.page.width - 200,
        doc.page.height - 25
      );


    // Theme indicator
    const themeText = isYellowTheme ? "Faculty Pass" : "Student Pass";
    doc
      .fontSize(10)
      .fillColor("#fff")
      .text(themeText, doc.page.width - 150, doc.page.height - 60);


    // --- Finalize ---
    doc.end();


    // Send file after creation
    writeStream.on("finish", () => {
      if (!fs.existsSync(filePath)) {
        return res.status(404).send("File not found.");
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="bus-pass-${enrollment}.pdf"`
      );
      res.download(filePath, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          return res.status(500).send("Error downloading file.");
        }
        fs.unlinkSync(filePath); // Clean up after sending
      });
    });
    writeStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Error generating PDF");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


busPassRouter.get("/status", userAuth, async (req, res) => {
  try {
    const enrollment = req.user.enrollment;


    const existingPass = await BusPass.findOne({ enrollmentNo: enrollment });
    if (!existingPass) {
      return res.json({ hasPass: false });
    }


    const issueDate = existingPass.issueDate || existingPass.createdAt || new Date();
    // Use admin-set end date if available
    const endDateStr = await SystemConfig.getConfig("passEndDate", null);
    let expiryDate;
    if (endDateStr) {
      expiryDate = new Date(endDateStr);
    } else {
      // Fallback: use issue date + 180 days if no end date is configured
      expiryDate = new Date(issueDate);
      expiryDate.setDate(expiryDate.getDate() + 180);
    }


    const now = new Date();
    const isValid = now <= expiryDate;


    res.json({
      hasPass: true,
      isValid,
      expiryDate: expiryDate.toDateString(),
      details: existingPass,
    });
  } catch (err) {
    console.error("Error checking pass status:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// Route for /pass/status (matches frontend expectation)
busPassRouter.get("/pass/status", userAuth, async (req, res) => {
  try {
    const enrollment = req.user.enrollment;


    const existingPass = await BusPass.findOne({ enrollmentNo: enrollment });
    if (!existingPass) {
      return res.json({ active: false });
    }


    // Only active if payment is completed
    if (existingPass.paymentStatus !== 'completed') {
      return res.json({ 
        active: false,
        hasApplication: true,
        paymentStatus: existingPass.paymentStatus 
      });
    }

    // Use expiryDate from the pass if it exists, otherwise calculate it
    let expiryDate;
    if (existingPass.expiryDate) {
      expiryDate = new Date(existingPass.expiryDate);
    } else {
      const issueDate = existingPass.issueDate || existingPass.createdAt || new Date();
      // Use admin-set end date if available
      const endDateStr = await SystemConfig.getConfig("passEndDate", null);
      if (endDateStr) {
        expiryDate = new Date(endDateStr);
      } else {
        // Fallback: use issue date + 180 days if no end date is configured
        expiryDate = new Date(issueDate);
        expiryDate.setDate(expiryDate.getDate() + 180);
      }
    }


    const now = new Date();
    const isActive = now <= expiryDate;


    res.json({
      active: isActive,
      expiryDate: expiryDate.toISOString(),
      hasPass: true,
      paymentStatus: existingPass.paymentStatus,
      details: existingPass,
    });
  } catch (err) {
    console.error("Error checking pass status:", err);
    res.status(500).json({ message: "Server error" });
  }
});








module.exports = busPassRouter;








// dharmik
// const express = require("express");
// const busPassRouter = express.Router();
// const BusPass = require("../model/busPass");
// const mongoose = require("mongoose");
// const { userAuth } = require("../middleware/auth");
// const PDFDocument = require("pdfkit");
// const path = require("path");
// const fs = require("fs");



// busPassRouter.post('/submit-form', async (req, res) => {
//   try {
//       console.log(req.body);
//       const newApplication = new BusPass(req.body); // Create a new bus pass application
//       await newApplication.save(); // Save the application to the database

//       res.status(201).json({ message: "Form submitted successfully!" });
//   } catch (error) {
//       console.error('Error:', error);

//       if (error.name === 'ValidationError') { // Handle validation errors
//           return res.status(400).json({ message: error.message });
//       }

//       res.status(500).json({ message: "Error submitting form." });
//   }
// });




// // Folder for temporary PDFs
// const pdfFolderPath = "D:\\CP\\pdf";
// if (!fs.existsSync(pdfFolderPath)) {
//   fs.mkdirSync(pdfFolderPath, { recursive: true });
// }

// busPassRouter.get("/download-bus-pass", userAuth, async (req, res) => {
//   try {
//     const enrollment = req.user.enrollment;
//     const profilePhotoUrl = req.user.profilePhotoUrl; // Set by userAuth

//     const busPassData = await BusPass.findOne({ enrollmentNo: enrollment });
//     if (!busPassData) {
//       return res
//         .status(404)
//         .json({ error: "Bus pass not found or unauthorized" });
//     }

//     // Dates
//     const issueDate = busPassData.createdAt || new Date();
//     const expiryDate = new Date(issueDate);
//     expiryDate.setDate(expiryDate.getDate() + 150);

//     const formattedIssueDate = issueDate.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//     const formattedExpiryDate = expiryDate.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     // Theme
//     const isYellowTheme = busPassData.enrollmentNo.toString().length === 5;
//     const colors = isYellowTheme
//       ? {
//           primary: "#f57f17",
//           secondary: "#ffb300",
//           accent: "#ff6f00",
//           light: "#fff8e1",
//           ultraLight: "#fffde7",
//           text: "#3e2723",
//           highlight: "#ff8f00",
//           danger: "#d84315",
//           background: "#fffde7",
//           footerBg: "#f57f17",
//         }
//       : {
//           primary: "#1565c0",
//           secondary: "#0288d1",
//           accent: "#01579b",
//           light: "#e3f2fd",
//           ultraLight: "#e0f7fa",
//           text: "#263238",
//           highlight: "#0277bd",
//           danger: "#d32f2f",
//           background: "#ffffff",
//           footerBg: "#0277bd",
//         };

//     // PDF
//     const doc = new PDFDocument({
//       size: "A4",
//       margin: 50,
//       info: {
//         Title: "CampusCommute Bus Pass",
//         Author: "CampusCommute System",
//         Subject: `Bus Pass for ${busPassData.name}`,
//       },
//     });

//     const filePath = path.join(pdfFolderPath, `bus-pass-${enrollment}.pdf`);
//     const writeStream = fs.createWriteStream(filePath);
//     doc.pipe(writeStream);

//     // --- Background ---
//     doc.save();
//     const gradient = doc.linearGradient(0, 0, doc.page.width, doc.page.height);
//     gradient.stop(0, colors.ultraLight).stop(1, colors.background);
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill(gradient);
//     doc.restore();

//     // --- Borders ---
//     doc.save();
//     doc
//       .roundedRect(15, 15, doc.page.width - 30, doc.page.height - 30, 10)
//       .lineWidth(3)
//       .strokeOpacity(0.8)
//       .stroke(colors.primary);
//     doc.restore();

//     doc.save();
//     doc
//       .roundedRect(25, 25, doc.page.width - 50, doc.page.height - 50, 8)
//       .lineWidth(1)
//       .strokeOpacity(0.5)
//       .stroke(colors.accent);
//     doc.restore();

//     // --- Header ---
//     doc
//       .fontSize(30)
//       .font("Helvetica-Bold")
//       .fillColor(colors.primary)
//       .text("CAMPUSCOMMUTE", 50, 45, { align: "center" });
//     doc
//       .fontSize(18)
//       .font("Helvetica-Bold")
//       .fillColor(colors.highlight)
//       .text("OFFICIAL BUS PASS", 50, 85, { align: "center" });

//     // --- Decorative Line ---
//     doc.save();
//     doc.lineWidth(4);
//     doc.strokeOpacity(0.3);
//     doc
//       .moveTo(100, 114)
//       .lineTo(doc.page.width - 100, 114)
//       .stroke(colors.accent);
//     doc.lineWidth(2);
//     doc.strokeOpacity(1);
//     doc
//       .moveTo(100, 110)
//       .lineTo(doc.page.width - 100, 110)
//       .stroke(colors.secondary);
//     doc.restore();

//     // --- Student Details ---
//     const detailsTop = 140,
//       labelWidth = 120,
//       detailsX = 180;

//     // --- Profile Photo ---
//     doc.save();
//     doc
//       .roundedRect(50, detailsTop, 100, 120, 5)
//       .lineWidth(1)
//       .stroke(colors.secondary);
//     // Try to fetch and embed the image
//     if (profilePhotoUrl) {
//       try {
//         const imageResponse = await axios.get(profilePhotoUrl, {
//           responseType: "arraybuffer",
//         });
//         const imgBuffer = Buffer.from(imageResponse.data, "binary");
//         doc.image(imgBuffer, 50, detailsTop, {
//           width: 100,
//           height: 120,
//           fit: [100, 120],
//           align: "center",
//           valign: "center",
//         });
//       } catch (err) {
//         doc
//           .fontSize(10)
//           .fillColor(colors.accent)
//           .text("Photo Not Found", 50, detailsTop + 50, {
//             width: 100,
//             align: "center",
//           });
//       }
//     } else {
//       doc
//         .fontSize(10)
//         .fillColor(colors.accent)
//         .text("No Photo", 50, detailsTop + 50, { width: 100, align: "center" });
//     }
//     doc.restore();

//     // Details background
//     doc.save();
//     doc
//       .roundedRect(
//         detailsX - 10,
//         detailsTop - 10,
//         doc.page.width - detailsX - 40,
//         160,
//         5
//       )
//       .fillOpacity(0.1)
//       .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//     doc.restore();

//     // Add fields
//     function addField(label, value, y) {
//       doc
//         .font("Helvetica-Bold")
//         .fillColor(colors.accent)
//         .text(label, detailsX, y)
//         .font("Helvetica")
//         .fillColor(colors.text)
//         .text(value, detailsX + labelWidth, y);
//     }
//     addField("Name:", busPassData.name, detailsTop);
//     addField("Enrollment No:", busPassData.enrollmentNo, detailsTop + 25);
//     addField("College:", busPassData.college, detailsTop + 50);
//     addField("Branch:", busPassData.branch, detailsTop + 75);
//     addField("Semester:", busPassData.semester, detailsTop + 100);
//     addField("Stand:", busPassData.stand, detailsTop + 125);

//     // --- Validity Section ---
//     const validityTop = 300;
//     doc.save();
//     doc
//       .roundedRect(doc.page.width / 2 - 70, validityTop, 140, 30, 15)
//       .fill(colors.highlight);
//     doc
//       .font("Helvetica-Bold")
//       .fontSize(16)
//       .fillColor("#fff")
//       .text("VALIDITY PERIOD", doc.page.width / 2 - 250, validityTop + 8, {
//         align: "center",
//       });
//     doc.restore();

//     doc.save();
//     doc
//       .roundedRect(50, validityTop + 40, doc.page.width - 100, 70, 10)
//       .fillAndStroke(colors.light, colors.secondary);
//     doc.restore();

//     doc
//       .fontSize(14)
//       .fillColor(colors.accent)
//       .font("Helvetica-Bold")
//       .text("Issue Date:", 70, validityTop + 55)
//       .font("Helvetica")
//       .fillColor(colors.primary)
//       .text(formattedIssueDate, 70 + labelWidth, validityTop + 55)
//       .font("Helvetica-Bold")
//       .fillColor(colors.accent)
//       .text("Expiry Date:", 70, validityTop + 85)
//       .font("Helvetica-Bold")
//       .fillColor(colors.danger)
//       .text(formattedExpiryDate, 70 + labelWidth, validityTop + 85);

//     // --- Terms & Conditions ---
//     const termsTop = validityTop + 130;
//     doc.save();
//     doc
//       .roundedRect(50, termsTop, doc.page.width - 100, 25, 5)
//       .fillOpacity(0.8)
//       .fill(colors.light);
//     doc.restore();

//     doc
//       .font("Helvetica-Bold")
//       .fontSize(14)
//       .fillColor(colors.accent)
//       .text("Terms & Conditions", 55, termsTop + 7);

//     const terms = [
//       "This pass must be carried at all times while using campus transportation.",
//       "Pass is non-transferable and valid only for the named student.",
//       "Lost passes must be reported immediately.",
//       "The pass must be presented upon request by authorized personnel.",
//     ];
//     doc.font("Helvetica").fontSize(10).fillColor(colors.text);
//     terms.forEach((term, i) => {
//       const y = termsTop + 40 + i * 15;
//       doc.save();
//       doc.circle(60, y + 4, 2).fill(colors.secondary);
//       doc.restore();
//       doc.text(term, 70, y, { width: doc.page.width - 140 });
//     });

//     // --- Footer with signature ---
//     const footerY = doc.page.height - 170;

//     // Logo box
//     doc.save();
//     doc
//       .roundedRect(50, footerY, 150, 60, 5)
//       .fillOpacity(0.1)
//       .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//     doc.restore();
//     doc
//       .fontSize(16)
//       .font("Helvetica-Bold")
//       .fillColor(colors.highlight)
//       .text("CampusCommute", 50, footerY + 20, { width: 150, align: "center" });

//     // Signature box
//     doc.save();
//     doc
//       .roundedRect(400, footerY, 150, 60, 5)
//       .fillOpacity(0.1)
//       .fill(isYellowTheme ? "#fff9c4" : "#bbdefb");
//     doc.restore();

//     // Draw signature
//     function drawSignature(x, y) {
//       doc.save();
//       doc.moveTo(x, y + 20);
//       doc.bezierCurveTo(x + 10, y - 10, x + 20, y + 20, x + 40, y);
//       doc.bezierCurveTo(x + 60, y - 15, x + 70, y + 10, x + 90, y - 5);
//       doc.bezierCurveTo(x + 110, y - 15, x + 120, y + 5, x + 130, y);
//       doc
//         .strokeColor(isYellowTheme ? "#8d6e63" : "#000080")
//         .lineWidth(1.5)
//         .stroke();
//       doc
//         .fontSize(10)
//         .fillColor(colors.accent)
//         .text("Alok Patel", x, y + 15, { width: 130, align: "center" });
//       doc.restore();
//     }
//     drawSignature(410, footerY + 10);

//     doc
//       .fontSize(10)
//       .fillColor(colors.accent)
//       .text("Authorized Signature", 400, footerY + 45, {
//         width: 150,
//         align: "center",
//       });

//     // --- Watermark ---
//     doc.save();
//     doc.rotate(45, { origin: [doc.page.width / 2, doc.page.height / 2] });
//     doc
//       .fontSize(70)
//       .fillOpacity(0.04)
//       .fillColor(colors.accent)
//       .text(
//         "CampusCommute",
//         doc.page.width / 2 - 250,
//         doc.page.height / 2 - 30,
//         { align: "center" }
//       );
//     doc.rotate(-45, { origin: [doc.page.width / 2, doc.page.height / 2] });
//     doc.fillOpacity(1);
//     doc.restore();

//     // --- Decorative footer ---
//     doc.save();
//     doc
//       .rect(0, doc.page.height - 40, doc.page.width, 40)
//       .fillOpacity(0.8)
//       .fill(colors.footerBg);
//     doc.restore();

//     // --- Footer info ---
//     doc
//       .fontSize(10)
//       .fillColor("#fff")
//       .text(
//         `Generated on: ${new Date().toLocaleString()}`,
//         50,
//         doc.page.height - 25
//       )
//       .text(
//         `www.campuscommute.com`,
//         doc.page.width / 2 - 70,
//         doc.page.height - 25
//       )
//       .text(
//         `Enrollment: ${busPassData.enrollmentNo}`,
//         doc.page.width - 200,
//         doc.page.height - 25
//       );

//     // Theme indicator
//     const themeText = isYellowTheme ? "Faculty Pass" : "Student Pass";
//     doc
//       .fontSize(10)
//       .fillColor("#fff")
//       .text(themeText, doc.page.width - 150, doc.page.height - 60);

//     // --- Finalize ---
//     doc.end();

//     // Send file after creation
//     writeStream.on("finish", () => {
//       if (!fs.existsSync(filePath)) {
//         return res.status(404).send("File not found.");
//       }
//       res.setHeader("Content-Type", "application/pdf");
//       res.setHeader(
//         "Content-Disposition",
//         `attachment; filename="bus-pass-${enrollment}.pdf"`
//       );
//       res.download(filePath, (err) => {
//         if (err) {
//           console.error("Error downloading file:", err);
//           return res.status(500).send("Error downloading file.");
//         }
//         fs.unlinkSync(filePath); // Clean up after sending
//       });
//     });
//     writeStream.on("error", (err) => {
//       console.error(err);
//       res.status(500).send("Error generating PDF");
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// module.exports = busPassRouter;


