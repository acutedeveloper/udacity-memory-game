/*
Any data information required for game setup and gamePlay
*/

// Game Data to help track different stats withing the game
const gameData = {
  icons: [
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
  ],

  flippedCards: [],
  matchedPairs: [],
  numberArray: [],

  // Reset the arrays used for gameplay
  resetData: function () {
    this.flippedCards = [];
    this.matchedPairs = [];
    this.numberArray = [];
  },

  // Return shuffled numbers for placing the icons
  shuffleNumbers: function () {

    const noOfIcons = this.icons.length;

    if (this.numberArray.length === noOfIcons)
      return this.numberArray;

    const funcNumArray = this.numberArray;
    const number = this.getRandomInt(noOfIcons);

    if (funcNumArray.indexOf(number) === -1) {

      funcNumArray.push(number);
      this.shuffleNumbers(funcNumArray);

    } else {

      this.shuffleNumbers(funcNumArray);

    }

    return funcNumArray;

  },

  // Return a random number
  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

const moveCounter = {

  counterElement: "",
  moves: 0,

  init: function(element) {
    this.counterElement = element;
    this.updateMoves();
    this.displayMovesCount();
  },

  updateMoves: function() {
    this.moves += 1;
  },

  resetMoves: function() {
    this.moves = 0;
    this.displayMovesCount();
  },

  displayMovesCount: function() {

    if(this.counterElement !== ""){
      const counterElm = document.querySelector(this.counterElement);
      counterElm.innerText = this.moves;
    } else {
      console.log("No counter Element Selected");
    }

  }
}

/* Setup Game Board */

const gameBoard = {

  settings: {
    gameGrid: '',
    gameResetButton: '',
    gameCardsFragment: '',
    shuffledNumbers: gameData.shuffleNumbers()
  },


  // Initial function to call to setup the board
  init: function() {
    this.getDomElements();
    this.bindUi();
    this.buildBoard();
  },

  getDomElements: function() {
    this.gameGrid = document.querySelector('.game-grid__inner');
    this.gameResetButton = document.querySelector('.js-game-reset');
    this.gameCardsFragment = document.createDocumentFragment();
  },

  bindUi: function() {
    this.gameGrid.addEventListener('click', function() {
      gamePlay.init(event);
    });
    document.addEventListener('click', function() {
      gamePlay.resetGame();
    });
  },

  buildBoard: function() {

    for (let i = 0; i < 16; i++) {

      this.createCard(i);

    }

    this.gameGrid.appendChild(this.gameCardsFragment);
  },

  createCard: function(i) {
    const gameCard = document.createElement('div');
    gameCard.className = "game-card";

    const gameCardId = document.createAttribute("data-cardid");
    gameCardId.value = i;
    gameCard.setAttributeNode(gameCardId);

    const gameCardInner = document.createElement('div');
    gameCardInner.className = "game-card__inner";

    const gameCardContent = document.createElement('div');
    gameCardContent.className = "game-card__content";

    const gameCardContentFront = document.createElement('div');
    gameCardContentFront.className = "game-card__content-front";

    const gameCardContentBack = document.createElement('div');
    gameCardContentBack.className = "game-card__content-back";

    // For Debugging Purposes ;)
    //gameCardContentBack.innerText = gameData.icons[this.settings.shuffledNumbers[i]];

    const gameIcon = document.createElement('i');
    gameIcon.className = gameData.icons[this.settings.shuffledNumbers[i]];

    gameCardContentFront.appendChild(gameIcon);

    gameCardContent.appendChild(gameCardContentBack);
    gameCardContent.appendChild(gameCardContentFront);

    gameCardInner.appendChild(gameCardContent);

    gameCard.appendChild(gameCardInner);

    this.gameCardsFragment.appendChild(gameCard);

  },

}

/* Handles user interactions */

const gamePlay = {

  settings: {
    currentCard: '',
    cardIcon: '',
    cardId: '',
    modal: ''
  },

  init: function(event) {

    // We only want to log clicks from game-cards
    if (event.target.classList.contains("game-grid"))
      return false;

    this.getDomElements();
    this.flipCard();
    this.gameStatus();
    moveCounter.init(".game-moves__counter");

  },

  getDomElements: function() {

    this.settings.currentCard = event.target.closest(".game-card");
    this.settings.cardIcon = this.settings.currentCard.getElementsByTagName("i")[0].className;
    this.settings.cardId = this.settings.currentCard.getAttribute("data-cardid");

  },

  flipCard: function() {

    if (gameData.flippedCards.length < 2) {

      // Need to lock card when flipped until 2 cards are clicked
      gameData.flippedCards.push({
        cardIcon: this.settings.cardIcon,
        cardId: this.settings.cardId
      });

      this.settings.currentCard.querySelector(".game-card__content").classList.toggle('js__is-flipped');

    }

  },

  gameStatus: function() {

    if (gameData.flippedCards.length === 2) {

      // Capture the value of THIS objects context
      const self = this;

      window.setTimeout(function() {
        // inside here its a global context

        // We can then run THIS checkCards
        if (self.checkCards()) {

          const matchedCards = gameBoard.gameGrid.querySelectorAll(`.${self.settings.cardIcon}`);

          matchedCards.forEach(function(match) {
            const matchParent = match.closest(".game-card__content");
            matchParent.classList.remove('js__is-flipped');
            matchParent.classList.add('js__is-matched');
          });

        }

        if (gameData.matchedPairs.length === 8) {
          // Celebrate in some fashion
          self.celebrate();
        }

      }, 500);

    }

  },

  checkCards: function() {


    if (gameData.flippedCards.length === 2 && gameData.flippedCards[0].cardIcon === gameData.flippedCards[1].cardIcon && gameData.flippedCards[0].cardId !== gameData.flippedCards[1].cardId) {

      gameData.flippedCards = [];
      gameData.matchedPairs.push(this.settings.cardIcon);

      return true;

    } else {

      // remove class is-flipped from all.
      const selectedCards = gameBoard.gameGrid.querySelectorAll('.js__is-flipped');

      selectedCards.forEach(function(card) {

        card.classList.remove('js__is-flipped');

      });

      gameData.flippedCards = [];

      return false;

    }

  },

  resetGame: function() {

    if (event.target.classList.contains('js__game-reset')) {


      const modal = document.querySelector(".game-modal");

      this.resetCards();

      moveCounter.resetMoves();
      gameData.resetData();

      if (modal.classList.contains("js-active")) {
        // Capture the current state of the modal

        this.celebrate();
      }

    }
  },

  celebrate: function() {

    const modal = document.querySelector(".game-modal");
    modal.classList.toggle("js-active");

  },

  resetCards: function() {

    // remove class is-flipped from all.
    const selectedCards = gameBoard.gameGrid.querySelectorAll('.js__is-flipped, .js__is-matched');

    selectedCards.forEach(function(card) {

      card.classList.remove('js__is-flipped', 'js__is-matched');

    });

    gameData.flippedCards = [];

  }
}

gameBoard.init();
