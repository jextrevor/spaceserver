var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
var events;
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/engineer',conn_options);
socket.on("update",function(json){
	update(json);

});
function emit(key,json){
	socket.emit(key,json);
}
function dosystems(json){
document.getElementById("repairlist").innerHTML = "";
document.getElementById("powerlist").innerHTML = "";
document.getElementById("heatlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("powerlist").innerHTML += key+' <button class="btn btn-info btn-xs" onclick="decrease(\''+key+'\')" >Decrease Power</button><button class="btn btn-info btn-xs"  onclick="increase(\''+key+'\')">Increase Power</button><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" id="'+key+'power" style="width: '+json[key].power+'%;"></div></div>';
    document.getElementById("heatlist").innerHTML += key+'<div class="progress" onclick="cool(\''+key+'\')"><div class="progress-bar progress-bar-info" role="progressbar" id="'+key+'heat" style="width: '+json[key].heat+'%;"></div></div>';
    document.getElementById("repairlist").innerHTML += key+'<div class="progress" onclick="fix(\''+key+'\')"><div class="progress-bar progress-bar-info" role="progressbar" id="'+key+'damage" style="width: '+json[key].damage+'%;"></div></div>';
  }
}
}
function decrease(key){

}
function increase(key){

}
function cool(key){

}
function fix(key){
	
}
function update(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
    if(key == "coolant"){
    	document.getElementById("coolant").innerHTML = json[key];
    }
    if(key == "systems"){
    	dosystems(json[key]);
    }
  }
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

