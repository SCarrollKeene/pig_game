let scores, roundScore, activePlayer, gamePlaying;

// Initialize Game
init();

// Store value of last roll
let lastDice;

// Event Listener & anonymous btn function called by event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random #
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display Result
        document.getElementById('dice-0').style.display = 'block'; // show dice again
        document.getElementById('dice-1').style.display = 'block'; // show dice again
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'; // show correct dice png
        document.getElementById('dice-1').src = 'dice-' + dice2 + '.png'; // show correct dice png

        // 3. Update Round Score IF the rolled # was NOT a 1
        // If last two dice rolled both equal 6, player loses score
        /*
        if (dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            // Update the UI to reflect score loss
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // Next Players turn
            nextPlayer();
        } else if (dice !== 1) {
            // update and display round score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }

        lastDice = dice;
        */

       // 3. Update Round Score IF the rolled # was NOT a 1
       if (dice1 !== 1 && dice2 !== 1) {
            // update and display round score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Add CURRENT score to players' GLOBAL score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Grabs value that user enters in final score input field
        let input = document.querySelector('.final-score').value;
        let winningScore;

        // Check if the input variable is empty
        // Undefined, 0, null, '' are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // set state variable to false
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
     // Next Player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     // set round score back to zero
     roundScore = 0;

     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     // Display who active player is
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     // When player rolls a 1, hide dice again
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}

// Pass init function into event listener so when new game btn is clicked,
// a new game will start
document.querySelector('.btn-new').addEventListener('click', init);

// **DRY Principle** Create Function to hide the dice

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Initially hide dice
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
    // **Implement a way to clear Final Score input box when you click NEW GAME**
    
}