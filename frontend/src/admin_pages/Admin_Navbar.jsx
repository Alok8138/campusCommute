import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function Admin_Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  const handleLogout = async () => {
    try {
      // Call backend logout endpoint with credentials so the server can clear the cookie.
      await axios.post(`${BASE_URL}/admin/logout`, {}, { withCredentials: true });

      // Clear frontend state and storage
      dispatch(removeUser());
      localStorage.removeItem("token_admin");
      localStorage.removeItem("user");

      // Ensure cookie is removed on client-side as a fallback (best-effort)
      document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Navigate to admin login
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
      // Even if the backend call fails, clear frontend state and redirect to login
      dispatch(removeUser());
      localStorage.removeItem("token_admin");
      localStorage.removeItem("user");
      document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/admin/login");
    }
  };

  // const handleLogout = async () => {
  //   try {
  //     // Call backend logout endpoint with credentials
  //     const response = await axios.post(
  //       `${BASE_URL}/admin/logout`, 
  //       {}, 
  //       { withCredentials: true }  // ✅ This is crucial!
  //     );

  //     console.log("Logout response:", response.data);

  //     // Clear Redux state
  //     dispatch(removeUser());
      
  //     // Clear localStorage (if you're storing anything there)
  //     localStorage.removeItem('adminToken');
  //     localStorage.removeItem('user');
      
  //     // Navigate to login
  //     navigate("/admin/login");
  //   } catch (err) {
  //     console.error("Logout error:", err);
      
  //     // Even if backend logout fails, clear frontend state
  //     dispatch(removeUser());
  //     localStorage.removeItem('adminToken');
  //     localStorage.removeItem('user');
  //     navigate("/admin/login");
  //   }
  // };

  return (
    <div>
      {user && (
        <>
          {/* Navbar with fade-in effect */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar bg-black text-white shadow-md px-6 py-3 flex items-center"
          >
            <div className="flex-1 text-center">
              <Link
                to="/"
                className="text-xl font-bold text-white hover:text-gray-300"
              >
                campusCommute
              </Link>
            </div>
            <div className="flex-1 flex justify-end items-center gap-4">
              <span className="text-gray-300">Welcome, {user.name}</span>
              <div className="dropdown dropdown-end">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar border-2 border-white"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        alt="user profile"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-md shadow-lg mt-3 w-20 p-2 text-left"
                >
                  <li>
                    <Link
                      to="/profile"
                      className="hover:bg-gray-700 p-2 rounded-md"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={handleLogout}
                      className="hover:bg-red-600 p-2 rounded-md cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Sidebar with smooth slide-in animation */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-50 shadow-lg"
              >
                <button
                  className="absolute top-5 right-5 text-white text-2xl cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold mb-6">Services</h2>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/applypass"
                      className="block p-2 hover:bg-gray-700"
                    >
                      Apply for Pass
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/viewpass"
                      className="block p-2 hover:bg-gray-700"
                    >
                      View Pass Status
                    </Link>
                  </li>
                  <li>
                    <Link to="/help" className="block p-2 hover:bg-gray-700">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="block p-2 hover:bg-gray-700">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/chat" className="block p-2 hover:bg-gray-700">
                      Chat Now
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default Admin_Navbar;






// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { removeUser } from "../utils/userSlice";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// function Admin_Navbar() {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/admin/logout", {}, { withCredentials: true });
//       // Clear Redux state
//       dispatch(removeUser());
//       // Clear all admin-related storage
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('user');
//       // Clear the admin token cookie
//       document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       navigate("/admin/login");
//     } catch (err) {
//       console.error(err);
//       // Even if logout fails, clear all state and redirect
//       dispatch(removeUser());
//       localStorage.removeItem('adminToken');
//       localStorage.removeItem('user');
//       document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       navigate("/admin/login");
//     }
//   };

//   return (
//     <div>
//       {user && (
//         <>
//           {/* Navbar with fade-in effect */}
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="navbar bg-black text-white shadow-md px-6 py-3 flex items-center"
//           >

//             <div className="flex-1 text-center">
//               <Link
//                 to="/"
//                 className="text-xl font-bold text-white hover:text-gray-300"
//               >
//                 campusCommute
//               </Link>
//             </div>
//             <div className="flex-1 flex justify-end items-center gap-4">
//               <span className="text-gray-300">Welcome, {user.name}</span>
//               <div className="dropdown dropdown-end">
//                 <motion.div whileHover={{ scale: 1.1 }}>
//                   <div
//                     tabIndex={0}
//                     role="button"
//                     className="btn btn-ghost btn-circle avatar border-2 border-white"
//                   >
//                     <div className="w-10 h-10 rounded-full overflow-hidden">
//                       <img
//                         alt="user profile"
//                         src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//                 <ul
//                   tabIndex={0}
//                   className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-md shadow-lg mt-3 w-20 p-2 text-left"
//                 >
//                   <li>
//                     <Link
//                       to="/profile"
//                       className="hover:bg-gray-700 p-2 rounded-md"
//                     >
//                       Profile
//                     </Link>
//                   </li>
//                   {/* <li><a className="hover:bg-gray-700 p-2 rounded-md">Settings</a></li> */}
//                   <li>
//                     <a
//                       onClick={handleLogout}
//                       className="hover:bg-red-600 p-2 rounded-md"
//                     >
//                       Logout
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </motion.div>

//           {/* Sidebar with smooth slide-in animation */}
//           <AnimatePresence>
//             {isSidebarOpen && (
//               <motion.div
//                 initial={{ x: -300 }}
//                 animate={{ x: 0 }}
//                 exit={{ x: -300 }}
//                 transition={{ duration: 0.3 }}
//                 className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-50 shadow-lg"
//               >
//                 <button
//                   className="absolute top-5 right-5 text-white text-2xl cursor-pointer"
//                   onClick={() => setIsSidebarOpen(false)}
//                 >
//                   ✖
//                 </button>
//                 <h2 className="text-2xl font-bold mb-6">Services</h2>
//                 <ul className="space-y-3">
//                   <li>
//                     <Link
//                       to="/applypass"
//                       className="block p-2 hover:bg-gray-700"
//                     >
//                       Apply for Pass
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/viewpass"
//                       className="block p-2 hover:bg-gray-700"
//                     >
//                       View Pass Status
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/help" className="block p-2 hover:bg-gray-700">
//                       Help
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/about" className="block p-2 hover:bg-gray-700">
//                       About Us
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to="/chat" className="block p-2 hover:bg-gray-700">
//                       Chat Now
//                     </Link>
//                   </li>
//                 </ul>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </>
//       )}
//     </div>
//   );
// }

// export default Admin_Navbar;
