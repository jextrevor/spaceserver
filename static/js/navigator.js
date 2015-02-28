var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {};
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/navigator',conn_options);
socket.on("update",function(json){
	update(json);

});
function emit(key,json){
	socket.emit(key,json);
}
function search(){
document.getElementById("placeinfo").innerHTML = "";
document.getElementById("results").innerHTML = "";
for(var key in data['maps']){
  if (data['maps'].hasOwnProperty(key)) {
    if(key.indexOf(document.getElementById("mapsearch").value) > -1){
    	document.getElementById("results").innerHTML += "<a class=\"list-group-item\" onclick='showsearchinfo(this,\""+key+"\");buttonsound();'>"+key+"</a>";
    }
    }
}
}
function showsearchinfo(obj,json){
for(i = 0; i < document.getElementById("results").children.length; i++){
//object.removeAttribute("class")
document.getElementById("results").children[i].className = "list-group-item";
}
obj.className = "list-group-item active"
//alert(data);
//json = JSON.parse(data);
//alert(json['message']);
document.getElementById("placeinfo").innerHTML = data['maps'][json]['info'];
}
function doships(json){
document.getElementById("radarlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarlist").innerHTML += "<div class='well' ><h5>"+key+"</h5>Coordinates- X:"+json[key].x+", Y:"+json[key].y+", Z:"+json[key].z+"<br/><p>"+json[key]['info']+"</p></div>";
  }
}
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
    if(key == "ships"){
    	doships(json[key]);
    }
    if(key == "eta"){
    	if(!isNaN(json[key])){
    		if(json[key] >= 0){
    	var minutes = Math.floor(json[key] / 60);
    	var seconds = json[key] - minutes * 60;
    	document.getElementById("eta").innerHTML = minutes+" Minutes, "+seconds+" Seconds";
    }
    else{
    	document.getElementById("eta").innerHTML = "";
    }
    }
    else{
    	document.getElementById("eta").innerHTML = "";
    }
    }
    if(key == "impulse"){
    	if(json[key] == '0'){
		document.getElementById("impulse0button").style['box-shadow'] = "0 0 30px #CCCCCC";
		document.getElementById("impulsehalfbutton").style['box-shadow'] = "none";
		document.getElementById("impulsefullbutton").style['box-shadow'] = "none";
	}
	if(json[key] == '0.5'){
		document.getElementById("impulse0button").style['box-shadow'] = "none";
		document.getElementById("impulsehalfbutton").style['box-shadow'] = "0 0 30px #0000FF";
		document.getElementById("impulsefullbutton").style['box-shadow'] = "none";
	}
	if(json[key] == '1'){
		document.getElementById("impulse0button").style['box-shadow'] = "none";
		document.getElementById("impulsehalfbutton").style['box-shadow'] = "none";
		document.getElementById("impulsefullbutton").style['box-shadow'] = "0 0 30px #00FF00";
	}
    }
    if(key == "warp"){
    	if(json[key] == '0'){
		document.getElementById("warp0button").style['box-shadow'] = "0 0 30px #CCCCCC";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '1'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "0 0 30px #00FF00";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '2'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "0 0 30px #00FF00";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '3'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "0 0 30px #00FF00";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '4'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "0 0 30px #0000FF";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '5'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "0 0 30px #0000FF";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '6'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "0 0 30px #0000FF";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '7'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "0 0 30px #FFFF00";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '8'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "0 0 30px #FFFF00";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '9'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "0 0 30px #FF0000";
		document.getElementById("warp99button").style['box-shadow'] = "none";
	}
	if(json[key] == '9.9'){
		document.getElementById("warp0button").style['box-shadow'] = "none";
		document.getElementById("warp1button").style['box-shadow'] = "none";
		document.getElementById("warp2button").style['box-shadow'] = "none";
		document.getElementById("warp3button").style['box-shadow'] = "none";
		document.getElementById("warp4button").style['box-shadow'] = "none";
		document.getElementById("warp5button").style['box-shadow'] = "none";
		document.getElementById("warp6button").style['box-shadow'] = "none";
		document.getElementById("warp7button").style['box-shadow'] = "none";
		document.getElementById("warp8button").style['box-shadow'] = "none";
		document.getElementById("warp9button").style['box-shadow'] = "none";
		document.getElementById("warp99button").style['box-shadow'] = "0 0 30px #FF0000";
	}
    }
  }
	}
}
function setwarp(warp){
	emit("update",{"warp":warp});
}
function setimpulse(warp){
	emit("update",{"impulse":warp});
}
function setthruster(thruster){
	thruster = thruster+"thruster";
	json = {}
	json[thruster] = true;
	emit("update",json);
}
function releasethruster(thruster){
	thruster = thruster+"thruster";
	json = {}
	json[thruster] = false;
	emit("update",json);
}
function setcourse(){
	x = document.getElementById("x").value;
	y = document.getElementById("y").value;
	z = document.getElementById("z").value;
	emit("update",{"x":x,"y":y,"z":z});
	document.getElementById("x").value = "";
	document.getElementById("y").value = "";
	document.getElementById("z").value = "";
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
