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
function handleaddship(e){
  if(e.keyCode === 13){
            addship();
        }

}
function addship(){
  if(data.hasOwnProperty('ships')){
  newjson = data['ships'];
}
else{
  newjson = {};
}
  newjson[document.getElementById("addship").value] = {'x':document.getElementById("shipx").value,'y':document.getElementById("shipy").value,'z':document.getElementById("shipz").value,'info':document.getElementById("shipinfo").value};
  emit("update",{'ships':newjson});
}
function doships(json){
document.getElementById("radarlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarlist").innerHTML += "<span onclick='removeship(\""+key+"\")'>"+key+":</span><input type='text' value='"+json[key].x+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"x\")' /><input type='text' value='"+json[key].y+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"y\")' /><input type='text' value='"+json[key].z+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"z\")' />"+json[key]['info']+"<br />";
  }
}
}
function changeship(object,ship,property){
  newjson = data['ships'];
  newjson[ship][property] = object.value;
emit("update",{'ships':newjson});
}
function removeship(key){
  newjson = data['ships'];
  delete newjson[key];
  emit("update",{'ships':newjson});
}
function handleaddmap(e){
  if(e.keyCode === 13){
            addmap();
        }

}
function addmap(){
  if(data.hasOwnProperty('maps')){
  newjson = data['maps'];
}
else{
  newjson = {};
}
  newjson[document.getElementById("addmap").value] = {'x':document.getElementById("mapx").value,'y':document.getElementById("mapy").value,'z':document.getElementById("mapz").value,'info':document.getElementById("mapinfo").value};
  emit("update",{'maps':newjson});
}
function domaps(json){
document.getElementById("maplist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("maplist").innerHTML += "<span onclick='removemap(\""+key+"\")'>"+key+":</span><input type='text' value='"+json[key].x+"' style='width:30px' onchange='changemap(this,\""+key+"\",\"x\")' /><input type='text' value='"+json[key].y+"' style='width:30px' onchange='changemap(this,\""+key+"\",\"y\")' /><input type='text' value='"+json[key].z+"' style='width:30px' onchange='changemap(this,\""+key+"\",\"z\")' />"+json[key]['info']+"<br />";
  }
}
}
function changemap(object,map,property){
  newjson = data['maps'];
  newjson[map][property] = object.value;
emit("update",{'maps':newjson});
}
function removemap(key){
  newjson = data['maps'];
  delete newjson[key];
  emit("update",{'maps':newjson});
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
    if(key == "ships"){
      doships(json[key]);
    }
    if(key == "maps"){
      domaps(json[key]);
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
