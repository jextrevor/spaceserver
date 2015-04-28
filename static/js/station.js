var shake;
var magnitude = 0;
var factor = 10;
function sound(path){
    var data = new Audio("/static/media/"+path);
    data.play();
}
socket.on('explosion', function(json){
    magnitude += json['magnitude'];
    factor = json['factor'];
    clearInterval(shake);
    shake = setInterval(function(){doshake()},1);
});
socket.on('reload', function(json){
window.location.href = json;
});
function doshake(){
    document.body.style["-webkit-filter"] = "blur("+magnitude/10+"px)";
    document.body.style["filter"] = "blur("+magnitude/10+"px)";
    document.body.style.top = randomIntFromInterval(magnitude * -1, magnitude)+'px';
    document.body.style.left = randomIntFromInterval(magnitude * -1, magnitude)+'px';
    document.body.style['-webkit-transform'] = "rotate("+randomIntFromInterval(magnitude * -1, magnitude)/50+'deg)';
    document.body.style['-moz-transform'] = "rotate("+randomIntFromInterval(magnitude * -1, magnitude)/50+'deg)';
    magnitude -= (magnitude+1)/factor;
    if(magnitude <= 0){
    magnitude = 0;
    clearInterval(shake);
    document.body.style.top = '0px';
    document.body.style.left = '0px';
    document.body.style["-webkit-filter"] = "blur(0px)";
    document.body.style["filter"] = "blur(0px)";
    document.body.style['-webkit-transform'] = "rotate(0deg)";
    document.body.style['-moz-transform'] = "rotate(0deg)";
    }
}
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*((max-min)+1)+min);
}
function checkIt(value){
    if(data.hasOwnProperty(value+"broken")){
    if(data[value+"broken"] == false){
    return true;
    }
    }
}
function checkload(){
if(socket.socket.connected == true){
clearInterval(loadingcheck);
}
if(socket.socket.connecting == false){
alert("Your Browser does not seem to be connecting - try a different browser. If this persists your computer may be incompatible :(");
clearInterval(loadingcheck);
}
}
loadingcheck = setInterval(function(){checkload()},1000);
