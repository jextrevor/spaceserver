var conn_options = {
  'sync disconnect on unload':true,
  'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling']
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/fd',conn_options);
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
    if(key == "missiondata"){
    	document.getElementById("missiondata").value = json[key];
    }
    if(key == "x"){
    	document.getElementById("x").value = json[key];
    }
    if(key == "y"){
    	document.getElementById("y").value = json[key];
    }
    if(key == "z"){
    	document.getElementById("z").value = json[key];
    }
  }
}
}
