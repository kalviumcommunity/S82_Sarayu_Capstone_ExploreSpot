import React, { useEffect, useState } from "react";
import axios from "axios";

const GetHotels = () => {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/business");

        // Filter only Hotels
        const hotelsOnly = res.data.filter(
          (biz) =>
            biz.category &&
            biz.category.toLowerCase().includes("hotel")
        );

        setBusinesses(hotelsOnly);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchBusinesses();
  }, []);

  // SEARCH FILTER
  const filteredHotels = businesses.filter((biz) =>
    (biz.name + biz.location + biz.description + biz.category)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-10">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
        Hotels & Stays 🏨
      </h1>

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search hotels by name, location, or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl px-5 py-3 rounded-2xl border border-gray-400 shadow bg-white 
          focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* IF NO RESULTS */}
      {filteredHotels.length === 0 ? (
        <div className="flex justify-center mt-20">
          <p className="text-center text-gray-600 text-xl font-semibold bg-white/70 px-6 py-4 rounded-xl shadow">
            ❌ No matching hotels found
          </p>
        </div>
      ) : (
        /* HOTELS GRID */
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredHotels.map((biz) => (
            <div
              key={biz._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
            >
              {/* Image */}
              <img
                src={
                  biz.imageUrl
                    ? `http://localhost:5000${biz.imageUrl}`
                    : "https://source.unsplash.com/600x400/?hotel,room"
                }
                alt={biz.name}
                className="w-full h-52 object-cover"
              />

              {/* Hotel Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-purple-700">{biz.name}</h2>
                <p className="text-purple-600 font-medium">{biz.category}</p>
                <p className="text-gray-700 mt-2 line-clamp-3">{biz.description}</p>

                <p className="text-gray-700 mt-3 font-medium">📍 {biz.location}</p>
                <p className="text-gray-700">📞 {biz.contactInfo || biz.contact}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetHotels;
