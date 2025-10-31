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
    name: ""
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isLoginForm) {
        // Login API Call
        const res = await axios.post(`${BASE_URL}/admin/login`, {
          id: formData.id,
          password: formData.password
        }, { withCredentials: true });
        dispatch(addUser(res.data.user));
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate("/admin/home");
      } else {
        // Signup API Call
        const res = await axios.post(`${BASE_URL}/admin/signup`, formData, { withCredentials: true });
        alert("Signup successful");
        navigate("/admin/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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
              {isLoginForm ? "Admin Login" : "Admin Signup"}
            </h2>
          </div>

          <label className="block text-gray-700 font-semibold">Admin ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          <label className="block text-gray-700 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className="w-full px-4 py-2 mb-3 border rounded-lg"
            onChange={handleChange}
            required
          />

          {!isLoginForm && (
            <>
              <label className="block text-gray-700 font-semibold">Secret Key</label>
              <input
                type="text"
                name="secretkey"
                value={formData.secretkey}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={handleChange}
                required
              />
              
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="w-full px-4 py-2 mb-3 border rounded-lg"
                onChange={handleChange}
                required
              />
            </>
          )}

          <p className="text-red-500 text-sm mb-3">{error}</p>

          <button
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
            onClick={handleSubmit}
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>

          <p
            className="text-blue-600 text-center mt-4 cursor-pointer"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
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
// import loginAnimation from "../animation/loginAnimation.gif"; // Correct path

// const Admin_Login = () => {
//   const [id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState(""); // Added name field
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Login function
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/admin/login",
//         { id, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/admin/home");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   // Signup function
//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/admin/signup",
//         { id, password, name }, // Sending name in signup
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       navigate("/admin/home");
//     } catch (err) {
//       setError(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div>Admin Login</div>

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

//           <label className="block text-gray-700 font-semibold">ID</label>
//           <input
//             type="text"
//             value={id}
//             className="w-full px-4 py-2 mb-3 border rounded-lg"
//             onChange={(e) => setId(e.target.value)}
//           />

//           {/* Show Name Field Only in Signup */}
//           {!isLoginForm && (
//             <>
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 className="w-full px-4 py-2 mb-3 border rounded-lg"
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </>
//           )}

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

// export default Admin_Login;




// // import React, { useState } from "react";
// // import axios from "axios";
// // import { useDispatch } from "react-redux";
// // import { addUser } from "../utils/userSlice";
// // import { useNavigate } from "react-router-dom";
// // import { BASE_URL } from "../utils/constants";
// // import loginAnimation from "../animation/loginAnimation.gif"; // Corrected relative path


// // const Admin_Login = () => {
// //   const [id, setId] = useState("");
// //   const [password, setPassword] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [name, setName] = useState("");
// //   const [isLoginForm, setIsLoginForm] = useState(true);
// //   const [error, setError] = useState("");
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// //   const handleSignUp = async () => {
// //     try {
// //       const res = await axios.post(
// //         BASE_URL + "/admin/signup",
// //         { id, password },
// //         { withCredentials: true }
// //       );
// //       dispatch(addUser(res.data));
// //       navigate("/admin/home");
// //     } catch (err) {
// //       setError(err?.response?.data || "Something went wrong");
// //     }
// //   };



// //   return (
// //     <div className="flex justify-center items-center h-screen bg-gray-100">
// //           <div>Admin Login</div>

// //       <div className="flex bg-white p-8 rounded-2xl shadow-lg w-[60%]">
// //         {/* Left Side - Animation */}
// //         <div className="w-1/2 flex justify-center items-center">
// //           <img src={loginAnimation} alt="Login Animation" className="w-96" />
// //         </div>

// //         {/* Right Side - Login/Signup Form */}
// //         <div className="w-1/2 flex flex-col justify-center">
// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-bold text-gray-800">
// //               {isLoginForm ? "Login" : "Sign Up"}
// //             </h2>
// //           </div>

// //           <label className="block text-gray-700 font-semibold">ID</label>
// //           <input
// //             type="text"
// //             value={id}
// //             className="w-full px-4 py-2 mb-3 border rounded-lg"
// //             onChange={(e) => setId(e.target.value)}
// //           />

// //           <label className="block text-gray-700 font-semibold">Password</label>
// //           <input
// //             type="password"
// //             value={password}
// //             className="w-full px-4 py-2 mb-3 border rounded-lg"
// //             onChange={(e) => setPassword(e.target.value)}
// //           />

// //           <p className="text-red-500 text-sm mb-3">{error}</p>

// //           <button
// //             className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-black transition"
// //             onClick={isLoginForm ? handleLogin : handleSignUp}
// //           >
// //             {isLoginForm ? "Login" : "Sign Up"}
// //           </button>

// //           <p
// //             className="text-blue-600 text-center mt-4 cursor-pointer"
// //             onClick={() => setIsLoginForm(!isLoginForm)}
// //           >
// //             {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Admin_Login;
