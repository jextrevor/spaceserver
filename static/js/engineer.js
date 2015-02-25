var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/engineer',conn_options);
socket.on("update",function(json){
	update(json);

});
function emit(key,json){
	socket.emit(key,json);
}
function update(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
  }
}
}
