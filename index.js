// Declare Variables for the key presses
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;

const GAME_WIDTH = 900;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 20;

const $container = document.querySelector(".game");


// Declare Game State
const GAME_STATE = {
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 0,
  playerY: 0,
  rockA:0,
  rockB:0,
  enemyX:0,
  enemyY:0,
};

let enemyArray = [];

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
// Barrier
function createRock ($container){
  GAME_STATE.rockA=  130; // X Axis
  GAME_STATE.rockB = 450; // Y Axis
  const $rock1 = document.createElement("img");
  $rock1.src = "meteorBrown_big1.png";
  $rock1.className = "rock1";
  $container.appendChild($rock1);
  setPosition($rock1, GAME_STATE.rockA, GAME_STATE.rockB);
}
function createRock2 ($container){
  GAME_STATE.rockA=  280; // X Axis
  GAME_STATE.rockB = 450; // Y Axis
  const $rock2 = document.createElement("img");
  $rock2.src = "meteorBrown_big1.png";
  $rock2.className = "rock2";
  $container.appendChild($rock2);
  setPosition($rock2, GAME_STATE.rockA, GAME_STATE.rockB);
}
function createRock3 ($container){
  GAME_STATE.rockA=  430; // X Axis
  GAME_STATE.rockB = 450; // Y Axis
  const $rock3 = document.createElement("img");
  $rock3.src = "meteorBrown_big1.png";
  $rock3.className = "rock3";
  $container.appendChild($rock3);
  setPosition($rock3, GAME_STATE.rockA, GAME_STATE.rockB);
}
function createRock4 ($container){
  GAME_STATE.rockA=  580; // X Axis
  GAME_STATE.rockB = 450; // Y Axis
  const $rock4 = document.createElement("img");
  $rock4.src = "meteorBrown_big1.png";
  $rock4.className = "rock4";
  $container.appendChild($rock4);
  setPosition($rock4, GAME_STATE.rockA, GAME_STATE.rockB);
}

// creating the player

function createPlayer($container) {
  GAME_STATE.playerX = GAME_WIDTH / - 10; 
  GAME_STATE.playerY = GAME_HEIGHT - 50;
  const $player = document.createElement("img");
  $player.src = "player.png";
  $player.className = "player";
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}




function createEnemy ($container, a, b, id){
    GAME_STATE.enemyX=  a; // X Axis
    GAME_STATE.enemyY = b; // Y Axis
    const $enemy = document.createElement("img");
    $enemy.src = "enemyBlack1.png";
    $enemy.className = "enemy";
    $enemy.id = "enemy" + id;
    $container.appendChild($enemy);
    setPosition($enemy, GAME_STATE.enemyX, GAME_STATE.enemyY);
    enemyArray.push($enemy)
  }



  function createEnemyLazer($container) { 
    const $enemyLazer = document.createElement("img");
    const setLazerPosition = randomEnemy().style.transform;
    $enemyLazer.src = "laserRed.png";
    $enemyLazer.className = "enemyLazer";
    $container.appendChild($enemyLazer); 
    $enemyLazer.style.transform = setLazerPosition;
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
  createRock($container);
  createRock2($container);
  createRock3($container);
  createRock4($container);
  createEnemy($container, 200, 300, 0);
  createEnemy($container, 300, 300, 1);
  createEnemy($container, 400, 300, 2);
  createEnemy($container, 500, 300, 3);
  createEnemy($container, 600, 300, 4);
  createEnemy($container, 200, 200, 5);
  createEnemy($container, 300, 200, 6);
  createEnemy($container, 400, 200, 7);
  createEnemy($container, 500, 200, 8);
  createEnemy($container, 600, 200, 9);
  createEnemy($container, 200, 100, 10);
  createEnemy($container, 300, 100, 11);
  createEnemy($container, 400, 100, 12);
  createEnemy($container, 500, 100, 13);
  createEnemy($container, 600, 100, 14);
  window.setInterval(function(){
createEnemyLazer($container)  }, 500);
}

// Creating Enemies





  // enemyArray[i].style.transform = `translate(${c}px, ${d}px)`;


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

// Generate Random Enemy Element
function randomEnemy() {
  return enemyArray[Math.floor(Math.random()*enemyArray.length)]};

// Random Enemy Function
function randomEnemyFunction() {
  createEnemyLazer($container)
  ;
};



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
can.width = 900; 
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



window.addEventListener('keydown', function(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const $container = document.querySelector(".game");
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0; // rewind to the start of audio
  audio.play();
  key.classList.add('playing') 
  createLazer($container);
});

function createLazer($container) { 
  const $lazer = document.createElement("img");
  $lazer.src = "laser.png";
  $lazer.className = "lazer";
  $container.appendChild($lazer); 
  setPosition($lazer , GAME_STATE.playerX, GAME_STATE.playerY );
}


  