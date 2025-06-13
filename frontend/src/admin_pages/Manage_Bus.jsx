import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBus = () => {
  const [buses, setBuses] = useState([]);
  const [editingBus, setEditingBus] = useState(null);
  const [formData, setFormData] = useState({
    busNumber: "",
    source: "",
    destination: "",
    city: "",
    departureTime: "",
    arrivalTime: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/getallbuses");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses", error);
    }
  };

  const deleteBus = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/deletebus/${id}`);
      setBuses(buses.filter((bus) => bus._id !== id));
    } catch (error) {
      console.error("Error deleting bus", error);
    }
  };

  const updateBus = async () => {
    try {
      await axios.put(`http://localhost:3000/admin/updatebus/${editingBus._id}`, formData);
      setEditingBus(null);
      setFormData({ busNumber: "", source: "", destination: "", city: "", departureTime: "", arrivalTime: "" });
      fetchBuses();
    } catch (error) {
      console.error("Error updating bus", error);
    }
  };

  const addBus = async () => {
    try {
      await axios.post("http://localhost:3000/admin/addbuses", formData);
      setFormData({ busNumber: "", source: "", destination: "", city: "", departureTime: "", arrivalTime: "" });
      setShowAddForm(false);
      fetchBuses();
    } catch (error) {
      console.error("Error adding bus", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Buses</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Cancel" : "Add Bus"}
      </button>

      {showAddForm && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Add Bus</h3>
          <input type="text" placeholder="Bus Number" value={formData.busNumber} onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Source" value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Destination" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Departure Time" value={formData.departureTime} onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })} className="border p-2 w-full mb-2" />
          <input type="text" placeholder="Arrival Time" value={formData.arrivalTime} onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })} className="border p-2 w-full mb-2" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addBus}>Add Bus</button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
        <th className="border p-2">Bus Number</th>
            <th className="border p-2">Source</th>
            <th className="border p-2">Destination</th>
             <th className="border p-2">City</th>

           <th className="border p-2">Departure Time</th>
          <th className="border p-2">Arrival Time</th>
          <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus._id} className="text-center border">
              <td className="border p-2">{bus.busNumber}</td>
              <td className="border p-2">{bus.source}</td>
              <td className="border p-2">{bus.destination}</td>
              <td className="border p-2">{bus.city}</td>
              <td className="border p-2">{bus.departureTime}</td>
              <td className="border p-2">{bus.arrivalTime}</td>
              <td className="border p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => setEditingBus(bus)}>Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteBus(bus._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBus && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Edit Bus</h3>
          <input
            type="text"
            placeholder="Bus Number"
            value={formData.busNumber}
            onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Departure Time"
            value={formData.departureTime}
            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Arrival Time"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={updateBus}
          >
            Update Bus
          </button>
        </div>
      )}

      
      {/* {editingBus && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold">Edit Bus</h3>
          <input type="text" placeholder="Bus Number" value={formData.busNumber} onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })} className="border p-2 w-full mb-2" />
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={updateBus}>Update Bus</button>
        </div>
      )} */}
    </div>
  );
};

export default ManageBus;





// 2.
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const ManageBus = () => {
//   const [buses, setBuses] = useState([]);
//   const [editingBus, setEditingBus] = useState(null);
//   const [formData, setFormData] = useState({
//     busNumber: "",
//     source: "",
//     destination: "",
//     city: "",
//     departureTime: "",
//     arrivalTime: "",
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   const fetchBuses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/admin/getallbuses");
//       setBuses(response.data);
//     } catch (error) {
//       console.error("Error fetching buses", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/admin/deletebus/${id}`);
//       setBuses(buses.filter((bus) => bus._id !== id));
//     } catch (error) {
//       console.error("Error deleting bus", error);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingBus) {
//         await axios.put(`http://localhost:3000/admin/updatebus/${editingBus._id}`, formData);
//       } else {
//         await axios.post("http://localhost:3000/admin/addbuses", formData);
//       }
//       setFormData({ busNumber: "", source: "", destination: "", city: "", departureTime: "", arrivalTime: "" });
//       setEditingBus(null);
//       setShowForm(false);
//       fetchBuses();
//     } catch (error) {
//       console.error("Error saving bus", error);
//     }
//   };

//   const handleEdit = (bus) => {
//     setEditingBus(bus);
//     setFormData(bus);
//     setShowForm(true);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Buses</h2>
//       <button
//         className="bg-green-500 text-white px-4 py-2 mb-4 rounded"
//         onClick={() => {
//           setShowForm(!showForm);
//           setEditingBus(null);
//           setFormData({ busNumber: "", source: "", destination: "", city: "", departureTime: "", arrivalTime: "" });
//         }}
//       >
//         {showForm ? "Cancel" : "Add Bus"}
//       </button>

//       {showForm && (
//         <div className="mt-6 p-4 border rounded bg-gray-100 shadow-md">
//           <h3 className="text-lg font-semibold mb-3">{editingBus ? "Edit Bus" : "Add Bus"}</h3>
//           {Object.keys(formData).map((key) => (
//             <input
//               key={key}
//               type="text"
//               placeholder={key.replace(/([A-Z])/g, " $1").trim()}
//               value={formData[key]}
//               onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
//               className="border p-2 w-full mb-2 rounded"
//             />
//           ))}
//           <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
//             {editingBus ? "Update Bus" : "Add Bus"}
//           </button>
//         </div>
//       )}

//       <table className="w-full border-collapse border border-gray-300 mt-4">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Bus Number</th>
//             <th className="border p-2">Source</th>
//             <th className="border p-2">Destination</th>
//             <th className="border p-2">City</th>
//             <th className="border p-2">Departure Time</th>
//             <th className="border p-2">Arrival Time</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {buses.map((bus) => (
//             <tr key={bus._id} className="text-center border">
//               <td className="border p-2">{bus.busNumber}</td>
//               <td className="border p-2">{bus.source}</td>
//               <td className="border p-2">{bus.destination}</td>
//               <td className="border p-2">{bus.city}</td>
//               <td className="border p-2">{bus.departureTime}</td>
//               <td className="border p-2">{bus.arrivalTime}</td>
//               <td className="border p-2 flex justify-center space-x-4">
//                 <button className="text-blue-500 text-lg" onClick={() => handleEdit(bus)}>
//                   <FaEdit />
//                 </button>
//                 <button className="text-red-500 text-lg" onClick={() => handleDelete(bus._id)}>
//                   <FaTrash />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageBus;





// 3.
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ManageBus = () => {
//   const [buses, setBuses] = useState([]);
//   const [editingBus, setEditingBus] = useState(null);
//   const [formData, setFormData] = useState({
//     busNumber: "",
//     source: "",
//     destination: "",
//     city: "",
//     departureTime: "",
//     arrivalTime: "",
//   });

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   const fetchBuses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/admin/getallbuses");
//       setBuses(response.data);
//     } catch (error) {
//       console.error("Error fetching buses", error);
//     }
//   };
  
// //   const fetchBuses = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/admin/getbuses?city=New York");
// //       setBuses(response.data);
// //     } catch (error) {
// //       console.error("Error fetching buses", error);
// //     }
// //   };

//   const deleteBus = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/admin/deletebus/${id}`);
//       setBuses(buses.filter((bus) => bus._id !== id));
//     } catch (error) {
//       console.error("Error deleting bus", error);
//     }
//   };

//   const updateBus = async () => {
//     try {
//       await axios.put(`http://localhost:3000/admin/updatebus/${editingBus._id}`, formData);
//       setEditingBus(null);
//       setFormData({ busNumber: "", source: "", destination: "", city: "", departureTime: "", arrivalTime: "" });
//       fetchBuses();
//     } catch (error) {
//       console.error("Error updating bus", error);
//     }
//   };

//   const handleEdit = (bus) => {
//     setEditingBus(bus);
//     setFormData(bus);
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Manage Buses</h2>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border p-2">Bus Number</th>
//             <th className="border p-2">Source</th>
//             <th className="border p-2">Destination</th>
//             <th className="border p-2">City</th>

//             <th className="border p-2">Departure Time</th>
//             <th className="border p-2">Arrival Time</th>
//             <th className="border p-2">Actions</th>



//           </tr>
//         </thead>
//         <tbody>
//           {buses.map((bus) => (
//             <tr key={bus._id} className="text-center border">
//               <td className="border p-2">{bus.busNumber}</td>
//               <td className="border p-2">{bus.source}</td>
//               <td className="border p-2">{bus.destination}</td>
//               <td className="border p-2">{bus.city}</td>
//               <td className="border p-2">{bus.departureTime}</td>
//               <td className="border p-2">{bus.arrivalTime}</td>

//               <td className="border p-2">
//                 <button
//                   className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
//                   onClick={() => handleEdit(bus)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                   onClick={() => deleteBus(bus._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {editingBus && (
//         <div className="mt-6 p-4 border rounded bg-gray-100">
//           <h3 className="text-lg font-semibold">Edit Bus</h3>
//           <input
//             type="text"
//             placeholder="Bus Number"
//             value={formData.busNumber}
//             onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Source"
//             value={formData.source}
//             onChange={(e) => setFormData({ ...formData, source: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Destination"
//             value={formData.destination}
//             onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="City"
//             value={formData.city}
//             onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Departure Time"
//             value={formData.departureTime}
//             onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <input
//             type="text"
//             placeholder="Arrival Time"
//             value={formData.arrivalTime}
//             onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
//             className="border p-2 w-full mb-2"
//           />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded"
//             onClick={updateBus}
//           >
//             Update Bus
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageBus;
