document.addEventListener('DOMContentLoaded', (event) => {

let bet = 10; // The player's bet per game
let betSlider = document.getElementById('betSlider');
let betDisplay = document.getElementById('betDisplay');

betSlider.addEventListener('input', function() {
    let betValue = parseInt(betSlider.value, 10);
    if (betValue > jackBalance) {
        alert('Your bet cannot be higher than your Jack balance!');
        betSlider.value = jackBalance;
    } else {
        bet = betValue;
        betDisplay.textContent = 'Bet: ' + bet;
    }
});

let playerScore = 0;
let hostScore = 0;
let jackBalance = 1000;
let bet = 10; // The player's bet per game

// Game Initialization
function initGame() {
    // Deducting the bet
    jackBalance -= bet;
    document.getElementById('jackBalance').textContent = "Jack: " + jackBalance;
    betSlider.max = jackBalance; // Setzt das Maximum des Sliders auf den Jack Balance des Spielers
    playerScore = 0;
    hostScore = 0;
    betSlider.value = bet;
    betDisplay.textContent = 'Bet: ' + bet;
    document.getElementById('playerScore').textContent = "Player: " + playerScore;
    document.getElementById('hostScore').textContent = "Host: " + hostScore;
    document.getElementById('jackBalance').textContent = "Jack: " + jackBalance;
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('holdBtn').disabled = false;
}

// When the player rolls
document.getElementById('rollBtn').addEventListener('click', function() {
    let roll = Math.floor(Math.random() * 100) + 1;
    // Checking the special rule
    if (roll <= 4 && playerScore === 0) {
        endGame(false); // Host wins immediately
        return;
    }
    playerScore += roll;
    document.getElementById('playerScore').textContent = "Player: " + playerScore;
    if (playerScore > 100) {
        endGame(false); // Player has lost
    }
});

// When the player holds
document.getElementById('holdBtn').addEventListener('click', function() {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;
    while (hostScore < playerScore && hostScore <= 100) {
        let roll = Math.floor(Math.random() * 100) + 1;
        if (roll <= 4 && hostScore === 0) {
            endGame(true); // Player wins immediately
            return;
        }
        hostScore += roll;
        document.getElementById('hostScore').textContent = "Host: " + hostScore;
    }
    if (hostScore > 100 || hostScore < playerScore) {
        endGame(true); // Player has won
    } else if (hostScore === playerScore) {
        endGame('draw'); // Draw
    } else {
        endGame(false); // Player has lost
    }
});

function endGame(result) {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;
    if (result === true) {
        jackBalance += bet * 2; // Correct: Returns double the bet
    } else if (result === 'draw') {
        jackBalance += bet; // Bet has already been deducted, so only + bet
    } else {
        jackBalance -= bet;
    }
    document.getElementById('jackBalance').textContent = "Jack: " + jackBalance;
    // Resetting the game after a short pause
    setTimeout(initGame, 3000);
}

// Starting the game
initGame();

});
