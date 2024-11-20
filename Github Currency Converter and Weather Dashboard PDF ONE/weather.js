const API_KEY = "7bbd70d10480b3dbb361d6a2bc579a51"; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("weather").innerHTML = "<h3>City not found</h3>";
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

document.getElementById("weatherForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeather(city);
  }
});
