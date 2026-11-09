const apiKey = "d6b43ab2e393b6f234502f6c73262dee";

// Narita, Japan coordinates
const latitude = 35.7767;
const longitude = 140.3189;

// Select homepage elements
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

const spotlightContainer = document.querySelector("#spotlight-container");
const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#weather-forecast");

// Display current year and last modified date
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Mobile navigation menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Load members from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members = await response.json();

        // Select only Gold and Silver members
        const qualifiedMembers = members.filter(
            member => member.membership === "2" ||
                member.membership === "3"
        );

        // Randomly select up to three members
        const shuffledMembers = qualifiedMembers.sort(
            () => Math.random() - 0.5
        );

        const selectedMembers = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        spotlightContainer.textContent =
            "Unable to load member spotlights.";

        console.error(error);
    }
}

// Display company spotlights
function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        // Business name
        const name = document.createElement("h3");
        name.textContent = member.name;

        // Business image
        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        // Business address
        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        // Business phone
        const phone = document.createElement("p");
        phone.textContent = member.phone
            ? `Phone: ${member.phone}`
            : "Phone: Not available";

        // Membership level
        const membership = document.createElement("p");
        membership.textContent =
            `Membership: ${member.membership === "3" ? "Gold" : "Silver"}`;

        // Business website
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        // Add information to card
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        spotlightContainer.appendChild(card);
    });
}

// Get current weather for Narita
async function getWeather() {
    try {
        const currentURL =
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await fetch(currentURL);

        if (!response.ok) {
            throw new Error("Unable to load current weather.");
        }

        const weatherData = await response.json();

        // Display current temperature
        currentWeather.innerHTML = `
<h3>Narita, Japan</h3>
<p>Temperature: ${Math.round(weatherData.main.temp)}°C</p>
<p>Weather: ${weatherData.weather[0].description}</p>
`;

    } catch (error) {
        currentWeather.textContent =
            "Weather information is currently unavailable.";

        console.error("Current weather error:", error);
    }

    // Get three-day forecast
    await getForecast();
}

// Get three-day temperature forecast
async function getForecast() {
    try {
        const forecastURL =
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Unable to load weather forecast.");
        }

        const forecastData = await response.json();

        // Group forecast information by date
        const dailyForecast = {};

        const today = new Date().toLocaleDateString("en-CA");

        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            // Exclude today's forecast
            if (date > today) {

                if (!dailyForecast[date]) {
                    dailyForecast[date] = [];
                }

                dailyForecast[date].push(item);
            }
        });

        // Get the next three days
        const dates = Object.keys(dailyForecast)
            .sort()
            .slice(0, 3);

        weatherForecast.innerHTML = "";

        dates.forEach(date => {

            const forecasts = dailyForecast[date];

            // Select the forecast closest to noon
            const middayForecast = forecasts.reduce((closest, item) => {
                const hour = Number(item.dt_txt.split(" ")[1].slice(0, 2));
                const closestHour =
                    Number(closest.dt_txt.split(" ")[1].slice(0, 2));

                return Math.abs(hour - 12) < Math.abs(closestHour - 12)
                    ? item
                    : closest;
            });

            const dayName = new Date(`${date}T12:00:00`)
                .toLocaleDateString("en-US", {
                    weekday: "long"
                });

            const card = document.createElement("article");
            card.classList.add("forecast-card");

            const day = document.createElement("h3");
            day.textContent = dayName;

            const temperature = document.createElement("p");
            temperature.textContent =
                `Temperature: ${Math.round(middayForecast.main.temp)}°C`;

            card.appendChild(day);
            card.appendChild(temperature);

            weatherForecast.appendChild(card);
        });

        if (dates.length < 3) {
            weatherForecast.textContent =
                "Three-day forecast is currently unavailable.";
        }

    } catch (error) {
        weatherForecast.textContent =
            "Weather forecast is currently unavailable.";

        console.error("Forecast error:", error);
    }
}

// Start loading homepage information
getMembers();
getWeather();
