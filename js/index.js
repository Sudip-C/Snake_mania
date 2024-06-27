// Game variables
let inputDir = {x:0, y:0};
const foodSound = new Audio('./assets/Eat.mp3');
const gameOverSound= new Audio('./assets/gameover.mp3');
const moveSound= new Audio('./assets/moving.mp3');
const bgm=new Audio('./assets/bgm.mp3');
const speed=15;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15},
   
];
let food={x:6, y:7}

//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < speed){
        return;
    }else{
        lastPaintTime = ctime;
           gameEngine() 
    }
}
function isCollide(sarr){
    // if snake bump itself
    for(let i =1 ; i<sarr.length ; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y=== sarr[0].y)
           { 
            return true
        }  
    }
    // if snake bump into wall 
    if(sarr[0].x >= 18 || sarr[0].x <=0 && sarr[0].y >= 18 || sarr[0].y <=0){
            return true
        }
}

function gameEngine(){
//Updating snake array & food
if(isCollide(snakeArr)){
    gameOverSound.play();
    bgm.pause()
    inputDir={x:0 ,y:0}
    alert("Game Over.Press any key to play again !");
    snakeArr = [{x:13, y:15}]
    bgm.play();
    score =0
}

// If snake have eaten the food increment the score an regenrate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play()
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a) * Math.random()) , y:Math.round(a+(b-a) * Math.random())}
}

// Moving the Sanke
for (let i= snakeArr.length-2 ; i >= 0 ; i--){
    snakeArr[i+1]={...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y

//    display snake
    board.innerHTML="";
        snakeArr.forEach((e,index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart =e.x;
            if(index===0){
                snakeElement.classList.add('head')
            }else{
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement)
        })

//display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart =food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}






//Game Logic
window.requestAnimationFrame(main);

window.addEventListener('keydown',(e)=>{
    inputDir = {x:0 ,y :1}  //start the game;
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            inputDir.x=1;
            inputDir.y=0;
            break;
            default:
                break;
    }
})