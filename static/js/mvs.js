var conn_options = {
  'sync disconnect on unload':true
};
data = {}
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/mvs',conn_options);
socket.on("update",function(json){
	for (var key in json) {
  if (json.hasOwnProperty(key)) {
    data[key] = json[key];
  }
}
});
var peer1 = new Peer("mvs",{key: 'x7imbejnpg2pgb9'});
var peer2 = new Peer("hailing",{key: 'x7imbejnpg2pgb9'});