


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







































// ---TESting----------// AnimatedBus.jsx (inline or separate file)
// import React, { useMemo, useRef, useState } from 'react';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import { BASE_URL } from '../utils/constants';

// // Import your animated objects
// import { AnimatedBus } from '../animation/AnimatedBus.jsx';
// import { RobotGuide } from '../animation/RobotGuide.jsx';

// const container = {
//   hidden: { opacity: 0 },
//   show: { opacity: 1, transition: { when: 'beforeChildren', staggerChildren: 0.15 } }
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
//   show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
// };

// const springCard = {
//   hidden: { opacity: 0, scale: 0.96 },
//   show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 16 } }
// };

// const rowVariant = (i) => ({
//   hidden: { opacity: 0, x: -24 },
//   show: { opacity: 1, x: 0, transition: { delay: 0.04 * i, duration: 0.35 } }
// });

// function Homepage() {
//   const [city, setCity] = useState('');
//   const [buses, setBuses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [inputFocused, setInputFocused] = useState(false);

//   const inputRef = useRef(null);

//   const formattedCity = useMemo(() => {
//     return city
//       .toLowerCase()
//       .split(' ')
//       .filter(Boolean)
//       .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//       .join(' ');
//   }, [city]);

//   const handleSearch = async () => {
//     if (!city.trim()) {
//       setError('Please enter a city');
//       setBuses([]);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(`${BASE_URL}/getbuses?city=${encodeURIComponent(formattedCity)}`);
//       const data = response.data || [];
//       setBuses(data);
//       if (!data.length) setError('No buses found for this city.');
//     } catch (e) {
//       setBuses([]);
//       setError('No buses found for this city.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 text-black px-4 overflow-hidden"
//       variants={container}
//       initial="hidden"
//       animate="show"
//     >
//       {/* Animated bus in the background; paused while loading or when user is typing */}
//       <AnimatedBus active={!loading && !inputFocused} />

//       <motion.h1 className="text-5xl font-extrabold text-center tracking-tight" variants={fadeUp}>
//         Your Campus
//       </motion.h1>
//       <motion.h2 className="text-3xl font-bold text-center text-gray-700" variants={fadeUp}>
//         Your Way
//       </motion.h2>

//       <motion.div
//         variants={springCard}
//         className="relative mt-8 w-full max-w-md rounded-2xl border border-white/40 bg-white/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6"
//       >
//         {/* Soft animated conic ring */}
//         <motion.div
//           aria-hidden
//           className="pointer-events-none absolute -inset-[2px] rounded-2xl"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0.3, 0.6, 0.3] }}
//           transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//           style={{
//             background:
//               'conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.15), rgba(16,185,129,0.15), rgba(244,114,182,0.15), rgba(59,130,246,0.15))'
//           }}
//         />

//         {/* Robot guide positioned relative to the card; follows/indicates the input */}
//         <div className="absolute right-3 -top-10 md:right-2 md:-top-12">
//           <RobotGuide attachToSelector="#city-input" />
//         </div>

//         <div className="relative w-full">
//           <motion.span
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 select-none"
//             initial={{ rotate: -8, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.1 }}
//           >
//             🔍
//           </motion.span>

//           <motion.input
//             id="city-input"
//             ref={inputRef}
//             type="text"
//             value={city}
//             onFocus={() => setInputFocused(true)}
//             onBlur={() => setInputFocused(false)}
//             onChange={(e) => setCity(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//             placeholder="Enter your city"
//             className="w-full p-3 pl-10 rounded-lg bg-white text-gray-900 placeholder-gray-400 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-400 transition"
//             whileFocus={{ boxShadow: '0 0 0 6px rgba(99,102,241,0.15)', scale: 1.005 }}
//           />
//         </div>

//         <motion.button
//           onClick={handleSearch}
//           className="relative w-full mt-4 bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-800 overflow-hidden"
//           whileHover={{ y: -1, scale: 1.01 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <motion.span
//             aria-hidden
//             className="absolute inset-0"
//             initial={false}
//             whileHover={{
//               background:
//                 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.12), transparent 40%)'
//             }}
//             transition={{ type: 'tween', duration: 0.15 }}
//             onMouseMove={(e) => {
//               const rect = e.currentTarget.getBoundingClientRect();
//               e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
//               e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
//             }}
//           />
//           <span className="relative z-10">Show Schedule</span>
//         </motion.button>
//       </motion.div>

//       {/* Loading skeleton */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             key="skeleton"
//             className="mt-6 w-full max-w-4xl space-y-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <div className="h-6 w-48 rounded-md bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
//             <div className="h-40 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Error / Empty states */}
//       <AnimatePresence>
//         {error && !loading && (
//           <motion.p
//             key="error"
//             className="mt-4 text-red-600 font-medium"
//             initial={{ y: 8, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: -8, opacity: 0 }}
//           >
//             {error}
//           </motion.p>
//         )}
//       </AnimatePresence>

//       {/* Results table */}
//       <AnimatePresence>
//         {buses.length > 0 && !loading && (
//           <motion.div
//             key="table"
//             className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-6 w-full max-w-4xl overflow-x-auto"
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ duration: 0.35 }}
//           >
//             <table className="w-full border-collapse text-center">
//               <thead className="bg-gray-50 text-gray-700">
//                 <tr>
//                   {['Bus Number', 'Source', 'Destination', 'City', 'Departure Time', 'Arrival Time'].map((h, i) => (
//                     <motion.th
//                       key={h}
//                       className="py-3 px-4 border-b"
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.02 * i, duration: 0.3 }}
//                     >
//                       {h}
//                     </motion.th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {buses.map((bus, index) => (
//                   <motion.tr
//                     key={`${bus.busNumber}-${index}`}
//                     className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b cursor-default`}
//                     variants={rowVariant(index)}
//                     initial="hidden"
//                     animate="show"
//                     whileHover={{ scale: 1.01, rotate: 0.2, transition: { duration: 0.15 } }}
//                   >
//                     <td className="py-3 px-4">{bus.busNumber}</td>
//                     <td className="py-3 px-4">{bus.source}</td>
//                     <td className="py-3 px-4">{bus.destination}</td>
//                     <td className="py-3 px-4">{bus.city}</td>
//                     <td className="py-3 px-4">{bus.departureTime}</td>
//                     <td className="py-3 px-4">{bus.arrivalTime}</td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// export default Homepage;
