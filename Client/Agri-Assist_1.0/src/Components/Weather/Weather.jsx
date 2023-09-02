import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { WiThermometer, WiHumidity, WiCloudy } from 'react-icons/wi';
import WeatherForcast from './WeatherForcast'


  const apiKey = "71e0996391f04b1ffbd032930cbc3dfe"


const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState('metric'); // Default to metric (Celsius)
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {

    setError(null); // Clear any previous errors
   
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city || "Addis Abeba"}&units=${unit}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      setError('City not found or there was an error fetching data.');
      console.error('Error fetching weather data:', error);
    }
  };
  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );

      // Extract 5-day forecast data from the API response
      const forecastList = response.data.list.slice(0, 5);

      const forecastData = forecastList.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description,
      }));

      setForecastData(forecastData);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };


  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, [city, unit]);

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-28">
      <h1 className="text-3xl font-semibold mb-4">Weather App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          className="border rounded px-2 py-1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
          onClick={fetchWeatherData}
        >
          Get Weather
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 ml-2 rounded"
          onClick={toggleUnit}
        >
          {unit === 'metric' ? '°C' : '°F'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold">
              {weatherData.name}, {weatherData.sys.country} Weather
            </h2>
            <div className="mt-4">
              <div className="flex items-center">
                <WiThermometer className="text-4xl text-blue-500" />
                <p className="ml-2 text-gray-700">
                  Temperature: {weatherData.main.temp} °{unit === 'metric' ? 'C' : 'F'}
                </p>
              </div>
              <div className="flex items-center mt-2">
                <WiHumidity className="text-4xl text-green-500" />
                <p className="ml-2 text-gray-700">
                  Humidity: {weatherData.main.humidity}%
                </p>
              </div>
              <div className="flex items-center mt-2">
                <WiCloudy className="text-4xl text-gray-500" />
                <p className="ml-2 text-gray-700">
                  Weather: {weatherData.weather[0].description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
       <div className="flex justify-center">
        {forecastData.map((forecast, index) => (
          <WeatherForcast key={index} forecastData={forecast} />
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
