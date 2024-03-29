/*
    GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice; 

// initialize the game
init();  

// roll-dice button event handler 
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Generate random number between 1 and 6 for two dices
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result for dice1 and dice2
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' +dice1+ '.png';
        document.getElementById('dice-2').src = 'dice-' +dice2+ '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if(dice1 !== 1 && dice2 !== 1) {
            // add to round score
            roundScore += dice1 + dice2;
            // display score
            document.querySelector('#current-' +activePlayer).textContent = roundScore;
        } else {
            // if player rolls a 1 - switch players 
            nextPlayer();
        }
    }
}); 

// hold button event handler
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // add current score to GLOBAL score
        scores[activePlayer] += roundScore; 

        // update the UI
        document.querySelector('#score-' +activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;

        // check if input has a value
        if(input) {
            var winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if player won the game - first player to reach 100 points wins
        if(scores[activePlayer] >= winningScore) {
            // display the winner
            document.querySelector('#name-' +activePlayer).textContent = 'Winner!';
            // hide the dice
            hideDice();
            
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            // game is finished - set to false
            gamePlaying = false;

        } else {
            // switch players & continue the game
            nextPlayer();
        }
    }
});

// new game button event handler
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    // switch active player  
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // set round score back to 0 
    roundScore = 0; 

    // display round score as zero when player rolls 1
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // toggle gray background for currently active player turn
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // hide the dice
    hideDice();
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // hide the dice in the beginning of the game
    hideDice();

    // set all score displays to 0 
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // remove custom CSS classes 
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}