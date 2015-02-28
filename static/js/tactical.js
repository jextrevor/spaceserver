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
  if(key == "ships"){
    	doships(json[key]);
    }
  if(key == "target"){
  	document.getElementById("targeted").innerHTML = json[key];
  }
  if(key == "shields"){
  	if(json[key] == true){
  		document.getElementById("shields").innerHTML ="Up";
  	}
  	else{
  		document.getElementById("shields").innerHTML ="Down";
  	}
  }
}
}
function doships(json){
document.getElementById("radarlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarlist").innerHTML += "<option>"+key+"</option>";
  }
}
}
function shieldup(){
	emit('update',{'shields':true})
}
function shielddown(){
	emit('update',{'shields':false})
}
function target(){
	emit('update',{'target':document.getElementById("radarlist").value})
}
function cleartarget(){
	emit('update',{'target':""})
}
function showtarget(){
document.getElementById("targetpage").style.display = "initial";
document.getElementById("weaponpage").style.display = "none";
document.getElementById("securitypage").style.display = "none";
document.getElementById("targettab").className = "active";
document.getElementById("weapontab").className = "";
document.getElementById("securitytab").className = "";
}
function showweapon(){
document.getElementById("targetpage").style.display = "none";
document.getElementById("weaponpage").style.display = "initial";
document.getElementById("securitypage").style.display = "none";
document.getElementById("targettab").className = "";
document.getElementById("weapontab").className = "active";
document.getElementById("securitytab").className = "";
}
function showsecurity(){
document.getElementById("targetpage").style.display = "none";
document.getElementById("weaponpage").style.display = "none";
document.getElementById("securitypage").style.display = "initial";
document.getElementById("targettab").className = "";
document.getElementById("weapontab").className = "";
document.getElementById("securitytab").className = "active";
}
