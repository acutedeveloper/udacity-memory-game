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
