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

function startGame(){
    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#game").style.position = "relative";
    document.querySelector("#game").style.top = "0";

    $.getJSON('https://www.colourlovers.com/api/colors/random?jsonCallback=?', (data) => {
    console.log(data[0]);
    apiData = data[0];
    loadData();
    });
}

function loadData(){
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"" + apiData.title + "\"";
    theColor = new Color("a98rgb-linear", [apiData.rgb.red / 255, apiData.rgb.green / 255, apiData.rgb.blue / 255]);
}

function incrementRound(){
    round++;
    document.querySelector("#guessNum").innerHTML = round + " / 10";
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"" + apiData.title + "\"<br><br><br><br><br><br>" + "You're " + Color.deltaE(guessColor, theColor, "2000").toFixed(2) + "% away from the color!";
    document.querySelector("#highOrLow").innerHTML = highOrLow(guessColor, theColor);
    if(round > 10 || Color.deltaE(guessColor, theColor, "2000") == 0){
        endGame();
        return;
    }
}

function highOrLow(guess, answer){
    let string = "";

    console.log(guess);
    console.log(answer);

    string += "Red: "
    if(guess.r * 255 == answer.r * 255) string += "PERFECT!";
    else if(guess.r < answer.r) string += "Too Low ↓";
    else if (guess.r > answer.r) string += "Too High ↑";
    string += "<br>"
    string += "Green: "
    if(guess.g * 255 == answer.g * 255) string += "PERFECT!";
    else if(guess.g < answer.g) string += "Too Low ↓";
    else if (guess.g > answer.g) string += "Too High ↑";
    string += "<br>"
    string += "Blue: "
    if(guess.b * 255 == answer.b * 255) string += "PERFECT!";
    else if(guess.b < answer.b) string += "Too Low ↓";
    else if (guess.b > answer.b) string += "Too High ↑";
    string += "<br>"
    string += "Hue: "
    if(guess.hsl[0] == answer.hsl[0]) string += "PERFECT!";
    else if(guess.hsl[0] < answer.hsl[0]) string += "Too Low ↓";
    else if (guess.hsl[0] > answer.hsl[0]) string += "Too High ↑";
    string += "<br>"
    string += "Saturation: "
    if(guess.hsl[1] == answer.hsl[1]) string += "PERFECT!";
    else if(guess.hsl[1] < answer.hsl[1]) string += "Too Low ↓";
    else if (guess.hsl[1] > answer.hsl[1]) string += "Too High ↑";
    string += "<br>"
    string += "Luminance: "
    if(guess.hsl[2] == answer.hsl[2]) string += "PERFECT!";
    else if(guess.hsl[2] < answer.hsl[2]) string += "Too Low ↓";
    else if (guess.hsl[2] > answer.hsl[2]) string += "Too High ↑";
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
    document.querySelector("#guessColor").style.backgroundColor = "rgb(" + guessColor.r * 255 + ", " + guessColor.g * 255 + ", " + guessColor.b * 255 + ")";
    document.querySelector("#answerColor").style.backgroundColor = "rgb(" + theColor.r * 255 + ", " + theColor.g * 255 + ", " + theColor.b * 255 + ")";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = "-9999px";
    document.querySelector("#endGame").style.display = "flex";
    if(round > 10){
        document.querySelector("#endGame p").innerHTML = "Ran out of guesses!"
    }
    else{
        document.querySelector("#endGame p").innerHTML = "You guessed the color!!"
    }
}

function backToMenu(){
    document.querySelector("#endGame").style.display = "none";
    document.querySelector("#mainMenu").style.display = "flex";
    round = 0;
    document.querySelector("#guessNum").innerHTML = round + " / 10";
    document.querySelector("#highOrLow").innerHTML = "";
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"";

}
