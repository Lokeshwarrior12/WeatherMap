const weatherService = require("../src/services/weatherService");
const weatherRepository = require("../src/repositories/weatherRepository");
const { jest } = require("@jest/globals");

jest.mock("../src/repositories/weatherRepository");

describe("Weather Service Tests", () => {
  test("fetchWeather should fetch and store data", async () => {
    const mockData = {
      city: "London",
      temperature: 5.5,
      description: "clear sky",
      humidity: 80,
      windSpeed: 3.5,
    };

    weatherRepository.saveWeatherData.mockResolvedValue(mockData);

    const data = await weatherService.fetchWeather("London");
    expect(data).toEqual(mockData);
  });
});
