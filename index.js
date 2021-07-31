// Game Constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('../assets/bite.mp3');
const gameOverSound = new Audio('../assets/loser.mp3');
const turnSound = new Audio('../assets/turn.mp3');
const ambienceSound = new Audio('../assets/ambience.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;          
        }   
    }

    // If snake bumps into the wall
    if (snake[0].x >= 25 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
        return true;       
    }
}


function gameEngine(){

    // Snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        ambienceSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Click OK to Play again");
        snakeArr = [{x: 13, y: 15}];
        ambienceSound.play();
        score = 0;
    }

    // If the food is eaten, increment the score & regenrate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>highscoreVal){
            highscoreVal = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreVal))
            highscoreBox.innerHTML = "Highscore: " + highscoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())}  //Formula to generate random number
    }

    // Movement of the snake
    for (let i = snakeArr.length - 2; i>= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display snake 
    arena.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        arena.appendChild(snakeElement);
    }); 

    // Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    arena.appendChild(foodElement);
    
}

// Main Logic
let highscore = localStorage.getItem("Highscore")
if (highscore === null) {
    highscoreVal = 0;
    localStorage.setItem("Highscore", JSON.stringify(highscoreVal))
}
else{
    highscoreVal = JSON.parse(highscore);
    highscoreBox.innerHTML = "Highscore: " + highscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1}  // Start the Game
    turnSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

});

