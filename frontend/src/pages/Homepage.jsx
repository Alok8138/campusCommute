// import React from 'react'

// function Homepage() {
//   return (
//     <div>
//       <h1>Home page</h1>
//     </div>
//   )
// }

// export default Homepage





// import React, { useState } from "react";
// import axios from "axios";

// function Homepage() {
//   const [city, setCity] = useState("");
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/admin/getbuses?city=${city}`
//       );
//       setBuses(response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         setError("No buses found for this city.");
//       } else {
//         setError("An error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center flex-col">
//       <h1 className="text-3xl font-bold mb-4">Campus Commute</h1>
//       <div className="flex justify-center mb-4">
//         <input
//           type="text"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           placeholder="Search by city"
//           className="w-80 p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
//         />
//         <button
//           onClick={handleSearch}
//           className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Search
//         </button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="flex flex-col items-center">
//           {buses.length > 0 ? (
//             buses.map((bus) => (
//               <div
//                 key={bus.busNumber}
//                 className="bg-gray-100 p-4 mb-2 rounded-lg w-80"
//               >
//                 <h2 className="text-lg font-bold mb-1">{bus.busNumber}</h2>
//                 <p>
//                   From: {bus.source} to {bus.destination}
//                 </p>
//                 <p>City: {bus.city}</p>
//                 <p>Departure Time: {bus.departureTime}</p>
//                 <p>Arrival Time: {bus.arrivalTime}</p>
//               </div>
//             ))
//           ) : (
//             <p>No buses found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Homepage;








import React, { useState } from 'react';
import axios from 'axios';

function Homepage() {
    const [city, setCity] = useState('');
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
              `http://localhost:3000/admin/getbuses?city=${city}`
            );
            setBuses(response.data);
        } catch (error) {
            setError('No buses found for this city.');
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-3xl font-bold mb-4">Campus Commute</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search by city"
            className="w-80 p-2 pl-10 text-sm text-white-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-md"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Search
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          // <div className="flex flex-col items-center">
          //   {buses.length > 0 ? (
          //     <table className="w-80 text-center border border-gray-300 rounded-lg shadow-md">
          //       <thead className="bg-white-100">
          //         <tr>
          //           <th className="py-3 ">Bus Number</th>
          //           <th className="py-3 ">Source</th>
          //           <th className="py-3">Destination</th>
          //           <th className="py-3">City</th>
          //           <th className="py-3">Departure Time</th>
          //           <th className="py-3">Arrival Time</th>
          //         </tr>
          //       </thead>
          //       <tbody>
          //         {buses.map((bus) => (
          //           <tr
          //             key={bus.busNumber}
          //             className="border-b border-gray-300"
          //           >
          //             <td className="py-2 m-4">{bus.busNumber}</td>
          //             <td className="py-2 m-4">{bus.source}</td>
          //             <td className="py- m-4">{bus.destination}</td>
          //             <td className="py-2 m-4">{bus.city}</td>
          //             <td className="py-2 m-4">{bus.departureTime}</td>
          //             <td className="py-2 m-4">{bus.arrivalTime}</td>
          //           </tr>
          //         ))}
          //       </tbody>
          //     </table>
          //   ) : (
          //     <p>No buses found.</p>
          //   )}
          // </div>

          // <div className="flex flex-col items-center">
          //   {buses.length > 0 ? (
          //     <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          //       <table className="w-full text-center border border-gray-300 rounded-lg">
          //         <thead className="bg-gray-100">
          //           <tr>
          //             <th className="py-3 text-black">Bus Number</th>
          //             <th className="py-3 text-black">Source</th>
          //             <th className="py-3 text-black">Destination</th>
          //             <th className="py-3 text-black">City</th>
          //             <th className="py-3 text-black">Departure Time</th>
          //             <th className="py-3 text-black">Arrival Time</th>
          //           </tr>
          //         </thead>
          //         <tbody>
          //           {buses.map((bus) => (
          //             <tr
          //               key={bus.busNumber}
          //               className="border-b border-gray-300"
          //             >
          //               <td className="py-3 text-black">{bus.busNumber}</td>
          //               <td className="py-3 text-black">{bus.source}</td>
          //               <td className="py-3 text-black">{bus.destination}</td>
          //               <td className="py-3 text-black">{bus.city}</td>
          //               <td className="py-3 text-black">{bus.departureTime}</td>
          //               <td className="py-3 text-black">{bus.arrivalTime}</td>
          //             </tr>
          //           ))}
          //         </tbody>
          //       </table>
          //     </div>
          //   ) : (
          //     <p className="text-lg">No buses found.</p>
          //   )}
              // </div>
              
        //  <div className="flex flex-col items-center">
        //             {buses.length > 0 ? (
        //                 <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        //                     <table className="w-full text-center border border-gray-300 rounded-lg">
        //                         <thead className="bg-gray-100">
        //                             <tr>
        //                                 <th className="py-3 text-black border-r border-black">Bus Number</th>
        //                                 <th className="py-3 text-black border-r border-black">Source</th>
        //                                 <th className="py-3 text-black border-r border-black">Destination</th>
        //                                 <th className="py-3 text-black border-r border-black">City</th>
        //                                 <th className="py-3 text-black border-r border-black">Departure Time</th>
        //                                 <th className="py-3 text-black">Arrival Time</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {buses.map((bus) => (
        //                                 <tr key={bus.busNumber} className="border-b border-gray-300">
        //                                     <td className="py-3 text-black border-r border-black">{bus.busNumber}</td>
        //                                     <td className="py-3 text-black border-r border-black">{bus.source}</td>
        //                                     <td className="py-3 text-black border-r border-black">{bus.destination}</td>
        //                                     <td className="py-3 text-black border-r border-black">{bus.city}</td>
        //                                     <td className="py-3 text-black border-r border-black">{bus.departureTime}</td>
        //                                     <td className="py-3 text-black">{bus.arrivalTime}</td>
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             ) : (
        //                 <p className="text-lg">No buses found.</p>
        //             )}
              //         </div>
              
              <div className="flex flex-col items-center">
                    {buses.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 mb-12 w-128">
                            <table className="w-full text-center border border-gray-300 rounded-lg">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-4 text-black border-r border-black">Bus Number</th>
                                        <th className="py-4 text-black border-r border-black">Source</th>
                                        <th className="py-4 text-black border-r border-black">Destination</th>
                                        <th className="py-4 text-black border-r border-black">City</th>
                                        <th className="py-4 text-black border-r border-black">Departure Time</th>
                                        <th className="py-4 text-black">Arrival Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buses.map((bus) => (
                                        <tr key={bus.busNumber} className="border-b border-gray-300">
                                            <td className="py-4 text-black border-r border-black">{bus.busNumber}</td>
                                            <td className="py-4 text-black border-r border-black">{bus.source}</td>
                                            <td className="py-4 text-black border-r border-black">{bus.destination}</td>
                                            <td className="py-4 text-black border-r border-black">{bus.city}</td>
                                            <td className="py-4 text-black border-r border-black">{bus.departureTime}</td>
                                            <td className="py-4 text-black">{bus.arrivalTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-lg">No buses found.</p>
                    )}
                </div>

        )}
      </div>
    );
}

export default Homepage;
