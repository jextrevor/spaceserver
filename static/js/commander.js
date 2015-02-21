var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/commander',conn_options);
socket.on("update",function(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
    if(key == "missiondata"){
    	document.getElementById("missiondata").innerHTML = markdown.toHTML(json[key]);
    }
  }
}
});