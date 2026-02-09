import React from "react";
import heroImg from "../assets/hero-mountain.png";
import logoImg from "../assets/logo.png";

export default function Hero() {
    return (
        <section
            className="relative h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/40"></div>

            <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
                {/* Logo - Absolute to Header (Page Top Lawyer) */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30">
                    <img src={logoImg} alt="Explore Spot Logo" className="h-12 w-auto" />
                </div>

                <div className="max-w-7xl mx-auto flex items-center justify-end relative">
                    {/* Centered Navigation */}
                    <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center space-x-8 text-sm text-gray-100 font-medium">
                        <a href="#" className="hover:text-white transition">Home</a>
                        <a href="#" className="hover:text-white transition">Explore</a>
                        <a href="#" className="hover:text-white transition">Destinations</a>
                        <a href="#" className="hover:text-white transition">Share Experience</a>
                        <a href="#" className="hover:text-white transition">Business</a>
                    </nav>

                    {/* Right Side Button */}
                    <div>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-orange-600 transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            <div className="relative z-20 max-w-7xl mx-auto h-full px-8 flex items-center">
                <div className="max-w-3xl text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
                        Explore Spot
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-4xl">
                        Travel More. Explore Deeper. Share Better.
                    </p>

                    <div className="mt-8 flex items-center space-x-4">
                        <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-lg">
                            Get Started
                        </button>

                        <button className="px-6 py-3 border border-white/70 text-white rounded-lg bg-transparent hover:bg-white/5">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
