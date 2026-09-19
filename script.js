const API_KEY = "98e2431fb9cb4499b2d52325261909";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();
    const country = document.getElementById("countryInput").value.trim();

    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = "";

    // Check input
    if (city === "" || country === "") {
        errorMessage.textContent =
            "Please enter both city and country.";
        return;
    }

    // Create location query
    const location = `${city}, ${country}`;

    const API_URL =
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`;

    try {

        // Show loading
        errorMessage.textContent = "Loading weather...";

        const response = await fetch(API_URL);

        const data = await response.json();

        // API error
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather data."
            );
        }

        errorMessage.textContent = "";

        // Display weather
        document.getElementById("location").textContent =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("weatherIcon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("temperature").textContent =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").textContent =
            data.current.condition.text;

        document.getElementById("humidity").textContent =
            `${data.current.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.current.wind_kph} km/h`;

        document.getElementById("feelsLike").textContent =
            `${data.current.feelslike_c}°C`;

        document.getElementById("visibility").textContent =
            `${data.current.vis_km} km`;

    } catch (error) {

        console.error(error);

        errorMessage.textContent =
            error.message || "Something went wrong.";
    }
}