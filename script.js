const button = document.getElementById("actionButton");
const strips = document.getElementById("strips");
const balloons = document.getElementById("balloons");
const cake = document.getElementById("cake");

let stage = 0;

button.addEventListener("click", () => {
    switch (stage) {
        case 0: // Light Up
            document.body.style.backgroundColor = "#fff";
            button.textContent = "Lights";
            stage++;
            break;
        case 1: // Show Strips
            strips.classList.remove("hidden");
            button.textContent = "Balloons";
            stage++;
            break;
        case 2: // Balloons
            generateBalloons();
            balloons.classList.remove("hidden");
            button.textContent = "Cake";
            stage++;
            break;
        case 3: // Show Cake
            cake.classList.remove("hidden");
            button.textContent = "Lovely Message";
            stage++;
            break;
        case 4: // Lovely Message
            showLovelyMessage();
            break;
    }
});

// Generate glowing strips
for (let i = 0; i < 6; i++) {
    const strip = document.createElement("div");
    strip.className = "strip";
    strips.appendChild(strip);
}

// Generate balloons
function generateBalloons() {
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.left = Math.random() * 100 + "vw";
        balloon.style.animationDuration = 4 + Math.random() * 2 + "s";
        balloons.appendChild(balloon);
    }
}

// Get a random color
function getRandomColor() {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a2", "#ffbd33"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Show the lovely message
function showLovelyMessage() {
    const popup = document.createElement("div");
    popup.id = "popupMessage";
    popup.textContent = "You light up my life! 🎉 Happy Birthday! 💖";
    document.body.appendChild(popup);
    popup.style.display = "block";
    button.style.display = "none";
}
