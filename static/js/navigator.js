var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/navigator',conn_options);
socket.on("update",function(json){
	update(json);
}
});
function emit(key,json){
	socket.emit(key,json);
}
function update(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
    if(key == "x"){
    	document.getElementById("x").innerHTML = json[key];
    }
    if(key == "y"){
    	document.getElementById("y").innerHTML = json[key];
    }
    if(key == "z"){
    	document.getElementById("z").innerHTML = json[key];
    }
  }
}
