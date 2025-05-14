import React, { useState } from "react";

const GetHotels = () => {
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic to fetch hotels goes here (API integration)
    alert(`Searching hotels in ${location}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">Find Hotels</h2>
        <form onSubmit={handleSearch} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. Paris"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-full font-semibold transition duration-200"
          >
            Search Hotels
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetHotels;
