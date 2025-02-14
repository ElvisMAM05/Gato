const gatos=Array.from(document.getElementsByClassName("Gatos"))
let spaceO=""
const ContainerP= document.getElementById("Gato")
let gameOver=false
let winX = localStorage.getItem("winX") ? parseInt(localStorage.getItem("winX")) : 0;
let winO = localStorage.getItem("winO") ? parseInt(localStorage.getItem("winO")) : 0;
let human=document.getElementById("Human")
let machine=document.getElementById("Machine")


human.textContent = `Player's Wins: ${winX}`;
machine.textContent = `Machine's Wins: ${winO}`

function humanMove(){
    gatos.forEach((gato) => {
        gato.addEventListener("click",()=>{
            if(gato.innerHTML == ""&& !gameOver){
                gato.innerHTML = "X"
                setTimeout(() => {
                    movimientoMaquina()
                }, 500);

                checkline(0,1,2)
                checkline(1,4,7)
                checkline(6,4,2)
                checkline(0,4,8)
                checkline(3,4,5)
                checkline(6,7,8)
                checkline(0,3,6)
                checkline(2,5,8)
                
            }
        })
        
    });
}


humanMove()


function movimientoMaquina(){
    if(!gameOver){
    spaceO= gatos.filter((gato)=>{
        return gato.innerHTML===""
    })
    
    if(spaceO.length>0){
        const move= Math.floor(Math.random()*spaceO.length)
    spaceO[move].innerHTML="O"
                checkline(0,1,2)
                checkline(1,4,7)
                checkline(6,4,2)
                checkline(0,4,8)
                checkline(3,4,5)
                checkline(6,7,8)
                checkline(0,3,6)
                checkline(2,5,8)



    }

}
}

function sendO(){
    const buttonS = document.createElement("button");
    buttonS.textContent = "Send";
    buttonS.setAttribute("class", "Reset");
    ContainerP.appendChild(buttonS);
    buttonS.addEventListener("click", () =>{
    winO+=1;
    localStorage.setItem("winO", winO); // Guardar el puntaje actualizado en localStorage
    window.location.reload();
})
}
function sendX() {
    const buttonS = document.createElement("button");
    buttonS.textContent = "Send";
    buttonS.setAttribute("class", "Reset");
    ContainerP.appendChild(buttonS);
    buttonS.addEventListener("click", () => {
        winX += 1;
        let marc=document.createElement("p")
        marc.textContent= winX
        human.appendChild(marc)

        
        localStorage.setItem("winX", winX); // Guardar el puntaje actualizado en localStorage
        window.location.reload();
    });
}



function Winners(c1,c2,c3){
if( gatos[c1].innerHTML==="X" &&
    gatos[c2].innerHTML==="X" &&
    gatos[c3].innerHTML==="X"){
    let winner= document.createElement("p")
    winner.textContent="Player's win"
    ContainerP.appendChild(winner)
    gameOver=true //Indica que el juego terminó//
    sendX()

}else{
    if( gatos[c1].innerHTML==="O" &&
        gatos[c2].innerHTML==="O" &&
        gatos[c3].innerHTML==="O"){
        let winner= document.createElement("p")
        winner.textContent="The winner is the machine"
        ContainerP.appendChild(winner)
        gameOver=true //Indica que el juego terminó//
        sendO() 

    }
}

}
function checkline(c1, c2, c3){
    if(gatos[c1].innerHTML.length >0 && 
            gatos[c1].innerHTML===gatos[c2].innerHTML&&
                gatos[c2].innerHTML===gatos[c3].innerHTML)
                {
                    
                    Winners(c1,c2,c3)
                }
}

function markerP(){}




console,console.log(winX);





