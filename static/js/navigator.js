var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/navigator',conn_options);
socket.on("update",function(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
  }
}
});
var peer = new Peer("navigator",{key: 'x7imbejnpg2pgb9'});