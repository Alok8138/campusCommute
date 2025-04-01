import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Manage_College = () => {
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    college: "",
    branch: "",
    semester: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/addCollege`);
      setColleges(res.data);
    } catch (error) {
      setError("Error fetching college details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(`${BASE_URL}/admin/addCollege`, formData);
      setSuccess(res.data.message);
      fetchColleges();
      setFormData({ college: "", branch: "", semester: "", start_date: "", end_date: "" });
      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error adding college.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Colleges</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add College
        </button>
      </div>

      {/* College List */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Existing Colleges</h3>
        {colleges.length === 0 ? (
          <p>No colleges found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">College</th>
                <th className="border p-2">Branch</th>
                <th className="border p-2">Semester</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">End Date</th>
              </tr>
            </thead>
            <tbody>
              {colleges.map((college, index) => (
                <tr key={index} className="bg-white border">
                  <td className="border p-2">{college.college}</td>
                  <td className="border p-2">{college.branch}</td>
                  <td className="border p-2">{college.semester}</td>
                  <td className="border p-2">{new Date(college.start_date).toLocaleDateString()}</td>
                  <td className="border p-2">{new Date(college.end_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add College Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New College</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">College Name</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-3">{success}</p>}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_College;

