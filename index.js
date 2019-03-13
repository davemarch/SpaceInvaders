// Declare Variables for the key presses
const KEY_CODE_LEFT = 37;
const KEY_CODE_RIGHT = 39;
const KEY_CODE_SPACE = 32;
const KEY_CODE_P = 80;

const GAME_WIDTH = 750;
const GAME_HEIGHT = 600;

const PLAYER_WIDTH = 15;


var enemyNoise = new Audio ('./sound_spark_Laser-Like_Synth_Laser_Sweep_Burst_13.mp3')

const $container = document.querySelector(".game");
const $rock = document.getElementsByClassName("rock");
const $lazer = document.getElementsByClassName("lazer");
const $player = document.getElementsByClassName("player");
const $wrap = document.getElementsByClassName("wrap");

document.querySelector(".pause").style.display = "none";
function pause(e){ 
  document.getElementsByClassName('paused')
  console.log(e)
  if (e.keyCode === 80) {
    GAME_STATE.playing = !GAME_STATE.playing
    document.querySelector(".pause").style.display = "block";
    for(enemy of enemyArray) {
        if(!GAME_STATE.playing) {
        enemy.classList.add('hide')
       
      }else { 
        enemy.classList.remove('hide')
        document.querySelector(".pause").style.display = "none";
    }
}}

}


// Declare Game State
const GAME_STATE = {
  playing: true,
  leftPressed: false,
  rightPressed: false,
  spacePressed: false,
  playerX: 50,
  playerY: 0,
  rockA: 0,
  rockB: 0,
  enemyX: 0,
  enemyY: 0,
  lazerX: 0,
  lazerY: 0,
  gameOver: false, // Lose or not 
  countEnemies: 0 // how many enemies is alive
};

let enemyArray = [];
let lazerArray = [];
let enemyLazerArray = [];
let rockArray = [];
let allLazers = [];

// Function for set position

function setPosition($el, x, y) {
  if (GAME_STATE.playing){
  $el.style.transform = `translate(${x}px, ${y}px)`;
}
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
function createRock($container, a, b, id) {
  GAME_STATE.rockA = a; // X Axis
  GAME_STATE.rockB = b; // Y Axis
  const $rock = document.createElement("div");
  $rock.style.width = "93px";
  $rock.style.height = "84px";
  $rock.style.backgroundImage = "url('meteorBrown_big1.png')";
  $rock.className = "rock";
  $rock.id = "rock" + id;
  $container.appendChild($rock);
  setPosition($rock, GAME_STATE.rockA, GAME_STATE.rockB);
  rockArray.push($rock)
}


// creating the player

function createPlayer($container, id) {

  GAME_STATE.playerX = GAME_WIDTH / 2 - 40 ;
  GAME_STATE.playerY = GAME_HEIGHT + 75;
  const $player = document.createElement("div");
  $player.style.width = "60px";
  $player.style.height = "40px";
  $player.style.backgroundImage = "url('player.png')";
  $player.className = "player";
  $player.id = "player" + id;
  $container.appendChild($player);
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}




function createEnemy($container, a, b, id) {
  if (GAME_STATE.playing){
  GAME_STATE.enemyX = a; // X Axis
  GAME_STATE.enemyY = b; // Y Axis
  const $enemy = document.createElement("div");
  $enemy.style.width = "50px";
  $enemy.style.height = "50px";
  $enemy.style.backgroundImage = "url('enemyBlack1.png')";
  if (!GAME_STATE.playing){$enemy.classList.add('paused')}
  $enemy.className = "enemy";
  $enemy.id = "enemy" + id;
  $container.appendChild($enemy);
  setPosition($enemy, GAME_STATE.enemyX, GAME_STATE.enemyY);
  GAME_STATE.countEnemies++;
  enemyArray.push($enemy)
}}


// moving the player


function updatePlayer() {
  if (GAME_STATE.playing){
  if (GAME_STATE.leftPressed) {
    GAME_STATE.playerX -= 5;}
  if (GAME_STATE.rightPressed) {
    GAME_STATE.playerX += 5;}

  GAME_STATE.playerX = clamp(
    GAME_STATE.playerX,
    PLAYER_WIDTH,
    GAME_WIDTH - PLAYER_WIDTH
  );
  const $player = document.querySelector(".player");
  setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}}
function enter(){
  if (event.keyCode === 13) {
    init()
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".instructions").style.display = "none";
  }};

// init function that sets the $container to game
function init() {
  if (GAME_STATE.playing){
  const $container = document.querySelector(".game");
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);
  window.requestAnimationFrame(update);
  window.removeEventListener("keyup", enter);
  window.addEventListener("keydown", pause);
  createPlayer($container, 1);
  createRock($container, 125, 525, 1);
  createRock($container, 275, 525, 2);
  createRock($container, 425, 525, 3);
  createRock($container, 575, 525, 4);
  createEnemy($container, 200, 600, 0);
  createEnemy($container, 300, 600, 1);
  createEnemy($container, 400, 600, 2);
  createEnemy($container, 500, 600, 3);
  createEnemy($container, 600, 600, 4);
  createEnemy($container, 200, 500, 5);
  createEnemy($container, 300, 500, 6);
  createEnemy($container, 400, 500, 7);
  createEnemy($container, 500, 500, 8);
  createEnemy($container, 600, 500, 9);
  createEnemy($container, 200, 400, 10);
  createEnemy($container, 300, 400, 11);
  createEnemy($container, 400, 400, 12);
  createEnemy($container, 500, 400, 13);
  createEnemy($container, 600, 400, 14);
  window.setInterval(function () {
    if (GAME_STATE.gameOver === false){
      createEnemyLazer()
    } else {
null  }}, 1000);
  window.setInterval(function () {
    enemyLazerArray[1].parentNode.removeChild(enemyLazerArray[1]);
    lazerArray[1].parentNode.removeChild(lazerArray[1]);
  }, 1100);
  ;
}}

function update(e) {
  if (GAME_STATE.gameOver === true) { // if game over - stop the game
    document.querySelector(".game-over").style.display = "block"; // show that you lost
    var lostNoise = new Audio ('159408__noirenex__life-lost-game-over.wav')
    lostNoise.play()
    return;
  }
  if (GAME_STATE.countEnemies == 0) { // if you win
    GAME_STATE.gameOver = true;
    document.querySelector(".congratulations").style.display = "block"; // show that you win
    var winNoise = new Audio ('./435062__fritzsounds__cartoon-voice-bean-game-set-3-victory-nice-one-oh-no-maybe-next-time.wav')
    winNoise.play();
    enemyNoise.pause();
    GAME_STATE.playing= false;

    return;
  }
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

window.addEventListener("keyup", enter) 

// Random Enemy Function
function randomEnemyFunction() {
  createEnemyLazer($container, a, b);
};

window.addEventListener('keydown', function (e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const $container = document.querySelector(".game");
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0; // rewind to the start of audio
  audio.play();
  key.classList.add('playing')
  createLazer($container);
});

function createLazer($player) {
  if (GAME_STATE.playing) {
  const $lazer = document.createElement("div");
  $lazer.style.width = "9px";
  $lazer.style.height = "54px";
  $lazer.style.backgroundImage = "url('laser.png')";
  $lazer.className = "lazer";
  $player.appendChild($lazer);
  lazerArray.unshift($lazer);
  allLazers.unshift($lazer);

  setPosition(lazerArray[0], GAME_STATE.playerX + 26, GAME_STATE.playerY - 50);

    function checkCollision() {
      for (let i = 0; i < enemyArray.length; i++) {
        rect1 = lazerArray[0].getBoundingClientRect();
        rect2 = enemyArray[i].getBoundingClientRect();
          if (rect1.x < rect2.x + rect2.width && 
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
            enemyArray[i].parentNode.removeChild(enemyArray[i]);
            $container.removeChild(lazerArray[0]);
            GAME_STATE.countEnemies--;
            enemyArray[i].style.display = "none";
            enemyArray.splice(i, 1);
          } else {
          }
        }
      }
  }
    
  window.setInterval(function () {
    checkCollision()
  }, 100);

}

function randomEnemy() {
  return enemyArray[Math.floor(Math.random() * enemyArray.length)]  
};


function createEnemyLazer() {
  if (GAME_STATE.playing && !GAME_STATE.gameOver) {
  const $enemyLazer = document.createElement("div");
  const $player = document.querySelector(".player");
  $enemyLazer.style.width = "9px";
  $enemyLazer.style.height = "54px";
  $enemyLazer.style.backgroundImage = "url('laserRed.png')";
  $enemyLazer.className = "enemyLazer";
  randomEnemy().appendChild($enemyLazer);
  enemyLazerArray.unshift($enemyLazer);
  
  enemyNoise.play();

  for (let i = 0; i < enemyLazerArray.length; i++) {

    function checkCollision() {
      {
        rect1 = enemyLazerArray[0].getBoundingClientRect();
        rect2 = $player.getBoundingClientRect(); {
          if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
            GAME_STATE.gameOver = true;
            GAME_STATE.playing = false;
            $container.removeChild($player);
            $enemy.removeChild($enemyLazer);
          } else {
          }
        }
      }

    }
    window.setInterval(function () {
      checkCollision();

    }, 100);
  }
  }
}

function checkCollisionFunc1(rect1, rect2, $parent, $child) { // checks if lazer hits any rocks

  { 
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y) 
    {
    collision = true
    $parent.removeChild($child);

  } else { 
    collision = false
  }}};

  function checkCollisionFunc2(rect1, rect2, $child) { // checks if enemy lazer hits any rocks.
    { 
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) 
      {
      collision = true
      $child.parentNode.removeChild($child);
  
    } else { 
      collision = false
    }}};

  window.setInterval(function () {

    for (i = 0; i < rockArray.length; i++) {
    checkCollisionFunc1(
      lazerArray[0].getBoundingClientRect(),
      $rock[i].getBoundingClientRect(), 
      $container, 
      lazerArray[0]);
    }

    for (i = 0; i < rockArray.length; i++){
      checkCollisionFunc2(
      enemyLazerArray[0].getBoundingClientRect(),
      $rock[i].getBoundingClientRect(), 
      enemyLazerArray[0]);
    }
      

  }, 100);  