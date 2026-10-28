// Select the menu button and navigation menu
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Open or close the navigation menu when the button is clicked
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    // Update the button's accessibility information
    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Change the hamburger icon
    menuButton.textContent = isOpen ? "✕" : "☰";
});