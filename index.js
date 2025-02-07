const connectDB = require("./config/database"); // ✅ Correct Import
const weatherService = require("./src/services/weatherService");

connectDB();

console.log("🌦 Starting Weather Data Fetch Service...");
weatherService.fetchWeatherForAllCities();

// Fetch weather data every 10 minutes
setInterval(() => {
  console.log("🔄 Fetching new weather data...");
  weatherService.fetchWeatherForAllCities();
}, 600000);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Schema & Model
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number,
    timestamp: { type: Date, default: Date.now }
});

const Weather = mongoose.models.Weather || mongoose.model("Weather", weatherSchema);


// API Endpoint to Get Weather Data
app.get("/weather", async (req, res) => {
    try {
        const weatherData = await Weather.find().sort({ timestamp: -1 }).limit(10);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
