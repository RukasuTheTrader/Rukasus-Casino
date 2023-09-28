document.addEventListener('DOMContentLoaded', (event) => {
    //...
    let betInput = document.getElementById('betInput');
    betInput.addEventListener('input', function() {
        let inputValue = parseInt(betInput.value, 10);
        if (isNaN(inputValue) || inputValue < 10) {
            betInput.value = 10;
        } else if (inputValue > jackBalance) {
            alert('Your bet cannot be higher than your Jack balance!');
            betInput.value = jackBalance;
        } else {
            bet = inputValue;
            betSlider.value = bet;
            betDisplay.textContent = 'Bet: ' + bet;
        }
    });

    betSlider.addEventListener('input', function() {
        let sliderValue = parseInt(betSlider.value, 10);
        bet = sliderValue;
        betInput.value = bet;
        betDisplay.textContent = 'Bet: ' + bet;
    });
    //...
});

