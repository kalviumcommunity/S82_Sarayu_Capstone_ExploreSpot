import React, { useState } from "react";
import axios from "axios";

const AITripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePlan = async () => {
    setError("");
    setResult(null);

    if (!destination || !days) {
      setError("Destination and days are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/ai/test",
        {
          destination,
          days,
          budget,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to generate trip plan"
      );
    } finally {
      setLoading(false);
    }
  };

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

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Trip Summary
            </h2>
            <pre className="bg-gray-100 p-4 rounded-xl text-sm overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITripPlanner;
