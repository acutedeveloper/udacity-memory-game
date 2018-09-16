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

    // For Debugging Purposes ;)
    //gameCardContentBack.innerText = gameData.icons[this.settings.shuffledNumbers[i]];

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
