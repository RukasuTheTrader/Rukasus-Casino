let playerJack = 1000;
let playerScore = 0;
let hostScore = 0;

document.getElementById('bet').addEventListener('input', function (e) {
    document.getElementById('betNumber').value = e.target.value;
});

document.getElementById('betNumber').addEventListener('input', function (e) {
    document.getElementById('bet').value = e.target.value;
});

document.getElementById('startButton').addEventListener('click', startGame); // Event-Listener für den Start-Button
document.getElementById('reset').addEventListener('click', resetGame); // Event-Listener für den Reset-Button

function loadGame(gameId) {
    document.querySelector('.game').classList.add('hidden');
    document.getElementById(gameId).classList.remove('hidden');
}

function startGame() {
    let betSlider = document.getElementById('bet'); // Zugriff auf den Slider
    betSlider.min = 10; // Setzen des minimalen Wertes
    betSlider.max = playerJack; // Setzen des maximalen Wertes
    let bet = parseInt(document.getElementById('betNumber').value);
    if (playerJack < bet || bet < 10) { // Überprüfung ob der Einsatz gültig ist
        alert('Invalid bet!');
        return;
    }
    playerJack -= bet;
    updateJackDisplay();
    document.getElementById('playerArea').classList.remove('hidden');
    document.getElementById('startButton').classList.add('hidden');
}

function rollDice() {
    let roll = Math.floor(Math.random() * 100) + 1;
    if (roll <= 4) {
        endGame(false);
        return;
    }
    playerScore += roll;
    if (playerScore > 100) endGame(false);
    document.getElementById('playerScore').innerText = playerScore.toString();
}

function hold() {
    document.getElementById('hostArea').classList.remove('hidden');
    do {
        let roll = Math.floor(Math.random() * 100) + 1;
        hostScore += roll;
    } while (hostScore < playerScore && hostScore <= 100);
    document.getElementById('hostScore').innerText = hostScore.toString();
    if (hostScore > 100 || hostScore < playerScore) {
        endGame(true);
    } else {
        endGame(false);
    }
}

function endGame(playerWins) {
    document.getElementById('reset').classList.remove('hidden');
    let bet = parseInt(document.getElementById('betNumber').value);
    if (playerWins) playerJack += bet * 2; // If player wins, he gets double the bet.
    updateJackDisplay(); // Neu hinzugefügte Zeile
    alert(playerWins ? 'You win!' : 'You lose!');
}

function resetGame() {
    document.getElementById('reset').classList.add('hidden');
    document.getElementById('playerArea').classList.add('hidden');
    document.getElementById('hostArea').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden'); // Show the start button
    playerScore = 0;
    hostScore = 0;
    document.getElementById('playerScore').innerText = '0';
    document.getElementById('hostScore').innerText = '0';
}

function updateJackDisplay() {
    document.getElementById('jackAmount').innerText = playerJack.toLocaleString('en-US');
    let betSlider = document.getElementById('bet'); // Zugriff auf den Slider
    betSlider.max = playerJack; // Aktualisierung des maximalen Wertes des Sliders
    if (playerJack < 10) betSlider.disabled = true; // Deaktivieren des Sliders, wenn der Spieler weniger als 10 Jack hat
    else betSlider.disabled = false; // Aktivieren des Sliders, wenn der Spieler 10 oder mehr Jack hat
}
