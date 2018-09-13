
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
  shuffleNumbers: function () {

    if (this.numberArray.length === 16)
      return this.numberArray;

    var funcNumArray = this.numberArray;
    var number = this.getRandomInt(16);

    if (funcNumArray.indexOf(number) === -1) {

      funcNumArray.push(number);
      this.shuffleNumbers(funcNumArray);

    } else {

      this.shuffleNumbers(funcNumArray);

    }

    return funcNumArray;

  },

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
      var counterElm = document.querySelector(this.counterElement);
      counterElm.innerText = this.moves;
    } else {
      console.log("No counter Element Selected");
    }

  }
}
