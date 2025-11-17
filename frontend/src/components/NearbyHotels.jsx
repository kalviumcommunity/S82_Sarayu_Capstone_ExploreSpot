import React, { useState } from "react";

const NearbyHotels = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 text-center">
          🏨 Nearby Hotels
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Search hotels near your location.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter city / location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700">
            Find Hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyHotels;
