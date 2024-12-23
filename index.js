const gameCont = document.createElement("div");
document.getElementById("container").appendChild(gameCont);
gameCont.classList.add("gameCont");

//Fruits

const fruitContainer = document.createElement("div");
fruitContainer.classList.add("fruitCont");
gameCont.appendChild(fruitContainer);

let apple = [],
  strawberry = [],
  cherry = [],
  banana = [],
  arr = [];

const poo = document.createElement("div");
fruitContainer.appendChild(poo);
poo.classList.add("pooImage");

//Basket
const basket = document.createElement("div");
basket.innerHTML = `<img src="basket.png" alt="Basket">`;
gameCont.appendChild(basket);
basket.classList.add("basket");

//Start button
const start = document.createElement("button");
document.getElementById("container").appendChild(start);
start.classList.add("startButton");
start.innerHTML = "Start";
start.addEventListener("click", gameStart);

//Score & Live
let score = 0;
let lives = 3;
let highestScore = 0;
const pointer = document.createElement("div");
const livesCont = document.createElement("div");
livesCont.classList.add("liveCont");
livesCont.id = "liveCont";
const liveIcon1 = document.createElement("div");
const liveIcon2 = document.createElement("div");
const liveIcon3 = document.createElement("div");
liveIcon1.classList.add("liveIcon");
liveIcon2.classList.add("liveIcon");
liveIcon3.classList.add("liveIcon");
pointer.classList.add("pointer");
pointer.id = "pointer";
document.getElementById("container").appendChild(pointer);
document.getElementById("container").appendChild(livesCont);
document.getElementById("liveCont").appendChild(liveIcon1);
document.getElementById("liveCont").appendChild(liveIcon2);
document.getElementById("liveCont").appendChild(liveIcon3);
document.getElementById("pointer").innerHTML = "score:" + score;

let firstInt = null;
let secondInt = null;

//Start
function gameStart() {
  // background music

  const backgroundMusic = new Audio("audio.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();

  // basket placement
  basket.style.top = "930px";
  // remove start button
  start.style.display = "none";

  for (let i = 0; i <= 25; i++) {
    apple[i] = document.createElement("div");
    fruitContainer.appendChild(apple[i]);
    apple[i].classList.add("fruit");
    apple[i].classList.add("apple");

    strawberry[i] = document.createElement("div");
    fruitContainer.appendChild(strawberry[i]);
    strawberry[i].classList.add("fruit");
    strawberry[i].classList.add("strawberry");

    banana[i] = document.createElement("div");
    fruitContainer.appendChild(banana[i]);
    banana[i].classList.add("fruit");
    banana[i].classList.add("banana");

    cherry[i] = document.createElement("div");
    fruitContainer.appendChild(cherry[i]);
    cherry[i].classList.add("fruit");
    cherry[i].classList.add("cherry");
  }

  const fruits = document.getElementsByClassName("fruit");

  let i = 0,
    j = 0,
    timeInt = 1500;
  firstInt = setInterval(firstFunction, timeInt);

  function firstFunction() {
    let ran = Math.floor(Math.random() * 940);
    fruits[i].style.left = ran + "px";
    fruits[i].style.top = "-100px";
    fruits[i].classList.add("animate");
    i++;
    arr.push(ran);
    console.log("First function " + timeInt);
  }

  setTimeout(() => {
    secondInt = setInterval(secondFunction, timeInt);
  }, 2900);

  function secondFunction() {
    console.log(arr[j]);
    score_check(arr[j]);
    j++;
    console.log("Second function " + timeInt);
  }

  // Score audio

  const scoreAudio = new Audio("score.mp3");
  scoreAudio.volume = 0.3;

  // basket animation function when score

  function shakeBasket() {
    basket.classList.add("shake");

    setTimeout(() => {
      basket.classList.remove("shake");
    }, 500);
  }

  let lvl = 0;
  function score_check(ran) {
    console.log(position);
    let leftEdge = position.left - 30;
    let rightEdge = leftEdge + 150;
    if (leftEdge <= ran && rightEdge >= ran) {
      score += 1;
      document.getElementById("pointer").innerHTML = "score:" + score;
      // score sound
      scoreAudio.play();
      // basket shake animation
      shakeBasket();
    } else {
      lives = live_u(lives);
    }
  }

  // losing live sound

  const loseLifeSound = new Audio("losing_live.wav");
  loseLifeSound.volume = 0.5;

  // lives logic

  function live_u(lives) {
    lives -= 1;
    console.log(lives);
    if (lives == 2) {
      document.getElementById("liveCont").removeChild(liveIcon2);
    } else if (lives == 1) {
      document.getElementById("liveCont").removeChild(liveIcon3);
    } else if (lives == 0) {
      document.getElementById("liveCont").removeChild(liveIcon1);
      gameOver();
    }
    loseLifeSound.play();

    return lives;
  }

  //move Basket with Arrow
  let modifier = 80;

  let position = { left: 450 };

  basket.style.left = position.left + "px";

  const containerWidth = gameCont.offsetWidth;

  function moveBasket(event) {
    const basketWidth = basket.offsetWidth;
    switch (event.key) {
      case "ArrowLeft":
        position.left = Math.max(0, position.left - modifier);
        break;
      case "ArrowRight":
        position.left = Math.min(
          containerWidth - basketWidth,
          position.left + modifier
        );
        break;
    }
    basket.style.left = position.left + "px";
  }

  document.addEventListener("keydown", moveBasket);

  // move Basket with Mouse

  function moveBasketWithMouse(event) {
    const basketWidth = basket.offsetWidth;

    const mouseX = event.clientX - gameCont.offsetLeft;
    position.left = Math.min(
      Math.max(0, mouseX - basketWidth / 2),
      containerWidth - basketWidth
    );

    basket.style.left = position.left + "px";
  }

  gameCont.addEventListener("mousemove", moveBasketWithMouse);
}

// game over sound

const gameOverSound = new Audio("game_over.mp3");
gameOverSound.volume = 0.5;

// game over and restart

function gameOver() {
  // remove intervals

  clearInterval(firstInt);
  clearInterval(secondInt);

  // play game over sound
  gameOverSound.play();

  // game over text

  const gameOverMessage = document.createElement("div");
  gameOverMessage.className = "gameOverMessage";
  gameOverMessage.innerHTML = `
    <h1>Game Over</h1>
    <p>Your score: ${score}</p>
  `;
  gameCont.appendChild(gameOverMessage);

  // restart the game

  gameOverMessage.addEventListener("click", () => {
    window.location.reload();
  });
}
