const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const timestampInput = document.querySelector("#timestamp");

// Display the current year and last modified date
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Mobile navigation menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Set the current date and time in the hidden timestamp field
timestampInput.value = new Date().toLocaleString();

// Membership modal buttons and dialogs
const btnNp = document.querySelector("#btn-np");
const btnBronze = document.querySelector("#btn-bronze");
const btnSilver = document.querySelector("#btn-silver");
const btnGold = document.querySelector("#btn-gold");

const modalNp = document.querySelector("#modal-np");
const modalBronze = document.querySelector("#modal-bronze");
const modalSilver = document.querySelector("#modal-silver");
const modalGold = document.querySelector("#modal-gold");

// Open each modal when Learn More is clicked
btnNp.addEventListener("click", () => {
    modalNp.showModal();
});

btnBronze.addEventListener("click", () => {
    modalBronze.showModal();
});

btnSilver.addEventListener("click", () => {
    modalSilver.showModal();
});

btnGold.addEventListener("click", () => {
    modalGold.showModal();
});

// Close buttons for all modals
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");
        dialog.close();
    });
});
