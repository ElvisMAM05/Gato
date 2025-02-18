const gatos=document.getElementsByClassName("Gatos")
const ganadorJuego = document.getElementById("ganador")
let Jugador=true
const maquina=false

for(let i=0;i<gatos.length;i++){
    gatos[i].addEventListener('click',Usuario1)

    }

function Usuario1(e){
    let gatosValue=e.target.innerHTML;
    if( !gatosValue.length){
        e.target.innerHTML=Jugador? 'X': 'O';
        Jugador=!Jugador;   

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
function checkline(c1,c2,c3){
    if(gatos[c1].innerHTML.length &&
        gatos[c1].innerHTML==gatos[c2].innerHTML &&
            gatos[c2].innerHTML==gatos[c3].innerHTML ){
                ganador()
            }
}

function ganador(){
    if( gatos[c1].textContent==="X"&&
        gatos[c2].textContent==="X"&&
        gatos[c3].textContent==="X"){
            
    }
}

