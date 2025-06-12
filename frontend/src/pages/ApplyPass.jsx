

// import React, { useState } from "react";
// import { BASE_URL } from "../utils/constants";

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

//     if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
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

//     if (!validateForm()) return;

//     const confirmSubmission = window.confirm("Are you sure you want to submit the form?");
//     if (!confirmSubmission) return;

//     try {
//       const response = await fetch(BASE_URL + "/submit-form", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Form submitted successfully! Redirecting to payment...");
//         window.location.href = "/payment";
//       } else {
//         alert("Error: " + data.message);
//       }
//     } catch (error) {
//       console.error("Form submission error:", error);
//       alert("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg mt-10">
//       <h2 className="text-4xl font-extrabold text-center text-gray-900">Bus Pass Registration</h2>

//       <form onSubmit={handleSubmit} className="space-y-6 mt-6">
//         <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
//           {["srNo", "date", "regNo", "name", "email", "phone", "enrollmentNo", "college", "branch", "semester", "parentPhone", "bloodGroup"].map((field) => (
//             <div key={field}>
//               <label className="block font-semibold text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
//               <input type={field === "email" ? "email" : "text"} name={field} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" onChange={handleChange} />
//               {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
//             </div>
//           ))}
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow">
//           <label className="block font-semibold text-gray-700">Address</label>
//           <textarea name="address" className="w-full p-2 border rounded-lg" onChange={handleChange}></textarea>
//           {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
//         {/* </div> */}

//         {/* <div className="bg-white p-6 rounded-xl shadow"> */}
//            <label className="block font-semibold text-gray-700">Additional Note</label>
//            <textarea
//              name="note"
//              className="w-full p-2 border rounded-lg"
//              onChange={handleChange}
//            ></textarea>
//        </div>




//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold text-gray-700">Shift</label>
//             <select name="shift" className="w-full p-2 border rounded-lg" onChange={handleChange}>
//               <option value="1st Shift">1st Shift</option>
//               <option value="2nd Shift">2nd Shift</option>
//             </select>
//           </div>
//           <div>
//             <label className="block font-semibold text-gray-700">City</label>
//             <select name="city" className="w-full p-2 border rounded-lg" onChange={handleChange}>
//               <option value="">Select City</option>
//               <option value="Mehsana">Mehsana</option>
//               <option value="Ahmedabad">Ahmedabad</option>
//               <option value="Visnagar">Visnagar</option>
//             </select>
//           </div>
//         </div>

//         <h3 className="text-xl font-bold text-center bg-blue-100 py-3 rounded-lg">Total Fee Amount: ₹{formData.feeAmount}</h3>

//         <div className="flex justify-center mt-6">
//           <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg shadow-md cursor-pointer" onClick={handleSubmit}>Confirm & Pay</button>
//           {/* <button className="bg-black text-white px-4 py-2 rounded-lg shadow-md cursor-pointer" onClick={saveProfile}>
//               Save Profile
//             </button> */}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ApplyPass;














import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector } from 'react-redux'


const ApplyPass = () => {
  const user = useSelector((store) => store.user);
  const [name, setName] = useState(user?.name || "");

  console.log("User object:", user);
  console.log("User name:", user?.name);
  
  const [formData, setFormData] = useState({
    xzy: user?.name || "",
    srNo: "",
    date: "",
    regNo: "",
    name: user?.name || "",
    enrollmentNo: "",
    college: "",
    branch: "",
    semester: "",
    shift: "1st Shift",
    address: "",
    phone: "",
    parentPhone: "",
    email: "",
    bloodGroup: "",
    city: "",
    stand: "",
    note: "abc",
    feeAmount: 0,
  });

  console.log("Form data:", formData);
  console.log("Form data name:", formData.name);
  console.log("Name state:", name);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "city") {
      let fee = 0;
      if (value === "Mehsana") fee = 5000;
      if (value === "Ahmedabad") fee = 15000;
      if (value === "Visnagar") fee = 8000;
      setFormData((prevData) => ({ ...prevData, feeAmount: fee }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (
      !formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.parentPhone.match(/^\d{10}$/)) {
      newErrors.parentPhone = "Parent's phone number must be 10 digits";
    } 

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "note") {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Show confirmation alert
    const confirmSubmission = window.confirm("Are you sure you want to submit the form?");
    if (!confirmSubmission) return;
  
    console.log(formData);
  
    try {
      // Correct API call
      const response = await fetch(BASE_URL + "/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Form submitted successfully! Redirecting to payment...");
        window.location.href = "/payment";
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Server error. Please try again later.");
    }
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Show confirmation alert
  //   const confirmSubmission = window.confirm("Are you sure you want to submit the form?");
  //   if (!confirmSubmission) return;
  //   console.log(formData)
  //   try {
  //     // const response = await fetch("http://localhost:3000/api/submit-form", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify(formData),      
  //     // });
  //     // const res = await axios.post(
  //     //   BASE_URL + "/submit-form",
  //     //   { enrollment, password },
  //     //   { withCredentials: true }
  //     // );
  
  //     const data = await response.json();
  
  //     if (response.ok) {
  //       alert("Form submitted successfully! Redirecting to payment...");
  //       window.location.href = "/payment"; // Redirect to payment page
  //     } else {
  //       alert("Error: " + data.message);
  //     }
  //   } catch (error) {
  //     console.error("Form submission error:", error);
  //     alert("Server error. Please try again later.");
  //   }
  // };

  
  

  return (
    
    <div className="max-w-3xl mx-auto bg-gray-100 p-8 rounded-lg shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r text-gray-800 py-4 rounded-lg">
        Bus Pass Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Basic Details</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Sr. No", name: "srNo" },
              { label: "Date", name: "date", type: "date" },
              { label: "Reg No", name: "regNo" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type={type || "text"}
                  name={name}
                  className="input-field w-full p-2 border rounded-lg"
                  onChange={handleChange}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">
            Personal & Academic Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "name",
              "email",
              "phone",
              "enrollmentNo",
              "college",
              "branch",
              "semester",
              "parentPhone",
              "bloodGroup",
            ].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className="input-field w-full p-2 border rounded-lg"
                  onChange={handleChange}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1">Address</label>
            <textarea
              name="address"
              className="input-field w-full p-2 border rounded-lg"
              onChange={handleChange}
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>



        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Shift</label>
            <select
              name="shift"
              className="input-field w-full p-2 border rounded-lg"
              onChange={handleChange}
            >
              <option value="1st Shift">1st Shift</option>
              <option value="2nd Shift">2nd Shift</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">City</label>
            <select
              name="city"
              className="input-field w-full p-2 border rounded-lg"
              onChange={handleChange}
            >
              <option value="">Select City</option>
              <option value="Mehsana">Mehsana</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Visnagar">Visnagar</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Stand</label>
          <input  
            type="text"
            name="stand"
            className="input-field w-full p-2 border rounded-lg"
            onChange={handleChange}
          />
        </div>

{/* </div> */}


        {/* <div>
          <label className="block font-medium mb-1">Additional Note</label>
          <input
            name="note"
            className="input-field w-full p-2 border rounded-lg"
            onChange={handleChange}
          >
        </div> */}

<div>
          <label className="block font-medium mb-1">Additional Note</label>
          <input  
            type="text"
            name="note"
            className="input-field w-full p-2 border rounded-lg"
            onChange={handleChange}
          />
        </div>
</div>
        <h3 className="text-lg font-semibold text-center bg-blue-100 py-3 rounded-lg">
          Total Payble Amount: ₹{formData.feeAmount}
        </h3>
        <div className="flex justify-center mt-6">
          {/* <button
            type="button"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Save as Draft
          </button> */}
          <button
            type="submit"
            className="justify-right bg-black text-white px-4 py-2 rounded-lg shadow-md cursor-pointer"
          >
            Confirm & Fees Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyPass;
