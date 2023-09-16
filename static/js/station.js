var shake;
var magnitude = 0;
var factor = 10;
function sound(path) {
  var data = new Audio("/static/media/" + path);
  data.play();
}
socket.on("explosion", function (json) {
  magnitude += json["magnitude"];
  factor = json["factor"];
});
socket.on("reload", function (json) {
  window.location.href = json;
});
function doshake() {
  //document.body.style["-webkit-filter"] = "blur("+magnitude/10+"px)";
  //document.body.style["filter"] = "blur("+magnitude/10+"px)";
  //document.body.style.top = randomIntFromInterval(magnitude * -1, magnitude)+'px';
  //document.body.style.left = randomIntFromInterval(magnitude * -1, magnitude)+'px';
  document.body.style["-webkit-transform"] =
    "rotate(" +
    randomIntFromInterval(magnitude * -1, magnitude) / 50 +
    "deg) translateX(" +
    randomIntFromInterval(magnitude * -1, magnitude) +
    "px) translateY(" +
    randomIntFromInterval(magnitude * -1, magnitude) +
    "px)";
  document.body.style["-moz-transform"] =
    "rotate(" +
    randomIntFromInterval(magnitude * -1, magnitude) / 50 +
    "deg) translateX(" +
    randomIntFromInterval(magnitude * -1, magnitude) +
    "px) translateY(" +
    randomIntFromInterval(magnitude * -1, magnitude) +
    "px)";
  //document.body.style['-webkit-transform'] = 'translateX('+randomIntFromInterval(magnitude * -1, magnitude)+'px) translateY('+randomIntFromInterval(magnitude * -1, magnitude)+'px)';
  //document.body.style['-moz-transform'] = 'translateX('+randomIntFromInterval(magnitude * -1, magnitude)+'px) translateY('+randomIntFromInterval(magnitude * -1, magnitude)+'px)';
  magnitude -= (magnitude + 1) / factor;
  if (magnitude <= 0) {
    magnitude = 0;
    //document.body.style.top = '0px';
    //document.body.style.left = '0px';
    //document.body.style["-webkit-filter"] = "none";
    //document.body.style["filter"] = "none";
    document.body.style["-webkit-transform"] = "none";
    document.body.style["-moz-transform"] = "none";
  }
  requestAnimationFrame(doshake);
}
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function checkIt(value) {
  if (data.hasOwnProperty(value + "broken")) {
    if (data[value + "broken"] == false) {
      return true;
    }
  }
}
setTimeout(doshake, 3000);
