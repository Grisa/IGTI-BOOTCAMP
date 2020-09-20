function alter_color() {

    var red = document.getElementById("red").value;
    var green = document.getElementById("green").value;
    var blue = document.getElementById("blue").value;

    document.getElementById("box").style.backgroundColor = "rgb(" + red + ", " + green + ", " + blue + ")";
}