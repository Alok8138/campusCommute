import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import loginAnimation from "../animation/loginAnimation.gif";

const Admin_Login = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    secretkey: "",
    name: "",
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // success message
  const [loading, setLoading] = useState(false); // loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (isLoginForm) {
        // Login API Call
        const res = await axios.post(
          `${BASE_URL}/admin/login`,
          {
            id: formData.id,
            password: formData.password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.user));
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccess("Admin login successful. Redirecting...");
        setTimeout(() => navigate("/admin/home"), 1000);
      } else {
        // Signup API Call
        const res = await axios.post(
          `${BASE_URL}/admin/signup`,
          {
            id: formData.id,
            password: formData.password,
            secretkey: formData.secretkey,
            name: formData.name,
          },
          { withCredentials: true }
        );
        setSuccess("Admin signup successful. Redirecting...");
        setTimeout(() => navigate("/admin/home"), 1000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <div className="flex flex-col md:flex-row bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Left Side - Animation */}
        <div className="md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
          <img src={loginAnimation} alt="Admin Login Animation" className="w-52 md:w-80" />
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="md:w-1/2 flex flex-col justify-center px-2">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            {isLoginForm ? "Admin Login" : "Admin Signup"}
          </h2>

          {/* Success message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
              {success}
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
              {error}
            </div>
          )}

          {/* Common fields */}
          <label className="block text-gray-700 font-semibold mb-1">Admin ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={handleChange}
            autoComplete="off"
            required
          />

          <label className="block text-gray-700 font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          {/* Signup-only fields */}
          {!isLoginForm && (
            <>
              <label className="block text-gray-700 font-semibold mb-1">Secret Key</label>
              <input
                type="text"
                name="secretkey"
                value={formData.secretkey}
                className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                onChange={handleChange}
                autoComplete="off"
                required
              />

              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-4 py-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </>
          )}

          {/* Submit button */}
          <button
            className={`w-full py-3 rounded-lg font-bold mt-2 shadow transition ${
              isLoginForm
                ? "bg-slate-900 hover:bg-black"
                : "bg-amber-600 hover:bg-amber-700"
            } text-white`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : isLoginForm ? "Login" : "Signup"}
          </button>

          {/* Toggle form */}
          <button
            className="mt-6 w-full bg-gray-200 py-2 rounded-lg text-blue-700 hover:bg-gray-300 font-semibold transition"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
              setSuccess("");
              setFormData({
                id: "",
                password: "",
                secretkey: "",
                name: "",
              });
            }}
          >
            {isLoginForm ? "New Admin? Signup Here" : "Existing Admin? Login Here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_Login;




// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import loginAnimation from "../animation/loginAnimation.gif";

// const Admin_Login = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     password: "",
//     secretkey: "",
//     name: ""
//   });
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (isLoginForm) {
//         // Login API Call
//         const res = await axios.post(`${BASE_URL}/admin/login`, {
//           id: formData.id,
//           password: formData.password
//         }, { withCredentials: true });
//         dispatch(addUser(res.data.user));
//         localStorage.setItem('adminToken', res.data.token);
//         localStorage.setItem('user', JSON.stringify(res.data.user));
//         navigate("/admin/home");
//       } else {
//         // Signup API Call
//         const res = await axios.post(`${BASE_URL}/admin/signup`, formData, { withCredentials: true });
//         alert("Signup successful");
//         navigate("/admin/home");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
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
//               {isLoginForm ? "Admin Login" : "Admin Signup"}
//             </h2>
//           </div>

//           <label className="block text-gray-700 font-semibold">Admin ID</label>
//           <input
//             type="text"
//             name="id"
//             value={formData.id}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={handleChange}
//             required
//           />

//           <label className="block text-gray-700 font-semibold">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={handleChange}
//             required
//           />

//           {!isLoginForm && (
//             <>
//               <label className="block text-gray-700 font-semibold">Secret Key</label>
//               <input
//                 type="text"
//                 name="secretkey"
//                 value={formData.secretkey}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={handleChange}
//                 required
//               />
              
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}

//           <p className="text-red-500 text-sm mb-3">{error}</p>

//           <button
//             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
//             onClick={handleSubmit}
//           >
//             {isLoginForm ? "Login" : "Signup"}
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

// export default Admin_Login;



