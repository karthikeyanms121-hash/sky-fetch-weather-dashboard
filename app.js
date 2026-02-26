const API_KEY = "1a32acdcd4beaeb8f5220cb47579d176";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDisplay = document.getElementById("weather-display");

async function getWeather(city) {

    showLoading();

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {

        if (error.response && error.response.status === 404) {
            showError("❌ City not found. Check spelling.");
        } else {
            showError("⚠️ Something went wrong. Try again.");
        }

    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = "🔍 Search";
    }
}

function displayWeather(data) {

    weatherDisplay.innerHTML = `
        <h2>${data.name}</h2>
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>🌥 ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `;

    cityInput.focus();
}

function showError(message) {
    weatherDisplay.innerHTML = `
        <div class="error-message">
            ${message}
        </div>
    `;
}

function showLoading() {
    weatherDisplay.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading weather...</p>
        </div>
    `;
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (!city) {
        showError("⚠️ Please enter a city name.");
        return;
    }

    if (city.length < 2) {
        showError("⚠️ City name too short.");
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

weatherDisplay.innerHTML = `
    <p>🌍 Enter a city name to get started!</p>
`;