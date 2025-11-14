import React, { useEffect, useState } from "react";
import axios from "axios";

const GetHotels = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/business");
        setBusinesses(res.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-10">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        Promoted Hotels & Businesses
      </h1>

      {businesses.length === 0 ? (
        <p className="text-center text-gray-500"></p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {businesses.map((biz) => (
            <div
              key={biz._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              <img
                src={`http://localhost:5000${biz.imageUrl}`}
                alt={biz.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold text-purple-700">{biz.name}</h2>
                <p className="text-purple-600">{biz.category}</p>
                <p className="text-gray-600 mt-2">{biz.description}</p>
                <p className="text-gray-700 mt-3 font-medium">📍 {biz.location}</p>
                <p className="text-gray-700">📞 {biz.contactInfo}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetHotels;
