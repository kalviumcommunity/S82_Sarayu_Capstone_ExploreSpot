import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreSpots = () => {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await api.get("/spots"); // Update endpoint if needed
        setSpots(response.data);
      } catch (error) {
        console.error("Error fetching spots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 text-gray-800 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800 drop-shadow-md">
        Explore Spots
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading spots...</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {spots.map((spot, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-80 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md transition hover:scale-105 duration-300"
            >
              <img
                src={spot.image || "https://source.unsplash.com/400x250/?travel"}
                alt={spot.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-purple-700">{spot.name}</h2>
                <p className="text-gray-600 italic">{spot.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/home-page"
          className="inline-block bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ExploreSpots;
