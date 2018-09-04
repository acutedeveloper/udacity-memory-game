var gameGrid = document.querySelector('.game-grid');

var cardIcons = [
  "icon-mic-outline",
  "icon-camera-alt",
  "icon-crown",
  "icon-anchor",
  "icon-graduation-cap",
  "icon-paper-plane-empty",
  "icon-diamond",
  "icon-balance-scale"
];

var gameCardsFragment = document.createDocumentFragment();

for(var i = 0; i < 16; i++){

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
  gameIcon.className = "icon-crown"

  gameCardContentFront.appendChild(gameIcon);

  gameCardContent.appendChild(gameCardContentBack);
  gameCardContent.appendChild(gameCardContentFront);

  gameCardInner.appendChild(gameCardContent);

  gameCard.appendChild(gameCardInner);

  gameCardsFragment.appendChild(gameCard);

}

gameGrid.appendChild(gameCardsFragment);

gameGrid.addEventListener('click', function(event) {

    event.target.closest(".game-card__content").classList.toggle('js__is-flipped');

})



// Create all 16 gameCards

function createDiv(){
  return document.createElement("div");
}
