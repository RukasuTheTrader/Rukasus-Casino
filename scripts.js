let bet = 10; // Der Einsatz des Spielers pro Spiel
let betSlider = document.getElementById('betSlider');
let betDisplay = document.getElementById('betDisplay');

betSlider.addEventListener('input', function() {
    let betValue = parseInt(betSlider.value, 10);
    if (betValue > jackBalance) {
        alert('Ihr Einsatz kann nicht höher sein als Ihr Jack Balance!');
        betSlider.value = bet;
    } else {
        bet = betValue;
        betDisplay.textContent = 'Einsatz: ' + bet;
    }
});


let playerScore = 0;
let hostScore = 0;
let jackBalance = 1000;
let bet = 10; // Der Einsatz des Spielers pro Spiel

// Initialisierung des Spiels
function initGame() {
    playerScore = 0;
    hostScore = 0;
    betSlider.value = bet;
    betDisplay.textContent = 'Einsatz: ' + bet;
    // ... der Rest des Codes bleibt unverändert ...
    document.getElementById('playerScore').textContent = "Spieler: " + playerScore;
    document.getElementById('hostScore').textContent = "Host: " + hostScore;
    document.getElementById('jackBalance').textContent = "Jack: " + jackBalance;
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('holdBtn').disabled = false;
}

// Wenn der Spieler würfelt
document.getElementById('rollBtn').addEventListener('click', function() {
    let roll = Math.floor(Math.random() * 100) + 1;
    // Überprüfen der Sonderregel
    if (roll <= 4 && playerScore === 0) {
        endGame(false); // Host gewinnt sofort
        return;
    }
    playerScore += roll;
    document.getElementById('playerScore').textContent = "Spieler: " + playerScore;
    if (playerScore > 100) {
        endGame(false); // Spieler hat verloren
    }
});

// Wenn der Spieler hält
document.getElementById('holdBtn').addEventListener('click', function() {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;
    while (hostScore < playerScore && hostScore <= 100) {
        let roll = Math.floor(Math.random() * 100) + 1;
        if (roll <= 4 && hostScore === 0) {
            endGame(true); // Spieler gewinnt sofort
            return;
        }
        hostScore += roll;
        document.getElementById('hostScore').textContent = "Host: " + hostScore;
    }
    if (hostScore > 100 || hostScore < playerScore) {
        endGame(true); // Spieler hat gewonnen
    } else if (hostScore === playerScore) {
        endGame('draw'); // Unentschieden
    } else {
        endGame(false); // Spieler hat verloren
    }
});

function endGame(result) {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;
    if (result === true) {
        jackBalance += bet * 2;
    } else if (result === 'draw') {
        jackBalance += bet;
    } else {
        jackBalance -= bet;
    }
    document.getElementById('jackBalance').textContent = "Jack: " + jackBalance;
    // Nach einer kurzen Pause, Spiel zurücksetzen
    setTimeout(initGame, 3000);
}

// Spiel starten
initGame();
