/*
* The gameplay

The idea is that when the use will flip a maximum of two cards
The cards will then be checked if they match.
If they do not match
the cards will flip back over
if they do match
the cards will stay facing up and the user can then flip more cards
the matching pair of cards are logged

the user will then repeat the process

when the user has matched all 16 cards then the game has been won

----
We need to log each pair that have been matched
We need a is matched function
We nedd a is not matched function

*/

var gameGrid = document.querySelector('.game-grid');

var cardIcons = [
  "icon-mic-outline",
  "icon-camera-alt",
  "icon-crown",
  "icon-anchor",
  "icon-graduation-cap",
  "icon-paper-plane-empty",
  "icon-diamond",
  "icon-balance-scale",
  "icon-mic-outline",
  "icon-camera-alt",
  "icon-crown",
  "icon-anchor",
  "icon-graduation-cap",
  "icon-paper-plane-empty",
  "icon-diamond",
  "icon-balance-scale"
];

/*
* Shuffle the icons
*/

var numberArray = [];

function shuffleNumbers(numberArray) {

  if (numberArray.length === 16)
    return numberArray;

  var funcNumArray = numberArray;
  var number = getRandomInt(16);

  if (funcNumArray.indexOf(number) === -1) {

    funcNumArray.push(number);
    shuffleNumbers(funcNumArray);

  } else {

    shuffleNumbers(funcNumArray);

  }

  return funcNumArray;

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var shuffledNumbers = shuffleNumbers(numberArray);


/*
* Setup the gameboard
*/

var gameCardsFragment = document.createDocumentFragment();

for (var i = 0; i < 16; i++) {

  var gameCard = document.createElement('div');
  gameCard.className = "game-card";

  var gameCardInner = document.createElement('div');
  gameCardInner.className = "game-card__inner";

  var gameCardContent = document.createElement('div');
  gameCardContent.className = "game-card__content";

  var gameCardContentFront = document.createElement('div');
  gameCardContentFront.className = "game-card__content-front";

  var gameCardContentBack = document.createElement('div');
  gameCardContentBack.className = "game-card__content-back";

  var gameIcon = document.createElement('i');
  gameIcon.className = cardIcons[shuffledNumbers[i]];

  gameCardContentFront.appendChild(gameIcon);

  gameCardContent.appendChild(gameCardContentBack);
  gameCardContent.appendChild(gameCardContentFront);

  gameCardInner.appendChild(gameCardContent);

  gameCard.appendChild(gameCardInner);

  gameCardsFragment.appendChild(gameCard);

}

gameGrid.appendChild(gameCardsFragment);



// Lets track how many cards are flipped
var flippedCards = [];
var matchedPairs = [];

gameGrid.addEventListener('click', function(event) {

  // Get the closest card content
  var currentCard = event.target.closest(".game-card__content");

  // Get the icon type of the card
  var cardIcon = currentCard.getElementsByTagName("i")[0].className;

  // Flip card
  if(flippedCards.length < 2){

    // Need to lock card when flipped until 2 cards are clicked
    flippedCards.push(cardIcon);
    currentCard.classList.toggle('js__is-flipped');

  }

  if(flippedCards.length === 2){

    window.setTimeout(function() {

      if (checkCards(cardIcon)){
      var matchedCards = gameGrid.querySelectorAll(`.${cardIcon}`);

      matchedCards.forEach(function(match) {
        var matchParent = match.closest(".game-card__content");
        matchParent.classList.remove('js__is-flipped');
        matchParent.classList.add('js__is-matched');
      });

    }

    }, 500);

  }

  if(matchedPairs.length === 8){
    // Celebrate in some fashion
    celebrate();
  }

});

// When the card are flipped and matched they need to stay flipped. So add a new class for when they are matched
function checkCards(cardIcon) {

  if(flippedCards[0] === flippedCards[1]){

    flippedCards = [];
    matchedPairs.push(cardIcon);

    return true;

  } else {

    // remove class is-flipped from all.
    var selectedCards = gameGrid.querySelectorAll('.js__is-flipped');

    selectedCards.forEach(function (card) {
      console.log(card);
      card.classList.remove('js__is-flipped');
      flippedCards = [];

    })

    return false;

  }

}

function celebrate(){

  const modal = document.querySelector(".game-modal");
  modal.classList.toggle("js-active");

}
