'use strict';
//selecting elements
const player0Element = document.querySelector('.players-0');
const player1Element = document.querySelector('.players-1');
const point0Element = document.querySelector('#point--0');
const point1Element = document.getElementById('point--1');
const present0Element = document.querySelector('#present--0');
const present1Element = document.querySelector('#present--1');
const ludoElement = document.querySelector('.ludo');
const buttonsNew = document.querySelector('.buttons-new');
const buttonsRoll = document.querySelector('.buttons-roll');
const buttonsHold = document.querySelector('.buttons-hold');

//starting condition

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  point0Element.textContent = '0';
  point1Element.textContent = '0';
  present0Element.textContent = '0';
  present1Element.textContent = '0';
  ludoElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('players-act');
  player1Element.classList.remove('players-act');
  document.querySelector(`#detail--0`).textContent = 'SUSANT';
  document.querySelector(`#detail--1`).textContent = 'DIPSON';
};

init();
const switchPlayer = function () {
  document.getElementById(`present--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('players-act');
  player1Element.classList.toggle('players-act');
};
//rolling dice functionality
buttonsRoll.addEventListener('click', function () {
  //1.Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display a dice
    ludoElement.classList.remove('hidden');
    ludoElement.src = `d${dice}.png`;
    //3.check for rolled 1: if true switch to next player
    if (dice !== 1) {
      //add the dice value to the current score
      currentScore += dice;
      document.getElementById(`present--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

buttonsHold.addEventListener('click', function () {
  //1. add current score to the active player's score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`point--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if player score is >= 100
    if (scores[activePlayer] >= 109) {
      playing = false;
      ludoElement.classList.add('hidden');
      document
        .querySelector(`.players-${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.players-${activePlayer}`)
        .classList.remove('players-act');
      if (activePlayer === 0) {
        document.querySelector(`#detail--${activePlayer}`).textContent =
          'Winner Player1';
      } else {
        document.querySelector(`#detail--${activePlayer}`).textContent =
          'Winner Player2';
      }
    } else {
      switchPlayer();
    }
  }
});

buttonsNew.addEventListener('click', init);
