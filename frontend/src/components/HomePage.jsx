import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Icons - import only what you actually use
import { 
  MapPin, 
  Star, 
  ChevronRight, 
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Hotel,
  Compass,
  Cloud,
  Navigation,
  Clock,
  CheckCircle,
  Heart,
  AlertTriangle,
  Play
} from "lucide-react";

// Move constants outside component
const FEATURED_SPOTS = [
  {
    id: 1,
    name: "Snowy Peaks",
    location: "Swiss Alps, Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    category: "Adventure"
  },
  {
    id: 2,
    name: "Azure Coast",
    location: "Phuket, Thailand",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    category: "Beach"
  },
  {
    id: 3,
    name: "Historic Charm",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    category: "Culture"
  }
];

const SMART_FEATURES = [
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Live Weather",
    description: "Real-time forecasts",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Hotel className="w-5 h-5" />,
    title: "Smart Booking",
    description: "Best hotel deals",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Navigation className="w-5 h-5" />,
    title: "AI Itinerary",
    description: "Personalized plans",
    color: "bg-pink-100 text-pink-600"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Peak Time Alert",
    description: "Avoid crowds",
    color: "bg-amber-100 text-amber-600"
  }
];

const HomePage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await api.get("/businesses");
      setBusinesses(response.data);
    } catch (err) {
      console.error("Error fetching businesses:", err);
      setError("Unable to load businesses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ExploreSpot</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 to-pink-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6">
              <Sparkles className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium text-purple-700">
                Discover Your Next Adventure
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Hidden Gems & Local Experiences
            </h1>
            
            <p className="text-lg text-gray-600 mb-10">
              Connect with verified local businesses and plan your perfect trip with smart tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/explore"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center"
              >
                Start Exploring
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/how-it-works"
                className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:border-purple-400 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-500">Spots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-gray-500">Experts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Tools */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Travel Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make planning easier with our intelligent features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {SMART_FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/tools"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
            >
              See All Tools
              <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-gray-600 mt-2">Top picks from travelers</p>
            </div>
            <Link
              to="/destinations"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              View All
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_SPOTS.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">
                      {spot.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{spot.name}</h3>
                      <div className="flex items-center mt-1 text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{spot.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-medium">{spot.rating}</span>
                    </div>
                  </div>
                  <Link
                    to={`/spot/${spot.id}`}
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Businesses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-4">
              <Users className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">
                Local Partners
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted Local Businesses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with verified experts for authentic experiences
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading businesses...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={fetchBusinesses}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Try Again
              </button>
            </div>
          ) : businesses.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {businesses.slice(0, 6).map((business) => (
                  <div
                    key={business.id}
                    className="border border-gray-200 rounded-xl p-5 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4">
                        <img
                          src={business.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-900">{business.name}</h3>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{business.type}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {business.location}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-2">
                      {business.description || "No description available"}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/business/${business.id}`}
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        View Details →
                      </Link>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/promote"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg inline-flex items-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  List Your Business
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Businesses Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to join our community!
              </p>
              <Link
                to="/promote"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 mb-10">
              Join thousands of travelers discovering amazing places and experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700"
              >
                Create Free Account
              </Link>
              <Link
                to="/explore"
                className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:border-purple-400"
              >
                Browse Destinations
              </Link>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-gray-900">Free</div>
                <div className="text-sm text-gray-600">Basic Features</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">No Credit Card</div>
                <div className="text-sm text-gray-600">Required</div>
              </div>
              <div>
                <div className="font-bold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-600">Always Here</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Compass className="w-6 h-6 text-purple-400 mr-2" />
                <span className="text-xl font-bold text-white">ExploreSpot</span>
              </div>
              <p className="text-sm">
                Discover amazing places and connect with local experts.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><Link to="/spots" className="hover:text-white">Destinations</Link></li>
                <li><Link to="/guides" className="hover:text-white">Travel Guides</Link></li>
                <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">For Business</h4>
              <ul className="space-y-2">
                <li><Link to="/promote" className="hover:text-white">List Your Business</Link></li>
                <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white">Support</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            © {new Date().getFullYear()} ExploreSpot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;