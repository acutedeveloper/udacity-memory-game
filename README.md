# Udacity Project - Memory Game
The idea is to use Javascript to build a version of the memory game.

I have taken this opportunity to take on board some of the workflow lessons to create
a modern workflow.

Project is currently live at:
[develop.nigelmpeters.co.uk](http://develop.nigelmpeters.co.uk/memory-game/build)

Works well on mobile :P

## Project dependencies
In building my workflow I have compiled a list of all the dependencies that are used in order to create a fast efficient and optimised workflow.

**Global dependencies**
- gulp [x]
- sass [x]
- eslint [x]

**Development Dependencies**
- gulp-sass [x]
- autoprefixer [x]
- browserSync [x]
- normalize.css [X]

**Production Optimisations**
- gulp-concat (for JS) [x]
- gulp-minify [ ]
- source maps for JS [ ]

Modify the sass task to output a compressed file
Use gulp Babel

## Tasks to complete project
- Create copy tasks for fonts [x]
- Aspect Ratio for game cards [x]

## Project Progress

**17/9/18**
Managed to resolve the tabs setting inside my IDE to clear some linting errors. I now need to find a way to clear the errors from variables are defined but used in different files. Perhaps something inside modules.

**16/9/18**
I have added in new tasks for linting the JS and copying all files to a build folder. JS has been broken up into separate modules which are then compiled into one file.

**13/9/18**
As I progressed I could see that my code was becoming a little unmaintainable. So I pushed ahead to learn about object oriented javascript. I found a couple of resources that proved to be useful in helping build using a design pattern:

https://css-tricks.com/how-do-you-structure-javascript-the-module-pattern-edition/

This then lead onto understanding more the use of `this`. As I understand `this` it references the context of where it is being called.

So you may think that you are referencing `this` inside of a object when using a builtin function, but rather it's referring to the Global Context.

You can preserve the scoped context by using `let self = this;`.

**12/9/18**
Added checks to ensure that multiple clicks were not logged. And also fixed bug that allow users to match cards by double clicking on one card!

**6/9/18**
I really got stuck into building out the logic of the game.

Creating my own version of the logic was challlenging. Not sure that I have viable solution, but I will compare with the Udemy Course Version.

The process that really helped was to start with basically writing out the process as if I was the user,
thinking about each reaction that I would encounter.

While I have built out the logic, I can very clearly see that the code needs some organisation.

Next Steps:
* Stop user clicking card twice [x]
* Prevent Multiple clicks [x]
* Your user should see a modal when the game ends [x]
* Need to organise code [x]

Additional Styling:
* Reset button [x]
* Move counter [x]
* Timer (how does setTimeout() come into play here?) [ ]
* Star Rating [ ]

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
