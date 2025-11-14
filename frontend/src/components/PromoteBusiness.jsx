import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PromoteBusiness = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    contact: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/business", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Failed to promote business:", error);
      alert("Failed to submit business promotion");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Promote Your Business
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Hotel, Restaurant, Guide"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Info</label>
            <input
              type="text"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone or Email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-full font-semibold transition duration-200"
          >
            Submit Promotion
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromoteBusiness;
