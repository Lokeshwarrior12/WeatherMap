require("dotenv").config();
const axios = require("axios");
const weatherRepository = require("../repositories/weatherRepository");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const CITIES = ["London", "New York", "Tokyo"]; // Track multiple cities

class WeatherService {
  async fetchWeather(city) {
    try {
      const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      const { name, main, weather, wind } = response.data;

      const weatherData = {
        city: name,
        temperature: main.temp,
        description: weather[0].description,
        humidity: main.humidity,
        windSpeed: wind.speed,
      };

      await weatherRepository.saveWeatherData(weatherData);
      return weatherData;
    } catch (error) {
      console.error(`[API] Error Fetching Weather for ${city} ❌`, error.message);
      throw error;
    }
  }

  async fetchWeatherForAllCities() {
    for (const city of CITIES) {
      await this.fetchWeather(city);
    }
  }
}

module.exports = new WeatherService();
