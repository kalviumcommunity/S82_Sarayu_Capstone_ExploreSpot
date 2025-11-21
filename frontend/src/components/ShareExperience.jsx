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
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [descError, setDescError] = useState("");

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

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  // ⭐ AI Generate Description Handler
  const handleGenerateDescription = async () => {
    if (!formData.location) {
      setDescError("Please enter a location first!");
      return;
    }

    setDescError("");
    setLoadingDesc(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/describe-spot", {
        location: formData.location,
        days: 3,
        mood: "fun adventurous travel tone",
      });

      if (res.data?.description) {
        setFormData((prev) => ({
          ...prev,
          description: res.data.description,
        }));
      } else {
        setDescError("No response from AI. Try again.");
      }
    } catch (error) {
      console.error("AI description error:", error);
      setDescError("Failed to generate description.");
    }

    setLoadingDesc(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("location", formData.location);
    data.append("description", formData.description);

    if (file) data.append("image", file);

    try {
      await axios.post("http://localhost:5000/spots", data);
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
            />

            {/* ✨ AI GENERATE BUTTON */}
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                className="text-sm bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700"
                onClick={handleGenerateDescription}
                disabled={loadingDesc}
              >
                {loadingDesc ? "Generating..." : "✨ Generate with AI"}
              </button>

              {descError && (
                <span className="text-xs text-red-500">{descError}</span>
              )}
            </div>
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>

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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-full font-semibold"
          >
            Submit Experience
          </button>

        </form>
      </div>
    </div>
  );
};

export default ShareExperience;
