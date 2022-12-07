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
document.querySelector("body").onmousemove = setBoxes;
document.querySelector("body").onmousedown = setBoxes;
document.querySelector("body").onclick = setBoxes;
let mainLoop = setInterval(() => foreverLoop(), 1);
let loop;
let baseWidth = document.innerWidth;
let baseHeight = document.innerHeight;
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
document.querySelector("#pastGames").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 40) + "%)";
document.querySelector("#pastGames div").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";

let i = 1;

reloadHistoryColors();

document.querySelector("#mainMenu").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#mainFooter").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l - 30) + "%)";
document.querySelector("#mainMenu button").style.backgroundColor = "hsl(" + (h + 7.5) + "," + s + "%," + (l - 20) + "%)";
document.querySelector("#mainMenu button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 15) + "%)";
document.body.style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#game button").style.backgroundColor = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#game button").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#game button").style.border = "solid hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#guessNumber").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#theWord").style.color = "hsl(" + h + "," + s + "%," + l + "%)";
document.querySelector("#theWord").style.backgroundColor = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
document.querySelector("#hol").style.color = "hsl(" + (h + 5) + "," + (s - 25) + "%," + (l + 25) + "%)";
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
    document.querySelector("#loading").style.display = "block";

    $.getJSON('https://www.colourlovers.com/api/colors/random?jsonCallback=?', (data) => {
        // console.log(data[0]);
        apiData = data[0];
        document.querySelector("#loading").style.display = "none";
        loadData();
        });

    document.querySelector("#mainMenu").style.display = "none";
    document.querySelector("#pastGames").style.display = "none";
    document.querySelector("#mainFooter").style.display = "none";
    document.querySelector("#game").style.display = "flex";
    document.querySelector("#game").style.position = "absolute";
    document.querySelector("#game").style.top = (window.innerHeight / 2) - (document.querySelector("#game").clientHeight / 2) + "px";
    document.querySelector("#hsv_map .hsv-cursor").style.top = "50%";
    document.querySelector("#hsv_map .hsv-cursor").style.left = "50%";
    
    loop = setInterval(() => gameLoop(), 1);
}

// Runs after API data is fetched; Loads information from API into game system and screen
function loadData(){
    let title = apiData.title;
    document.querySelector("#theClue").innerHTML = "Your clue is...<br>\"" + title + "\"";
    theColor = new Color("a98rgb-linear", [apiData.rgb.red / 255, apiData.rgb.green / 255, apiData.rgb.blue / 255]);
    setBoxes();
}

function foreverLoop(){

    var x = window.matchMedia("(min-aspect-ratio: 1000/721)")

    if(round > 1){
        // Set all css positioning for layout unique to certain rounds (round 1 vs not round 1)
        if(!x.matches){
            document.querySelector("#testPatch").style.top = "19vw";
            document.querySelector("#testPatch").style.left = "52vw";
            document.querySelector("#historyPatch").style.top = "37vw";
            document.querySelector("#historyPatch").style.left = "76vw";
            document.querySelector("#sliders").style.top = "48vw";
            document.querySelector("#sliders").style.left = "-1.5vw";
            document.querySelector("#hsv_map").style.top = "0vw";
            document.querySelector("#hsv_map").style.left = "0vw";
            document.querySelector("#theWord").style.top = "12.4vw";
            document.querySelector("#theWord").style.left = "59vw";
            document.querySelector("#guessButton").style.top = "7vw";
            document.querySelector("#guessButton").style.left = "14vw";
            document.querySelector("#guessNumber").style.top = "4vw";
            document.querySelector("#guessNumber").style.left = "66.1vw";
            document.querySelector("#inputs").style.top = "31.3vw";
            document.querySelector("#inputs").style.left = "2vw";
        }
        else if(x.matches){
            document.querySelector("#testPatch").style.top = "calc(138.7vh * .19)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .54)";
            document.querySelector("#historyPatch").style.top = "calc(138.7vh * .37)";
            document.querySelector("#historyPatch").style.left = "calc(138.7vh * .76)";
            document.querySelector("#sliders").style.top = "calc(138.7vh * .48)";
            document.querySelector("#sliders").style.left = "calc(138.7vh * -.003)"
            document.querySelector("#hsv_map").style.top = "0";
            document.querySelector("#hsv_map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#theWord").style.top = "calc(138.7vh * .124)";
            document.querySelector("#theWord").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guessButton").style.top = "calc(138.7vh * .07)";
            document.querySelector("#guessButton").style.left = "calc(138.7vh * .14)";
            document.querySelector("#guessNumber").style.top = "calc(138.7vh * .04)";
            document.querySelector("#guessNumber").style.left = "calc(138.7vh * .661)";
            document.querySelector("#inputs").style.top = "calc(138.7vh * .313)";
            document.querySelector("#inputs").style.left = "calc(138.7vh * .0375)";
        }
    }
    else
    {
        if(!x.matches){
            document.querySelector("#testPatch").style.top = "21vw";
            document.querySelector("#testPatch").style.left = "60.5vw";
            document.querySelector("#sliders").style.top = "41vw";
            document.querySelector("#sliders").style.left = "-1.5vw";
            document.querySelector("#hsv_map").style.top = "-8vw";
            document.querySelector("#hsv_map").style.left = "0vw";
            document.querySelector("#theWord").style.top = "21vw";
            document.querySelector("#theWord").style.left = "59vw";
            document.querySelector("#guessButton").style.top = "47.5vw";
            document.querySelector("#guessButton").style.left = "59.5vw";
            document.querySelector("#guessNumber").style.top = "13vw";
            document.querySelector("#guessNumber").style.left = "66.1vw";
            document.querySelector("#inputs").style.top = "24.3vw";
            document.querySelector("#inputs").style.left = "2vw";
        }
        else if(x.matches){
            document.querySelector("#testPatch").style.top = "calc(138.7vh * .21)";
            document.querySelector("#testPatch").style.left = "calc(138.7vh * .624)";
            document.querySelector("#sliders").style.top = "calc(138.7vh * .41)";
            document.querySelector("#sliders").style.left = "calc(138.7vh * .004)"
            document.querySelector("#hsv_map").style.top = "calc(138.7vh * -.08)";
            document.querySelector("#hsv_map").style.left = "calc(138.7vh * .019)";
            document.querySelector("#theWord").style.top = "calc(138.7vh * .21)";
            document.querySelector("#theWord").style.left = "calc(138.7vh * .59)";
            document.querySelector("#guessButton").style.top = "calc(138.7vh * .475)";
            document.querySelector("#guessButton").style.left = "calc(138.7vh * .595)";
            document.querySelector("#guessNumber").style.top = "calc(138.7vh * .13)";
            document.querySelector("#guessNumber").style.left = "calc(138.7vh * .661)";
            document.querySelector("#inputs").style.top = "calc(138.7vh * .243)";
            document.querySelector("#inputs").style.left = "calc(138.7vh * .042)";
        }
    }

    document.querySelector("#testPatch").style.backgroundColor = "rgb(" + document.querySelector("#tR").innerHTML + "," + document.querySelector("#tG").innerHTML + "," + document.querySelector("#tB").innerHTML + ")";;
    document.querySelector("#guessButton").style.lineHeight = document.querySelector("#guessButton").clientHeight + "px";

    if(x.matches && round > 1){
        if(window.innerHeight <= 520){
            document.querySelector("#guessButton").style.top = (window.innerHeight * 0.2527 / 2) - (document.querySelector("#guessButton").clientHeight / 2) + "px";
        }
    }
}

// Runs frequently; checks several things regarding screen layout that can't be updated through css
function gameLoop(){
    
    document.querySelector("#game").style.top = ((window.innerHeight - document.querySelector("#game").clientHeight) / 2) + "px";

    if(parseFloat(document.querySelector("#tL").innerHTML) > 50){
        document.querySelector("#testPatch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#testPatch").style.borderColor = "rgb(100, 100, 100)";
    }
    else{
         document.querySelector("#testPatch").style.color = "rgb(221, 221, 221)";
         document.querySelector("#testPatch").style.borderColor = "rgb(155, 155, 155)";
    }
    
    if(baseWidth != window.innerWidth || baseHeight != window.innerHeight){
        
        colorDiscRadius = document.querySelector("#hsv_map .cover").clientHeight / 2;
        document.querySelector("#hsv_map .hsv-cursor").style.top = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.top.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.top.length - 2)) * (window.innerHeight / baseHeight);
        document.querySelector("#hsv_map .hsv-cursor").style.left = parseFloat(document.querySelector("#hsv_map .hsv-cursor").style.left.substr(0, document.querySelector("#hsv_map .hsv-cursor").style.left.length - 2)) * (window.innerHeight / baseHeight);
        document.querySelector(".hsv-barcursor-l").style.top = parseFloat(document.querySelector(".hsv-barcursor-l").style.top.substr(0, document.querySelector(".hsv-barcursor-l").style.top.length - 2)) * (window.innerHeight / baseHeight);
        document.querySelector(".hsv-barcursor-r").style.top = parseFloat(document.querySelector(".hsv-barcursor-r").style.top.substr(0, document.querySelector(".hsv-barcursor-r").style.top.length - 2)) * (window.innerHeight / baseHeight);

        var x = window.matchMedia("(min-aspect-ratio: 1000/721)")

        if(round == 1 && x.matches){
            document.querySelector("#hsv_map .hsv-cursor").style.top = "50%";
            document.querySelector("#hsv_map .hsv-cursor").style.left = "50%";
            document.querySelector(".hsv-barcursor-l").style.top = "0%";
            document.querySelector(".hsv-barcursor-r").style.top = "0%";    
        }

        // console.log("ar change!");
        baseWidth = window.innerWidth;
        baseHeight = window.innerHeight;  
    }

    if(document.querySelector("#hol").innerHTML == ""){
        document.querySelector("#highOrLow").style.display = "none";
    }
    else document.querySelector("#highOrLow").style.display = "flex";

    if(document.querySelector("#distance").innerHTML == ""){
        document.querySelector("#distance").style.display = "none";
    }
    else document.querySelector("#distance").style.display = "block";
}

// Run when the user pressed the Guess button; Increments the round, triggers input analysis and prints color-closeness results to the screen
function incrementRound(){
    document.querySelector("#historyPatch").style.backgroundColor = "rgb(" + document.querySelector("#tR").innerHTML + "," + document.querySelector("#tG").innerHTML + "," + document.querySelector("#tB").innerHTML + ")";
    if(parseFloat(document.querySelector("#tL").innerHTML) > 50){
        document.querySelector("#historyPatch").style.color = "rgb(34, 34, 34)";
        document.querySelector("#historyPatch").style.borderColor = "rgb(100, 100, 100)";
    }
    else{
        document.querySelector("#historyPatch").style.color = "rgb(221, 221, 221)";
        document.querySelector("#historyPatch").style.borderColor = "rgb(155, 155, 155)";
    }
    if(round == 1) firstGuessTransition();
    document.querySelector("#historyPatch").innerHTML = round + "/10";
    round++;
    document.querySelector("#guessNumber").innerHTML = "<u>" + round + " / 10" + "</u>";
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#distance").innerHTML = "You're " + Color.deltaE(guessColor, theColor, "2000").toFixed(2) + "% away from the color!";
    document.querySelector("#hol").innerHTML = highOrLow(guessColor, theColor);
    if(round > 10 || Color.deltaE(guessColor, theColor, "2000") == 0){
        endGame();
        return;
    }
}

//Rearranges game layout to fit appearing elements
function firstGuessTransition(){
    clearInterval(loop);

    document.querySelector("#historyPatch").style.opacity = "0";
    document.querySelector("#historyPatch").style.display = "block";
    document.querySelector("#historyPatch").style.opacity = "1";

    loop = setInterval(() => gameLoop(), 1);
    return;
}

// Deciphers and returns to the incrementRound function the information to be put on the "high or low" portion of the game screen, in correct format

function highOrLow(guess, answer){
    let string = "";

    string += "<b>Red</b>: "
    if(guess.r * 255 == answer.r * 255) string += "PERFECT!";
    else if(guess.r < answer.r) string += "Too Low 📉";
    else if (guess.r > answer.r) string += "Too High 📈";
    string += "<br>"
    string += "<b>Green</b>: "
    if(guess.g * 255 == answer.g * 255) string += "PERFECT!";
    else if(guess.g < answer.g) string += "Too Low 📉";
    else if (guess.g > answer.g) string += "Too High 📈";
    string += "<br>"
    string += "<b>Blue</b>: "
    if(guess.b * 255 == answer.b * 255) string += "PERFECT!";
    else if(guess.b < answer.b) string += "Too Low 📉";
    else if (guess.b > answer.b) string += "Too High 📈";
    string += "<br>"
    string += "<b>Hue</b>: "
    if(guess.hsl[0] == answer.hsl[0]) string += "PERFECT!";
    else if(guess.hsl[0] < answer.hsl[0]) string += "Too Low 📉";
    else if (guess.hsl[0] > answer.hsl[0]) string += "Too High 📈";
    string += "<br>"
    string += "<b>Saturation</b>: "
    if(guess.hsl[1] == answer.hsl[1]) string += "PERFECT!";
    else if(guess.hsl[1] < answer.hsl[1]) string += "Too Low 📉";
    else if (guess.hsl[1] > answer.hsl[1]) string += "Too High 📈";
    string += "<br>"
    string += "<b>Luminance</b>: "
    if(guess.hsl[2] == answer.hsl[2]) string += "PERFECT!";
    else if(guess.hsl[2] < answer.hsl[2]) string += "Too Low 📉";
    else if (guess.hsl[2] > answer.hsl[2]) string += "Too High 📈";
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
    document.querySelector("#historyPatch").style.display = "none";
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
    document.querySelector("#guessNumber").innerHTML = round + " / 10";
    document.querySelector("#hol").innerHTML = "";
    document.querySelector("#theClue").innerHTML = "Your clue is...<br>\"\"";

}

// Updates the number boxes next to the color sliders on the game screen
function setBoxes(){
    document.querySelector("#tR").innerHTML = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(","));
    document.querySelector("#tG").innerHTML = document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2));
    document.querySelector("#tB").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3));
    guessColor = new Color("a98rgb-linear", [document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf("(") + 1, document.querySelector("#colorValues").innerHTML.indexOf(",")) / 255, document.querySelector("#colorValues").innerHTML.substring(document.querySelector("#colorValues").innerHTML.indexOf(",") + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 2)) / 255, document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 2) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 3)) / 255]);
    document.querySelector("#tH").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, "(", 3) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 7));
    document.querySelector("#tS").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 7) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 8) - 1);
    document.querySelector("#tL").innerHTML = document.querySelector("#colorValues").innerHTML.substring(findNth(document.querySelector("#colorValues").innerHTML, ",", 8) + 1, findNth(document.querySelector("#colorValues").innerHTML, ",", 9) - 1);
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
