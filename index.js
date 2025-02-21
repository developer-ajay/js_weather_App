const apiKey = "2122ddcfccbb3a4b1cd17bdca7b9c889";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon'); 

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message); // Catch API errors
        }

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        // Weather Icon Handling
        const weatherCondition = data.weather[0].main;
        const iconMap = {
            "Clouds": "images/clouds.png",
            "Clear": "images/clear.png",
            "Rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png"
        };
        weatherIcon.src = iconMap[weatherCondition] || "images/clouds.png";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for "Enter" key press
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
