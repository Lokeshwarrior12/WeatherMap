require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Schema
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number,
    timestamp: { type: Date, default: Date.now }
});

const Weather = mongoose.model("Weather", weatherSchema);

const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = "London";

async function fetchWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const data = response.data;

        // Create weather entry
        const weatherEntry = new Weather({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        });

        // Save to MongoDB
        await weatherEntry.save();
        console.log(`[${new Date().toLocaleTimeString()}] Saved to DB ✅`, weatherEntry);
    } catch (error) {
        console.error("Error fetching/saving weather data:", error.message);
    }
}

// Run fetchWeather every 10 minutes
setInterval(fetchWeather, 600000);

// Run once on start
fetchWeather();
