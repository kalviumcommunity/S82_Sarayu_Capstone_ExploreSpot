import React, { useState } from "react";

const WeatherChecker = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "8022577be8153386445f4e290059bdf9"; 

  const handleCheckWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    try {
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (data.cod === "404") {
        setError("City not found. Try again.");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          ⛅ Live Weather Checker
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter any city to check real-time weather.
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            onClick={handleCheckWeather}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Check Weather
          </button>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

          {/* WEATHER RESULT */}
          {weather && (
            <div className="mt-6 text-center bg-blue-50 p-5 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-blue-700">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-xl mt-3">
                🌡 Temp: <b>{weather.main.temp}°C</b>
              </p>
              <p className="text-lg">
                ☁ Condition: <b>{weather.weather[0].description}</b>
              </p>
              <p className="text-lg">
                💧 Humidity: <b>{weather.main.humidity}%</b>
              </p>
              <p className="text-lg">
                🌬 Wind: <b>{weather.wind.speed} m/s</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherChecker;
