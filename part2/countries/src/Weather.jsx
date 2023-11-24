import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ lat, lng, capitalName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;

  useEffect(() => {
    axios.get(url).then((res) => setWeatherData(res.data));
  }, []);

  if (!weatherData) return null;

  const windSpeed = `${weatherData.wind.speed} m/s`;
  const temp = `${(weatherData.main.temp - 273.15).toFixed(2)} Celsius`;
  const icon = weatherData.weather[0].icon;

  return (
    <div>
      <h3>Weather in {capitalName}</h3>
      <p>temparature {temp}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="" />
      <p>wind {windSpeed}</p>
    </div>
  );
};

export default Weather;
