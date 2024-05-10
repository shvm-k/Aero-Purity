import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data, aqi }) => {
  const isBhopalIndia = data.city === "Bhopal, IN"; // Check if the searched location is Bhopal, IN

  return (
    <div className="weather-container">
      <div className="weather">
        <div className="top">
          <div>
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>

      {isBhopalIndia && (
  <div className="graph-container">
    <img src="api-graph.jpeg" alt="Graph" style={{ width: '600px', height: 'auto', align: 'right'}}/> Historical,Predicted AQI (from ML model)
  </div>
)}


      <div className="aqi-container">
        <p className="aqi-label">Live Air Quality Index (AQI)</p>
        <div className="aqi-value">{aqi}</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
