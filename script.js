// Select elements
const startPage = document.getElementById("startPage");
const mainPage = document.getElementById("mainPage");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const actionButton = document.getElementById("actionButton");
const strips = document.getElementById("strips");
const balloons = document.getElementById("balloons");
const cake = document.getElementById("cake");

let stage = 0;

// Start Page Logic
yesButton.addEventListener("click", () => {
    startPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
});

noButton.addEventListener("click", () => {
    alert("Okay, maybe next time! 😊");
    window.close(); // Attempts to close the window (may not work in some browsers).
});

// Button Click Logic
actionButton.addEventListener("click", () => {
    switch (stage) {
        case 0: // Light Up
            document.body.style.backgroundColor = "#fff";
            actionButton.textContent = "Lights";
            stage++;
            break;
        case 1: // Show Strips
            showStrips();
            actionButton.textContent = "Balloons";
            stage++;
            break;
        case 2: // Balloons
            showBalloons();
            actionButton.textContent = "Cake";
            stage++;
            break;
        case 3: // Show Cake
            cake.classList.remove("hidden");
            actionButton.textContent = "Lovely Message";
            stage++;
            break;
        case 4: // Lovely Message
            showLovelyMessage();
            break;
    }
});

// Function to show strips
function showStrips() {
    strips.classList.remove("hidden");
    for (let i = 0; i < 6; i++) {
        const strip = document.createElement("div");
        strip.className = "strip";
        strips.appendChild(strip);
    }
}

// Function to show balloons
function showBalloons() {
    balloons.classList.remove("hidden");
    for (let i = 0; i < 30; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.animationDuration = 4 + Math.random() * 3 + "s";

        // Add string to balloon
        const string = document.createElement("div");
        string.className = "string";
        balloon.appendChild(string);

        balloons.appendChild(balloon);
    }
}

// Function to generate random colors
function getRandomColor() {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a2", "#ffbd33"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to show the lovely message
function showLovelyMessage() {
    const popup = document.createElement("div");
    popup.id = "popupMessage";
    popup.innerHTML = `
        <h2>💖 To the most amazing person 💖</h2>
        <p>
            You light up my world in every way imaginable. Thank you for being you. 
            I hope this little gift brings a smile to your face, just like you bring one to mine every day. 
            Happy Birthday! 🎉💖
        </p>
    `;
    document.body.appendChild(popup);
    actionButton.style.display = "none";
}
