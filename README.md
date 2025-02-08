# 🌦 WeatherMap
Weather Data Fetch Service

🌦 Overview

This project is a Weather Data Fetch Service that retrieves weather data for multiple cities, stores it in a MongoDB database, and provides an API to access the stored weather data. The application is built using Node.js, Express, MongoDB, and Axios.
### Problem 
https://gist.github.com/TheCodingCanal/1f4ba241ca0a7930544b20428efeab18

### 🚀 Features

- Fetches real-time weather data for a specific city (e.g., London) from the OpenWeather API.
- Stores the weather data in a MongoDB database (`weatherDB`).
- Logs weather data (temperature, humidity, wind speed, etc.) every 10 minutes.
- Easy to configure with environment variables.

## 🛠 Technologies Used

- **Node.js**: JavaScript runtime for backend operations.
- **Express (optional)**: For API routes if needed in the future.
- **Mongoose**: To interact with MongoDB and define schemas.
- **Axios**: To make HTTP requests to the OpenWeather API.
- **dotenv**: For environment variable management.

## Requirements

- Node.js (v14 or higher)
- MongoDB (Local or Cloud)
- OpenWeather API key

## 📦 Setup

### 1. Clone the repository

git clone https://github.com/Lokeshwarrior12/weather-service.git
cd weather-service

### 2. Install dependencies
Run the following command to install all required dependencies:

npm install

### 3. Set up environment variables
Create a .env file in the root directory of the project and add the following:

PORT=5000
MONGO_URI=mongodb://localhost:27017/weatherDB  # Your MongoDB URI
or if you 
OPENWEATHER_API_KEY=your_openweather_api_key   # Your OpenWeather API key

### 🚀 4. Run the project
Once everything is set up, you can run the project with the following command:
node index.js
node weatherService.js
This will connect to your MongoDB, fetch weather data, and save it to the database every 10 minutes.

### 🔥 API Endpoints
1️⃣ Fetch Weather Data
URL: /fetch
Method: GET
Description: Fetches weather data for predefined cities and stores it in MongoDB.
2️⃣ Get Stored Weather Data
URL: /weather
Method: GET
Response: Returns all stored weather data from MongoDB.

### 🌍 Deployment
Deploying on Render:
1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main
2. Connect to Render
Go to Render
Create a new Web Service
Connect your GitHub repository
Set environment variables (as mentioned above)
Click Deploy

### 🛠 Troubleshooting
1. API Key Not Found: Ensure you've entered a valid OpenWeather API key in your .env file.
2. MongoDB Connection Issue: Verify your MongoDB URI in the .env file.
3. Permission Issues: Make sure you have permission to access MongoDB and GitHub if you're pushing to a remote repository.
4. Error: querySrv EBADNAME
     Ensure that the MongoDB connection string is correct in .env.
     Check that the MongoDB username & password are correct.
     Verify that your MongoDB Atlas IP Whitelist allows access.
  Error: bad auth : authentication failed
     Double-check the MongoDB credentials.
     Ensure that the correct database name is in the connection string.

### 💡Author
Lokeshwar - Developer & Maintainer

### ⭐ Contact
For any questions or issues, feel free to reach out to me via GitHub. https://github.com/Lokeshwarrior12

