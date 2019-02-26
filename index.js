// Declare Variables for the key presses
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 20;

// Declare Game State
const GAME_STATE = {
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
};

// Function for set position
function setPosition($el, x, y) {
  $el.style.transform = `translate(${x}px, ${y}px)`;
}

// If Else Function for setting boundries for the ship moving
function clamp(v, min, max) {
  if (v < min) {
    return min;
  } else if (v > max) {
    return max;
  } else {
    return v;
  }
}


// creating the player, setting the positiion, creating new image, 
//setting the src, setting the classname, appending child, setting position using setPosition function.

function createPlayer($container) {
  GAME_STATE.playerX = GAME_WIDTH / - 10; 
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  const $player = document.createElement("img");
  $player.src = "player.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}


// moving the player



function updatePlayer() {
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= 5;

  }
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += 5;
  }

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );

  
  const $player = document.querySelector(".player");
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}


// init function that sets the $container to game
function init() {
  const $container = document.querySelector(".game");
  createPlayer($container);
}

function update(e) {
  updatePlayer();
  window.requestAnimationFrame(update);
}

function onKeyDown(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = true;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = true;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = true;
  }
}

function onKeyUp(e) {
  if (e.keyCode === KEY_CODE_LEFT) {
    GAME_STATE.leftPressed = false;
  } else if (e.keyCode === KEY_CODE_RIGHT) {
    GAME_STATE.rightPressed = false;
  } else if (e.keyCode === KEY_CODE_SPACE) {
    GAME_STATE.spacePressed = false;
  }
}

init();
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);
window.requestAnimationFrame(update);


/*
**************************************************************
SCROLLING BACKGROUND VARIABLE USING CANVAS
**************************************************************
*/

// Creating new variable and assigning the html document to it
var can = document.getElementById('canvas1'); 
// Assigning 2d context for the canvas element
var ctx = can.getContext('2d'); 
// canvas width and height 
can.width = 800; 
can.height = 600; 
// create an image element and setting the source
var img = new Image(); 
img.src = "background.jpg"; 


window.onload = function() { 
    // the initial image height 
    var imgHeight = 0; 
    var scrollSpeed = 1; 
  
    // Annimation Loop
    function loop() 
    { 
        // draw image 1 
        ctx.drawImage(img, 0, imgHeight); 
  
        // draw image 2 
        ctx.drawImage(img, 0, imgHeight - can.height); 
  
        // update image height 
        imgHeight += scrollSpeed; 
  
        // reseting the images when the first image entirely exits the screen 
        if (imgHeight == can.height) 
            imgHeight = 0; 
  
        // this function creates a 60fps animation by scheduling a 
        // loop function call before the 
        // next redraw every time it is called 
        window.requestAnimationFrame(loop); 
    } 
  
// Calling the loop function.
    loop(); 
  
} 