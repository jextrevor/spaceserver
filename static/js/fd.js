var conn_options = {
  'sync disconnect on unload':true,
  'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}

var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/fd',conn_options);
socket.on("update",function(json){
	update(json);

});
eta = setInterval(function(){if(data.hasOwnProperty('eta')){if(data['eta']>0){emit('update',{'eta':data['eta']-1})}}},1000);
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
    if(key == "warp"){
      document.getElementById("warp").value = json[key];
    }
    if(key == "eta"){
    	document.getElementById("etatext").innerHTML = json[key];
    }
    if(key == "impulse"){
      document.getElementById("impulse").value = json[key];
    }
    if(key == "forwardthruster"){
      if(json[key] == true){
        document.getElementById("forwardthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("forwardthruster").style['background-color'] = "transparent";
      }
    }
    if(key == "backwardthruster"){
      if(json[key] == true){
        document.getElementById("backwardthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("backwardthruster").style['background-color'] = "transparent";
      }
    }
    if(key == "leftthruster"){
      if(json[key] == true){
        document.getElementById("leftthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("leftthruster").style['background-color'] = "transparent";
      }
    }
    if(key == "rightthruster"){
      if(json[key] == true){
        document.getElementById("rightthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("rightthruster").style['background-color'] = "transparent";
      }
    }
    if(key == "upthruster"){
      if(json[key] == true){
        document.getElementById("upthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("upthruster").style['background-color'] = "transparent";
      }
    }
    if(key == "downthruster"){
      if(json[key] == true){
        document.getElementById("downthruster").style['background-color'] = "#00FF00";
      }
      else{
        document.getElementById("downthruster").style['background-color'] = "transparent";
      }
    }
  }
}
}
