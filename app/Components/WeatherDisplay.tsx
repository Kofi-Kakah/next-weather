'use client';

import { WeatherData, getWeatherIcon } from "../Utils/weatherApi";
import { WiHumidity, WiBarometer, WiWindy } from "react-icons/wi";
import { IoEye, IoCloudy } from "react-icons/io5";
import { MdAir } from "react-icons/md";
import Image from "next/image";

interface WeatherDisplayProps {
  data: WeatherData;
}

export default function WeatherDisplay({ data }: WeatherDisplayProps) {
  const formatTime = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (timestamp: number, timezone: number) => {
    const date = new Date((timestamp + timezone) * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const kmToMiles = (km: number) => (km * 0.621371).toFixed(2);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-8 text-white shadow-lg mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.name}</h1>
            <p className="text-blue-100">
              {data.sys.country}
            </p>
            <p className="text-blue-100 text-sm mt-2">
              {formatDate(data.dt, data.timezone)}
            </p>
          </div>
          <div className="text-right">
            <div className="relative w-32 h-32">
              <Image
                src={getWeatherIcon(data.weather[0].icon)}
                alt={data.weather[0].description}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Temperature Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Current Temperature</p>
            <p className="text-5xl font-bold">{Math.round(data.main.temp)}°C</p>
          </div>
          <div>
            <p className="text-blue-100 text-sm mb-1">Feels Like</p>
            <p className="text-5xl font-bold">
              {Math.round(data.main.feels_like)}°C
            </p>
          </div>
        </div>

        {/* Weather Description */}
        <div className="mt-6 bg-blue-500/50 rounded-lg p-4">
          <p className="text-xl capitalize font-semibold">
            {data.weather[0].main}
          </p>
          <p className="text-blue-100 capitalize">
            {data.weather[0].description}
          </p>
        </div>
      </div>

      {/* Temperature Range */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Temperature Range
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Maximum</p>
            <p className="text-3xl font-bold text-red-600">
              {Math.round(data.main.temp_max)}°C
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-1">Minimum</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(data.main.temp_min)}°C
            </p>
          </div>
        </div>
      </div>

      {/* Atmospheric Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Humidity */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <WiHumidity className="text-blue-500 text-3xl" />
              <h3 className="text-lg font-semibold text-gray-800">Humidity</h3>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-bold text-blue-600">
                {data.main.humidity}%
              </p>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${data.main.humidity}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pressure */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <WiBarometer className="text-purple-500 text-3xl" />
              <h3 className="text-lg font-semibold text-gray-800">Pressure</h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-purple-600">
                {data.main.pressure}
              </p>
              <p className="text-gray-600 text-sm">hPa</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Wind */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <MdAir className="text-green-500 text-3xl" />
              <h3 className="text-lg font-semibold text-gray-800">Wind</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Speed:</span>
                <span className="text-2xl font-bold text-green-600">
                  {data.wind.speed} m/s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Direction:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {data.wind.deg}°
                </span>
              </div>
              {data.wind.gust && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gust:</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {data.wind.gust} m/s
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <IoEye className="text-orange-500 text-3xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Visibility
              </h3>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-orange-600">
                {(data.visibility / 1000).toFixed(1)} km
              </p>
              <p className="text-gray-600 text-sm">
                {kmToMiles(data.visibility / 1000)} miles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Coverage */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-6">
        <div className="flex items-center gap-3 mb-3">
          <IoCloudy className="text-gray-400 text-3xl" />
          <h3 className="text-lg font-semibold text-gray-800">Cloud Coverage</h3>
        </div>
        <div className="flex items-end justify-between">
          <p className="text-4xl font-bold text-gray-600">
            {data.clouds.all}%
          </p>
          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-400 rounded-full"
              style={{ width: `${data.clouds.all}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sun Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Sunrise & Sunset
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sunrise:</span>
              <span className="text-xl font-bold text-orange-600">
                {formatTime(data.sys.sunrise, data.timezone)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sunset:</span>
              <span className="text-xl font-bold text-orange-600">
                {formatTime(data.sys.sunset, data.timezone)}
              </span>
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Location Coordinates
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Latitude:</span>
              <span className="text-xl font-bold text-blue-600">
                {data.coord.lat.toFixed(4)}°
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Longitude:</span>
              <span className="text-xl font-bold text-blue-600">
                {data.coord.lon.toFixed(4)}°
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Last updated: {formatTime(data.dt, data.timezone)}</p>
      </div>
    </div>
  );
}
