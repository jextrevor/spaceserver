var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
var peer = new Peer('mvs', {key: 'x7imbejnpg2pgb9'}); 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function(call) {
  navigator.getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
        console.log('yay');
      $('#audiooutput').prop('src', URL.createObjectURL(remoteStream));
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});
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
    if(key == "muted"){
        $("#audiooutput").prop('muted',json[key]);
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
