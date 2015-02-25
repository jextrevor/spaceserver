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
    	document.getElementById("cx").innerHTML = json[key];
    }
    if(key == "y"){
    	document.getElementById("cy").innerHTML = json[key];
    }
    if(key == "z"){
    	document.getElementById("cz").innerHTML = json[key];
    }
  }
}
function setcourse(){
	document.getElementById("xerror").className = "";
	document.getElementById("yerror").className = "";
	document.getElementById("zerror").className = "";
	x = parseFloat(document.getElementById("x").value)
	y = parseFloat(document.getElementById("y").value)
	z = parseFloat(document.getElementById("z").value)
	if(isNaN(x)){
		document.getElementById("xerror").className = "has-error";
	}
	else if(isNaN(y)){
		document.getElementById("yerror").className = "has-error";
	}
	else if(isNaN(z)){
		document.getElementById("zerror").className = "has-error";
	}
	else{
		emit("update",{"x":x,"y":y,"z":z});
	}
}
function showengines(){
	document.getElementById("enginespage").style.display = "initial";
	document.getElementById("radarpage").style.display = "none";
	document.getElementById("settingspage").style.display = "none";
	document.getElementById("enginestab").className = "active";
	document.getElementById("radartab").className = "";
	document.getElementById("settingstab").className = "";
}
function showradar(){
	document.getElementById("enginespage").style.display = "none";
	document.getElementById("radarpage").style.display = "initial";
	document.getElementById("settingspage").style.display = "none";
	document.getElementById("enginestab").className = "";
	document.getElementById("radartab").className = "active";
	document.getElementById("settingstab").className = "";
}
function showsettings(){
	document.getElementById("enginespage").style.display = "none";
	document.getElementById("radarpage").style.display = "none";
	document.getElementById("settingspage").style.display = "initial";
	document.getElementById("enginestab").className = "";
	document.getElementById("radartab").className = "";
	document.getElementById("settingstab").className = "active";
}
