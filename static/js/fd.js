var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/fd',conn_options);
socket.on("update",function(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
    if(key == "missiondata"){
    	document.getElementById("missiondata").value = json[key];
    }
  }
}
});
var peer1 = new Peer({key: 'x7imbejnpg2pgb9'});
var peer2 = new Peer({key: 'x7imbejnpg2pgb9'});
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
function call(peerid){
if(window.existingcall){
window.existingcall.close();
}
navigator.getUserMedia({audio: false, video: false}, function(stream){
// Set your video displays
//document.getElementById("yourvideo").src = URL.createObjectURL(stream);
window.localStream = stream;
});
var call = peer.call(peerid, window.localStream);
call.on('stream', function(remoteStream) {
      document.getElementById("theirvideo").src = URL.createObjectURL(stream);
    });
window.existingcall = call;
}
function hail(peerid){
if(window.existinghail){
window.existinghail.close();
}
navigator.getUserMedia({audio: data['fdaudio'], video: data['fdvideo']}, function(stream){
// Set your video displays
document.getElementById("yourvideo").src = URL.createObjectURL(stream);
window.hailStream = stream;
});
var call = peer.call(peerid, window.hailStream);
window.existinghail = call;
}
