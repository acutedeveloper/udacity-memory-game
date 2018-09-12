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

  var gameCardId = document.createAttribute("data-cardid");
  gameCardId.value = i;
  gameCard.setAttributeNode(gameCardId);

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

gameGrid.addEventListener('click', playGame, true);

function playGame(event) {

        if(event.target.classList.contains("game-grid"))
          return;

        // Get the closest card content
        var currentCard = event.target.closest(".game-card");

        // Get the icon type of the card
        var cardIcon = currentCard.getElementsByTagName("i")[0].className;
        var cardId = currentCard.getAttribute("data-cardid");

        console.log(cardIcon);

        // Flip card
        if(flippedCards.length < 2){

          // Need to lock card when flipped until 2 cards are clicked
          flippedCards.push({
            cardIcon,
            cardId
          });

          currentCard.querySelector(".game-card__content").classList.toggle('js__is-flipped');

        }

        console.log(flippedCards.indexOf(cardIcon));

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

          if(matchedPairs.length === 8){
          // Celebrate in some fashion
          celebrate();
        }

          }, 500);

        }

        moveCounter.init(".game-moves");

}

// When the card are flipped and matched they need to stay flipped. So add a new class for when they are matched
function checkCards(cardIcon) {

  if(flippedCards.length === 2 && flippedCards[0].cardIcon === flippedCards[1].cardIcon && flippedCards[0].cardId !== flippedCards[1].cardId){

    console.log('passed',flippedCards)

    flippedCards = [];
    matchedPairs.push(cardIcon);

    return true;

  } else {
    console.log('failed',flippedCards.length)

    // remove class is-flipped from all.
    var selectedCards = gameGrid.querySelectorAll('.js__is-flipped');

    selectedCards.forEach(function (card) {

      card.classList.remove('js__is-flipped');

    })

    flippedCards = [];

    return false;

  }

}

function celebrate(){

  const modal = document.querySelector(".game-modal");
  modal.classList.toggle("js-active");

}
