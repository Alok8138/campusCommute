// import React, { useState } from "react";

// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData((prevData) => ({ ...prevData, feeAmount: fee }));
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};

//     if (
//       !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
//     ) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!formData.phone.match(/^\d{10}$/)) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }
//     if (!formData.parentPhone.match(/^\d{10}$/)) {
//       newErrors.parentPhone = "Parent's phone number must be 10 digits";
//     }

//     Object.keys(formData).forEach((key) => {
//       if (!formData[key] && key !== "note") {
//         newErrors[key] = "This field is required";
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Show confirmation alert
//     const confirmSubmission = window.confirm(
//       "Are you sure you want to submit the form?"
//     );
//     if (!confirmSubmission) return;
//     console.log(formData);
//     try {
//       const response = await fetch("http://localhost:3000/api/submit-form", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Form submitted successfully! Redirecting to payment...");
//         window.location.href = "/payment"; // Redirect to payment page
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       alert("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-lg">
//         Bus Pass Registration Form
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
//           <div className="grid grid-cols-3 gap-4">
//             {[
//               { label: "Sr. No", name: "srNo" },
//               { label: "Date", name: "date", type: "date" },
//               { label: "Reg No", name: "regNo" },
//             ].map(({ label, name, type }) => (
//               <div key={name}>
//                 <label className="block font-medium mb-1">{label}</label>
//                 <input
//                   type={type || "text"}
//                   name={name}
//                   className="input-field w-full p-2 border rounded-lg"
//                   onChange={handleChange}
//                 />
//                 {errors[name] && (
//                   <p className="text-red-500 text-sm">{errors[name]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold mb-3">
//             Personal & Academic Details
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             {[
//               "name",
//               "email",
//               "phone",
//               "enrollmentNo",
//               "college",
//               "branch",
//               "semester",
//               "parentPhone",
//               "bloodGroup",
//             ].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium mb-1">
//                   {field.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   className="input-field w-full p-2 border rounded-lg"
//                   onChange={handleChange}
//                 />
//                 {errors[field] && (
//                   <p className="text-red-500 text-sm">{errors[field]}</p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <label className="block font-medium mb-1">Address</label>
//             <textarea
//               name="address"
//               className="input-field w-full p-2 border rounded-lg"
//               onChange={handleChange}
//             ></textarea>
//             {errors.address && (
//               <p className="text-red-500 text-sm">{errors.address}</p>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium mb-1">Shift</label>
//             <select
//               name="shift"
//               className="input-field w-full p-2 border rounded-lg"
//               onChange={handleChange}
//             >
//               <option value="1st Shift">1st Shift</option>
//               <option value="2nd Shift">2nd Shift</option>
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">City</label>
//             <select
//               name="city"
//               className="input-field w-full p-2 border rounded-lg"
//               onChange={handleChange}
//             >
//               <option value="">Select City</option>
//               <option value="Mehsana">Mehsana</option>
//               <option value="Ahmedabad">Ahmedabad</option>
//               <option value="Visnagar">Visnagar</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Stand</label>
//           <input
//             type="text"
//             name="stand"
//             className="input-field w-full p-2 border rounded-lg"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Additional Note</label>
//           <textarea
//             name="note"
//             className="input-field w-full p-2 border rounded-lg"
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <h3 className="text-lg font-semibold text-center bg-blue-100 py-3 rounded-lg">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
//           >
//             Save as Draft
//           </button>
//           <button
//             type="submit"
//             className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700"
//           >
//             Confirm & Fees Payment
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyPass;
















// import React, { useState } from "react";
// import axios from "axios";

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData({ ...formData, feeAmount: fee });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/submit-form",
//         formData
//       );
//       alert(response.data.message);
//       setFormData({
//         srNo: "",
//         date: "",
//         regNo: "",
//         name: "",
//         enrollmentNo: "",
//         college: "",
//         branch: "",
//         semester: "",
//         shift: "1st Shift",
//         address: "",
//         phone: "",
//         parentPhone: "",
//         email: "",
//         bloodGroup: "",
//         city: "",
//         stand: "",
//         note: "",
//         feeAmount: 0,
//       });
//       setErrors({});
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data.message) {
//         alert(error.response.data.message);
//       } else {
//         alert("Error submitting form");
//       }
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg">
//         Bus Pass Registration Form
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         {/* Basic Details */}
//         <div className="grid grid-cols-3 gap-4">
//           <div>
//             <label className="block font-medium mb-1">Sr. No</label>
//             <input
//               type="text"
//               name="srNo"
//               value={formData.srNo}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Date</label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Reg No</label>
//             <input
//               type="text"
//               name="regNo"
//               value={formData.regNo}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//         </div>

//         {/* Personal & Academic Details */}
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             "name",
//             "email",
//             "phone",
//             "parentPhone",
//             "enrollmentNo",
//             "college",
//             "branch",
//             "semester",
//           ].map((field) => (
//             <div key={field}>
//               <label className="block font-medium mb-1">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="input-field w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>
//           ))}
//           <div>
//             <label className="block font-medium mb-1">Blood Group</label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">City</label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//             >
//               <option value="">Select City</option>
//               {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Stand</label>
//             <input
//               type="text"
//               name="stand"
//               value={formData.stand}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium mb-1">Note</label>
//             <textarea
//               name="note"
//               value={formData.note}
//               onChange={handleChange}
//               className="input-field w-full p-2 border rounded-lg"
//             ></textarea>
//           </div>
//         </div>

//         {/* Fee Amount */}
//         <h3 className="text-lg font-semibold text-center bg-blue-100 py-3 rounded-lg">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-700 w-full"
//         >
//           Submit Form
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;






























// import React, { useState } from "react";

// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData({ ...formData, feeAmount: fee });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg mb-6">
//         Bus Pass Registration Form
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Sr. No
//             </label>
//             <input
//               type="text"
//               name="srNo"
//               value={formData.srNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Sr. No"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Reg No
//             </label>
//             <input
//               type="text"
//               name="regNo"
//               value={formData.regNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Reg No"
//               required
//             />
//           </div>
//         </div>

//         {/* Personal & Academic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             "name",
//             "email",
//             "phone",
//             "parentPhone",
//             "enrollmentNo",
//             "college",
//             "branch",
//             "semester",
//           ].map((field) => (
//             <div key={field}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
//                 required
//               />
//             </div>
//           ))}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Blood Group
//             </label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//         </div>

//         {/* Address and City */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               City
//             </label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select City</option>
//               {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stand
//             </label>
//             <input
//               type="text"
//               name="stand"
//               value={formData.stand}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Stand Name"
//             />
//           </div>
//         </div>

//         {/* Fee Amount */}
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[200ms]"
//         >
//           Submit Form
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ApplyPass;


























//working fine 1

// import React, { useState } from "react";
// import axios from "axios";
// import PassForm from "./PassForm";
// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "uma hostel",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [showApply, setShowApply] = useState(true);

//   const [showPayment, setShowPayment] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData({ ...formData, feeAmount: fee });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowApply(false);
//     setShowPayment(true);
//     // Reset messages
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post(
//         "http://localhost:3000/submit-form",
//         formData
//       );

//       // Handle successful response
//       if (response.status === 201) {
//         setSuccessMessage(response.data.message); // Display success message
//         // Reset the form after successful submission
//         setFormData({
//           srNo: "",
//           date: "",
//           regNo: "",
//           name: "",
//           enrollmentNo: "",
//           college: "",
//           branch: "",
//           semester: "",
//           shift: "1st Shift",
//           address: "",
//           phone: "",
//           parentPhone: "",
//           email: "",
//           bloodGroup: "",
//           city: "",
//           stand: "",
//           note: "",
//           feeAmount: 0,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       // Handle error response
//       if (error.response && error.response.data.message) {
//         setErrorMessage(error.response.data.message); // Display error message from server
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again."); // Fallback error message
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg mb-6">
//         Bus Pass Registration Form
//       </h2>

//       {/* Display success or error messages */}
//       {successMessage && (
//         <div className="text-green-600 mb-4">{successMessage}</div>
//       )}
//       {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Sr. No
//             </label>
//             <input
//               type="text"
//               name="srNo"
//               value={formData.srNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Sr. No"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Reg No
//             </label>
//             <input
//               type="text"
//               name="regNo"
//               value={formData.regNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Reg No"
//               required
//             />
//           </div>
//         </div>

//         {/* Personal & Academic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             "name",
//             "email",
//             "phone",
//             "parentPhone",
//             "enrollmentNo",
//             "college",
//             "branch",
//             "semester",
//           ].map((field) => (
//             <div key={field}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
//                 required
//               />
//             </div>
//           ))}

//           {/* Blood Group Dropdown */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Blood Group
//             </label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//         </div>

//         {/* City and Stand */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               City
//             </label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select City</option>
//               {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Stand Input */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stand
//             </label>
//             <input
//               type="text"
//               name="stand"
//               value={formData.stand}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Stand Name"
//             />
//           </div>
//         </div>

//         {/* Fee Amount Display */}
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>

//         {/* Submit Button */}
//         ( {showApply && <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[200ms]"

//         //             className="btn btn-primary"
//         >
//           {/* <PassForm /> */}
//           {console.log(formData)}
//           Apply For pass
//         </button>})
//         ({ showPayment && <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[100ms]"
//         >
//           <PassForm />
//           {/* apply */}
//         </button>})
//       </form>
//     </div>
//   );
// };

// export default ApplyPass;


//working fine end 1







// ============================================================================================================





























//working fine 2 with dynamic payment

// import React, { useState } from "react";
// import axios from "axios";
// import PassForm from "./PassForm";

// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "uma hostel",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPayment, setShowPayment] = useState(false); // State to show/hide PassForm
//   const [showApply, setShowApply] = useState(true); // State to show/hide PassForm
//   var list = [];
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData((prevFormData) => ({ ...prevFormData, feeAmount: fee })); //Update fee in state
//     }
//   };


//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setShowApply(false);
//       setShowPayment(true);
//       // Reset messages
//       setSuccessMessage("");
//       setErrorMessage("");
//       console.log(formData);
//       list = formData;
//       console.log(list["feeAmount"]);
//       console.log("list data:  ",list);
//       try {
//         // Make a POST request to the backend API
//         const response = await axios.post(
//           "http://localhost:3000/submit-form",
//           formData
//         );

//         // Handle successful response
//         if (response.status === 201) {
//           setSuccessMessage(response.data.message); // Display success message
//           // Reset the form after successful submission
//           setFormData({
//             srNo: "",
//             date: "",
//             regNo: "",
//             name: "",
//             enrollmentNo: "",
//             college: "",
//             branch: "",
//             semester: "",
//             shift: "1st Shift",
//             address: "",
//             phone: "",
//             parentPhone: "",
//             email: "",
//             bloodGroup: "",
//             city: "",
//             stand: "",
//             note: "",
//             feeAmount: 0,
//           });
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);

//         // Handle error response
//         if (error.response && error.response.data.message) {
//           setErrorMessage(error.response.data.message); // Display error message from server
//         } else {
//           setErrorMessage("An unexpected error occurred. Please try again."); // Fallback error message
//         }
//       }
//     };
//   const handleApplyClick = () => {
//     setShowPayment(true); // Show PassForm component when Apply button is clicked
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg mb-6">
//         Bus Pass Registration Form
//       </h2>
//       {/* Display success or error messages */}
//       {successMessage && (
//         <div className="text-green-600 mb-4">{successMessage}</div>
//       )}
//       {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}(
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Sr. No
//             </label>
//             <input
//               type="text"
//               name="srNo"
//               value={formData.srNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Sr. No"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Reg No
//             </label>
//             <input
//               type="text"
//               name="regNo"
//               value={formData.regNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Reg No"
//               required
//             />
//           </div>
//         </div>
//         {/* Personal & Academic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             "name",
//             "email",
//             "phone",
//             "parentPhone",
//             "enrollmentNo",
//             "college",
//             "branch",
//             "semester",
//           ].map((field) => (
//             <div key={field}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
//                 required
//               />
//             </div>
//           ))}

//           {/* Blood Group Dropdown */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Blood Group
//             </label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//         </div>
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>
//         )
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Form fields */}
//           {/* ... Other fields remain unchanged */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               City
//             </label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select City</option>
//               {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stand
//             </label>
//             <input
//               type="text"
//               name="stand"
//               value={formData.stand}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Stand Name"
//             />
//           </div>
//         </div>
//         {/* Fee Amount Display */}
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>
//         {/* Apply Button */}
//         {showApply && (
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[200ms]"
//           >
//             Apply
//           </button>
//         )}
//       </form>
//       // Render PassForm with props when showPayment is true
//       <div>
//         {showPayment && (
//           <PassForm
//             feeAmount={formData.feeAmount}
//             email={formData.email}
//             enrollment={formData.enrollmentNo}
//             name={formData.name}
//             mobile={formData.phone}
//             city={formData.city}
//             stand={formData.stand}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyPass;


































// import React, { useState } from "react";
// import axios from "axios";
// import PassForm from "./PassForm";

// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [showApply, setShowApply] = useState(true);
//   const [showPayment, setShowPayment] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData({ ...formData, feeAmount: fee });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowApply(false);
//     setShowPayment(true);
//     // Reset messages
//     setSuccessMessage("");
//     setErrorMessage("");

//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post(
//         "http://localhost:3000/submit-form",
//         formData
//       );

//       // Handle successful response
//       if (response.status === 201) {
//         setSuccessMessage(response.data.message); // Display success message
//         // Reset the form after successful submission
//         setFormData({
//           srNo: "",
//           date: "",
//           regNo: "",
//           name: "",
//           enrollmentNo: "",
//           college: "",
//           branch: "",
//           semester: "",
//           shift: "1st Shift",
//           address: "",
//           phone: "",
//           parentPhone: "",
//           email: "",
//           bloodGroup: "",
//           city: "",
//           stand: "",
//           note: "",
//           feeAmount: 0,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       // Handle error response
//       if (error.response && error.response.data.message) {
//         setErrorMessage(error.response.data.message); // Display error message from server
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again."); // Fallback error message
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg mb-6">
//         Bus Pass Registration Form
//       </h2>

//       {/* Display success or error messages */}
//       {successMessage && (
//         <div className="text-green-600 mb-4">{successMessage}</div>
//       )}
//       {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}

//       {showApply ? (
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Basic Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Sr. No
//               </label>
//               <input
//                 type="text"
//                 name="srNo"
//                 value={formData.srNo}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter Sr. No"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Date
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Reg No
//               </label>
//               <input
//                 type="text"
//                 name="regNo"
//                 value={formData.regNo}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter Reg No"
//                 required
//               />
//             </div>
//           </div>
//           {/* Personal & Academic Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               "name",
//               "email",
//               "phone",
//               "parentPhone",
//               "enrollmentNo",
//               "college",
//               "branch",
//               "semester",
//             ].map((field) => (
//               <div key={field}>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   {field.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
//                   required
//                 />
//               </div>
//             ))}

//             {/* Blood Group Dropdown */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Blood Group
//               </label>
//               <select
//                 name="bloodGroup"
//                 value={formData.bloodGroup}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select Blood Group</option>
//                 {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                   (group) => (
//                     <option key={group} value={group}>
//                       {group}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//           </div>

//           {/* Address, City, Stand, and Note */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter Address"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 City
//               </label>
//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">Select City</option>
//                 {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                   <option key={city} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Stand
//               </label>
//               <input
//                 type="text"
//                 name="stand"
//                 value={formData.stand}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter Stand Name"
//               />
//             </div>
//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Note
//               </label>
//               <input
//                 type="text"
//                 name="note"
//                 value={formData.note}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter Note"
//               />
//             </div>
//           </div>

//           {/* Fee Amount Display */}
//           <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//             Total Fee Amount: ₹{formData.feeAmount}
//           </h3>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[200ms]"
//           >
//             Apply
//           </button>
//         </form>
//       ) : (
//         <PassForm
//           feeAmount={formData.feeAmount}
//           email={formData.email}
//           enrollment={formData.enrollmentNo}
//           name={formData.name}
//           mobile={formData.phone}
//           city={formData.city}
//           stand={formData.stand}
//         />
//       )}
//     </div>
//   );
// };

// export default ApplyPass;





















// import React, { useState } from "react";
// import axios from "axios";
// import PassForm from "./PassForm";

// const ApplyPass = () => {
//   const [formData, setFormData] = useState({
//     srNo: "",
//     date: "",
//     regNo: "",
//     name: "",
//     enrollmentNo: "",
//     college: "",
//     branch: "",
//     semester: "",
//     shift: "1st Shift",
//     address: "uma hostel",
//     phone: "",
//     parentPhone: "",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });

//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [showPayment, setShowPayment] = useState(false); // State to show/hide PassForm
//   const [showApply, setShowApply] = useState(true); // State to show/hide PassForm
//   var list = [];
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData((prevFormData) => ({ ...prevFormData, feeAmount: fee })); //Update fee in state
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowApply(false);
//     setShowPayment(true);
//     // Reset messages
//     setSuccessMessage("");
//     setErrorMessage("");
//     console.log(formData);
//     list = formData;
//     console.log(list["feeAmount"]);
//     console.log("list data:  ", list);
//     try {
//       // Make a POST request to the backend API
//       const response = await axios.post(
//         "http://localhost:3000/submit-form",
//         formData
//       );

//       // Handle successful response
//       // if (response.status === 201) {
//       //   setSuccessMessage(response.data.message); // Display success message
//       //   // Reset the form after successful submission
//       //   setFormData({
//       //     srNo: "",
//       //     date: "",
//       //     regNo: "",
//       //     name: "",
//       //     enrollmentNo: "",
//       //     college: "",
//       //     branch: "",
//       //     semester: "",
//       //     shift: "1st Shift",
//       //     address: "",
//       //     phone: "",
//       //     parentPhone: "",
//       //     email: "",
//       //     bloodGroup: "",
//       //     city: "",
//       //     stand: "",
//       //     note: "",
//       //     feeAmount: 0,
//       //   });
//       // }
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       // Handle error response
//       if (error.response && error.response.data.message) {
//         setErrorMessage(error.response.data.message); // Display error message from server
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again."); // Fallback error message
//       }
//     }
//   };
//   const handleApplyClick = () => {
//     setShowPayment(true); // Show PassForm component when Apply button is clicked
//   };

//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
//       <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-lg mb-6">
//         Bus Pass Registration Form
//       </h2>
//       {/* Display success or error messages */}
//       {successMessage && (
//         <div className="text-green-600 mb-4">{successMessage}</div>
//       )}
//       {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}(
//       ({ showApply &&<form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Sr. No
//             </label>
//             <input
//               type="text"
//               name="srNo"
//               value={formData.srNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Sr. No"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Reg No
//             </label>
//             <input
//               type="text"
//               name="regNo"
//               value={formData.regNo}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Reg No"
//               required
//             />
//           </div>
//         </div>
//         {/* Personal & Academic Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {[
//             "name",
//             "email",
//             "phone",
//             "parentPhone",
//             "enrollmentNo",
//             "college",
//             "branch",
//             "semester",
//           ].map((field) => (
//             <div key={field}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 {field.replace(/([A-Z])/g, " $1")}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
//                 required
//               />
//             </div>
//           ))}

//           {/* Blood Group Dropdown */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Blood Group
//             </label>
//             <select
//               name="bloodGroup"
//               value={formData.bloodGroup}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select Blood Group</option>
//               {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                 (group) => (
//                   <option key={group} value={group}>
//                     {group}
//                   </option>
//                 )
//               )}
//             </select>
//           </div>
//         </div>
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>
//         )
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Form fields */}
//           {/* ... Other fields remain unchanged */}
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               City
//             </label>
//             <select
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select City</option>
//               {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                 <option key={city} value={city}>
//                   {city}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stand
//             </label>
//             <input
//               type="text"
//               name="stand"
//               value={formData.stand}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Enter Stand Name"
//             />
//           </div>
//         </div>
//         {/* Fee Amount Display */}
//         <h3 className="text-lg font-semibold bg-blue-100 py-3 px-4 rounded-lg text-center">
//           Total Fee Amount: ₹{formData.feeAmount}
//         </h3>
//         {/* Apply Button */}
//         {showApply && (
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md transition-all duration-[200ms]"
//           >
//             Apply
//           </button>
//         )}
//       </form>})
     
//       <div>
//         {showPayment && (
//           <PassForm
            
//             feeAmount={formData.feeAmount}
//             email={formData.email}
//             enrollment={formData.enrollmentNo}
//             name={formData.name}
//             mobile={formData.phone}
//             city={formData.city}
//             stand={formData.stand}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyPass;

























import React, { useState } from "react";
import axios from "axios";
import PassForm from "./PassForm";

const ApplyPass = () => {
  const [formData, setFormData] = useState({
    srNo: "",
    date: "",
    regNo: "",
    name: "",
    enrollmentNo: "",
    college: "",
    branch: "",
    semester: "",
    shift: "1st Shift",
    address: "uma hostel",
    phone: "",
    parentPhone: "8238871505",
    email: "",
    bloodGroup: "",
    city: "",
    stand: "",
    note: "",
    feeAmount: 0,
  });

  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [showApply, setShowApply] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    // Update feeAmount based on city selection
    if (name === "city") {
      let fee = 0;
      if (value === "Mehsana") fee = 5000;
      if (value === "Ahmedabad") fee = 15000;
      if (value === "Visnagar") fee = 8000;
      setFormData((prevFormData) => ({ ...prevFormData, feeAmount: fee }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowApply(false);
    setShowPayment(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/submit-form",
        formData
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-200 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          {/* Glassmorphic Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 blur-xl"></div>
            <div className="relative bg-white/70 backdrop-blur-lg p-8 text-center">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wider">
                Bus Pass Application
              </h1>
              <p className="text-gray-600 mt-2 text-sm">
                Your journey starts with precise details
              </p>
            </div>
          </div>

          {/* Form Content */}
          {1 && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Basic Details Section */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "srNo", label: "Sr. No", type: "text" },
                  { name: "date", label: "Date", type: "date" },
                  { name: "regNo", label: "Reg No", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="
                        w-full 
                        px-4 py-3 
                        bg-blue-50 
                        border border-blue-100 
                        rounded-xl 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-400
                        transition-all
                        duration-300
                      "
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Personal Details Section */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "name", label: "Full Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "phone", label: "Phone", type: "tel" },
        
                  {
                    name: "enrollmentNo",
                    label: "Enrollment No",
                    type: "text",
                  },
                  { name: "college", label: "College", type: "text" },
                  { name: "branch", label: "Branch", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="
                        w-full 
                        px-4 py-3 
                        bg-blue-50 
                        border border-blue-100 
                        rounded-xl 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-blue-400
                        transition-all
                        duration-300
                      "
                      required
                    />
                  </div>
                ))}

                {/* Blood Group Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="
                      w-full 
                      px-4 py-3 
                      bg-blue-50 
                      border border-blue-100 
                      rounded-xl 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-400
                      transition-all
                      duration-300
                    "
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Location Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="
                      w-full 
                      px-4 py-3 
                      bg-blue-50 
                      border border-blue-100 
                      rounded-xl 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-400
                      transition-all
                      duration-300
                    "
                  >
                    <option value="">Select City</option>
                    {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">
                    Stand
                  </label>
                  <input
                    type="text"
                    name="stand"
                    value={formData.stand}
                    onChange={handleChange}
                    className="
                      w-full 
                      px-4 py-3 
                      bg-blue-50 
                      border border-blue-100 
                      rounded-xl 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-400
                      transition-all
                      duration-300
                    "
                    placeholder="Enter Stand Name"
                  />
                </div>

                {/* Fee Display */}
                <div className="flex items-end">
                  <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-center">
                    <p className="text-sm">Total Fee</p>
                    <p className="text-2xl font-bold">₹{formData.feeAmount}</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="
                    w-full 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    text-white 
                    py-4 
                    rounded-xl 
                    hover:from-blue-700 
                    hover:to-purple-700 
                    transition-all 
                    duration-300 
                    transform 
                    hover:-translate-y-1 
                    hover:shadow-lg
                  "
                >
                  Apply for Bus Pass
                </button>
              </div>
            </form>
          )}

          {/* Payment Form */}
          {showPayment && (
            <PassForm
              feeAmount={formData.feeAmount}
              email={formData.email}
              enrollment={formData.enrollmentNo}
              name={formData.name}
              mobile={formData.phone}
              city={formData.city}
              stand={formData.stand}
            />
          )}
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 15s infinite;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ApplyPass;