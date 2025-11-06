import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExploreSpots = () => {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Explore Shared Travel Experiences
      </h1>
      {spots.length === 0 ? (
        <p className="text-center text-gray-500">No experiences shared yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {spots.map((spot, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition border border-purple-100"
            >
              <img
                src={spot.image || "https://source.unsplash.com/400x300/?travel"}
                alt={spot.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-purple-800">{spot.name}</h2>
                <p className="text-purple-500 font-medium">{spot.location}</p>
                <p className="text-gray-700 mt-2">{spot.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default ExploreSpots;
