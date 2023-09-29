let playerJack = 1000;
let playerScore = 0;
let hostScore = 0;

document.getElementById('bet').addEventListener('input', function (e) {
    document.getElementById('betNumber').value = e.target.value;
});

document.getElementById('betNumber').addEventListener('input', function (e) {
    document.getElementById('bet').value = e.target.value;
});

function loadGame(gameId) {
    document.querySelector('.game').classList.add('hidden');
    document.getElementById(gameId).classList.remove('hidden');
}

function startGame() {
    document.getElementById('playerArea').classList.remove('hidden');
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
    if (playerWins) playerJack += bet;
    else playerJack -= bet;
    alert(playerWins ? 'Du gewinnst!' : 'Du verlierst!');
}

function resetGame() {
    document.getElementById('reset').classList.add('hidden');
    document.getElementById('playerArea').classList.add('hidden');
    document.getElementById('hostArea').classList.add('hidden');
    playerScore = 0;
    hostScore = 0;
    document.getElementById('playerScore').innerText = '0';
    document.getElementById('hostScore').innerText = '0';
}
