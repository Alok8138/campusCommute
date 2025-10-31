import React, { useState, useEffect } from "react";
import axios from "axios";

const Manage_Bus = () => {
  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    busNumber: "",
    source: "",
    destination: "",
    city: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBuses();
  }, []);

  // Automatically hide messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fetchBuses = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/admin/getallbuses`, {
        withCredentials: true  // Add this
      });
      setBuses(res.data);
    } catch (error) {
      setError("Error fetching buses.");
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
      if (editingId) {
        const confirmEdit = window.confirm(
          "Are you sure you want to update this bus?"
        );
        if (!confirmEdit) return;

        const res = await axios.put(
          `http://localhost:3000/admin/updatebus/${editingId}`,
          formData,
          { withCredentials: true }  // Add this
        );
        setSuccess(res.data.message);
      } else {
        const res = await axios.post(
          `http://localhost:3000/admin/addbuses`,
          formData,
          { withCredentials: true }  // Add this
        );
        setSuccess(res.data);
      }
      fetchBuses();
      setFormData({
        busNumber: "",
        source: "",
        destination: "",
        city: "",
        departureTime: "",
        arrivalTime: "",
      });
      setEditingId(null);
      setShowModal(false);
    } catch (error) {
      setError(error.response?.data?.message || "Error saving bus data.");
    }
  };

  const handleEdit = (bus) => {
    setFormData(bus);
    setEditingId(bus._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:3000/admin/deletebus/${id}`, {
        withCredentials: true  // Add this
      });
      fetchBuses();
    } catch (error) {
      setError("Error deleting bus.");
    }
  };


  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Buses</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setFormData({
              busNumber: "",
              source: "",
              destination: "",
              city: "",
              departureTime: "",
              arrivalTime: "",
            });
            setEditingId(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Bus
        </button>
      </div>

      <div>
        {buses.length === 0 ? (
          <p>No buses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Bus No</th>
                  <th className="border p-2">Source</th>
                  <th className="border p-2">Destination</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Departure</th>
                  <th className="border p-2">Arrival</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus._id} className="bg-white border">
                    <td className="border p-2">{bus.busNumber}</td>
                    <td className="border p-2">{bus.source}</td>
                    <td className="border p-2">{bus.destination}</td>
                    <td className="border p-2">{bus.city}</td>
                    <td className="border p-2">{bus.departureTime}</td>
                    <td className="border p-2">{bus.arrivalTime}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => handleEdit(bus)}
                        className="px-2 py-1 bg-yellow-400 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bus._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {editingId ? "Update Bus" : "Add Bus"}
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                "busNumber",
                "source",
                "destination",
                "city",
                "departureTime",
                "arrivalTime",
              ].map((field) => (
                <div key={field}>
                  <label className="block font-semibold capitalize mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={field.includes("Time") ? "time" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              ))}

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage_Bus;
