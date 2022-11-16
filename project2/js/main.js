let apiData;
let theColor;
let guessColor;
let colorDistance;
let round = 1;
document.querySelector("#start").onclick = startGame;
document.querySelector("#guessButton").onclick = incrementRound;
Color.defaults.deltaE = "2000";
let black = new Color("rgb(0,0,0)");
let white = new Color ("rgb(128,128,128)");
document.querySelector("#backToMenu").onclick = backToMenu;
document.querySelector("#cp").onmousemove = setBoxes;
document.querySelector("#cp").onmousedown = setBoxes;
document.querySelector("#cp").onclick = setBoxes;
let loop;
let baseWidth = window.innerWidth;
let baseHeight = window.innerHeight;
reloadHistory();

function startGame(){

    $.getJSON('https://www.colourlovers.com/api/colors/random?jsonCallback=?', (data) => {
        console.log(data[0]);
        apiData = data[0];
        loadData();
        });

    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#pastGames").style.display = "none";
    document.querySelector("#mainFooter").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
    loop = setInterval(() => gameLoop(), 1);

    if(document.querySelector("#cp").clientHeight >= (window.innerHeight * 0.5)) document.querySelector("#luminanceBar").style.backgroundHeight = "20vw"
    else document.querySelector("#luminanceBar").style.backgroundHeight = "25.4vw"
}

function loadData(){
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"" + apiData.title + "\"";
    theColor = new Color("a98rgb-linear", [apiData.rgb.red / 255, apiData.rgb.green / 255, apiData.rgb.blue / 255]);
    setBoxes();
}

function gameLoop(){
    document.querySelector("#game").style.top = (window.innerHeight - document.querySelector("#game").clientHeight) / 2;
    
    if(baseWidth != window.innerWidth || baseHeight != window.innerHeight){
        document.querySelector(".cover").click();
        console.log("ar change!");
        document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
        baseWidth = window.innerWidth;
        baseHeight = window.innerHeight;  
    }
    
    if(document.querySelector("#cp").clientHeight >= (window.innerHeight * 0.5)) {
        document.querySelector("#theWord").style.marginLeft = window.innerWidth * 0.475 + (window.innerWidth * 0.525 - document.querySelector("#theWord").clientWidth) / 2;
    }
        else document.querySelector("#theWord").style.marginLeft = 0;
}

function incrementRound(){
    round++;
    document.querySelector("#guessNum").innerHTML = round + " / 10";
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#distance").innerHTML = "You're " + Color.deltaE(guessColor, theColor, "2000").toFixed(2) + "% away from the color!";
    document.querySelector("#highOrLow").innerHTML = highOrLow(guessColor, theColor);
    if(round > 10 || Color.deltaE(guessColor, theColor, "2000") == 0){
        endGame();
        return;
    }
}

function highOrLow(guess, answer){
    let string = "";

    string += "Red: "
    if(guess.r * 255 == answer.r * 255) string += "PERFECT!";
    else if(guess.r < answer.r) string += "Too Low ↑";
    else if (guess.r > answer.r) string += "Too High ↓";
    string += "<br>"
    string += "Green: "
    if(guess.g * 255 == answer.g * 255) string += "PERFECT!";
    else if(guess.g < answer.g) string += "Too Low ↑";
    else if (guess.g > answer.g) string += "Too High ↓";
    string += "<br>"
    string += "Blue: "
    if(guess.b * 255 == answer.b * 255) string += "PERFECT!";
    else if(guess.b < answer.b) string += "Too Low ↑";
    else if (guess.b > answer.b) string += "Too High ↓";
    string += "<br>"
    string += "Hue: "
    if(guess.hsl[0] == answer.hsl[0]) string += "PERFECT!";
    else if(guess.hsl[0] < answer.hsl[0]) string += "Too Low ↑";
    else if (guess.hsl[0] > answer.hsl[0]) string += "Too High ↓";
    string += "<br>"
    string += "Saturation: "
    if(guess.hsl[1] == answer.hsl[1]) string += "PERFECT!";
    else if(guess.hsl[1] < answer.hsl[1]) string += "Too Low ↑";
    else if (guess.hsl[1] > answer.hsl[1]) string += "Too High ↓";
    string += "<br>"
    string += "Luminance: "
    if(guess.hsl[2] == answer.hsl[2]) string += "PERFECT!";
    else if(guess.hsl[2] < answer.hsl[2]) string += "Too Low ↑";
    else if (guess.hsl[2] > answer.hsl[2]) string += "Too High ↓";
    string += "<br>"

    return string;
}

function findNth(string, char, num){
    let arr = [];
    let occurrence = 0

    for(let i = 0; i < string.length; i++){
        if(string[i] == char){
            occurrence++;
            if(occurrence == num) return i;
        }
    }

    return -1;
}

function endGame(){
    clearInterval(loop);

    if(localStorage.getItem('1') == null){
        let i = 1;
        console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        console.log(localStorage.getItem(i.toString()));
        console.log(localStorage.getItem(i.toString() + "g"));
        console.log(localStorage.getItem(i.toString() + "r"));
    }
    else{
        let i = 1;
        while(localStorage.getItem(i.toString()) != null){
            i++;
        }
        console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        console.log(localStorage.getItem(i.toString()));
        console.log(localStorage.getItem(i.toString() + "g"));
        console.log(localStorage.getItem(i.toString() + "r"));
    }

    reloadHistory();

    document.querySelector("#guessColor").style.backgroundColor = "rgb(" + guessColor.r * 255 + ", " + guessColor.g * 255 + ", " + guessColor.b * 255 + ")";
    document.querySelector("#answerColor").style.backgroundColor = "rgb(" + theColor.r * 255 + ", " + theColor.g * 255 + ", " + theColor.b * 255 + ")";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = "-9999px";
    document.querySelector("#distance").innerHTML = "";
    document.querySelector("#endGame").style.display = "flex";
    if(round > 10){
        document.querySelector("#endGame p").innerHTML = "Ran out of guesses!"
    }
    else{
        document.querySelector("#endGame p").innerHTML = "You guessed the color!!"
    }
}

function reloadHistory(){
    document.querySelector("#history").innerHTML = "";

    let i = 1;

    while(localStorage.getItem(i.toString()) != null){
        i++;
    }

    i--;

    console.log(i);

    if(i == 0) document.querySelector("#pastGames h1").innerHTML = "<i>Check back here for your game history!</i>"
    else {
        document.querySelector("#pastGames h1").innerHTML = "↓ <i>Past Games</i> ↓";
        for(let j = i; j > 0; j--){
            let mainDiv = document.createElement("div");
            let color1 = document.createElement("div");
            let color2 = document.createElement("div");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");
            let distance = localStorage.getItem(j.toString());
            p1.innerHTML = "<u>Game " + j.toString() + "</u>";
            p2.innerHTML = "<i>" + distance + "% Away</i>";
            color1.style.backgroundColor = "rgb(" + localStorage.getItem(j.toString() + "g").substring(0, localStorage.getItem(j.toString() + "g").indexOf(",")) + ", " + localStorage.getItem(j.toString() + "g").substring(findNth(localStorage.getItem(j.toString() + "g"), ",", 1) + 1, findNth(localStorage.getItem(j.toString() + "g"), ",", 2)) + ", " + localStorage.getItem(j.toString() + "g").substring(findNth(localStorage.getItem(j.toString() + "g"), ",", 2) + 1) + ")";
            color2.style.backgroundColor = "rgb(" + localStorage.getItem(j.toString() + "r").substring(0, localStorage.getItem(j.toString() + "r").indexOf(",")) + ", " + localStorage.getItem(j.toString() + "r").substring(findNth(localStorage.getItem(j.toString() + "r"), ",", 1) + 1, findNth(localStorage.getItem(j.toString() + "r"), ",", 2)) + ", " + localStorage.getItem(j.toString() + "r").substring(findNth(localStorage.getItem(j.toString() + "r"), ",", 2) + 1) + ")";
            mainDiv.appendChild(p1);
            mainDiv.appendChild(color1);
            mainDiv.appendChild(color2);
            mainDiv.appendChild(p2);
            document.querySelector("#history").appendChild(mainDiv);
            console.log("added to history");
    }
    }
}

function backToMenu(){
    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#mainMenu").style.display = "flex";
    document.querySelector("#pastGames").style.display = "block";
    document.querySelector("#mainFooter").style.display = "block";
    document.querySelector("#game").style.display = "none";
    round = 1;
    document.querySelector("#guessNum").innerHTML = round + " / 10";
    document.querySelector("#highOrLow").innerHTML = "";
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"\"";

}

function setBoxes(){
    document.querySelector("#tR").value = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(","));
    document.querySelector("#tG").value = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2));
    document.querySelector("#tB").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3));
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#tH").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, "(", 3) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 7));
    document.querySelector("#tS").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 7) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 8) - 1);
    document.querySelector("#tL").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 8) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 9) - 1);
}
