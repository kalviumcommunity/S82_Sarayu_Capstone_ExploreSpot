import React, { useState } from "react";
import axios from "axios";

const TripPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    preferences: "",
  });

  const [loading, setLoading] = useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTripPlan(null);

    try {
      const payload = {
        destination: formData.destination,
        days: Number(formData.days),
        budget: formData.budget ? Number(formData.budget) : undefined,
        preferences: formData.preferences?.trim()
      };

      if (!payload.preferences) {
        delete payload.preferences;
      }

      const res = await axios.post(
        "http://localhost:5000/api/ai/test",
        payload,
        { timeout: 20000 }
      );

      const data = res.data;

      if (!data.itinerary || !Array.isArray(data.itinerary)) {
        throw new Error("Invalid itinerary received from AI");
      }

      setTripPlan(data);
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);

      setError(
        err.response?.data?.error ||
        err.response?.data?.details ||
        err.message ||
        "Failed to generate AI Trip Plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">
          🤖 AI Trip Planner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            name="days"
            placeholder="Total Days"
            type="number"
            value={formData.days}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            name="budget"
            placeholder="Budget (optional)"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="preferences"
            placeholder="Preferences (optional)"
            value={formData.preferences}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Plan"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}

        {tripPlan && (
          <div className="mt-8 bg-purple-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-2">📍 Summary</h2>
            <p className="mb-4">{tripPlan.summary}</p>

            <h3 className="text-lg font-medium mb-2">📅 Itinerary</h3>
            {tripPlan.itinerary.map((day, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow mb-3"
              >
                <h4 className="font-bold">
                  Day {day.day}: {day.title}
                </h4>
                <p>🌅 Morning: {day.morning}</p>
                <p>🌤 Afternoon: {day.afternoon}</p>
                <p>🌙 Evening: {day.evening}</p>
                <p>💸 Estimated: {day.estimatedCost}</p>
              </div>
            ))}

            {tripPlan.hotel_suggestions?.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-4">🏨 Hotels</h3>
                {tripPlan.hotel_suggestions.map((hotel, index) => (
                  <p key={index}>
                    • {hotel.name} — {hotel.priceRange}
                  </p>
                ))}
              </>
            )}

            <h3 className="text-lg font-medium mt-4">💰 Budget Estimate</h3>
            <p>{tripPlan.budgetEstimate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
