
// import React from 'react'

// function ApplyPass() {
//   return (
//     <div>ApplyPass</div>
//   )
// }

// export default ApplyPass

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



  const [serverMessage, setServerMessage] = useState(""); // Add this state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowApply(false);
    setShowPayment(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/submit-form",
        formData
      );
      setServerMessage(response.data.message); // Success message
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setServerMessage(error.response.data.message); // Already applied
        setShowApply(true); // Allow user to try again if needed
        setShowPayment(false);
      } else {
        setServerMessage("An error occurred while submitting the form.");
      }
      console.error("Error submitting form:", error);
    }
  };




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
          {showApply && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">

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
                  { name: "semester", label: "semester", type: "text" },
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
























