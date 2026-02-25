import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import GridBox from "./components/GridBox";

function App() {
  // 1. useState for UI + Data (Project Requirement)
  const [city, setCity] = useState(""); // Stores the city from SearchBar
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 2. Toggle Interaction State (Project Requirement: °C vs °F)
  const [isCelsius, setIsCelsius] = useState(true);

  const API_KEY = "72019d4d671cdf4fc82a9fd8f8bc450f"

  // 3. useEffect for API calls 
  // This triggers whenever the 'city' state is updated by the SearchBar
  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true); // Handle loading state
      setError(null);   // Reset error state
      
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("City not found"); // Handle error if city doesn't exist
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Dependency array ensures it runs when city changes

  // Helper function to toggle units
  const toggleUnit = () => setIsCelsius(!isCelsius);

  // Helper to convert Celsius to Fahrenheit for the toggle interaction
  const displayTemp = (celsius) => {
    return isCelsius 
      ? `${Math.round(celsius)}°C` 
      : `${Math.round((celsius * 9) / 5 + 32)}°F`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-16 font-sans">
      <header className="mb-10 text-center px-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tighter">
          Sky<span className="text-blue-600">Cast</span>
        </h1>
        <p className="text-slate-400 text-sm font-medium">Modern Weather Search</p>
      </header>

      {/* Passing setCity to SearchBar as the onSearch prop */}
      <SearchBar onSearch={(location) => setCity(location)} />

      {/* 4. Handle Loading + Empty/Error States (Project Requirement) */}
      {loading && <p className="mt-10 text-blue-500 font-bold animate-pulse">Loading weather data...</p>}
      
      {error && (
        <p className="mt-10 text-red-500 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">
          Error: {error}
        </p>
      )}

      {weatherData && !loading && (
        <div className="mt-12 flex flex-col items-center w-full max-w-4xl px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800 capitalize">{weatherData.name}</h2>
            
            {/* 5. Toggle Interaction UI (Project Requirement) */}
            <button 
              onClick={toggleUnit}
              className="mt-4 px-4 py-1 text-xs font-bold bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors"
            >
              Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
            </button>
          </div>

          {/* 6. Displaying Data via GridBox components */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            justifyItems: 'center',
            width: '100%' 
          }}>
            <GridBox 
              title={displayTemp(weatherData.main.temp)} 
              content="Temperature" 
            />
            <GridBox 
              title={weatherData.weather[0].main} 
              content="Condition" 
            />
            <GridBox 
              title={`${weatherData.main.humidity}%`} 
              content="Humidity" 
            />
            <GridBox 
              title={`${Math.round(weatherData.wind.speed * 18/5)} km/h`} 
              content="Wind Speed" 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;