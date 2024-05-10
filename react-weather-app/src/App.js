// App.js
import { useState } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY, AQI_API_URL, AQI_API_TOKEN } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const aqiFetch = fetch(
      `${AQI_API_URL}/?lat=${lat}&lon=${lon}&token=${AQI_API_TOKEN}`
    );

    Promise.all([currentWeatherFetch, forecastFetch, aqiFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        const aqiResponse = await response[2].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
        setAqi(aqiResponse.data.aqi); // Adjust this according to your API response structure
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <div className="row">
        <div className="col-md-6">
          {currentWeather && <CurrentWeather data={currentWeather} aqi={aqi} />}
        </div>
        <div className="col-md-6">
          {forecast && <Forecast data={forecast} />}
        </div>
      </div>
    </div>
  );
}

// JavaScript code to handle logo visibility on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  const logo = document.getElementById("logo");
  if (prevScrollpos > currentScrollPos) {
    // Show the logo if scrolled up
    logo.classList.remove("hide-logo");
  } else {
    // Hide the logo if scrolled down
    logo.classList.add("hide-logo");
  }
  prevScrollpos = currentScrollPos;
};

export default App;
