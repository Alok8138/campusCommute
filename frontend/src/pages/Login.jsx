// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif"; // Corrected relative path

// const Login = () => {
//   const [enrollment, setEnrollment] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { enrollment, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { name, enrollment, email, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
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
//                 value={name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 value={email}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </>
//           )}

//           <label className="block text-gray-700 font-semibold">Enrollment ID</label>
//           <input
//             type="text"
//             value={enrollment}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setEnrollment(e.target.value)}
//           />

//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type="password"
//             value={password}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           <button
//             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
//             onClick={isLoginForm ? handleLogin : handleSignUp}
//           >
//             {isLoginForm ? "Login" : "Sign Up"}
//           </button>

//           <p
//             className="text-blue-600 text-center mt-4 cursor-pointer"
//             onClick={() => setIsLoginForm(!isLoginForm)}
//           >
//             {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



















// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif"; // Corrected relative path

// const Login = () => {
//   const [enrollment, setEnrollment] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOtp] = useState(""); // State for OTP input
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [showOtpInput, setShowOtpInput] = useState(false); // Toggle for OTP input
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { enrollment, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };

//   // const handleSignUp = async () => {
//   //   try {
//   //     const res = await axios.post(
//   //       BASE_URL + "/signup",
//   //       { name, enrollment, email, password },
//   //       { withCredentials: true }
//   //     );
//   //     // On successful signup, show OTP input field
//   //     if (res.data.message === "OTP sent to email") {
//   //       setShowOtpInput(true); // Show OTP input field
//   //     }
//   //   } catch (err) {
//   //     setError(err?.response?.data || "Something went wrong");
//   //   }
//   // };



//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { name, enrollment, email, password },
//         { withCredentials: true }
//       );
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token); // Store the token
//         setShowOtpInput(true); // Show OTP input field
//       }
//     } catch (err) {
//       setError(err?.response?.data || "Something went wrong");
//     }
//   };


//   const handleVerifyOtp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/verify-otp",
//         { otp },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         } // Assuming token is stored in local storage
//       );
//       dispatch(addUser(res.data.user)); // Assuming user data is returned
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "Invalid OTP");
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
//                 value={name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 value={email}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </>
//           )}

//           <label className="block text-gray-700 font-semibold">
//             Enrollment ID
//           </label>
//           <input
//             type="text"
//             value={enrollment}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setEnrollment(e.target.value)}
//           />

//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type="password"
//             value={password}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Show OTP Input if signing up */}
//           {showOtpInput && (
//             <>
//               <label className="block text-gray-700 font-semibold">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </>
//           )}

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           <button
//             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
//             onClick={isLoginForm ? handleLogin : handleSignUp}
//           >
//             {isLoginForm ? "Login" : "Send OTP"}
//           </button>

//           {/* Verify OTP Button */}
//           {showOtpInput && (
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
//               onClick={handleVerifyOtp}
//             >
//               Verify OTP
//             </button>
//           )}

//           <p
//             className="text-blue-600 text-center mt-4 cursor-pointer"
//             onClick={() => {
//               setIsLoginForm(!isLoginForm);
//               setShowOtpInput(false); // Reset OTP input visibility when toggling forms
//               setError(""); // Clear error message when toggling forms
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















// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif"; // Corrected relative path

// const Login = () => {
//   const [enrollment, setEnrollment] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOtp] = useState(""); // State for OTP input
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [showOtpInput, setShowOtpInput] = useState(false); // Toggle for OTP input
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         { enrollment, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { name, enrollment, email, password },
//         { withCredentials: true }
//       );
//       if (res.data.message === "OTP sent to email") {
//         setShowOtpInput(true); // Show OTP input field
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage
//       if (!token) throw new Error("Token not found");

//       const res = await axios.post(
//         BASE_URL + "/verify-otp",
//         { otp },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           withCredentials: true,
//         }
//       );
//       dispatch(addUser(res.data.user)); // Assuming user data is returned
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
//                 value={name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <label className="block text-gray-700 font-semibold">Email</label>
//               <input
//                 type="text"
//                 value={email}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </>
//           )}

//           <label className="block text-gray-700 font-semibold">
//             Enrollment ID
//           </label>
//           <input
//             type="text"
//             value={enrollment}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setEnrollment(e.target.value)}
//           />

//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type="password"
//             value={password}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {/* Show OTP Input if signing up */}
//           {showOtpInput && (
//             <>
//               <label className="block text-gray-700 font-semibold">
//                 Enter OTP
//               </label>
//               <input
//                 type="text"
//                 value={otp}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </>
//           )}

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           <button
//             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
//             onClick={isLoginForm ? handleLogin : handleSignUp}
//           >
//             {isLoginForm ? "Login" : "Send OTP"}
//           </button>

//           {/* Verify OTP Button */}
//           {showOtpInput && (
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
//               onClick={handleVerifyOtp}
//             >
//               Verify OTP
//             </button>
//           )}

//           <p
//             className="text-blue-600 text-center mt-4 cursor-pointer"
//             onClick={() => {
//               setIsLoginForm(!isLoginForm);
//               setShowOtpInput(false); // Reset OTP input visibility when toggling forms
//               setError(""); // Clear error message when toggling forms
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











//working perfectly fine dont change anything

// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     enrollment: "",
//     password: "",
//     email: "",
//     name: "",
//     otp: "",
//   });
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [error, setError] = useState("");
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
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async () => {
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage
//       console.log(token);
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
//             </>
//           )}

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           {/* Login or Signup Button */}
//           <button
//             className={`w-full ${
//               isLoginForm ? "bg-gray-800" : "bg-green-600"
//             } text-white py-2 rounded-lg hover:bg-black transition`}
//             onClick={isLoginForm ? handleLogin : handleSignUp}
//           >
//             {isLoginForm ? "Login" : "Send OTP"}
//           </button>

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
//end here

























































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
  const [isLoginForm, setIsLoginForm] = useState(true); // Toggle between Login and Signup
  const [showOtpInput, setShowOtpInput] = useState(false); // Show OTP input field
  const [error, setError] = useState(""); // Error message
  const [otpTimer, setOtpTimer] = useState(60); // Timer for OTP resend
  const [canResendOtp, setCanResendOtp] = useState(false); // Flag to control resend button
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle login
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          enrollment: formData.enrollment,
          password: formData.password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); // Add user to Redux store
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Handle signup
  const handleSignUp = async () => {
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
        localStorage.setItem("token", res.data.token); // Store token for OTP verification
        setShowOtpInput(true); // Show OTP input field
        setCanResendOtp(false); // Disable resend button initially
        startOtpTimer(); // Start the timer for OTP resend
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
  };

  // Start OTP timer
  const startOtpTimer = () => {
    setOtpTimer(60);
    const timerInterval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setCanResendOtp(true); // Enable resend button after timer ends
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) throw new Error("Token not found");

      const res = await axios.post(
        `${BASE_URL}/verify-otp`,
        { otp: formData.otp },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.user)); // Add verified user to Redux store
      localStorage.removeItem("token"); // Clear token after verification
      navigate("/"); // Redirect to home page on success
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex bg-white p-8 rounded-2xl shadow-lg w-[60%]">
        {/* Left Side - Animation */}
        <div className="w-1/2 flex justify-center items-center">
          <img src={loginAnimation} alt="Login Animation" className="w-96" />
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-1/2 flex flex-col justify-center">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>
          </div>

          {!isLoginForm && (
            <>
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={handleInputChange}
              />
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={handleInputChange}
              />
            </>
          )}

          <label className="block text-gray-700 font-semibold">
            Enrollment ID
          </label>
          <input
            type="text"
            name="enrollment"
            value={formData.enrollment}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={handleInputChange}
          />

          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={handleInputChange}
          />

          {/* Show OTP Input if signing up */}
          {showOtpInput && (
            <>
              <label className="block text-gray-700 font-semibold">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={handleInputChange}
              />
              {/* Timer and Resend Button */}
              <div className="flex justify-between items-center mb-3">
                <span
                  className={`text-sm ${
                    canResendOtp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {canResendOtp
                    ? "You can resend the OTP now."
                    : `Resend OTP in ${otpTimer}s`}
                </span>
                {canResendOtp && (
                  <button
                    onClick={handleSignUp}
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </>
          )}

          <p className="text-red-500 text-sm mb-3">{error}</p>

          {/* Login or Signup Button */}
          {!showOtpInput && (
            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className={`w-full ${
                isLoginForm
                  ? "bg-gray-800 hover:bg-black"
                  : "bg-green-600 hover:bg-green-700"
              } text-white py transition`}
            >
              {isLoginForm ? "Login" : "Send OTP"}
            </button>
          )}

          {/* Verify OTP Button */}
          {showOtpInput && (
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          )}

          {/* Toggle Form */}
          <p
            className="text-blue-600 text-center mt-4 cursor-pointer"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setShowOtpInput(false); // Reset OTP input visibility when toggling forms
              setError(""); // Clear error message when toggling forms
              setFormData({
                enrollment: "",
                password: "",
                email: "",
                name: "",
                otp: "",
              }); // Reset form fields when toggling forms
            }}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


































