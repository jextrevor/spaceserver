var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/mvs',conn_options);
socket.on("update",function(json){
	update(json);
});
background = new Audio("/static/media/background.mp3");
background.addEventListener('ended', function() {
    restartbackground();
}, false);
background.play();
currentmusic = new Audio("/static/media/training.mp3");
function emit(key,json){
	socket.emit(key,json);
}
function update(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
    if(key == "music"){
    	currentmusic.pause();
    	if(json[key] != ""){
    		currentmusic = new Audio("/static/media/"+json[key]);
    		currentmusic.play();
    	}
    }
  }
	}
}
function restartbackground(){
	background = new Audio("/static/media/background.mp3");
background.addEventListener('ended', function() {
    restartbackground();
}, false);
background.play();
}
