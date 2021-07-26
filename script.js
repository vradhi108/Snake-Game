let inputDir = { x: 0, y: 0 };

const foodEat = new Audio('food.mp3');

const gameOver = new Audio('game_over.wav');

const theme = new Audio('game_sound.mp3');

const move = new Audio('move.mp3');

let lastPaintTime = 0;

let speed = 5;

let snakeArr = [{ x: 13, y: 15 }];

let food = {x: 6, y: 7};

let score = 0;

function main(ctime) {
  window.requestAnimationFrame(main);

  if (((ctime - lastPaintTime) / 1000) < (1 / speed)) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();

}


function isCollide(snake){
  // if you bump into yourself.
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
    }
  }
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
    return true;
  }
}


function gameEngine() {
  // part 1- updating the snake array and food
  if (isCollide(snakeArr)){
    gameOver.play();
    
    theme.pause();

    score = 0; 

    inputDir = {x: 0, y: 0};

    alert("Game over. Press any key to play again!");

    

    snakeArr = [{x: 13, y: 15}];

    // theme.play();

    
  }

  // if our snake eats the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y){
    foodEat.play();
    score += 1;
    if (score > hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())}
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // part 2- display the snake and food
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {

    snakeElement = document.createElement('div');

    snakeElement.style.gridRowStart = e.y;

    snakeElement.style.gridColumnStart = e.x;
    
    if (index === 0){
        snakeElement.classList.add('head');
    }else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
  });

  foodElement = document.createElement('div');

  foodElement.style.gridRowStart = food.y;

  foodElement.style.gridColumnStart = food.x;

  foodElement.classList.add('food');

  board.appendChild(foodElement);

}
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null){
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
  hiscoreval = JSON.parse(hiscore);
  highscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
  inputDir = {x: 0, y: 1};
  move.play();
  theme.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});