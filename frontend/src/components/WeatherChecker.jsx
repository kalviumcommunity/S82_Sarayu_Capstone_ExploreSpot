import React, { useState } from "react";

const WeatherChecker = () => {
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          ⛅ Live Weather Checker
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter any city to check real-time weather.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Check Weather
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherChecker;
