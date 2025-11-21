import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import loginAnimation from "../animation/loginAnimation.gif";

const Login = () => {
  const [formData, setFormData] = useState({
    enrollment: "",
    password: "",
    email: "",
    name: "",
    otp: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Success feedback
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [loading, setLoading] = useState(false); // Button loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          enrollment: formData.enrollment,
          password: formData.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setSuccess("Login successful!");
      setTimeout(() => navigate("/"), 1000); // brief success message then redirect
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // Handle signup
  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          name: formData.name,
          enrollment: formData.enrollment,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      if (res.data.message === "OTP sent to email") {
        localStorage.setItem("token", res.data.token);
        setShowOtpInput(true);
        setCanResendOtp(false);
        setSuccess("OTP sent. Check your email.");
        startOtpTimer();
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpTimer(60);
    const timerInterval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setCanResendOtp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");
      const res = await axios.post(
        `${BASE_URL}/verify-otp`,
        { otp: formData.otp },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.user));
      localStorage.removeItem("token");
      setSuccess("Account verified! Redirecting...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };

  // Responsive card; mobile stacked layout, desktop row
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <div className="flex flex-col md:flex-row bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Left Side - Animation */}
        <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img src={loginAnimation} alt="Login Animation" className="w-52 md:w-80" />
        </div>
        {/* Right Side - Form Section */}
        <div className="md:w-1/2 flex flex-col justify-center px-2">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          {/* Success state */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
              {success}
            </div>
          )}
          {/* Error state */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}
          {/* Form fields */}
          {!isLoginForm && (
            <>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                onChange={handleInputChange}
                autoComplete="off"
              />
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                onChange={handleInputChange}
                autoComplete="off"
              />
            </>
          )}

          <label className="block text-gray-700 font-semibold mb-1">Enrollment ID</label>
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={handleInputChange}
            autoComplete="off"
          />

          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={handleInputChange}
            autoComplete="new-password"
          />

          {/* OTP Field - appears after signup */}
          {showOtpInput && (
            <>
              <label className="block text-gray-700 font-semibold mb-1">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                onChange={handleInputChange}
                autoComplete="off"
              />
              {/* Timer and resend logic */}
              <div className="flex justify-between items-center mb-3 px-1">
                <span className={`text-sm ${canResendOtp ? "text-green-600" : "text-gray-600"}`}>
                  {canResendOtp
                    ? "You can resend the OTP."
                    : `Resend OTP in ${otpTimer}s`}
                </span>
                {canResendOtp && (
                  <button
                    onClick={handleSignUp}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition font-semibold"
                    disabled={loading}
                  >
                    {loading ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Main submit button */}
          {!showOtpInput && (
            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className={`w-full py-3 rounded-lg font-bold mt-2 shadow transition ${
                isLoginForm
                  ? "bg-gray-800 hover:bg-gray-600"
                  : "bg-gray-800 hover:bg-gray-600"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLoginForm ? "Login" : "Send OTP"}
            </button>
          )}
          {/* OTP verify button */}
          {showOtpInput && (
            <button
              className="w-full py-3 rounded-lg mt-3 bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          )}
          {/* Login/Signup toggle button */}
          <button
            className="mt-6 w-full bg-gray-200 py-2 rounded-lg text-blue-700 hover:bg-gray-300 font-semibold transition"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setShowOtpInput(false);
              setError("");
              setSuccess("");
              setFormData({
                enrollment: "",
                password: "",
                email: "",
                name: "",
                otp: "",
              });
            }}
          >
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif";
// // import CartoonFollower from "../animation/CartoonFollower"; // place file accordingly


// const Login = () => {
//   const [formData, setFormData] = useState({
//     enrollment: "",
//     password: "",
//     email: "",
//     name: "",
//     otp: "",
//   });
//   const [isLoginForm, setIsLoginForm] = useState(true); // Toggle between Login and Signup
//   const [showOtpInput, setShowOtpInput] = useState(false); // Show OTP input field
//   const [error, setError] = useState(""); // Error message
//   const [otpTimer, setOtpTimer] = useState(60); // Timer for OTP resend
//   const [canResendOtp, setCanResendOtp] = useState(false); // Flag to control resend button
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle login
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/login`,
//         {
//           enrollment: formData.enrollment,
//           password: formData.password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data)); // Add user to Redux store
//       navigate("/"); // Redirect to home page
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Handle signup
//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/signup`,
//         {
//           name: formData.name,
//           enrollment: formData.enrollment,
//           email: formData.email,
//           password: formData.password,
//         },
//         { withCredentials: true }
//       );
//       if (res.data.message === "OTP sent to email") {
//         localStorage.setItem("token", res.data.token); // Store token for OTP verification
//         setShowOtpInput(true); // Show OTP input field
//         setCanResendOtp(false); // Disable resend button initially
//         startOtpTimer(); // Start the timer for OTP resend
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Start OTP timer
//   const startOtpTimer = () => {
//     setOtpTimer(60);
//     const timerInterval = setInterval(() => {
//       setOtpTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerInterval);
//           setCanResendOtp(true); // Enable resend button after timer ends
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage
//       if (!token) throw new Error("Token not found");

//       const res = await axios.post(
//         `${BASE_URL}/verify-otp`,
//         { otp: formData.otp },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       dispatch(addUser(res.data.user)); // Add verified user to Redux store
//       localStorage.removeItem("token"); // Clear token after verification
//       navigate("/"); // Redirect to home page on success
//     } catch (err) {
//       setError(err?.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="flex bg-white p-8 rounded-2xl shadow-lg w-[60%]">
//         {/* Left Side - Animation */}
//         <div className="w-1/2 flex justify-center items-center">
//           <img src={loginAnimation} alt="Login Animation" className="w-96" />
//         </div>

//         {/* Right Side - Login/Signup Form */}
//         <div className="w-1/2 flex flex-col justify-center">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {isLoginForm ? "Login" : "Sign Up"}
//             </h2>
//           </div>

//           {!isLoginForm && (
//             <>
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={handleInputChange}
//               />
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 name="email"
//                 value={formData.email}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={handleInputChange}
//               />
//             </>
//           )}

//           <label className="block text-gray-700 font-semibold">
//             Enrollment ID
//           </label>
//           <input
//             type="text"
//             name="enrollment"
//             value={formData.enrollment}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={handleInputChange}
//           />

//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={handleInputChange}
//           />

//           {/* Show OTP Input if signing up */}
//           {showOtpInput && (
//             <>
//               <label className="block text-gray-700 font-semibold">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 name="otp"
//                 value={formData.otp}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={handleInputChange}
//               />
//               {/* Timer and Resend Button */}
//               <div className="flex justify-between items-center mb-3">
//                 <span
//                   className={`text-sm ${
//                     canResendOtp ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {canResendOtp
//                     ? "You can resend the OTP now."
//                     : `Resend OTP in ${otpTimer}s`}
//                 </span>
//                 {canResendOtp && (
//                   <button
//                     onClick={handleSignUp}
//                     className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>
//             </>
//           )}

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           {/* Login or Signup Button */}
//           {!showOtpInput && (
//             <button
//               onClick={isLoginForm ? handleLogin : handleSignUp}
//               className={`w-full ${
//                 isLoginForm
//                   ? "bg-gray-800 hover:bg-black"
//                   : "bg-green-600 hover:bg-green-700"
//               } text-white py transition`}
//             >
//               {isLoginForm ? "Login" : "Send OTP"}
//             </button>
//           )}

//           {/* Verify OTP Button */}
//           {showOtpInput && (
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
//               onClick={handleVerifyOtp}
//             >
//               Verify OTP
//             </button>
//           )}

//           {/* Toggle Form */}
//           <p
//             className="text-blue-600 text-center mt-4 cursor-pointer"
//             onClick={() => {
//               setIsLoginForm(!isLoginForm);
//               setShowOtpInput(false); // Reset OTP input visibility when toggling forms
//               setError(""); // Clear error message when toggling forms
//               setFormData({
//                 enrollment: "",
//                 password: "",
//                 email: "",
//                 name: "",
//                 otp: "",
//               }); // Reset form fields when toggling forms
//             }}
//           >
//             {isLoginForm
//               ? "New User? Signup Here"
//               : "Existing User? Login Here"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



