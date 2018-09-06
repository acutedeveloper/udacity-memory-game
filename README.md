# Udacity Project - Memory Game
The idea is to use Javascript to build a version of the memory game.

I have taken this opportunity to take on board some of the workflow lessons to create
a modern workflow.

## Project dependencies
In building my workflow I have compiled a list of all the dependencies that are used in order to create a fast efficient and optimised workflow.

**Global dependencies**
- gulp [x]
- sass [x]
- eslint [ ]

**Development Dependencies**
- gulp-sass [x]
- autoprefixer [x]
- browserSync [x]
- normalize.css [X]

**Production Optimisations**
- gulp-concat (for JS) [ ]
- gulp-minify [ ]
- source maps for JS [ ]

Modify the sass task to output a compressed file
Use gulp Babel

## Tasks to complete project
- Create copy tasks for fonts [ ]
- Aspect Ratio for game cards [x]

## Project Progress
**6/9/18**
I really got stuck into building out the logic of the game.

Creating my own version of the logic was challlenging. Not sure that I have viable solution, but I wil compare with the Udemy Course Version.

The process that really helped was to start with basically writing out the process as if I was the user,
thinking about each reaction that I would encounter.

While I have built out the logic, I can very clearly see that the code needs some organisation.

Next Steps:
* Need to organise code
* Add some custom UI items

**4/9/18**
Added populate game board with JS.

Next to add icons x2 to grid and shuffle.

## Project Learnings
**Browser Sync**
For browser sync to reload after css has been updated it needs to be part of the
sass pipe stream.

**Aspect Ratio CSS**
For perfect squares I have used a technique that achieves this.

Container (to set width) > Inner Container (Set ratio. Relative Position) > Content Container (Absolute Position)

**Event Delegation**
To help improve performance, I have learned how to use a single event listener and then target the element needed to manipulate.

```js

var gameGrid = document.querySelector('.game-grid');

gameGrid.addEventListener('click', function(event) {

    event.target.closest(".game-card__content").classList.toggle('js__is-flipped');

})

```


## Wishlist
* Learn how to use proper unit testing inside the project
