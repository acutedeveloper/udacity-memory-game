/*
Any data information required for game setup and gamePlay
*/

// Game Data to help track different stats withing the game
var gameData = {
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

var moveCounter = {

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
