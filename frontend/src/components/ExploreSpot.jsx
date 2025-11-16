import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ExploreSpot = () => {
  const [spots, setSpots] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Beaches", "Hills", "Cities", "Adventure", "Historical"];
  const [category, setCategory] = useState("All");

  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await axios.get("http://localhost:5000/spots");
        setSpots(res.data);
      } catch (err) {
        console.error("Failed to fetch spots:", err);
      }
    };

    fetchSpots();
  }, []);

  const toggleLike = (id) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === id ? { ...spot, likes: (spot.likes || 0) + 1 } : spot
      )
    );
  };

  const clearFilters = () => {
    setCategory("All");
    setLocationFilter("All");
  };

  const filteredSpots = spots.filter((spot) => {
    const matchesSearch = (spot.name + spot.location + spot.description)
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      spot.category?.toLowerCase() === category.toLowerCase();

    const matchesLocation =
      locationFilter === "All" ||
      spot.location.toLowerCase() === locationFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-10">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">
        Explore Travel Experiences 🌍
      </h1>

      {/* RIGHT-SIDE FILTER BUTTON */}
      <div className="flex justify-end max-w-7xl mx-auto mb-6">
        <button
          onClick={() => setShowFilters(true)}
          className="bg-white px-5 py-2 rounded-xl shadow-lg border border-purple-300
          hover:bg-purple-100 transition text-purple-700 font-semibold flex items-center gap-2"
        >
          ⚙️
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by name, location, or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl px-5 py-3 rounded-2xl border border-gray-400 shadow bg-white 
          focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* RIGHT-SIDE FILTER PANEL WITH CLICK-OUTSIDE CLOSE */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setShowFilters(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-80 bg-white shadow-xl rounded-2xl p-8 fixed right-10 top-40 z-50"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFilters(false)}
                className="absolute top-3 right-4 text-xl text-gray-600"
              >
                ✖
              </button>

              <h3 className="text-2xl font-bold text-purple-700 mb-4">Filters</h3>

              {/* Category */}
              <p className="font-semibold text-gray-600 mb-2">Category:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1 rounded-full border ${
                      category === cat
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Location */}
              <p className="font-semibold text-gray-600 mb-2">Location:</p>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-400"
              >
                <option value="All">All</option>
                {[...new Set(spots.map((spot) => spot.location))].map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="mt-6 bg-red-500 text-white px-5 py-2 rounded-xl w-full"
              >
                Clear Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {filteredSpots.length > 0 ? (
          filteredSpots.map((spot) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-xl rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={`http://localhost:5000${spot.imageUrl}`}
                alt={spot.name}
                className="w-full h-60 object-cover"
                onClick={() => setSelectedSpot(spot)}
              />

              <div className="p-5">
                <div className="flex justify-between">
                  <h2
                    className="text-xl font-bold text-purple-700"
                    onClick={() => setSelectedSpot(spot)}
                  >
                    {spot.name}
                  </h2>

                  <button
                    onClick={() => toggleLike(spot.id)}
                    className="text-red-500 text-2xl"
                  >
                    ❤️
                  </button>
                </div>

                <p className="text-purple-600 font-semibold">📍 {spot.location}</p>

                <p className="text-gray-700 mt-3 line-clamp-3">{spot.description}</p>

                <p className="text-sm text-gray-500 mt-3">
                  ❤️ {spot.likes || 0} likes
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
          
          </p>
        )}
      </div>

      {/* Detail Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 relative">
            <button
              onClick={() => setSelectedSpot(null)}
              className="absolute top-3 right-3 text-gray-700 text-2xl"
            >
              ✖
            </button>

            <img
              src={`http://localhost:5000${selectedSpot.imageUrl}`}
              className="w-full h-72 object-cover rounded-xl"
              alt=""
            />

            <h2 className="text-3xl font-bold text-purple-700 mt-5">
              {selectedSpot.name}
            </h2>

            <p className="text-purple-600 font-semibold text-lg mt-2">
              📍 {selectedSpot.location}
            </p>

            <p className="text-gray-700 mt-4 text-lg">
              {selectedSpot.description}
            </p>

            <div className="mt-4 text-gray-600">
              ❤️ {selectedSpot.likes || 0} likes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreSpot;
