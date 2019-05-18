/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

init();

// Event Listener & anonymous btn function called by event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Random #
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display Result
        let diceDOM =  document.querySelector('.dice');
        diceDOM.style.display = 'block'; // show dice again
        diceDOM.src = 'dice-' + dice + '.png' // show correct dice png

        // 3. Update Round Score IF the rolled # was NOT a 1
        if (dice !== 1) {
            // update and display round score
            roundScore += dice;
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

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
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

     //document.querySelector('.player-0-panel').classList.remove('active');
     //document.querySelector('.player-1-panel').classList.add('active');

     // When player rolls a 1, hide dice again
     document.querySelector('.dice').style.display = 'none';
}

// Pass init function into event listener so when new game btn is clicked,
// a new game will start
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Initially hide dice
    document.querySelector('.dice').style.display = 'none';

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
}





// Set a value
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Get a value
// let x = document.querySelector('#score-0').textContent;