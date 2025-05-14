import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [businesses, setBusinesses] = useState([]);

  const featuredSpots = [
    {
      name: "Snowy Peaks",
      location: "Switzerland",
      image: "https://imgs.search.brave.com/pCGLwHQ0qCOLs0aXRstvHpurt1EDyZChGpcOHp71yMg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9yZXMu/Y2xvdWRpbmFyeS5j/b20vaHQ0bXI3ZGpr/L2ltYWdlL3VwbG9h/ZC9mX3dlYnAvZl93/ZWJwL3YxNjg3NzAw/NDI1L0FwcCUyMEFz/c2V0cy9XZVNraSUy/MGd1aWRlcy9za2kt/c2Vhc29uLW9wZW5p/bmctY2xvc2luZy1k/YXRlcy5qcGc",
    },
    {
      name: "Sunny Beach",
      location: "Thailand",
      image: "https://imgs.search.brave.com/QrVfoER2s1DEMlFD_7_TA18H41ZLYFXM8WW2RX5Z1zM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/dGhhaWxhbmQtYmVh/Y2guanBnP3dpZHRo/PTEwMDAmZm9ybWF0/PXBqcGcmZXhpZj0w/JmlwdGM9MA",
    },
    {
      name: "Historic City",
      location: "Italy",
      image: "https://imgs.search.brave.com/b4dL4DH3xCpOUol1MqUL-cJMxsze7F12YPsDbjrTFt0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzM3LzA0LzU1/LzM2MF9GXzM3MDQ1/NTkwXzdvV0RHdXh3/YmxHbFZ6cjlmZnV4/TjhPZ0l4bXFMUENK/LmpwZw",
    },
  ];

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await api.get("/businesses");
        setBusinesses(res.data);
      } catch (error) {
        console.error("Failed to fetch businesses:", error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-blue-400 to-purple-300 shadow-lg">
        <div className="bg-white/40 backdrop-blur-md rounded-3xl p-10 shadow-2xl max-w-2xl w-full">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Explore Spot</h1>
          <p className="text-lg text-white mb-8">
            Discover hidden gems, share adventures, and connect with the best local businesses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/explore"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition"
            >
              Explore Spots
            </Link>
            <Link
              to="/share"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition"
            >
              Share Experience
            </Link>
            <Link
              to="/promote"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition"
              >
              Get Hotels
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Spots */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Spots</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredSpots.map((spot, idx) => (
            <div
              key={idx}
              className="bg-white shadow-xl rounded-xl overflow-hidden transition hover:scale-105"
            >
              <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{spot.name}</h3>
                <p className="text-gray-500">{spot.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Businesses</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {businesses.length > 0 ? (
            businesses.map((biz, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={biz.image || "https://source.unsplash.com/400x250/?business"}
                  alt={biz.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{biz.name}</h3>
                  <p className="text-gray-600">{biz.type}</p>
                  <p className="text-sm text-gray-500">{biz.location}</p>
                  <p className="mt-2 text-gray-700">{biz.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No businesses submitted yet.
            </p>
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/promote"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Promote Your Business
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
