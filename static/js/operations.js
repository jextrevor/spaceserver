var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
lock = false;
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/operations',conn_options);
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
    if(key == "ships"){
    	doships(json[key]);
    }
    if(key == "objects"){
        doobjects(json[key]);
    }
    if(key == "probing"){
    	if(json[key] == ""){
    		document.getElementById("probing").innerHTML = "";
    	}
    	else{
    	document.getElementById("probing").innerHTML = "Currently Probing: "+json[key]+" <button class='btn btn-warning' onclick=\"probe('')\">Cancel</button>";
    }
}
    if(key == "probe"){
    	document.getElementById("probe").innerHTML = json[key];
    }
    if(key == "analysis"){
    	if(json[key] == ""){
    		document.getElementById("analysing").innerHTML = "";
    		document.getElementById("analysis").innerHTML = "";
    	}
    	else if(json[key] == "Probing"){
    		document.getElementById("analysing").innerHTML = "Analysing Probing Data";
    		document.getElementById("analysis").innerHTML = "";
    	}
    	else if(json[key] == "Sensors"){
    		document.getElementById("analysing").innerHTML = "Analysing Sensors Data";
    		document.getElementById("analysis").innerHTML = "";
    	}
    	else{
    		document.getElementById("analysing").innerHTML = "";
    		document.getElementById("analysis").innerHTML = json[key];
    	}
    }
    if(key == "scanning"){
    	if(json[key] == ""){
    		document.getElementById("scanning").innerHTML = "";
    	}
    	else{
    	document.getElementById("scanning").innerHTML = "Currently Scanning: "+json[key]+" <button class='btn btn-warning' onclick=\"emit('update',{'scanning':''});sound('buttonshort.wav');\">Cancel</button>";
    }
    }
    if(key == "scan"){
    	document.getElementById("scan").innerHTML = json[key];
    }
  }
}
}
function doships(json){
document.getElementById("radarlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarlist").innerHTML += "<a class='list-group-item' onclick='probe(\""+key+"\");sound('processing.mp3');'>"+key+"</a>";
  }
}
}
function beam(){
    newjson = data['objects'];
  newjson[document.getElementById("transports").value].place = document.getElementById("destination").value;
emit("update",{'objects':newjson});
}
function unlock(){
lock = false;
document.getElementById("tsbutton").disabled = true;
}
function dolock(){
    if(data.objects[document.getElementById("outsides").value].lockable == true){
        lock = true;
        emit('broadcast',{'sound':'info.wav'});
        document.getElementById("tsbutton").disabled = false;
    }
}
function receive(){
    newjson = data['objects'];
  newjson[document.getElementById("outsides").value].place = "";
emit("update",{'objects':newjson});
}
function doobjects(json){
    unlock();
    document.getElementById("transports").innerHTML = "";
    document.getElementById("outsides").innerHTML = "";
  for(var key in json){
  if (json.hasOwnProperty(key)) {
    if(json[key].place == ""){
    document.getElementById("transports").innerHTML += "<option>"+key+"</option>";
}
else{
    document.getElementById("outsides").innerHTML += "<option>"+key+"</option>";
}
  }
}  
}
function probe(key){
	emit('update',{'probing':key});
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