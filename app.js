var personaje = document.getElementById("personaje");
var escenario = document.getElementById("escenario");
var interval;
var both = 0;
var counter = 0;
var currentblocks = [];

function moveLeft(){
    var left = parseInt(window.getComputedStyle(personaje).getPropertyValue("left"));
    if(left>0){
        personaje.style.left = left - 2 + "px";
    }
   
}

function moveRight(){
    var left = parseInt(window.getComputedStyle(personaje).getPropertyValue("left"));
    if(left<380){
        personaje.style.left = left + 2 + "px";
    }
    
}

document.addEventListener("keydown", event => {
    if(both ==0){
        both++;
        if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft,1);
        }
        if(event.key === "ArrowRight"){
            interval = setInterval(moveRight,1);

        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

var blocks = setInterval(function() {
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));

    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if(blockLastTop<400 || counter == 0){
        var block  = document.createElement("div");
        var hole  = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top= blockLastTop + 100 + "px";
        hole.style.top= holeLastTop + 100 + "px";
        var random = Math.floor(Math.random()*360);
        hole.style.left = random + "px";
        escenario.appendChild(block);
        escenario.appendChild(hole);
        currentblocks.push(counter);
        counter ++;

    }

    var personajeTop = parseInt(window.getComputedStyle(personaje).getPropertyValue("top"));
    var personajeLeft = parseInt(window.getComputedStyle(personaje).getPropertyValue("left"));
    var drop = 0;

    if(personajeTop <=0){
        alert("Perdiste tu TUSI haragan. Score: 420!");
        clearInterval(blocks);
        location.reload();
    }

    for(var i = 0 ;i< currentblocks.length; i++){
        let current = currentblocks[i];
        let iBlock = document.getElementById("block"+current);
        let iHole = document.getElementById("hole"+current);

        let iBlockTop = parseFloat(window.getComputedStyle(iBlock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(iHole).getPropertyValue("left"));
        iBlock.style.top = iBlockTop - 0.5 + "px";
        iHole.style.top = iBlockTop - 0.5 + "px";

        if(iBlockTop < -20){
            currentblocks.shift();
            iBlock.remove();
            iHole.remove();
        }

        if(iBlockTop-20 < personajeTop && iBlockTop>personajeTop){

            drop++;

            if(iholeLeft<=personajeLeft && iholeLeft+20>=personajeLeft){
                drop=0;
            }
        }
    }

    if(drop==0){
        if(personajeTop<480){
            personaje.style.top = personajeTop + 2 +"px";

        }
        
    }else{
        personaje.style.top = personajeTop - 0.5 +"px";
    }




}, 1);






