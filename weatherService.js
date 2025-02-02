// Load environment variables from a .env file
require("dotenv").config();

// Import required modules
const axios = require("axios"); // For making HTTP requests
const mongoose = require("mongoose"); // For interacting with MongoDB

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI) // Connect to MongoDB using the URI from environment variables
  .then(() => console.log('✅ MongoDB Connected')) // Log success message if connected
  .catch(err => console.error('❌ MongoDB Connection Error:', err)); // Log error if connection fails

// Define Schema for storing weather data in MongoDB
const weatherSchema = new mongoose.Schema({
    city: String, // Name of the city
    temperature: Number, // Temperature in Celsius
    description: String, // Weather description (e.g., cloudy, sunny)
    humidity: Number, // Humidity percentage
    windSpeed: Number, // Wind speed in m/s
    timestamp: { type: Date, default: Date.now } // Timestamp when data is recorded
});

// Create a Mongoose model for the schema
const Weather = mongoose.model("Weather", weatherSchema);

// Fetch API key from environment variables
const API_KEY = process.env.OPENWEATHER_API_KEY;
const CITY = "London"; // City for which weather data is fetched

// Function to fetch weather data from OpenWeather API and store it in MongoDB
async function fetchWeather() {
    try {
        // Construct the API URL with city name and API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
        
        // Make an HTTP GET request to fetch weather data
        const response = await axios.get(url);
        const data = response.data; // Extract response data

        // Create a new weather entry object
        const weatherEntry = new Weather({
            city: data.name, // Extract city name
            temperature: data.main.temp, // Extract temperature
            description: data.weather[0].description, // Extract weather description
            humidity: data.main.humidity, // Extract humidity
            windSpeed: data.wind.speed // Extract wind speed
        });

        // Save the weather data to MongoDB
        await weatherEntry.save();
        console.log(`[${new Date().toLocaleTimeString()}] Saved to DB ✅`, weatherEntry);
    } catch (error) {
        // Log an error message if the request or database operation fails
        console.error("Error fetching/saving weather data:", error.message);
    }
}

// Schedule the fetchWeather function to run every 10 minutes (600000 milliseconds)
setInterval(fetchWeather, 600000);

// Run fetchWeather function once immediately when the script starts
fetchWeather();
