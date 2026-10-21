'use client';

import Navbar from "./Components/Navbar";
import WeatherDisplay from "./Components/WeatherDisplay";
import { useState, useEffect } from "react";
import { getWeatherByCity, WeatherData } from "./Utils/weatherApi";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");

  // Fetch weather for default city on mount
  useEffect(() => {
    fetchWeather("London");
  }, []);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput("");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar 
        onSearch={handleSearch} 
        onChange={handleSearchChange} 
        searchValue={searchInput}
        currentLocation={weather?.name || "Loading..."}
      />

      <main className="flex-1 py-8">
        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading weather data...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {weather && !loading && (
          <WeatherDisplay data={weather} />
        )}
      </main>
    </div>
  );
}