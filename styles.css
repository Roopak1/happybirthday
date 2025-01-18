/* General Styles */
body {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000; /* Start with dark background */
    transition: background-color 0.5s ease;
}

#container {
    text-align: center;
}

#actionButton {
    background-color: #333;
    color: white;
    font-size: 1.5rem;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

#actionButton:hover {
    background-color: #555;
    transform: scale(1.05);
}

/* Strips */
#strips {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: -1; /* Behind everything */
    opacity: 0;
    transition: opacity 0.5s;
}

.strip {
    width: 10%;
    height: 100%;
    animation: glow 1s infinite alternate;
}

/* Random glowing colors */
.strip:nth-child(1) { background-color: #ff0000; }
.strip:nth-child(2) { background-color: #00ff00; }
.strip:nth-child(3) { background-color: #0000ff; }
.strip:nth-child(4) { background-color: #ffff00; }
.strip:nth-child(5) { background-color: #ff00ff; }
.strip:nth-child(6) { background-color: #00ffff; }

@keyframes glow {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
}

/* Balloons */
#balloons {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: -1;
}

.balloon {
    position: absolute;
    bottom: 0;
    width: 50px;
    height: 70px;
    background-color: red;
    border-radius: 50%;
    animation: float 5s linear infinite;
}

@keyframes float {
    0% { transform: translateY(0); }
    100% { transform: translateY(-120vh); }
}

/* Cake */
#cake {
    margin-top: 20px;
    opacity: 0;
    transition: opacity 0.5s ease;
}

#cake img {
    max-width: 300px;
    border-radius: 15px;
}

/* Lovely Message Popup */
#popupMessage {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-size: 1.5rem;
    display: none;
}
