import React, { useState } from "react";

const AITripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          🤖 AI Trip Planner
        </h1>

        <p className="text-gray-600 mb-6 text-center">
          Enter details and get AI-generated itineraries.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Number of days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Budget (optional)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
            Generate Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITripPlanner;
