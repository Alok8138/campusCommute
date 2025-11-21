
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BASE_URL } from "../utils/constants";

function Homepage() {
  const [city, setCity] = useState('');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      setError('Please enter a city');
      return;
    }
    
    const formattedCity = city
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(BASE_URL + `/getbuses?city=${formattedCity}`
      );
      setBuses(response.data);
    } catch (error) {
      setError('No buses found for this city.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <motion.h1
        className="text-5xl font-extrabold text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Your Campus
      </motion.h1>
      <motion.h2
        className="text-3xl font-extrabold text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Your Way
      </motion.h2>

      <motion.div 
        className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6 w-half max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter your city"
            className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        <motion.button
          onClick={handleSearch}
          className="w-full mt-4 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show Schedule
        </motion.button>
      </motion.div>
      
      {loading && <motion.p className="mt-4 text-gray-600" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>Loading...</motion.p>}
      {error && <motion.p className="mt-4 text-red-500" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>{error}</motion.p>}

      {buses.length > 0 && (
        <motion.div
          className="bg-gray-100 rounded-lg shadow-md p-6 mt-6 w-full max-w-4xl overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border-collapse text-center">
            <thead className="bg-gray-300 text-gray-800">
              <tr>
                <th className="py-3 px-4 border">Bus Number</th>
                <th className="py-3 px-4 border">Source</th>
                <th className="py-3 px-4 border">Destination</th>
                <th className="py-3 px-4 border">City</th>
                <th className="py-3 px-4 border">Departure Time</th>
                <th className="py-3 px-4 border">Arrival Time</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <motion.tr
                  key={bus.busNumber}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <td className="py-3 px-4">{bus.busNumber}</td>
                  <td className="py-3 px-4">{bus.source}</td>
                  <td className="py-3 px-4">{bus.destination}</td>
                  <td className="py-3 px-4">{bus.city}</td>
                  <td className="py-3 px-4">{bus.departureTime}</td>
                  <td className="py-3 px-4">{bus.arrivalTime}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

export default Homepage;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { BASE_URL } from "../utils/constants";
// import homepageImage from '../image/homepage.png'; // import the image

// function Homepage() {
//   const [city, setCity] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!city) {
//       setError('Please enter a city');
//       return;
//     }
//     const formattedCity = city
//       .toLowerCase()
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(BASE_URL + `/getbuses?city=${formattedCity}`);
//       setBuses(response.data);
//     } catch (error) {
//       setError('No buses found for this city.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white text-black px-4">
//       {/* Image on top for mobile, left for desktop */}
//       <div className="w-full md:w-1/2 flex justify-center md:items-center mb-8 md:mb-0">
//         <img
//           src={homepageImage}
//           alt="Campus commute"
//           className="max-w-[180px] max-h-[180px] md:max-w-[350px] md:max-h-[350px] object-contain"
//         />
//       </div>

//       {/* Right side on desktop, below image on mobile */}
//       <div className="w-full md:w-1/2 flex flex-col items-center">
//         <motion.h1
//           className="text-3xl md:text-5xl font-extrabold text-center"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Your Campus
//         </motion.h1>
//         <motion.h2
//           className="text-xl md:text-3xl font-extrabold text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//         >
//           Your Way
//         </motion.h2>

//         <motion.div 
//           className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg mt-6 w-full max-w-xs md:max-w-md"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="relative w-full">
//             <input
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//               placeholder="Enter your city"
//               className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
//             />
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
//           </div>
//           <motion.button
//             onClick={handleSearch}
//             className="w-full mt-4 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Show Schedule
//           </motion.button>
//         </motion.div>

//         {loading && <motion.p className="mt-4 text-gray-600" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>Loading...</motion.p>}
//         {error && <motion.p className="mt-4 text-red-500" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>{error}</motion.p>}

//         {buses.length > 0 && (
//           <motion.div
//             className="bg-gray-50 rounded-xl shadow-lg p-4 md:p-6 mt-6 w-full max-w-xs md:max-w-2xl overflow-x-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <table className="w-full border-collapse text-center rounded-lg overflow-hidden bg-gray-50">
//               <thead>
//                 <tr className="bg-purple-700 text-white">
//                   <th className="py-2 px-2 md:py-3 md:px-4">Bus Number</th>
//                   <th className="py-2 px-2 md:py-3 md:px-4">Source</th>
//                   <th className="py-2 px-2 md:py-3 md:px-4">Destination</th>
//                   <th className="py-2 px-2 md:py-3 md:px-4">City</th>
//                   <th className="py-2 px-2 md:py-3 md:px-4">Departure Time</th>
//                   <th className="py-2 px-2 md:py-3 md:px-4">Arrival Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {buses.map((bus, index) => (
//                   <tr
//                     key={bus.busNumber}
//                     className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-purple-100'} text-gray-900`}
//                   >
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.busNumber}</td>
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.source}</td>
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.destination}</td>
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.city}</td>
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.departureTime}</td>
//                     <td className="py-2 px-2 md:py-3 md:px-4">{bus.arrivalTime}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homepage;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { BASE_URL } from "../utils/constants";
// import homepageImage from '../image/homepage.png'; // import the image

// function Homepage() {
//   const [city, setCity] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (!city) {
//       setError('Please enter a city');
//       return;
//     }

//     const formattedCity = city
//       .toLowerCase()
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(BASE_URL + `/getbuses?city=${formattedCity}`);
//       setBuses(response.data);
//     } catch (error) {
//       setError('No buses found for this city.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="h-screen flex flex-row items-center justify-center bg-white text-black px-4">
//       {/* Left side - Image */}
//       <div className="w-1/2 flex justify-center">
//         <img 
//           src={homepageImage} 
//           alt="Campus commute" 
//           className="max-w-full max-h-[80vh] object-contain"
//         />
//       </div>

//       {/* Right side - Text and Search */}
//       <div className="w-1/2 flex flex-col items-center">
//         <motion.h1
//           className="text-5xl font-extrabold text-center"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Your Campus
//         </motion.h1>
//         <motion.h2
//           className="text-3xl font-extrabold text-center"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.3 }}
//         >
//           Your Way
//         </motion.h2>

//         <motion.div 
//           className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6 w-full max-w-md"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="relative w-full">
//             <input
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//               placeholder="Enter your city"
//               className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
//             />
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
//           </div>
//           <motion.button
//             onClick={handleSearch}
//             className="w-full mt-4 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-all duration-300 cursor-pointer"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Show Schedule
//           </motion.button>
//         </motion.div>

//         {loading && <motion.p className="mt-4 text-gray-600" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>Loading...</motion.p>}
//         {error && <motion.p className="mt-4 text-red-500" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>{error}</motion.p>}

//         {buses.length > 0 && (
//           <motion.div
//             className="bg-gray-100 rounded-lg shadow-md p-6 mt-6 w-full max-w-4xl overflow-x-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="bg-gray-50 rounded-xl shadow-lg p-6 mt-6 w-full max-w-4xl overflow-x-auto">
//   <table className="w-full border-collapse text-center rounded-lg overflow-hidden bg-gray-50">
//     <thead>
//       <tr className="bg-purple-700 text-white">
//         <th className="py-3 px-4">Bus Number</th>
//         <th className="py-3 px-4">Source</th>
//         <th className="py-3 px-4">Destination</th>
//         <th className="py-3 px-4">City</th>
//         <th className="py-3 px-4">Departure Time</th>
//         <th className="py-3 px-4">Arrival Time</th>
//       </tr>
//     </thead>
//     <tbody>
//       {buses.map((bus, index) => (
//         <tr
//           key={bus.busNumber}
//           className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-purple-100'} text-gray-900`}
//         >
//           <td className="py-3 px-4">{bus.busNumber}</td>
//           <td className="py-3 px-4">{bus.source}</td>
//           <td className="py-3 px-4">{bus.destination}</td>
//           <td className="py-3 px-4">{bus.city}</td>
//           <td className="py-3 px-4">{bus.departureTime}</td>
//           <td className="py-3 px-4">{bus.arrivalTime}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

           
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Homepage;













