import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function ExploreHero() {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [travelData, setTravelData] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // Auto rotate featured images
  useEffect(() => {
    if (!travelData?.images) return;
    
    const interval = setInterval(() => {
      setActiveImageIndex(prev => (prev + 1) % travelData.images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [travelData]);

  // Scroll to results when data is loaded
  useEffect(() => {
    if (travelData && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [travelData]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setError(null);
    setTravelData(null);
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/travel?city=${encodeURIComponent(destination)}`
      );
      
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
        
      const data = await response.json();
      
      // Validate the response structure
      if (!data.city || !data.images || !data.itinerary) {
        throw new Error('Invalid data format received from server');
      }
      
      setTravelData(data);
      
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to capitalize the first letter of each word
  const capitalizeCityName = (city) => {
    return city.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get time of day icon
  const getTimeIcon = (time) => {
    const lowerTime = time.toLowerCase();
    if (lowerTime.includes('morning') || lowerTime.includes('breakfast')) {
      return (
        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      );
    } else if (lowerTime.includes('afternoon') || lowerTime.includes('lunch')) {
      return (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      );
    }
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-start pt-24 pb-12 relative"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://t3.ftcdn.net/jpg/00/93/76/02/360_F_93760221_KJMb5fQHdgai8y4mFUF6TzLJWRJQQAO2K.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 text-center px-4 relative inline-block">
            Discover Your Next Adventure
            <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 animate-expand"></span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Explore the world's most captivating destinations and create unforgettable memories
          </p>
        </div>
        
        {/* Search Form */}
        <div className="w-full flex justify-center mb-12 animate-slideUp" style={{ animationDelay: "0.3s" }}>
          <form onSubmit={handleFormSubmit} className="relative w-full max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-white bg-opacity-90 backdrop-blur border border-gray-300 text-gray-900 text-lg rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-20 py-4 shadow-xl transition-all duration-300"
                placeholder="Search for a city (e.g., Paris, Tokyo)"
                required
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full shadow-lg transition duration-300 flex items-center hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching</span>
                  </span>
                ) : (
                  <>
                    <span>Explore</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg max-w-2xl w-full mx-auto animate-fadeIn">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              Error: {error}
            </div>
          </div>
        )}

        {/* Travel Data Results */}
        {travelData && (
          <div ref={resultsRef} className="mt-12 w-full max-w-6xl mx-auto animate-fadeIn">
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-0 shadow-2xl overflow-hidden border border-gray-100">
              {/* City Header with Featured Image */}
              <div className="relative h-64 bg-gray-800 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                {travelData.images && travelData.images.length > 0 && (
                  <img 
                    src={travelData.images[0]} 
                    alt={travelData.city}
                    className="w-full h-full object-cover animate-zoomPan"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/1200x400?text=Destination+Image';
                    }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {capitalizeCityName(travelData.city)}
                    </h2>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Popular Destination
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/location?destination=${travelData.city}`, { state: travelData })}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-lg flex items-center font-medium transition duration-300 transform hover:-translate-y-1"
                  >
                    <span>View Full Itinerary</span>
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button className="pb-3 px-4 font-medium text-blue-600 border-b-2 border-blue-600">
                    Overview
                  </button>
                  <button className="pb-3 px-4 font-medium text-gray-500 hover:text-gray-700">
                    Reviews
                  </button>
                  <button className="pb-3 px-4 font-medium text-gray-500 hover:text-gray-700">
                    Tips
                  </button>
                </div>
              
                {/* Image Gallery - Modern Carousel Style */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                      <path d="M8 7a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z" />
                      <path d="M12 9a1 1 0 00-1 1v1a1 1 0 002 0v-1a1 1 0 00-1-1z" />
                    </svg>
                    Popular Sights
                  </h3>
                  <div className="relative">
                    {/* Main Featured Image */}
                    <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg mb-4">
                      <img
                        src={travelData.images[activeImageIndex]}
                        alt={`${travelData.city} featured attraction`}
                        className="w-full h-64 md:h-80 object-cover transition-opacity duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4 text-white font-medium">
                        <span className="text-sm bg-blue-600 px-2 py-1 rounded-md">Featured Attraction</span>
                      </div>

                      {/* Navigation buttons */}
                      <button 
                        onClick={() => setActiveImageIndex(prev => (prev - 1 + travelData.images.length) % travelData.images.length)}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                      >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                      </button>
                      <button 
                        onClick={() => setActiveImageIndex(prev => (prev + 1) % travelData.images.length)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                      >
                        <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-5 gap-2">
                      {travelData.images.map((img, index) => (
                        <div 
                          key={index} 
                          className={`cursor-pointer rounded-md overflow-hidden transition-all duration-300 ${
                            index === activeImageIndex ? 'ring-2 ring-blue-500 transform scale-105' : 'opacity-70 hover:opacity-100'
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <img 
                            src={img} 
                            alt={`${travelData.city} thumbnail ${index + 1}`}
                            className="w-full h-16 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100x100?text=Image';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Itinerary - Redesigned */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    3-Day Personalized Itinerary
                  </h3>
                  <div className="space-y-6">
                    {Object.entries(travelData.itinerary).map(([day, activities], dayIndex) => (
                      <div 
                        key={day} 
                        className="rounded-lg border border-gray-200 overflow-hidden animate-fadeIn"
                        style={{ animationDelay: `${dayIndex * 150}ms` }}
                      >
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3 flex items-center">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 text-blue-600 font-bold">
                            {day.replace('day', '').trim()}
                          </div>
                          <h4 className="text-lg font-medium text-white capitalize">
                            {day.replace('day', 'Day ')}
                          </h4>
                        </div>
                        
                        <div className="p-4">
                          <div className="relative pl-8 border-l-2 border-gray-200">
                            {Object.entries(activities).map(([time, activity], actIndex) => (
                              <div 
                                key={time}
                                className="mb-6 last:mb-0 animate-fadeSlideUp"
                                style={{ animationDelay: `${(dayIndex * 150) + (actIndex * 100)}ms` }}
                              >
                                <div className="absolute -left-3 mt-1.5">
                                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                    {getTimeIcon(time)}
                                  </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                  <h5 className="font-medium text-gray-800 mb-2 capitalize flex items-center">
                                    {time}
                                    <span className="inline-block ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                      {time.toLowerCase().includes('morning') ? 'AM Activity' : 
                                       time.toLowerCase().includes('afternoon') ? 'Midday Activity' : 'Evening Activity'}
                                    </span>
                                  </h5>
                                  <p className="text-gray-600">{activity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* "Start exploring" message when no results */}
        {!travelData && !loading && !error && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <span>Search for a destination to start exploring</span>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes zoomPan {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.6s ease-out forwards;
        }
        
        .animate-expand {
          animation: expand 1.2s ease-out forwards;
        }
        
        .animate-zoomPan {
          animation: zoomPan 20s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation: float 8s infinite ease-in-out;
        }
        
        .particle-1 {
          width: 80px;
          height: 80px;
          top: 15%;
          left: 10%;
          opacity: 0.2;
          animation-delay: 0s;
        }
        
        .particle-2 {
          width: 40px;
          height: 40px;
          top: 20%;
          right: 15%;
          opacity: 0.15;
          animation-delay: 1s;
        }
        
        .particle-3 {
          width: 60px;
          height: 60px;
          bottom: 20%;
          left: 20%;
          opacity: 0.1;
          animation-delay: 2s;
        }
        
        .particle-4 {
          width: 30px;
          height: 30px;
          bottom: 30%;
          right: 20%;
          opacity: 0.2;
          animation-delay: 3s;
        }
        
        .particle-5 {
          width: 50px;
          height: 50px;
          top: 40%;
          left: 30%;
          opacity: 0.1;
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default ExploreHero;