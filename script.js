// Select elements
const actionButton = document.getElementById("actionButton");
const birthdayBanner = document.getElementById("birthdayBanner");
const lights = document.getElementById("lights");
const balloons = document.getElementById("balloons");
const cake = document.getElementById("cake");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

let stage = 0;

// Button Click Logic
actionButton.addEventListener("click", () => {
    switch (stage) {
        case 0: // Light Up
            document.body.style.backgroundColor = "#fff";
            actionButton.textContent = "Lights";
            stage++;
            break;
        case 1: // Show Lights
            showLights();
            actionButton.textContent = "Balloons";
            stage++;
            break;
        case 2: // Balloons
            showBalloons();
            actionButton.textContent = "Cake";
            stage++;
            break;
        case 3: // Cake
            cake.classList.remove("hidden");
            actionButton.textContent = "Lovely Message";
            stage++;
            break;
        case 4: // Lovely Message
            popup.classList.remove("hidden");
            actionButton.style.display = "none";
            break;
    }
});

// Show Lights
function showLights() {
    lights.classList.remove("hidden");
    for (let i = 0; i < 6; i++) {
        const light = document.createElement("div");
        light.className = "light";
        lights.appendChild(light);
    }
}

// Show Balloons
function showBalloons() {
    balloons.classList.remove("hidden");
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.animationDuration = 4 + Math.random() * 2 + "s";

        const string = document.createElement("div");
        string.className = "string";
        balloon.appendChild(string);

        balloons.appendChild(balloon);
    }
}

// Random Color Generator
function getRandomColor() {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a2", "#ffbd33"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Close Popup
closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});
