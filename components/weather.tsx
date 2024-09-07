"use client";

import React, { useState } from "react";

interface WeatherData {
  city: string;
  country: string;
  continent: string;
  date: string;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  cloudiness: number;
  sunrise: string;
  sunset: string;
  description: string;
  weatherIcon: string;
}

const fetchContinentFromGeoNames = async (countryCode: string) => {
  const username = "your_geonames_username"; // Substitua pelo seu username do GeoNames
  try {
    const response = await fetch(`http://api.geonames.org/countryInfoJSON?formatted=true&country=${countryCode}&username=${username}`);
    const data = await response.json();
    if (data.geonames && data.geonames.length > 0) {
      return data.geonames[0].continentName; // Verifica o nome do continente
    }
    return "Desconhecido";
  } catch (error) {
    console.error("Erro ao buscar continente:", error);
    return "Desconhecido";
  }
};

const WeatherComponent = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = "1319a1fe5a6650905c4684c52b1ac9f6";
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Cidade não encontrada");
      }

      const data = await response.json();
      const country = data.sys.country;
      const continent = await fetchContinentFromGeoNames(country);

      const timezoneOffset = data.timezone; // Deslocamento em segundos
      const localTime = new Date((data.dt + timezoneOffset) * 1000).toLocaleString("pt-BR", {
        timeZone: "UTC",
        hour12: false,
      });

      // Convertemos os timestamps de sunrise e sunset para a hora local da cidade
      const sunrise = new Date((data.sys.sunrise + timezoneOffset) * 1000).toLocaleTimeString("pt-BR", {
        timeZone: "UTC",
        hour12: false,
      });

      const sunset = new Date((data.sys.sunset + timezoneOffset) * 1000).toLocaleTimeString("pt-BR", {
        timeZone: "UTC",
        hour12: false,
      });

      setWeatherData({
        city: data.name,
        country: country,
        continent: continent,
        date: localTime,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        visibility: data.visibility > 1000 ? (data.visibility / 1000).toFixed(1) : data.visibility,
        cloudiness: data.clouds.all,
        sunrise: sunrise,
        sunset: sunset,
        description: data.weather[0].description,
        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
      setError(null);
    } catch (error: any) {
      setError(error.message || "Erro ao buscar informações do clima.");
      setWeatherData(null);
    }
  };

  const getWindDirectionIcon = (direction: number) => {
    // Ajuste o caminho conforme necessário para seus ícones
    return `/icons/wind_direction_${Math.round(direction / 45) * 45}.png`; 
  };

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-md max-w-sm mx-auto">
      <h1 className="text-xl font-bold text-white">Clima</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Digite sua cidade"
        className="border rounded p-2 text-gray-800 w-full mt-2"
      />
      <button onClick={fetchWeatherData} className="ml-2 bg-gray-500 text-white p-2 rounded mt-2">
        Ver Clima
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weatherData && (
        <div className="mt-4 text-white">
          <h2 className="font-bold text-lg">
            {weatherData.city} - {weatherData.country} | {weatherData.continent}
          </h2>
          <p>Data: {weatherData.date}</p>
          <p>Temperatura: {weatherData.temperature}°C</p>
          <p>Sensação Térmica: {weatherData.feelsLike}°C</p>
          <p>Temperatura Mínima: {weatherData.tempMin}°C</p>
          <p>Temperatura Máxima: {weatherData.tempMax}°C</p>
          <p>Humidade: {weatherData.humidity}%</p>
          <p>Pressão: {weatherData.pressure} hPa</p>
          <p>Velocidade do vento: {weatherData.windSpeed} m/s</p>
          <p>Direção do vento: 
            <img 
              src={getWindDirectionIcon(weatherData.windDirection)} 
              alt="Direção do vento" 
              style={{ width: 30, height: 30 }} 
            />
          </p>
          <p>Visibilidade: {weatherData.visibility} {weatherData.visibility > 1000 ? 'km' : 'metros'}</p>
          <p>Nebulosidade: {weatherData.cloudiness}%</p>
          <p>Nascer do sol: {weatherData.sunrise}</p>
          <p>Pôr do sol: {weatherData.sunset}</p>
          <p>Descrição: {weatherData.description}</p>
          <img 
            src={weatherData.weatherIcon} 
            alt="Ícone do clima" 
            style={{ width: 50, height: 50 }} 
          />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
