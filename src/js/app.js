/* Setup Game Board */

var gameBoard = {

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
    this.gameGrid = document.querySelector('.game-grid');
    this.gameResetButton = document.querySelector('.js-game-reset');
    this.gameCardsFragment = document.createDocumentFragment();
  },

  bindUi: function() {
    this.gameGrid.addEventListener('click', function(){
      gamePlay.init(event);
    });
    this.gameResetButton.addEventListener('click', function() {
      gamePlay.resetGame();
    });
  },

  buildBoard: function() {

    for (var i = 0; i < 16; i++) {

      this.createCard(i);

    }

    this.gameGrid.appendChild(this.gameCardsFragment);
  },

  createCard: function(i) {
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

var gamePlay = {

  settings: {
    currentCard: '',
    cardIcon: '',
    cardId: '',
  },

  init: function(event) {

    // We only want to log clicks from game-cards
    if(event.target.classList.contains("game-grid"))
      return false;

      this.getCardElements();
      this.flipCard();
      this.gameStatus();
      moveCounter.init(".game-moves__counter");

  },

  getCardElements: function() {

    this.settings.currentCard = event.target.closest(".game-card");
    this.settings.cardIcon = this.settings.currentCard.getElementsByTagName("i")[0].className;
    this.settings.cardId = this.settings.currentCard.getAttribute("data-cardid");

  },

  flipCard: function() {

    if(gameData.flippedCards.length < 2){

      // Need to lock card when flipped until 2 cards are clicked
      gameData.flippedCards.push({
        cardIcon: this.settings.cardIcon,
        cardId: this.settings.cardId
      });

      this.settings.currentCard.querySelector(".game-card__content").classList.toggle('js__is-flipped');

    }

  },

  gameStatus: function() {

    if(gameData.flippedCards.length === 2){

      // Capture the value of THIS objects context
      var self = this;

      window.setTimeout(function() {
      // inside here its a global context

        // We can then run THIS checkCards
        if(self.checkCards()) {

          var matchedCards = gameBoard.gameGrid.querySelectorAll(`.${self.settings.cardIcon}`);

          matchedCards.forEach(function(match) {
            var matchParent = match.closest(".game-card__content");
            matchParent.classList.remove('js__is-flipped');
            matchParent.classList.add('js__is-matched');
          });

        }

        if(gameData.matchedPairs.length === 8){
          // Celebrate in some fashion
          self.celebrate();
        }

      }, 500);

    }

  },

  checkCards: function() {


    if(gameData.flippedCards.length === 2 && gameData.flippedCards[0].cardIcon === gameData.flippedCards[1].cardIcon && gameData.flippedCards[0].cardId !== gameData.flippedCards[1].cardId){

      gameData.flippedCards = [];
      gameData.matchedPairs.push(this.cardIcon);

      return true;

    } else {

      // remove class is-flipped from all.
      var selectedCards = gameBoard.gameGrid.querySelectorAll('.js__is-flipped');

      selectedCards.forEach(function (card) {

        card.classList.remove('js__is-flipped');

      });

      gameData.flippedCards = [];

      return false;

    }

  },

  resetGame: function() {

    this.resetCards();
    moveCounter.resetMoves();

  },

  celebrate: function() {

    const modal = document.querySelector(".game-modal");
    modal.classList.toggle("js-active");

  },

  resetCards: function() {

    // remove class is-flipped from all.
    var selectedCards = gameBoard.gameGrid.querySelectorAll('.js__is-flipped, .js__is-matched');

    selectedCards.forEach(function (card) {

      card.classList.remove('js__is-flipped', 'js__is-matched');

    });

    gameData.flippedCards = [];

  }
}

gameBoard.init();
