let score =0;
let over =0;
window.onload = function(){
    board1();
}

function board1(){
    for(let i=0;i<9;i++){
        let t1 = document.createElement("div");
        t1.id = i.toString();
        document.getElementById("board").appendChild(t1);   
        t1.addEventListener("click", check);   
    }
    
    setInterval(renderMole, 1000);
    setInterval(renderTnt, 3000);
}

let currenttile;
let currenttileTnt;

function renderMole(){
    if(over){
        return;
    }
    if(currenttile){
        currenttile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "mole.png";
    let num = Math.floor(Math.random()*9);
    if(currenttileTnt && currenttileTnt.id==num){
        return;
    }
    currenttile = document.getElementById(num.toString());
    currenttile.appendChild(mole); 
}

function renderTnt(){
    if(over){
        return;
    }
    if(currenttileTnt){
        currenttileTnt.innerHTML = "";
    }
    let tnt = document.createElement("img");
    tnt.src = "tnt.png";
    let num = Math.floor(Math.random()*9);
    if(currenttile && currenttile.id==num){
        return;
    }
    currenttileTnt = document.getElementById(num.toString());
    currenttileTnt.appendChild(tnt); 
}

function check(){
    if(over){
        return;
    }
    if(this == currenttile){
        score+=10;
        document.getElementById("score").innerHTML = "Score: " + score.toString();
    }
    else if(this == currenttileTnt){
        over =1;
        document.getElementById("score").innerHTML = "Game over";
        document.getElementById("overlay").style.display = "flex";
    }
}

function clear(){
    let b1 = document.getElementById("board");
    b1.innerHTML = "";
}

function refreshPage(){
    score = 0;  
    over = 0;  
    document.getElementById("score").innerHTML = "Score: 0";  
    document.getElementById("overlay").style.display = "none";  
    clear();
    board1();
}

