var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/tactical',conn_options);
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
