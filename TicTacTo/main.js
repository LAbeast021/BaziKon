/*----- constants -----*/
const player = [-1,1];
const winnPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
/*----- app's state (variables) -----*////////////////////////////////////////////////////////////////////////////////////
let turn, winner, clickPattern, count, XO
turn =  player[0];
clickPattern = [0,0,0,0,0,0,0,0,0];
count = 0
playingComputer = false;
/*----- cached element references -----*///////////////////////////////////////////////////////////////////////////////////
let btn = document.querySelector("section");
let square = document.querySelectorAll("section div");
let reset = document.querySelector("button");
let message = document.getElementById("text");
let opponent = document.getElementById("opponentSelector");

/*----- event listeners -----*//////////////////////////////////////////////////////////////////////////////////////////////
opponent.addEventListener("click", function(evt){
    playingComputer = true;
})
btn.addEventListener("click", clickHandler);
// $("section div").hover(function(evt) {
//     console.log(evt.target)
// })
reset.addEventListener("click",init);

/*----- functions -----*////////////////////////////////////////////////////////////////////////////////////////////////////
function clickHandler(evt){
    if(evt.target.textContent==="" && winner!==turn){
        if(turn === player[0]){
        turn = player[1];
        XO = "X";
        evt.target.style.backgroundColor = "black";
        evt.target.style.color = "white";
        message.innerHTML = `it is your turn player <span class="red">O</span>`;
        evt.target.className += "clicked" ;
    }
    else{
        turn = player[0];
        XO = "O"
        evt.target.style.color = "black";
        message.innerHTML = `it is your turn player <span class="red">X</span>`;
        evt.target.className += "clicked" ;
    }
    
        count +=1;
        let target = evt.target;
        clickPattern.splice(target.id,1,turn);
        // console.log(target , "------" , square.indexOf(target)) 
        // clickPattern.splice(square.indexOf(target),1,turn);
        target.textContent= XO;
        winCheck(false);
}
}
function winCheck (computerPlayed){
    for(i=0 ; i < winnPattern.length ; i++){
        if(clickPattern[winnPattern[i][0]] + clickPattern[winnPattern[i][1]] + clickPattern[winnPattern[i][2]] === -3 ) {
            winner = turn;
        }
        else if(clickPattern[winnPattern[i][0]] + clickPattern[winnPattern[i][1]] + clickPattern[winnPattern[i][2]] === 3 ) {
             winner = turn
        }  

    }

    if(!computerPlayed){
        render();
    }

}

function computerMove(){
    let random = Math.floor(Math.random() * 9);
    if(square[random].textContent===""){
        turn = player[0];
        XO = "O"
        square[random].style.color = "black";
        message.innerHTML = `it is your turn player <span class="red">X</span>`;
        square[random].className += "clicked" ;
        count +=1;
        clickPattern.splice(random,1,turn);
        square[random].textContent= XO;
        winCheck(true);
    }
    
}


function init(){
    for(i=0 ; i< clickPattern.length ; i++){
        square[i].classList.remove("clicked");

        // document.getElementById(i).textContent="";
        square[i].textContent="";


        // document.getElementById(i).style.backgroundColor="white";
        square[i].style.backgroundColor="";
        square[i].style.color="";

    }
    message.textContent = "Make a Move YO";
    turn = player[0];
    winner="";
    count=0;
    clickPattern = new Array(9).fill(0);
    }


function render(){ 
    if(count===9 && winner!==turn){
        message.innerHTML = `it is a tie YO <span class="red">:)</span>`
    };
    if(winner){
        if(winner===player[1]){
            message.innerHTML = `congrats player <span class="red"> ${XO}</span> you won \n`
            
        }
        else if(winner===player[0]){
            message.innerHTML = `congrats player <span class="red"> ${XO}</span> you won \n`

        }
        for(i=0 ; i < clickPattern.length ; i ++) {
            square[i].classList.contains("clicked") ? console.log("clicked") : square[i].className += "clicked" ;
        }
    }

    else if (playingComputer){
        computerMove();
    }
}



