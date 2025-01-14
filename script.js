// Select elements
const openCardButton = document.getElementById('openCard');
const closeCardButton = document.getElementById('closeCard');
const surpriseSection = document.getElementById('surpriseSection');

// Event listener to show the surprise
openCardButton.addEventListener('click', function() {
    surpriseSection.classList.remove('hidden');
});

// Event listener to hide the surprise
closeCardButton.addEventListener('click', function() {
    surpriseSection.classList.add('hidden');
});
