const gatos=Array.from(document.getElementsByClassName("Gatos"));
let spaceO="";
const ContainerP= document.getElementById("Gato");
let gameOver=false;
let winX = localStorage.getItem("winX") ? parseInt(localStorage.getItem("winX")) : 0;
let winO = localStorage.getItem("winO") ? parseInt(localStorage.getItem("winO")) : 0;
let human=document.getElementById("Human");
let machine=document.getElementById("Machine");
let Turns=document.getElementById("Turns");
let turnm=false;
let turnp=true;
let turnP= document.getElementById("turnP");
let turnM= document.getElementById("turnM");
let resetB=document.getElementById("reset");
let movimientos = 0;
let hayGanador = false;
human.textContent = `Player's Wins: ${winX}`;
machine.textContent = `Machine's Wins: ${winO}`;
let empate = true;
let msg=document.createElement("p");

function humanMove(){
    gatos.forEach((gato) => {
        gato.addEventListener("click",()=>{
            if(gato.innerHTML == ""&& !gameOver && turnp==true){
                movimientos++;
                turnM.remove();
                turnP.textContent= "machine's turn";
                Turns.appendChild(turnP);
                gato.innerHTML = "X";
                setTimeout(() => {
                    movimientoMaquina();
                }, 500);

                checkline(0,1,2);
                checkline(1,4,7);
                checkline(6,4,2);
                checkline(0,4,8);
                checkline(3,4,5);
                checkline(6,7,8);
                checkline(0,3,6);
                checkline(2,5,8);
            }
        });
    });
}

humanMove();

function evaluate(board) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'X' ? 10 : -10;
        }
    }

    return 0;
}

function isMovesLeft(board) {
    return board.includes("");
}

function minimax(board, depth, isMax) {
    const score = evaluate(board);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;
    if (!isMovesLeft(board)) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = 'X';
                best = Math.max(best, minimax(board, depth + 1, !isMax));
                board[i] = "";
            }
        }
        return best;

    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = 'O';
                best = Math.min(best, minimax(board, depth + 1, !isMax));
                board[i] = "";
            }
        }
        return best;
    }
}

function findBestMove(board) {
    let bestValue = -Infinity; //-menos infinito representa un numero muy pequeño y es importante para la variable minmax
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = 'X';
            const moveValue = minimax(board, 0, false);
            board[i] = "";
            if (moveValue > bestValue) {
                bestMove = i;
                bestValue = moveValue;
            }
        }
    }
    return bestMove;
}

function movimientoMaquina(){
    if(!gameOver){
        const board = gatos.map(gato => gato.innerHTML);
        const bestMove = findBestMove(board);
        if (bestMove !== -1) {
            gatos[bestMove].innerHTML = 'O';
            movimientos++;
            checkline(0,1,2);
            checkline(1,4,7);
            checkline(6,4,2);
            checkline(0,4,8);
            checkline(3,4,5);
            checkline(6,7,8);
            checkline(0,3,6);
            checkline(2,5,8);
        }
    }
}

function Winners(c1,c2,c3){
if( gatos[c1].innerHTML==="X" &&
    gatos[c2].innerHTML==="X" &&
    gatos[c3].innerHTML==="X"){
        turnM.remove();
        turnP.remove();
        msg.remove();
        gatos[c1].setAttribute("class", "cc1");
        gatos[c2].setAttribute("class", "cc2");
        gatos[c3].setAttribute("class", "cc3");
        
    let winner= document.createElement("p");
    winner.textContent="Player's win";
    Turns.appendChild(winner);
    gameOver=true;
    
}else if( gatos[c1].innerHTML==="O" &&
        gatos[c2].innerHTML==="O" &&
        gatos[c3].innerHTML==="O"){
            turnM.remove();
            turnP.remove();
            msg.remove();
            gatos[c1].setAttribute("class", "cc1");
            gatos[c2].setAttribute("class", "cc2");
            gatos[c3].setAttribute("class", "cc3");
        
        let winner= document.createElement("p");
        winner.textContent="machine's win";
        Turns.appendChild(winner);
        gameOver=true;
    }
}

function checkline(c1, c2, c3){
    if(gatos[c1].innerHTML.length >0 && 
            gatos[c1].innerHTML===gatos[c2].innerHTML&&
                gatos[c2].innerHTML===gatos[c3].innerHTML){
                    Winners(c1,c2,c3);
                    Turns.setAttribute("class","anim Turns");
                    if (gatos[c1].textContent === "X") {
                        winX += 1;
                        localStorage.setItem("winX", winX);
                        human.textContent= `Player's Wins: ${winX}`;
                        hayGanador = true;
                    }else if(gatos[c1].textContent==="O"){
                            winO+=1;
                            localStorage.setItem("winO", winO);
                            machine.textContent = `Machine's Wins: ${winO}`;
                            hayGanador = true;
                    }
                }
                draw();
}

function reset(){
    resetB.addEventListener("click", ()=>{
        window.location.reload();
    });
}

reset();

function draw(){
    if (movimientos === 9 && !hayGanador && empate) {
        turnM.remove();
        turnP.remove();
        msg.textContent="Draw";
        Turns.appendChild(msg);
        empate = false;
    }
}

function resetMarker(){
    let resetM=document.createElement("button");
    resetM.textContent="Reset Counter";
    resetM.setAttribute("class", "resetC");
    document.getElementById("containerR").appendChild(resetM);
    resetM.addEventListener("click", ()=>{
        human.textContent = "Player's Wins: "+ 0;
        machine.textContent = "Machine's Wins: "+ 0;
        localStorage.clear();
    });
}

resetMarker();
