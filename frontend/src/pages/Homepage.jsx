import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black px-4">
      <h1 className="text-5xl font-extrabold text-center">Your Campus</h1>
      <h2 className="text-3xl font-extrabold text-center">Your Way</h2>
      <h3 className="text-lg text-gray-500 text-center">
        Get to your destination with ease
      </h3>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6 w-half max-w-md">
        <div className="relative w-full">
          {/* <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
          /> */}

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Enter your city"
            className="w-full p-3 pl-10 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />




          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        <button
          onClick={handleSearch}
          className="w-full mt-4 bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-gray-200"
        >
          Show Schedule
        </button>
      </div>

      {loading ? (
        <p className="mt-4 text-gray-600">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        buses.length > 0 && (
          <div className="bg-gray-100 rounded-lg shadow-md p-6 mt-6 w-full max-w-4xl overflow-x-auto">
            <div className="table-container">
              <table className="w-full border-collapse text-center">
                <thead className="bg-gray-300 text-gray-800">
                  <tr>
                    <th className="py-3 px-4 border border-gray-400">Bus Number</th>
                    <th className="py-3 px-4 border border-gray-400">Source</th>
                    <th className="py-3 px-4 border border-gray-400">Destination</th>
                    <th className="py-3 px-4 border border-gray-400">City</th>
                    <th className="py-3 px-4 border border-gray-400">Departure Time</th>
                    <th className="py-3 px-4 border border-gray-400">Arrival Time</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus, index) => (
                    <tr
                      key={bus.busNumber}
                      className={`border-t border-gray-400 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                    >
                      <td className="py-3 px-4">{bus.busNumber}</td>
                      <td className="py-3 px-4">{bus.source}</td>
                      <td className="py-3 px-4">{bus.destination}</td>
                      <td className="py-3 px-4">{bus.city}</td>
                      <td className="py-3 px-4">{bus.departureTime}</td>
                      <td className="py-3 px-4">{bus.arrivalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Homepage;
