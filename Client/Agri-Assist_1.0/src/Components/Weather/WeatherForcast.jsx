import React from 'react'
import { WiCloudy, WiHumidity, WiThermometer } from 'react-icons/wi'

function WeatherForcast({forecastData}) {
  return (
     <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4">
    <div className="p-4">
      <h2 className="text-xl font-semibold">{forecastData.date}</h2>
      <div className="mt-4">
        <div className="flex items-center">
          <WiThermometer className="text-4xl text-blue-500" />
          <p className="ml-2 text-gray-700">
            Temperature: {forecastData.temp} °C
          </p>
        </div>
        <div className="flex items-center mt-2">
          <WiHumidity className="text-4xl text-green-500" />
          <p className="ml-2 text-gray-700">
            Humidity: {forecastData.humidity}%
          </p>
        </div>
        <div className="flex items-center mt-2">
          <WiCloudy className="text-4xl text-gray-500" />
          <p className="ml-2 text-gray-700">
            Weather: {forecastData.description}
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default WeatherForcast