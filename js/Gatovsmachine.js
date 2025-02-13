const gatos=Array.from(document.getElementsByClassName("Gatos"))
let spaceO=""
const ContainerP= document.getElementById("Gato")

function humanMove(){
    gatos.forEach((gato) => {
        gato.addEventListener("click",()=>{
            if(gato.innerHTML == ""){
                gato.innerHTML = "X"
                setTimeout(() => {
                    movimientoMaquina()
                }, 500);
            }
        })
        
    });
}


humanMove()


function movimientoMaquina(){
    spaceO= gatos.filter((gato)=>{
        return gato.innerHTML===""
    })
    
    if(spaceO.length>0){
        const move= Math.floor(Math.random()*spaceO.length)
    spaceO[move].innerHTML="O"

    }

}
 function Resetear(){
    const buttonR= document.createElement("button")
    buttonR.textContent="Resetear"
    ContainerP.appendChild(buttonR)

 }








