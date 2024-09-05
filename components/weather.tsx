"use client";

import React, { useState } from "react";

interface WeatherData {
  city: string;
  country: string;
  continent: string;
  date: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
}

const WeatherComponent = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = "1319a1fe5a6650905c4684c52b1ac9f6";
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}`
      );
      const data = await response.json();

      const country = data.sys.country;
      const timezone = new Date().toLocaleTimeString("en-US", {
        timeZone: data.timezone,
      });

      setWeatherData({
        city: data.name,
        country: country,
        continent: "America", // Substitua por uma lógica que determina o continente
        date: timezone,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
      });
      setError(null);
    } catch (error) {
      setError("Erro ao buscar informações do clima.");
      setWeatherData(null);
    }
  };

  return (
    <div>
      <h1>Clima</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite sua cidade"
      />
      <button onClick={fetchWeatherData}>Ver Clima</button>

      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>
            {weatherData.city} - {weatherData.country} | {weatherData.continent}
          </h2>
          <p>Data: {weatherData.date}</p>
          <p>Humidade: {weatherData.humidity}%</p>
          <p>Pressão: {weatherData.pressure} hPa</p>
          <p>Velocidade do vento: {weatherData.windSpeed} m/s</p>
          <p>Descrição: {weatherData.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
