// // Using Mui/material

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
// import { TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

// const ManageStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/admin/getstudents");
//         setStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleOpen = (student) => {
//     setSelectedStudent(student);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <Card style={{ margin: "20px", padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           Manage Students
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow style={{ backgroundColor: "#1976d2" }}>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Sr No</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Enrollment No</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>College</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Branch</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
//                 <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student) => (
//                 <TableRow key={student._id}>
//                   <TableCell>{student.srNo}</TableCell>
//                   <TableCell>{student.name}</TableCell>
//                   <TableCell>{student.enrollmentNo}</TableCell>
//                   <TableCell>{student.college}</TableCell>
//                   <TableCell>{student.branch}</TableCell>
//                   <TableCell>{student.phone}</TableCell>
//                   <TableCell>
//                     <Button variant="contained" color="primary" onClick={() => handleOpen(student)}>
//                       More Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>

//       {/* Dialog for More Details */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>Student Details</DialogTitle>
//         <DialogContent>
//           {selectedStudent && (
//             <TableContainer component={Paper}>
//               <Table>
//               <TableBody>
//                   {Object.entries(selectedStudent)
//                     .filter(([key]) => !["_id", "createdAt", "updatedAt", "__v"].includes(key))
//                     .map(([key, value]) => (
//                       <TableRow key={key}>
//                         <TableCell style={{ fontWeight: "bold" }}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</TableCell>
//                         <TableCell>{value}</TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
     
//               </Table>
//             </TableContainer>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default ManageStudents;




// // //Tailwind

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const ManageStudents = () => {
// //   const [students, setStudents] = useState([]);
// //   const [selectedStudent, setSelectedStudent] = useState(null);

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:3000/admin/getstudents");
// //         setStudents(response.data);
// //       } catch (error) {
// //         console.error("Error fetching students:", error);
// //       }
// //     };

// //     fetchStudents();
// //   }, []);

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h2 className="text-2xl font-semibold mb-4">Manage Students</h2>
// //       <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
// //         <table className="w-full border-collapse border border-gray-300">
// //           <thead className="bg-blue-600 text-white">
// //             <tr>
// //               <th className="p-3 border">Sr No</th>
// //               <th className="p-3 border">Name</th>
// //               <th className="p-3 border">Enrollment No</th>
// //               <th className="p-3 border">College</th>
// //               <th className="p-3 border">Branch</th>
// //               <th className="p-3 border">Phone</th>
// //               <th className="p-3 border">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {students.map((student) => (
// //               <tr key={student._id} className="text-center border-b">
// //                 <td className="p-3 border">{student.srNo}</td>
// //                 <td className="p-3 border">{student.name}</td>
// //                 <td className="p-3 border">{student.enrollmentNo}</td>
// //                 <td className="p-3 border">{student.college}</td>
// //                 <td className="p-3 border">{student.branch}</td>
// //                 <td className="p-3 border">{student.phone}</td>
// //                 <td className="p-3 border">
// //                   <button
// //                     onClick={() => setSelectedStudent(student)}
// //                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
// //                   >
// //                     More Details
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {selectedStudent && (
// //         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
// //             <h3 className="text-xl font-semibold mb-4">Student Details</h3>
// //             <div className="grid grid-cols-2 gap-4">
// //               {Object.entries(selectedStudent)
// //                 .filter(([key]) => !["_id", "createdAt", "updatedAt", "__v"].includes(key))
// //                 .map(([key, value]) => (
// //                   <div key={key} className="flex justify-between bg-gray-100 p-2 rounded">
// //                     <span className="font-semibold">{key.replace(/([A-Z])/g, " $1").toUpperCase()}:</span>
// //                     <span>{value}</span>
// //                   </div>
// //                 ))}
// //             </div>
// //             <button
// //               onClick={() => setSelectedStudent(null)}
// //               className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ManageStudents;





import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close"; // ✅ Import this
import { IconButton } from "@mui/material";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
} from "@mui/material";

const formatLabel = (label) =>
  label.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/getstudents"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleOpen = (student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(null);
  };

  const exportToExcel = () => {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
    };

    const cleanedData = students.map(
      ({ _id, __v, createdAt, updatedAt, ...rest }) => ({
        ...rest,
        createdAt: formatDate(createdAt),
        updatedAt: formatDate(updatedAt),
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "StudentData.xlsx");
  };

  return (
    <Card sx={{ m: 3, p: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight="bold">
            Manage Students
          </Typography>
          <Button variant="contained" color="success" onClick={exportToExcel}>
            Download Excel
          </Button>
        </Grid>

        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                {[
                  "Sr No",
                  "Name",
                  "Enrollment No",
                  "College",
                  "Branch",
                  "Phone",
                  "Actions",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.enrollmentNo}</TableCell>
                  <TableCell>{student.college}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpen(student)}
                    >
                      More Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      {/* Student Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Student Details
          <IconButton onClick={handleClose} sx={{ color: "grey.700" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedStudent && (
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {Object.entries(selectedStudent)
                    .filter(
                      ([key]) =>
                        !["_id", "createdAt", "updatedAt", "__v"].includes(key)
                    )
                    .map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ fontWeight: "bold", width: "40%" }}>
                          {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                        </TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ManageStudents;

