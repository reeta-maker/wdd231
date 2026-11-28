import { places } from "../data/discover.mjs";

// --- 1. Navigation & Footer Dates (matching existing pages) ---
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
        menuButton.textContent = navigation.classList.contains("open") ? "✕" : "☰";
    });
}

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");
if (currentYear) currentYear.textContent = new Date().getFullYear();
if (lastModified) lastModified.textContent = document.lastModified;

// --- 2. Visitor Tracking with localStorage ---
const visitDisplay = document.querySelector("#visit-message");
const msPerDay = 1000 * 60 * 60 * 24;
const now = Date.now();
const lastVisit = Number(localStorage.getItem("discoverLastVisit"));

if (!lastVisit) {
    visitDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor((now - lastVisit) / msPerDay);
    if (daysBetween < 1) {
        visitDisplay.textContent = "Back so soon! Awesome!";
    } else {
        const unit = daysBetween === 1 ? "day" : "days";
        visitDisplay.textContent = `You last visited ${daysBetween} ${unit} ago.`;
    }
}

localStorage.setItem("discoverLastVisit", now);

// --- 3. Build 8 Discover Cards ---
const grid = document.querySelector("#discover-grid");
const fragment = document.createDocumentFragment();

places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    const imgAttributes = index === 0
        ? 'fetchpriority="high"'
        : 'loading="lazy"';

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="${place.name}" width="300" height="200" ${imgAttributes}>
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button">learn more</button>
    `;

    fragment.appendChild(card);
});

grid.appendChild(fragment);
