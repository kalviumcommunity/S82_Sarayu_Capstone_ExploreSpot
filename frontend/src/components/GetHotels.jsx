import React, { useState, useEffect } from "react";
import axios from "axios";

const GetHotels = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/business");
        setBusinesses(res.data);
      } catch (err) {
        console.error("Error fetching businesses:", err);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-10">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        Promoted Hotels / Businesses
      </h1>

      {businesses.length === 0 ? (
        <p className="text-center text-gray-500">No businesses promoted yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {businesses.map((business) => (
            <div
              key={business._id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
            >
              {business.imageUrl && (
                <img
                  src={`http://localhost:5000${business.imageUrl}`}
                  alt={business.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}

              <h2 className="text-2xl font-bold text-purple-700">
                {business.name}
              </h2>

              <p className="text-purple-500 font-semibold">{business.category}</p>

              <p className="text-gray-600 mt-2">{business.description}</p>

              <p className="text-gray-800 mt-3">📍 {business.location}</p>

              <p className="text-gray-800">📞 {business.contactInfo}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetHotels;
