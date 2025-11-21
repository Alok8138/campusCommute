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

  // Auto hide messages
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
      const res = await axios.get("http://localhost:3000/admin/getallbuses", {
        withCredentials: true,
      });
      setBuses(res.data);
    } catch (error) {
      setError("Error fetching buses.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
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
          { withCredentials: true }
        );
        setSuccess(res.data.message);
      } else {
        const res = await axios.post(
          "http://localhost:3000/admin/addbuses",
          formData,
          { withCredentials: true }
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
    setFormData({
      busNumber: bus.busNumber || "",
      source: bus.source || "",
      destination: bus.destination || "",
      city: bus.city || "",
      departureTime: bus.departureTime || "",
      arrivalTime: bus.arrivalTime || "",
    });
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
        withCredentials: true,
      });
      fetchBuses();
    } catch (error) {
      setError("Error deleting bus.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Manage Buses
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View, add, edit, and remove buses from the system.
          </p>
        </div>

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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition text-sm md:text-base"
        >
          + Add Bus
        </button>
      </div>

      {/* Alerts */}
      <div className="max-w-6xl mx-auto mb-4">
        {success && (
          <div className="mb-3 rounded-lg border border-green-300 bg-green-50 px-4 py-2 text-sm text-green-800">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-3 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">
            {error}
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {buses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No buses found. Click{" "}
            <span className="font-semibold text-blue-600">“Add Bus”</span> to
            create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto min-w-max text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Bus No
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Source
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Destination
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    City
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Departure
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600">
                    Arrival
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus, idx) => (
                  <tr
                    key={bus._id}
                    className={`border-t ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {bus.busNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{bus.source}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {bus.destination}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{bus.city}</td>
                    <td className="px-4 py-3 text-gray-700">
                      {bus.departureTime}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {bus.arrivalTime}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(bus)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bus._id)}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl w-full max-w-md mx-3 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {editingId ? "Update Bus" : "Add Bus"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {[
                "busNumber",
                "source",
                "destination",
                "city",
                "departureTime",
                "arrivalTime",
              ].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                  </label>
                  <input
                    type={field.includes("Time") ? "time" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                    required
                  />
                </div>
              ))}

              {error && (
                <p className="text-red-500 text-xs mt-1">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-xs mt-1">{success}</p>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm border rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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



  // import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Manage_Bus = () => {
//   const [buses, setBuses] = useState([]);
//   const [formData, setFormData] = useState({
//     busNumber: "",
//     source: "",
//     destination: "",
//     city: "",
//     departureTime: "",
//     arrivalTime: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   // Automatically hide messages after 3 seconds
//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => {
//         setSuccess("");
//         setError("");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error]);

//   const fetchBuses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3000/admin/getallbuses`, {
//         withCredentials: true  // Add this
//       });
//       setBuses(res.data);
//     } catch (error) {
//       setError("Error fetching buses.");
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     try {
//       if (editingId) {
//         const confirmEdit = window.confirm(
//           "Are you sure you want to update this bus?"
//         );
//         if (!confirmEdit) return;

//         const res = await axios.put(
//           `http://localhost:3000/admin/updatebus/${editingId}`,
//           formData,
//           { withCredentials: true }  // Add this
//         );
//         setSuccess(res.data.message);
//       } else {
//         const res = await axios.post(
//           `http://localhost:3000/admin/addbuses`,
//           formData,
//           { withCredentials: true }  // Add this
//         );
//         setSuccess(res.data);
//       }
//       fetchBuses();
//       setFormData({
//         busNumber: "",
//         source: "",
//         destination: "",
//         city: "",
//         departureTime: "",
//         arrivalTime: "",
//       });
//       setEditingId(null);
//       setShowModal(false);
//     } catch (error) {
//       setError(error.response?.data?.message || "Error saving bus data.");
//     }
//   };

//   const handleEdit = (bus) => {
//     setFormData(bus);
//     setEditingId(bus._id);
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this bus?"
//     );
//     if (!confirmDelete) return;
  
//     try {
//       await axios.delete(`http://localhost:3000/admin/deletebus/${id}`, {
//         withCredentials: true  // Add this
//       });
//       fetchBuses();
//     } catch (error) {
//       setError("Error deleting bus.");
//     }
//   };


  
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold text-center mb-6">Manage Buses</h2>

//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => {
//             setFormData({
//               busNumber: "",
//               source: "",
//               destination: "",
//               city: "",
//               departureTime: "",
//               arrivalTime: "",
//             });
//             setEditingId(null);
//             setShowModal(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Add Bus
//         </button>
//       </div>

//       <div>
//         {buses.length === 0 ? (
//           <p>No buses found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border border-gray-300">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="border p-2">Bus No</th>
//                   <th className="border p-2">Source</th>
//                   <th className="border p-2">Destination</th>
//                   <th className="border p-2">City</th>
//                   <th className="border p-2">Departure</th>
//                   <th className="border p-2">Arrival</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buses.map((bus) => (
//                   <tr key={bus._id} className="bg-white border">
//                     <td className="border p-2">{bus.busNumber}</td>
//                     <td className="border p-2">{bus.source}</td>
//                     <td className="border p-2">{bus.destination}</td>
//                     <td className="border p-2">{bus.city}</td>
//                     <td className="border p-2">{bus.departureTime}</td>
//                     <td className="border p-2">{bus.arrivalTime}</td>
//                     <td className="border p-2 space-x-2">
//                       <button
//                         onClick={() => handleEdit(bus)}
//                         className="px-2 py-1 bg-yellow-400 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(bus._id)}
//                         className="px-2 py-1 bg-red-500 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold">
//                 {editingId ? "Update Bus" : "Add Bus"}
//               </h3>
//               <button onClick={() => setShowModal(false)}>✕</button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               {[
//                 "busNumber",
//                 "source",
//                 "destination",
//                 "city",
//                 "departureTime",
//                 "arrivalTime",
//               ].map((field) => (
//                 <div key={field}>
//                   <label className="block font-semibold capitalize mb-1">
//                     {field.replace(/([A-Z])/g, " $1")}
//                   </label>
//                   <input
//                     type={field.includes("Time") ? "time" : "text"}
//                     name={field}
//                     value={formData[field]}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border rounded-lg"
//                     required
//                   />
//                 </div>
//               ))}

//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               {success && <p className="text-green-500 text-sm">{success}</p>}

//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   {editingId ? "Update" : "Add"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Manage_Bus;
