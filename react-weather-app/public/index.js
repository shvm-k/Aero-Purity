// HomePage.js

import React from "react";
import WeatherCard from "./WeatherCard"; // Assume WeatherCard component for displaying weather info
import { fetchWeatherData } from "./api"; // Function to fetch weather data from an API

const HomePage = () => {
  // State variables for default location and weather data
  const [defaultLocation, setDefaultLocation] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);

  // Fetch weather data for the default location when the component mounts
  React.useEffect(() => {
    fetchWeatherData(defaultLocation)
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [defaultLocation]);

  // Function to handle search changes
  const handleSearchChange = (location) => {
    setDefaultLocation(location);
  };

  return (
    <div>
      {/* Render search bar */}
      {/* Assuming Search component is imported */}
      <Search onSearchChange={handleSearchChange} />

      {/* Render weather card with weather data */}
      {weatherData && <WeatherCard data={weatherData} />}

      {/* Footer */}
      <footer>
        <div className="left-section">
          <p>Contact us - <a href="mailto:nilabhshivam333@gmail.com">email us</a>, call us</p>
        </div>
        <div className="right-section">
          <p>Made and designed by shvm</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
