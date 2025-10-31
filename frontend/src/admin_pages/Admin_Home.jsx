// import React from "react";
// import { Link } from "react-router-dom";

// const Admin_Home = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Link to="/admin/bus-management" className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 text-center">
//             Manage Buses
//           </Link>
//           <Link to="/admin/student-details" className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-center">
//             View Student Details
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin_Home;


// #---------------------------------------------------------------



import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bus, Users, School, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Admin_Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      to: "/admin/bus-management",
      label: "Manage Buses",
      color: "bg-blue-500 hover:bg-blue-600",
      Icon: Bus,
    },
    {
      to: "/admin/student-details",
      label: "View Student Details",
      color: "bg-green-500 hover:bg-green-600",
      Icon: Users,
    },
    {
      to: "/admin/college-details",
      label: "Add College Details",
      color: "bg-sky-500 hover:bg-sky-600",
      Icon: School,
    },
  ];

  const handleLogout = async () => {
    try {
      // Clear local frontend state first
      localStorage.removeItem('token_admin');
      sessionStorage.clear();
      // Perform a top-level navigation to backend admin logout so the browser
      // sends SameSite=lax cookies and the server clears the cookie and redirects
      window.location.href = `${BASE_URL}/admin/logout`;
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: clear state and navigate to login
      localStorage.removeItem('token_admin');
      sessionStorage.clear();
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto bg-white p-10 shadow-2xl rounded-2xl">
        {/* Header with logout button */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </div>

        {/* Dashboard cards */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {cards.map(({ to, label, color, Icon }, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-xl shadow-md text-white text-center p-6 transition-all duration-300 cursor-pointer ${color}`}
            >
              <Link to={to} className="flex flex-col items-center space-y-4">
                <Icon size={40} />
                <span className="text-lg font-semibold">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin_Home;


// -------------------------------------------------------

// import React from "react";
// import { Link } from "react-router-dom";
// import { Bus, Users, School } from "lucide-react";
// import { motion } from "framer-motion";

// const Admin_Home = () => {
//   const cards = [
//     {
//       to: "/admin/bus-management",
//       label: "Manage Buses",
//       color: "bg-blue-500 hover:bg-blue-600",
//       Icon: Bus,
//     },
//     {
//       to: "/admin/student-details",
//       label: "View Student Details",
//       color: "bg-green-500 hover:bg-green-600",
//       Icon: Users,
//     },
//     {
//       to: "/admin/college-details",
//       label: "Add College Details",
//       color: "bg-sky-500 hover:bg-sky-600",
//       Icon: School,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
//       <div className="max-w-5xl mx-auto bg-white p-10 shadow-2xl rounded-2xl">
//         <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
//           {cards.map(({ to, label, color, Icon }, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className={`rounded-xl shadow-md text-white text-center p-6 transition-all duration-300 cursor-pointer ${color}`}
//             >
//               <Link to={to} className="flex flex-col items-center space-y-4">
//                 <Icon size={40} />
//                 <span className="text-lg font-semibold">{label}</span>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin_Home;

