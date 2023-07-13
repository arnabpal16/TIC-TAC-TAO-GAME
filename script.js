const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;


const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let's creat a function to inialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //ui pe vi empty karna padega
    boxes.forEach((box,index)  => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer  = "X";
    }
    // update the same on UI
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {
    // newGameBtn.classList.add("active");
    let answer = "";
    winningPosition.forEach((position)=>{

        //all three boxes should not be empty and the value of the three boxes should be equal must..
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X"){
                answer = "X";
            }
            else{
                answer = "0";
            }

            //disable pointer event when win a player
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            //now we know x/0 is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }  
    });

    //it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner player - ${answer}`;
        newGameBtn.classList.add("active");
        return ;
    }

    //when their is no winner selected for tied up !
    let fillCount = "0";
    gameGrid.forEach((box)=>{
        if(box != "")
        fillCount++;
    });

    //board is fulled , game is Tie 
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied Up";
        newGameBtn.classList.add("active");
    }

}

function handelClick(index){
    if(gameGrid[index]=== "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn player
        swapTurn();
        //check if win or not
        checkGameOver();
    }
}
//we use index here because to know out of 9 boxes which box is clicked
boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handelClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

