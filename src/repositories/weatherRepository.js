const Weather = require("../models/Weather");

class WeatherRepository {
  async saveWeatherData(data) {
    try {
      const weatherEntry = new Weather(data);
      await weatherEntry.save();
      console.log(`[${new Date().toLocaleTimeString()}] Saved to DB ✅`, weatherEntry);
      return weatherEntry;
    } catch (error) {
      console.error("[DB] Error Saving Data ❌", error);
      throw error;
    }
  }

  async getWeatherByCity(city) {
    return await Weather.find({ city }).sort({ timestamp: -1 }).limit(5);
  }
}

module.exports = new WeatherRepository();
