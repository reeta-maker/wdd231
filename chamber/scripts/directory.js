const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Display the current year and last modified date
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

document.querySelector("#last-modified").textContent =
    document.lastModified;

// Load the business members from the JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load business members.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        membersContainer.textContent =
            "Sorry, the business directory could not be loaded. Please try again.";
        console.error(error);
    }
}

// Display each business
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = member.image;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const address = document.createElement("p");
        address.textContent = `Address: ${member.address}`;

        const phone = document.createElement("p");
        phone.textContent = `Phone: ${member.phone}`;

        // Display the membership name
        const membership = document.createElement("p");

        const membershipNames = {
            1: "Member",
            2: "Silver",
            3: "Gold"
        };

        membership.textContent =
            `Membership: ${membershipNames[member.membership] || "Member"}`;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

// Switch between Grid View and List View
gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Mobile navigation menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

getMembers();