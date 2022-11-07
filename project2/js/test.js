let test;

// "$" = shorthand for jQuery
$.getJSON('https://www.colourlovers.com/api/colors/random?jsonCallback=?', (data) => {
    console.log(data[0]);
    test = data[0];
    testFN();
});

let testFN = () => {
    document.querySelector("#n1").innerHTML = "ID: " + test.id;
    document.querySelector("#n2").innerHTML = "Name: " + test.title;
    document.querySelector("#n3").innerHTML = "Creator: " + test.userName;
    document.querySelector("#n4").innerHTML = "Views: " + test.numViews;
    document.querySelector("#n5").innerHTML = "Votes: " + test.numVotes;
    document.querySelector("#n5point5").innerHTML = "<b>The Color:</b>";
    document.querySelector("#n6").style.backgroundColor = "rgb(" + test.rgb.red + ", " + test.rgb.green + ", " + test.rgb.blue + ")";
    document.querySelector("#n7").innerHTML = "<a href=" + test.url + ">View this color on <br>ColourLovers.com</a>";
    document.querySelector("#n8").innerHTML = "Direct data from site <br>displayed in console";
}