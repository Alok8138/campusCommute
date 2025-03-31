import React from "react";
import { Link } from "react-router-dom";

const Admin_Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/bus-management" className="p-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 text-center">
            Manage Buses
          </Link>
          <Link to="/admin/student-details" className="p-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-center">
            View Student Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin_Home;
