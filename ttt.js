// accessing buttons and boxes
let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let winnerMsg=document.querySelector("#winner-msg");


let turnO=true; //player O and player X
let count = 0; //To Track Draw


const winPatterns=[  //winning patters , total 8
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


//reseting the game
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    count = 0;
    msgContainer.classList.add("hide"); // again activating 'hide' class
}

 
//playing the game
boxes.forEach((box) => {  //single-single box mate adding event listener
    box.addEventListener("click",() => {
          console.log("box was clicked");
          if(turnO) //playerO
          {
            box.innerText="O";
            turnO=false; 
          }
          else{  //playerX
            box.innerText="X";
            turnO=true;
          }
          box.disabled=true; // once clicked O or X ; then disable the button(boxes)
          count++;

          let isWinner=checkWinner();  // checking the winner

          if (count === 9 && !isWinner) {  //if all boxes filled and no winner
             gameDraw();
            }
    });
});

//if draw
const gameDraw = () => {
  winnerMsg.innerText = `It's a Draw! Try Again.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


//showing the winner
const showWinner=(winner)=>{
    winnerMsg.innerText= `Congratulations! \n The Winner is player ${winner}`;
    msgContainer.classList.remove("hide"); // remove class 'hide' so container that we prepared 
   // is shown
    disableBoxes();                                          
}

//disabling boxes once a winner is shown
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
//when new game starts , boxes beacomes enable again..
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; // new game , then boxes becomes empty again.
    }
}

//checking the winner
const checkWinner=()=>{
    for(let pattern of winPatterns)  {  //positions of winning patterns ie 0th,1st,2nd index
        let pos1Val=boxes[pattern[0]].innerText; //giving the boxes its positions
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if( pos1Val !="" && pos2Val !="" && pos3Val !="")  //all 3 values not empty
        {
            if(pos1Val===pos2Val && pos2Val===pos3Val) {// all 3 values same(all X or all O)                                         
                console.log("winner",pos1Val); // winner if winning patterns and pos1val wins
                showWinner(pos1Val);  
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);