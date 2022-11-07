document.querySelector("#start").onclick = startGame;

function startGame(){
    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#cp").style.margin = "40vh auto 0 auto";
}