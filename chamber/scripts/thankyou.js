const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const resultsContainer = document.querySelector("#results");

// Display the current year and last modified date
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Mobile navigation menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

// Get the submitted form values from the URL
const params = new URLSearchParams(window.location.search);

const firstName = params.get("first-name");
const lastName = params.get("last-name");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

// Create and display paragraphs for each required field
function displayFormResults() {
    resultsContainer.innerHTML = "";

    const namePara = document.createElement("p");
    namePara.textContent = `Applicant Name: ${firstName} ${lastName}`;

    const emailPara = document.createElement("p");
    emailPara.textContent = `Email Address: ${email}`;

    const phonePara = document.createElement("p");
    phonePara.textContent = `Mobile Phone: ${phone}`;

    const orgPara = document.createElement("p");
    orgPara.textContent = `Business/Organization: ${organization}`;

    const datePara = document.createElement("p");
    datePara.textContent = `Form Loaded On: ${timestamp}`;

    resultsContainer.appendChild(namePara);
    resultsContainer.appendChild(emailPara);
    resultsContainer.appendChild(phonePara);
    resultsContainer.appendChild(orgPara);
    resultsContainer.appendChild(datePara);
}

displayFormResults();
