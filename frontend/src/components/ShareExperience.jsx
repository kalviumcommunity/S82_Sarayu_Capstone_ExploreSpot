import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShareExperience = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    // Show preview image
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("description", formData.description);

    if (file) {
      data.append("image", file); // MUST match upload.single("image")
    }

    try {
      await axios.post("http://localhost:5000/spots", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/thank-you");
    } catch (error) {
      console.error("Error uploading experience:", error);
      alert("Failed to upload experience");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-purple-300 to-pink-200 flex items-center justify-center px-4 py-10">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-xl w-full">

        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          Share Your Experience
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 
              file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
              file:bg-purple-500 file:text-white hover:file:bg-purple-600"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded-xl mx-auto shadow-md"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-full font-semibold transition duration-200"
          >
            Submit Experience
          </button>

        </form>
      </div>
    </div>
  );
};

export default ShareExperience;
