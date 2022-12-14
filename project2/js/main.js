//Define variables
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

// Get random color
let h = Math.random() * 360 - 5;
let s = Math.random() * 35 + 15;
let l = Math.random() * 25 + 45;

// I assure you this is the only way I could do this lol. I'll set certain color values as variables later but querySelector with css rules through js has been giving issues when I select more than one object at a time

// Set EVERYTHING to monohrome shades

document.querySelector("#mainMenu").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#mainFooter").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#pastGames").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
document.body.style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
document.querySelector("#pastGames").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 40) + "%)";
document.querySelector("#pastGames div").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";

let i = 1;

for(let d of document.querySelectorAll("#history div div")){
    if(i==1){
        d.style.borderTop = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderBottom = "none";
        i = 2;
    }
    else{
        d.style.borderBottom = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
        d.style.borderTop = "none";
        i = 1;
    }
}

document.querySelector("#mainMenu").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
document.querySelector("#mainFooter").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
document.querySelector("#mainMenu button").style.backgroundColor = "hsl(" + (h + 7.5) + "," + s + "%," + (l - 20) + "%)";
document.querySelector("#mainMenu button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
document.querySelector("#cp").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#game button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#game button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#guessNum").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#theWord").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#theWord").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#highOrLow").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#highOrLow").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#distance").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#distance").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#guessColor").style.borderLeft = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#guessColor").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#guessColor").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#guessColor").style.borderRight = "none";
document.querySelector("#answerColor").style.borderRight = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#answerColor").style.borderTop = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#answerColor").style.borderBottom = "0.5vw solid hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#answerColor").style.borderLeft = "none";
document.querySelector("#game").style.backgroundColor = "hsl(" + (h + 5) + "," + s + "%," + (l - 10) + "%)";
document.querySelector("#endGame").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
document.querySelector("#endGame").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
document.querySelector("#endGame button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#endGame button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
document.querySelector("#colorTitle1").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#colorTitle2").style.color = "hsl(" + h + "," + s + "%," + l + "%)";

gameLoop();

// Runs when the START button is pressed on the main page; gets data from the API, and switches to Game screen
function startGame(){

    $.getJSON('https://www.colourlovers.com/api/colors/random?jsonCallback=?', (data) => {
        // console.log(data[0]);
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

// Runs after API data is fetched; Loads information from API into game system and screen
function loadData(){
    let title = apiData.title;
    if(title.length > 17){
        let title1 = title.substring(0, title.length / 2);
        let title2 = tite.substring(title.length / 2);
        title = title1 + "-<br>-" + title2;
    }
    document.querySelector("#theWord").innerHTML = "Your clue is...<br>\"" + title + "\"";
    theColor = new Color("a98rgb-linear", [apiData.rgb.red / 255, apiData.rgb.green / 255, apiData.rgb.blue / 255]);
    setBoxes();
}

// Runs frequently; checks several things regarding screen layout that can't be updated through css
function gameLoop(){
    document.querySelector("#game").style.top = (window.innerHeight - document.querySelector("#game").clientHeight) / 2;
    
    if(baseWidth != window.innerWidth || baseHeight != window.innerHeight){
        document.querySelector(".cover").click();
        // console.log("ar change!");
        document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
        baseWidth = window.innerWidth;
        baseHeight = window.innerHeight;  
    }

    if(document.querySelector("#highOrLow").innerHTML == ""){
        document.querySelector("#highOrLow").style.display = "none";
    }
    else document.querySelector("#highOrLow").style.display = "block";

    if(document.querySelector("#distance").innerHTML == ""){
        document.querySelector("#distance").style.display = "none";
    }
    else document.querySelector("#distance").style.display = "block";
    
    if(document.querySelector("#cp").clientHeight >= (window.innerHeight * 0.5)) {
        document.querySelector("#luminanceBar").style.width = "3.64166667vw";
    }
        else {
            document.querySelector("#luminanceBar").style.width = "3.6vw";
        }
}

// Run when the user pressed the Guess button; Increments the round, triggers input analysis and prints color-closeness results to the screen
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

// Deciphers and returns to the incrementRound function the information to be put on the "high or low" portion of the game screen, in correct format

function highOrLow(guess, answer){
    let string = "";

    string += "Red: "
    if(guess.r * 255 == answer.r * 255) string += "PERFECT!";
    else if(guess.r < answer.r) string += "Too Low ???";
    else if (guess.r > answer.r) string += "Too High ???";
    string += "<br>"
    string += "Green: "
    if(guess.g * 255 == answer.g * 255) string += "PERFECT!";
    else if(guess.g < answer.g) string += "Too Low ???";
    else if (guess.g > answer.g) string += "Too High ???";
    string += "<br>"
    string += "Blue: "
    if(guess.b * 255 == answer.b * 255) string += "PERFECT!";
    else if(guess.b < answer.b) string += "Too Low ???";
    else if (guess.b > answer.b) string += "Too High ???";
    string += "<br>"
    string += "Hue: "
    if(guess.hsl[0] == answer.hsl[0]) string += "PERFECT!";
    else if(guess.hsl[0] < answer.hsl[0]) string += "Too Low ???";
    else if (guess.hsl[0] > answer.hsl[0]) string += "Too High ???";
    string += "<br>"
    string += "Saturation: "
    if(guess.hsl[1] == answer.hsl[1]) string += "PERFECT!";
    else if(guess.hsl[1] < answer.hsl[1]) string += "Too Low ???";
    else if (guess.hsl[1] > answer.hsl[1]) string += "Too High ???";
    string += "<br>"
    string += "Luminance: "
    if(guess.hsl[2] == answer.hsl[2]) string += "PERFECT!";
    else if(guess.hsl[2] < answer.hsl[2]) string += "Too Low ???";
    else if (guess.hsl[2] > answer.hsl[2]) string += "Too High ???";
    string += "<br>"

    return string;
}

// Finds the Nth occurrence of a given character in a string; returns index
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

// Analyzes the current color, deciphers whether the player won, and shows appropriate message on gameEnd screen, which this also transitions the page to.
function endGame(){
    clearInterval(loop);

    if(localStorage.getItem('1') == null){
        let i = 1;
        // console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }
    else{
        let i = 1;
        while(localStorage.getItem(i.toString()) != null){
            i++;
        }
        // console.log(i);
        localStorage.setItem(i.toString(), document.querySelector("#distance").innerHTML.substring(document.querySelector("#distance").innerHTML.indexOf("e") + 2, document.querySelector("#distance").innerHTML.indexOf("%")));
        localStorage.setItem(i.toString() + "g", guessColor.r * 255 + "," + guessColor.g * 255 + "," + guessColor.b * 255);
        localStorage.setItem(i.toString() + "r", theColor.r * 255 + "," + theColor.g * 255 + "," + theColor.b * 255);
        // console.log(localStorage.getItem(i.toString()));
        // console.log(localStorage.getItem(i.toString() + "g"));
        // console.log(localStorage.getItem(i.toString() + "r"));
    }

    reloadHistory();
    reloadHistoryColors();

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

// Reloads divs at the bottom of the main page to add the newest game results
function reloadHistory(){
    document.querySelector("#history").innerHTML = "";

    let i = 1;

    while(localStorage.getItem(i.toString()) != null){
        i++;
    }

    i--;

    // console.log(i);

    if(i == 0) document.querySelector("#pastGames h1").innerHTML = "<i>Check back here for your game history!</i>"
    else {
        document.querySelector("#pastGames h1").innerHTML = "??? <i>Past Games</i> ???";
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
            // console.log("added to history");
    }
    }
}

// Launched when the button on the gameEnd screen is pressed; transitions back to the Main Menu
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

// Updates the number boxes next to the color sliders on the game screen
function setBoxes(){
    document.querySelector("#tR").value = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(","));
    document.querySelector("#tG").value = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2));
    document.querySelector("#tB").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3));
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#tH").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, "(", 3) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 7));
    document.querySelector("#tS").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 7) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 8) - 1);
    document.querySelector("#tL").value = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 8) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 9) - 1);
}

// Adds the appropriate border to each game result div's inner color divs
function reloadHistoryColors(){
    for(let d of document.querySelectorAll("#history div div")){
        if(i==1){
            d.style.borderTop = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderBottom = "none";
            i = 2;
        }
        else{
            d.style.borderBottom = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderLeft = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderRight = "0.2vw solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
            d.style.borderTop = "none";
            i = 1;
        }
    }
}
