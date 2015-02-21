var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/commander',conn_options);
socket.on("update",function(json){
	alert('hi');
});