import React from "react";
import { Link } from "react-router-dom";

const SmartTools = () => {
  const tools = [
    {
      title: "AI Trip Planner",
      desc: "Get a full AI-generated itinerary based on your destination, days & budget.",
      icon: "🤖",
      link: "/trip-planner",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Live Weather Checker",
      desc: "Check real-time temperature, humidity & conditions for any city.",
      icon: "⛅",
      link: "/weather",
      color: "from-blue-500 to-teal-400",
    },
    {
      title: "Nearby Hotels",
      desc: "Find the best hotel recommendations near your travel location.",
      icon: "🏨",
      link: "/get-hotels",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="py-16 bg-white/80">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
        Smart Tools ✨
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {tools.map((tool, index) => (
          <Link
            key={index}
            to={tool.link}
            className={`bg-gradient-to-r ${tool.color} text-white p-8 rounded-2xl shadow-xl 
            hover:scale-105 transition transform block`}
          >
            <div className="text-5xl mb-4">{tool.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{tool.title}</h3>
            <p className="opacity-90">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SmartTools;
