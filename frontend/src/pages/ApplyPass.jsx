import React, { useState, useEffect } from "react";
import axios from "axios";
import PassForm from "./PassForm";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const ApplyPass = ({ user }) => {
  // If parent doesn't pass `user`, read it from the redux store
  const storeUser = useSelector((state) => state.user);
  const currentUser = user ?? storeUser;
  const [isEligible, setIsEligible] = useState(true);
  const [expiryDate, setExpiryDate] = useState(null);
  const [loadingCheck, setLoadingCheck] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [hasApplication, setHasApplication] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [formData, setFormData] = useState({
    srNo: "",
    date: "",
    regNo: "",
    name: currentUser?.name || currentUser?.fullName || "",
    enrollmentNo: currentUser?.enrollment ?? currentUser?.enrollmentNo ?? currentUser?.enrollmentId ?? "",
    college: "",
    branch: "",
    semester: "",
    shift: "1st Shift",
    address: "uma hostel",
    phone: "",
    parentPhone: "8238871505",
    email: currentUser?.email || "",
    bloodGroup: "",
    city: "",
    stand: "",
    note: "",
    feeAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);
  const [showApply, setShowApply] = useState(true);
  const [serverMessage, setServerMessage] = useState("");

  // Check pass status on mount
  useEffect(() => {
    const checkPassStatus = async () => {
      try {
        setLoadingCheck(true);
        const res = await axios.get(`${BASE_URL}/pass/status`, { withCredentials: true });

        if (res.data && res.data.active) {
          setIsEligible(false);
          setExpiryDate(res.data.expiryDate);
          setHasApplication(false);
          setPaymentStatus('completed');
        } else if (res.data && res.data.hasApplication) {
          setIsEligible(false);
          setHasApplication(true);
          setPaymentStatus(res.data.paymentStatus);
        } else {
          setIsEligible(true);
          setExpiryDate(null);
          setHasApplication(false);
          setPaymentStatus(null);
        }
      } catch (err) {
        console.error("Error checking pass status:", err);
        setIsEligible(true);
      } finally {
        setLoadingCheck(false);
      }
    };

    checkPassStatus();
  }, []);

  // Sync formData with `currentUser` (either prop or redux store) when it becomes available or updates
  useEffect(() => {
    if (!currentUser) return;
    setFormData((prev) => ({
      ...prev,
      name: currentUser.name ?? currentUser.fullName ?? prev.name,
      email: currentUser.email ?? prev.email,
      enrollmentNo:
        currentUser.enrollment ?? currentUser.enrollmentNo ?? currentUser.enrollmentId ?? prev.enrollmentNo,
    }));
  }, [currentUser]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(`${BASE_URL}/download-bus-pass`, {
        responseType: "blob",
        withCredentials: true,
      });
      let filename = "bus-pass.pdf";
      const disposition = response.headers["content-disposition"];
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("🎉 Bus Pass downloaded successfully!");
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || err.message || "Unable to download PDF."));
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowApply(false);
    setShowPayment(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/submit-form`,
        formData,
        { withCredentials: true }
      );
      setServerMessage(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setServerMessage(error.response.data.message);
        setShowApply(true);
        setShowPayment(false);
      } else {
        setServerMessage("An error occurred while submitting the form.");
      }
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent changing name, email, and enrollmentNo fields (read-only)
    if (["name", "email", "enrollmentNo"].includes(name)) return;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
      // Update feeAmount based on city selection
      ...(name === "city" ? {
        feeAmount:
          value === "Mehsana" ? 5000 :
          value === "Ahmedabad" ? 15000 :
          value === "Visnagar" ? 8000 : 0
      } : {})
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-200 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

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

          {loadingCheck && (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Checking your pass status...</p>
            </div>
          )}

          {!loadingCheck && !isEligible && (
            <div className="p-12 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
                    {paymentStatus === 'completed' ? (
                      <svg
                        className="w-12 h-12 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-12 h-12 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {paymentStatus === 'completed' ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      You Already Have an Active Bus Pass
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Your current bus pass is still valid. You can download it below.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Payment Pending
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      You have already submitted an application. Please complete the payment to activate your bus pass.
                    </p>
                  </>
                )}

                {paymentStatus === 'completed' && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
                    <p className="text-sm text-gray-600 mb-2">Pass Expires On</p>
                    <p className="text-2xl font-bold text-blue-700">{formatDate(expiryDate)}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      You can apply for a new pass after this date
                    </p>
                  </div>
                )}

                {paymentStatus === 'completed' && (
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className={`
                      w-full max-w-md mx-auto
                      flex items-center justify-center gap-3
                      py-4 px-8
                      rounded-xl
                      font-semibold text-lg
                      transition-all duration-300
                      transform hover:-translate-y-1 hover:shadow-lg
                      ${downloading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"}
                    `}
                  >
                    {downloading ? (
                      <>
                        <svg
                          className="animate-spin h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          ></path>
                        </svg>
                        Downloading...
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Download Bus Pass PDF
                      </>
                    )}
                  </button>
                )}

                <p className="mt-6 text-sm text-gray-500">
                  {paymentStatus === 'completed'
                    ? "💡 Keep your bus pass safe. You'll need it for campus transportation."
                    : "💡 Complete the payment to activate your bus pass and access campus transportation."}
                </p>
              </div>
            </div>
          )}

          {!loadingCheck && isEligible && showApply && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "srNo", label: "Sr. No", type: "text" },
                  { name: "date", label: "Date", type: "date" },
                  { name: "regNo", label: "Reg No", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: "name", label: "Name", type: "text", disabled: true },
                  { name: "email", label: "Email", type: "email", disabled: true },
                  { name: "phone", label: "Phone", type: "tel" },
                  { name: "enrollmentNo", label: "Enrollment No", type: "text", disabled: true },
                  { name: "college", label: "College", type: "text" },
                  { name: "semester", label: "Semester", type: "text" },
                  { name: "branch", label: "Branch", type: "text" },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className={`block text-sm font-medium text-gray-600`}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={field.disabled ? undefined : handleChange}
                      disabled={field.disabled}
                      className={`w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none ${
                        field.disabled ? "opacity-70 cursor-not-allowed" : "focus:ring-2 focus:ring-blue-400"
                      } transition-all duration-300`}
                      required={
                        !field.disabled && !(field.name === 'semester' && String((formData.enrollmentNo || '')).replace(/\D/g, '').length === 5)
                      }
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Blood Group</label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  >
                    <option value="">Select City</option>
                    {["Mehsana", "Ahmedabad", "Visnagar"].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Stand</label>
                  <input
                    type="text"
                    name="stand"
                    value={formData.stand}
                    onChange={handleChange}
                    placeholder="Enter Stand Name"
                    className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>

                <div className="flex items-end">
                  <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-center">
                    <p className="text-sm">Total Fee</p>
                    <p className="text-2xl font-bold">₹{formData.feeAmount}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Apply for Bus Pass
                </button>
              </div>
            </form>
          )}

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

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PassForm from "./PassForm";
// import { BASE_URL } from "../utils/constants";


// const ApplyPass = () => {
//   const [isEligible, setIsEligible] = useState(true);
//   const [expiryDate, setExpiryDate] = useState(null);
//   const [loadingCheck, setLoadingCheck] = useState(true);
//   const [downloading, setDownloading] = useState(false);
//   const [hasApplication, setHasApplication] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState(null);


//   // Check pass status on component mount
//   useEffect(() => {
//     const checkPassStatus = async () => {
//       try {
//         setLoadingCheck(true);
//         const res = await axios.get(`${BASE_URL}/pass/status`, {
//           withCredentials: true,
//         });


//         if (res.data && res.data.active) {
//           setIsEligible(false);
//           setExpiryDate(res.data.expiryDate);
//           setHasApplication(false);
//           setPaymentStatus('completed');
//         } else if (res.data && res.data.hasApplication) {
//           // Has application but payment pending
//           setIsEligible(false);
//           setHasApplication(true);
//           setPaymentStatus(res.data.paymentStatus);
//         } else {
//           setIsEligible(true);
//           setExpiryDate(null);
//           setHasApplication(false);
//           setPaymentStatus(null);
//         }
//       } catch (err) {
//         console.error("Error checking pass status:", err);
//         // If error, assume eligible (show form)
//         setIsEligible(true);
//       } finally {
//         setLoadingCheck(false);
//       }
//     };


//     checkPassStatus();
//   }, []);


//   const handleDownload = async () => {
//     setDownloading(true);
//     try {
//       const response = await axios.get(`${BASE_URL}/download-bus-pass`, {
//         responseType: "blob",
//         withCredentials: true,
//       });
//       let filename = "bus-pass.pdf";
//       const disposition = response.headers["content-disposition"];
//       if (disposition && disposition.includes("filename=")) {
//         filename = disposition.split("filename=")[1].replace(/"/g, "");
//       }
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = filename;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//       alert("🎉 Bus Pass downloaded successfully!");
//     } catch (err) {
//       alert("❌ " + (err.response?.data?.error || err.message || "Unable to download PDF."));
//     } finally {
//       setDownloading(false);
//     }
//   };


//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       });
//     } catch {
//       return dateString;
//     }
//   };


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
//     parentPhone: "8238871505",
//     email: "",
//     bloodGroup: "",
//     city: "",
//     stand: "",
//     note: "",
//     feeAmount: 0,
//   });


//   const [errors, setErrors] = useState({});
//   const [showPayment, setShowPayment] = useState(false);
//   const [showApply, setShowApply] = useState(true);






//   const [serverMessage, setServerMessage] = useState(""); // Add this state


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setShowApply(false);
//     setShowPayment(true);


//     try {
//       const response = await axios.post(
//         `${BASE_URL}/submit-form`,
//         formData,
//         { withCredentials: true }
//       );
//       setServerMessage(response.data.message); // Success message
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setServerMessage(error.response.data.message); // Already applied
//         setShowApply(true); // Allow user to try again if needed
//         setShowPayment(false);
//       } else {
//         setServerMessage("An error occurred while submitting the form.");
//       }
//       console.error("Error submitting form:", error);
//     }
//   };








//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));


//     // Update feeAmount based on city selection
//     if (name === "city") {
//       let fee = 0;
//       if (value === "Mehsana") fee = 5000;
//       if (value === "Ahmedabad") fee = 15000;
//       if (value === "Visnagar") fee = 8000;
//       setFormData((prevFormData) => ({ ...prevFormData, feeAmount: fee }));
//     }
//   };


 


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-200 flex items-center justify-center p-6 relative overflow-hidden">
//       {/* Decorative Background Elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
//       </div>


//       <div className="w-full max-w-4xl relative z-10">
//         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
//           {/* Glassmorphic Header */}
//           <div className="relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 blur-xl"></div>
//             <div className="relative bg-white/70 backdrop-blur-lg p-8 text-center">
//               <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wider">
//                 Bus Pass Application
//               </h1>
//               <p className="text-gray-600 mt-2 text-sm">
//                 Your journey starts with precise details
//               </p>
//             </div>
//           </div>


//           {/* Loading State */}
//           {loadingCheck && (
//             <div className="p-12 text-center">
//               <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//               <p className="mt-4 text-gray-600">Checking your pass status...</p>
//             </div>
//           )}


//           {/* Not Eligible Message - Show if user has active pass or pending payment */}
//           {!loadingCheck && !isEligible && (
//             <div className="p-12 text-center">
//               <div className="max-w-2xl mx-auto">
//                 {/* Icon */}
//                 <div className="mb-6">
//                   <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
//                     {paymentStatus === 'completed' ? (
//                       <svg
//                         className="w-12 h-12 text-blue-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         className="w-12 h-12 text-orange-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                 </div>

//                 {/* Message */}
//                 {paymentStatus === 'completed' ? (
//                   <>
//                     <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                       You Already Have an Active Bus Pass
//                     </h2>
//                     <p className="text-lg text-gray-600 mb-6">
//                       Your current bus pass is still valid. You can download it below.
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                       Payment Pending
//                     </h2>
//                     <p className="text-lg text-gray-600 mb-6">
//                       You have already submitted an application. Please complete the payment to activate your bus pass.
//                     </p>
//                   </>
//                 )}

//                 {/* Expiry Date Card - Show only if payment completed */}
//                 {paymentStatus === 'completed' && (
//                   <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-blue-200">
//                     <p className="text-sm text-gray-600 mb-2">Pass Expires On</p>
//                     <p className="text-2xl font-bold text-blue-700">
//                       {formatDate(expiryDate)}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       You can apply for a new pass after this date
//                     </p>
//                   </div>
//                 )}

//                 {/* Download Button - Show only if payment completed */}
//                 {paymentStatus === 'completed' && (
//                   <button
//                     onClick={handleDownload}
//                     disabled={downloading}
//                     className={`
//                       w-full max-w-md mx-auto
//                       flex items-center justify-center gap-3
//                       py-4 px-8
//                       rounded-xl
//                       font-semibold text-lg
//                       transition-all duration-300
//                       transform hover:-translate-y-1 hover:shadow-lg
//                       ${
//                         downloading
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
//                       }
//                     `}
//                   >
//                     {downloading ? (
//                       <>
//                         <svg
//                           className="animate-spin h-6 w-6"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8v8z"
//                           ></path>
//                         </svg>
//                         Downloading...
//                       </>
//                     ) : (
//                       <>
//                         <svg
//                           className="w-6 h-6"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           />
//                         </svg>
//                         Download Bus Pass PDF
//                       </>
//                     )}
//                   </button>
//                 )}

//                 {/* Info Message */}
//                 <p className="mt-6 text-sm text-gray-500">
//                   {paymentStatus === 'completed'
//                     ? '💡 Keep your bus pass safe. You\'ll need it for campus transportation.'
//                     : '💡 Complete the payment to activate your bus pass and access campus transportation.'}
//                 </p>
//               </div>
//             </div>
//           )}


//           {/* Form Content - Show only if eligible */}
//           {!loadingCheck && isEligible && showApply && (
//             <form onSubmit={handleSubmit} className="p-8 space-y-6">


//               <div className="grid md:grid-cols-3 gap-6">
//                 {[
//                   { name: "srNo", label: "Sr. No", type: "text" },
//                   { name: "date", label: "Date", type: "date" },
//                   { name: "regNo", label: "Reg No", type: "text" },
//                 ].map((field) => (
//                   <div key={field.name} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-600">
//                       {field.label}
//                     </label>
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       className="
//                         w-full
//                         px-4 py-3
//                         bg-blue-50
//                         border border-blue-100
//                         rounded-xl
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-400
//                         transition-all
//                         duration-300
//                       "
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>


//               {/* Personal Details Section */}
//               <div className="grid md:grid-cols-3 gap-6">
//                 {[
//                   { name: "name", label: "Name", type: "text" },
//                   { name: "email", label: "Email", type: "email" },
//                   { name: "phone", label: "Phone", type: "tel" },


//                   {
//                     name: "enrollmentNo",
//                     label: "Enrollment No",
//                     type: "text",
//                   },
//                   { name: "college", label: "College", type: "text" },
//                   { name: "semester", label: "semester", type: "text" },
//                   { name: "branch", label: "Branch", type: "text" },
//                 ].map((field) => (
//                   <div key={field.name} className="space-y-2">
//                     <label className="block text-sm font-medium text-gray-600">
//                       {field.label}
//                     </label>
//                     <input
//                       type={field.type}
//                       name={field.name}
//                       value={formData[field.name]}
//                       onChange={handleChange}
//                       className="
//                         w-full
//                         px-4 py-3
//                         bg-blue-50
//                         border border-blue-100
//                         rounded-xl
//                         focus:outline-none
//                         focus:ring-2
//                         focus:ring-blue-400
//                         transition-all
//                         duration-300
//                       "
//                       required
//                     />
//                   </div>
//                 ))}


//                 {/* Blood Group Dropdown */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">
//                     Blood Group
//                   </label>
//                   <select
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     onChange={handleChange}
//                     className="
//                       w-full
//                       px-4 py-3
//                       bg-blue-50
//                       border border-blue-100
//                       rounded-xl
//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-blue-400
//                       transition-all
//                       duration-300
//                     "
//                   >
//                     <option value="">Select Blood Group</option>
//                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                       (group) => (
//                         <option key={group} value={group}>
//                           {group}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </div>
//               </div>


//               {/* Location Details */}
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">
//                     City
//                   </label>
//                   <select
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className="
//                       w-full
//                       px-4 py-3
//                       bg-blue-50
//                       border border-blue-100
//                       rounded-xl
//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-blue-400
//                       transition-all
//                       duration-300
//                     "
//                   >
//                     <option value="">Select City</option>
//                     {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>
//                 </div>


//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-600">
//                     Stand
//                   </label>
//                   <input
//                     type="text"
//                     name="stand"
//                     value={formData.stand}
//                     onChange={handleChange}
//                     className="
//                       w-full
//                       px-4 py-3
//                       bg-blue-50
//                       border border-blue-100
//                       rounded-xl
//                       focus:outline-none
//                       focus:ring-2
//                       focus:ring-blue-400
//                       transition-all
//                       duration-300
//                     "
//                     placeholder="Enter Stand Name"
//                   />
//                 </div>


//                 {/* Fee Display */}
//                 <div className="flex items-end">
//                   <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-center">
//                     <p className="text-sm">Total Fee</p>
//                     <p className="text-2xl font-bold">₹{formData.feeAmount}</p>
//                   </div>
//                 </div>
//               </div>


//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="
//                     w-full
//                     bg-gradient-to-r from-blue-600 to-purple-600
//                     text-white
//                     py-4
//                     rounded-xl
//                     hover:from-blue-700
//                     hover:to-purple-700
//                     transition-all
//                     duration-300
//                     transform
//                     hover:-translate-y-1
//                     hover:shadow-lg
//                   "
//                 >
//                   Apply for Bus Pass
//                 </button>
//               </div>
//             </form>
//           )}


//           {/* Payment Form */}
//           {showPayment && (
//             <PassForm
//               feeAmount={formData.feeAmount}
//               email={formData.email}
//               enrollment={formData.enrollmentNo}
//               name={formData.name}
//               mobile={formData.phone}
//               city={formData.city}
//               stand={formData.stand}
//             />
//           )}
//         </div>
//       </div>


//       {/* Custom CSS for Animations */}
//       <style jsx>{`
//         @keyframes blob {
//           0% {
//             transform: translate(0px, 0px) scale(1);
//           }
//           33% {
//             transform: translate(30px, -50px) scale(1.1);
//           }
//           66% {
//             transform: translate(-20px, 20px) scale(0.9);
//           }
//           100% {
//             transform: translate(0px, 0px) scale(1);
//           }
//         }


//         .animate-blob {
//           animation: blob 15s infinite;
//         }


//         .animation-delay-4000 {
//           animation-delay: 4s;
//         }
//       `}</style>
//     </div>
//   );
// };


// export default ApplyPass;


















// // -----------Dharmik
// // // import React from 'react'

// // // function ApplyPass() {
// // //   return (
// // //     <div>ApplyPass</div>
// // //   )
// // // }

// // // export default ApplyPass

// // import React, { useState } from "react";
// // import axios from "axios";
// // import PassForm from "./PassForm";
// // import { BASE_URL } from "../utils/constants";



// // const ApplyPass = () => {


// //   const [formData, setFormData] = useState({
// //     srNo: "",
// //     date: "",
// //     regNo: "",
// //     name: "",
// //     enrollmentNo: "",
// //     college: "",
// //     branch: "",
// //     semester: "",
// //     shift: "1st Shift",
// //     address: "uma hostel",
// //     phone: "",
// //     parentPhone: "8238871505",
// //     email: "",
// //     bloodGroup: "",
// //     city: "",
// //     stand: "",
// //     note: "",
// //     feeAmount: 0,
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [showPayment, setShowPayment] = useState(false);
// //   const [showApply, setShowApply] = useState(true);



// //   const [serverMessage, setServerMessage] = useState(""); // Add this state

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setShowApply(false);
// //     setShowPayment(true);

// //     try {
// //       const response = await axios.post(BASE_URL+ "/submit-form",
// //         formData
// //       );
// //       setServerMessage(response.data.message); // Success message
// //     } catch (error) {
// //       if (error.response && error.response.status === 409) {
// //         setServerMessage(error.response.data.message); // Already applied
// //         setShowApply(true); // Allow user to try again if needed
// //         setShowPayment(false);
// //       } else {
// //         setServerMessage("An error occurred while submitting the form.");
// //       }
// //       console.error("Error submitting form:", error);
// //     }
// //   };




// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

// //     // Update feeAmount based on city selection
// //     if (name === "city") {
// //       let fee = 0;
// //       if (value === "Mehsana") fee = 5000;
// //       if (value === "Ahmedabad") fee = 15000;
// //       if (value === "Visnagar") fee = 8000;
// //       setFormData((prevFormData) => ({ ...prevFormData, feeAmount: fee }));
// //     }
// //   };

 

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-200 flex items-center justify-center p-6 relative overflow-hidden">
// //       {/* Decorative Background Elements */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl animate-blob"></div>
// //         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl animate-blob animation-delay-4000"></div>
// //       </div>

// //       <div className="w-full max-w-4xl relative z-10">
// //         <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
// //           {/* Glassmorphic Header */}
// //           <div className="relative overflow-hidden">
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90 blur-xl"></div>
// //             <div className="relative bg-white/70 backdrop-blur-lg p-8 text-center">
// //               <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-wider">
// //                 Bus Pass Application
// //               </h1>
// //               <p className="text-gray-600 mt-2 text-sm">
// //                 Your journey starts with precise details
// //               </p>
// //             </div>
// //           </div>

// //           {/* Form Content */}
// //           {showApply && (
// //             <form onSubmit={handleSubmit} className="p-8 space-y-6">

// //               <div className="grid md:grid-cols-3 gap-6">
// //                 {[
// //                   { name: "srNo", label: "Sr. No", type: "text" },
// //                   { name: "date", label: "Date", type: "date" },
// //                   { name: "regNo", label: "Reg No", type: "text" },
// //                 ].map((field) => (
// //                   <div key={field.name} className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-600">
// //                       {field.label}
// //                     </label>
// //                     <input
// //                       type={field.type}
// //                       name={field.name}
// //                       value={formData[field.name]}
// //                       onChange={handleChange}
// //                       className="
// //                         w-full 
// //                         px-4 py-3 
// //                         bg-blue-50 
// //                         border border-blue-100 
// //                         rounded-xl 
// //                         focus:outline-none 
// //                         focus:ring-2 
// //                         focus:ring-blue-400
// //                         transition-all
// //                         duration-300
// //                       "
// //                       required
// //                     />
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Personal Details Section */}
// //               <div className="grid md:grid-cols-3 gap-6">
// //                 {[
// //                   { name: "name", label: "Full Name", type: "text" },
// //                   { name: "email", label: "Email", type: "email" },
// //                   { name: "phone", label: "Phone", type: "tel" },

// //                   {
// //                     name: "enrollmentNo",
// //                     label: "Enrollment No",
// //                     type: "text",
// //                   },
// //                   { name: "college", label: "College", type: "text" },
// //                   { name: "semester", label: "semester", type: "text" },
// //                   { name: "branch", label: "Branch", type: "text" },
// //                 ].map((field) => (
// //                   <div key={field.name} className="space-y-2">
// //                     <label className="block text-sm font-medium text-gray-600">
// //                       {field.label}
// //                     </label>
// //                     <input
// //                       type={field.type}
// //                       name={field.name}
// //                       value={formData[field.name]}
// //                       onChange={handleChange}
// //                       className="
// //                         w-full 
// //                         px-4 py-3 
// //                         bg-blue-50 
// //                         border border-blue-100 
// //                         rounded-xl 
// //                         focus:outline-none 
// //                         focus:ring-2 
// //                         focus:ring-blue-400
// //                         transition-all
// //                         duration-300
// //                       "
// //                       required
// //                     />
// //                   </div>
// //                 ))}

// //                 {/* Blood Group Dropdown */}
// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     Blood Group
// //                   </label>
// //                   <select
// //                     name="bloodGroup"
// //                     value={formData.bloodGroup}
// //                     onChange={handleChange}
// //                     className="
// //                       w-full 
// //                       px-4 py-3 
// //                       bg-blue-50 
// //                       border border-blue-100 
// //                       rounded-xl 
// //                       focus:outline-none 
// //                       focus:ring-2 
// //                       focus:ring-blue-400
// //                       transition-all
// //                       duration-300
// //                     "
// //                   >
// //                     <option value="">Select Blood Group</option>
// //                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
// //                       (group) => (
// //                         <option key={group} value={group}>
// //                           {group}
// //                         </option>
// //                       )
// //                     )}
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Location Details */}
// //               <div className="grid md:grid-cols-3 gap-6">
// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     City
// //                   </label>
// //                   <select
// //                     name="city"
// //                     value={formData.city}
// //                     onChange={handleChange}
// //                     className="
// //                       w-full 
// //                       px-4 py-3 
// //                       bg-blue-50 
// //                       border border-blue-100 
// //                       rounded-xl 
// //                       focus:outline-none 
// //                       focus:ring-2 
// //                       focus:ring-blue-400
// //                       transition-all
// //                       duration-300
// //                     "
// //                   >
// //                     <option value="">Select City</option>
// //                     {["Mehsana", "Ahmedabad", "Visnagar"].map((city) => (
// //                       <option key={city} value={city}>
// //                         {city}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-gray-600">
// //                     Stand
// //                   </label>
// //                   <input
// //                     type="text"
// //                     name="stand"
// //                     value={formData.stand}
// //                     onChange={handleChange}
// //                     className="
// //                       w-full 
// //                       px-4 py-3 
// //                       bg-blue-50 
// //                       border border-blue-100 
// //                       rounded-xl 
// //                       focus:outline-none 
// //                       focus:ring-2 
// //                       focus:ring-blue-400
// //                       transition-all
// //                       duration-300
// //                     "
// //                     placeholder="Enter Stand Name"
// //                   />
// //                 </div>

// //                 {/* Fee Display */}
// //                 <div className="flex items-end">
// //                   <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl text-center">
// //                     <p className="text-sm">Total Fee</p>
// //                     <p className="text-2xl font-bold">₹{formData.feeAmount}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Submit Button */}
// //               <div className="pt-4">
// //                 <button
// //                   type="submit"
// //                   className="
// //                     w-full 
// //                     bg-gradient-to-r from-blue-600 to-purple-600 
// //                     text-white 
// //                     py-4 
// //                     rounded-xl 
// //                     hover:from-blue-700 
// //                     hover:to-purple-700 
// //                     transition-all 
// //                     duration-300 
// //                     transform 
// //                     hover:-translate-y-1 
// //                     hover:shadow-lg
// //                   "
// //                 >
// //                   Apply for Bus Pass
// //                 </button>
// //               </div>
// //             </form>
// //           )}

// //           {/* Payment Form */}
// //           {showPayment && (
// //             <PassForm
// //               feeAmount={formData.feeAmount}
// //               email={formData.email}
// //               enrollment={formData.enrollmentNo}
// //               name={formData.name}
// //               mobile={formData.phone}
// //               city={formData.city}
// //               stand={formData.stand}
// //             />
// //           )}
// //         </div>
// //       </div>

// //       {/* Custom CSS for Animations */}
// //       <style jsx>{`
// //         @keyframes blob {
// //           0% {
// //             transform: translate(0px, 0px) scale(1);
// //           }
// //           33% {
// //             transform: translate(30px, -50px) scale(1.1);
// //           }
// //           66% {
// //             transform: translate(-20px, 20px) scale(0.9);
// //           }
// //           100% {
// //             transform: translate(0px, 0px) scale(1);
// //           }
// //         }

// //         .animate-blob {
// //           animation: blob 15s infinite;
// //         }

// //         .animation-delay-4000 {
// //           animation-delay: 4s;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ApplyPass;
























