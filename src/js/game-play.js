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
		if (event.target.classList.contains('game-grid'))
			return false;

		this.getDomElements();
		this.flipCard();
		this.gameStatus();
		moveCounter.init('.game-moves__counter');

	},

	getDomElements: function() {

		this.settings.currentCard = event.target.closest('.game-card');
		this.settings.cardIcon = this.settings.currentCard.getElementsByTagName('i')[0].className;
		this.settings.cardId = this.settings.currentCard.getAttribute('data-cardid');

	},

	flipCard: function() {

		if (gameData.flippedCards.length < 2) {

			// Need to lock card when flipped until 2 cards are clicked
			gameData.flippedCards.push({
				cardIcon: this.settings.cardIcon,
				cardId: this.settings.cardId
			});

			this.settings.currentCard.querySelector('.game-card__content').classList.toggle('js__is-flipped');

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
						const matchParent = match.closest('.game-card__content');
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


			const modal = document.querySelector('.game-modal');

			this.resetCards();

			moveCounter.resetMoves();
			gameData.resetData();

			if (modal.classList.contains('js-active')) {
				// Capture the current state of the modal

				this.celebrate();
			}

		}
	},

	celebrate: function() {

		const modal = document.querySelector('.game-modal');
		modal.classList.toggle('js-active');

	},

	resetCards: function() {

		// remove class is-flipped from all.
		const selectedCards = gameBoard.gameGrid.querySelectorAll('.js__is-flipped, .js__is-matched');

		selectedCards.forEach(function(card) {

			card.classList.remove('js__is-flipped', 'js__is-matched');

		});

		gameData.flippedCards = [];

	}
};

gameBoard.init();
