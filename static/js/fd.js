var conn_options = {
  'sync disconnect on unload':true,
  'transports': ['xhr-polling','htmlfile','jsonp-polling','websocket','flashsocket']
};
data = {};
selected = 0;
deleter = 0;
var peer = new Peer({key: 'x7imbejnpg2pgb9'}); 
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/fd',conn_options);
socket.on("update",function(json){
	update(json);

});
eta = setInterval(function(){if(data.hasOwnProperty('eta')){if(data['eta']>0){emit('update',{'eta':data['eta']-1})}}},1000);
function emit(key,json){
socket.emit(key,json);
}
function call(id){
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia({audio:true}, function(stream) {
  var calle = peer.call(id, stream);
  calle.on('stream', function(remoteStream) {
    $('#'+id).prop('src', URL.createObjectURL(remoteStream));// Show stream in some video/canvas element.
  });
}, function(err) {
  console.log('Failed to get local stream' ,err);
});
}
function mutecommander(){
  $("#commander").prop('muted',true);
}
function unmutecommander(){
$("#commander").prop('muted',false);
}
function reset(){
	emit("reset",{});
}
function registerr(event){
  console.log("hi");
  if(selected == 0){
    if(data.hasOwnProperty('radars')){
  newjson = data['radars'];
}
else{
  newjson = {};
}
var x = event.pageX - $('#radarcanvas').offset().left;
var y = event.pageY - $('#radarcanvas').offset().top;
  if(document.getElementById("radarname").value != "" && document.getElementById("radarname").value.indexOf(' ') == -1 ){
  newjson[document.getElementById("radarname").value] = {'x':x,'y':y};}
  emit("update",{'radars':newjson});
  }
  else if(deleter == 1){
if(data.hasOwnProperty('radars')){
  newjson = data['radars'];
}
else{
  newjson = {};
}

  delete newjson[selected];
  emit("update",{'radars':newjson});
  }
  else{
if(data.hasOwnProperty('radars')){
  newjson = data['radars'];
}
else{
  newjson = {};
}
var x = event.pageX - $('#radarcanvas').offset().left;
var y = event.pageY - $('#radarcanvas').offset().top;
  newjson[selected] = {'x':x,'y':y};
  emit("update",{'radars':newjson});
  }
}
$(document).ready(function(){
  $("#radarcanvas").click(function(evt){console.log("hi");registerr(evt)});
})


function selectit(e,key){
  e.stopPropagation();
  selected = key;
}

function startadd(){
  selected = 0;
}
function startdel(){
  
  deleter = 1;
  registerr(undefined);
  deleter = 0;
  selected = 1;
}

function doradars(json){
document.getElementById("radarcanvas").innerHTML = '<rect width="100" height="100" style="fill:transparent;stroke-width:1;stroke:rgb(0,255,0);fill-opacity:0" /><circle cx="50" cy="50" r="50" stroke="green" stroke-width="1" fill="red" /><circle cx="50" cy="50" r="30" stroke="green" stroke-width="1" fill="yellow" /><circle cx="50" cy="50" r="10" stroke="green" stroke-width="1" fill="blue" /><line x1="50" y1="0" x2="50" y2="100" style="stroke:rgb(0,255,0);stroke-width:1" /><line x1="0" y1="50" x2="100" y2="50" style="stroke:rgb(0,255,0);stroke-width:1" />';
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarcanvas").innerHTML += "<circle id='"+key+"' onclick='selectit(event,\""+key+"\")' cx='"+json[key].x+"' cy='"+json[key].y+"' r='5' stroke='green' fill='green' />"
    $( "#"+key ).click(function(event) {
  selectit(event,key);
});
  }
}
}
function handleaddship(e){
  if(e.keyCode === 13){
            addship();
            emit('broadcast',{'sound':'info.wav'});
        }

}
function releasethruster(thruster){
	thruster = thruster+"thruster";
	json = {}
	json[thruster] = false;
	emit("update",json);
}
function handlespeak(e){
  if(e.keyCode === 13){
            emit('broadcast',{'voice':document.getElementById("speak").value});
        }

}
function addship(){
  if(data.hasOwnProperty('ships')){
  newjson = data['ships'];
}
else{
  newjson = {};
}
  newjson[document.getElementById("addship").value] = {'x':document.getElementById("shipx").value,'y':document.getElementById("shipy").value,'z':document.getElementById("shipz").value,'info':document.getElementById("shipinfo").value,'shields':document.getElementById("shipshields").value,'hull':document.getElementById("shiphull").value,'engines':document.getElementById("shipengines").value,'systems':document.getElementById("shipsystems").value};
  emit("update",{'ships':newjson});
}
function doships(json){
document.getElementById("radarlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("radarlist").innerHTML += "<span onclick='removeship(\""+key+"\")'>"+key+":</span><input type='text' value='"+json[key].x+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"x\")' /><input type='text' value='"+json[key].y+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"y\")' /><input type='text' value='"+json[key].z+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"z\")' /><input type='text' value='"+json[key].shields+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"shields\")' /><input type='text' value='"+json[key].hull+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"hull\")' /><input type='text' value='"+json[key].engines+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"engines\")' /><input type='text' value='"+json[key].systems+"' style='width:30px' onchange='changeship(this,\""+key+"\",\"systems\")' />"+json[key]['info']+"<br />";
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
function doobjects(json){
document.getElementById("objectlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    var bg = "transparent";
    if(json[key].lockable == true){
      bg = "#00FF00";
    }
    document.getElementById("objectlist").innerHTML += "<span onclick='removeobject(\""+key+"\")'>"+key+":</span><input type='text' value='"+json[key].place+"' onchange='changeobject(this,\""+key+"\",\"place\")' /><span style='background-color:"+bg+";' onmousedown='changecheck(this,\""+key+"\",\"lockable\")'>Lockable</span><br />";
  }
}
}
function addobject(){
  if(data.hasOwnProperty('objects')){
  newjson = data['objects'];
}
else{
  newjson = {};
}
  newjson[document.getElementById("addobject").value] = {'place':document.getElementById("objectplace").value,'lockable':document.getElementById("objectlock").checked};
  emit("update",{'objects':newjson});
}
function changeobject(object,ship,property){
  newjson = data['objects'];
  newjson[ship][property] = object.value;
emit("update",{'objects':newjson});
}
function changecheck(object,ship,property){
  newjson = data['objects'];
  var checked = false;
  if(object.style['background-color'] == "transparent"){
      checked = true;
    }
  newjson[ship][property] = checked;
  emit("update",{'objects':newjson});
}
function removeobject(key){
  newjson = data['objects'];
  delete newjson[key];
  emit("update",{'objects':newjson});
}
function handleaddobject(e){
  if(e.keyCode === 13){
            addobject();
        }

}
function handleaddsystem(e){
  if(e.keyCode === 13){
            addsystem();
        }

}
function addsystem(){
  if(data.hasOwnProperty('systems')){
  newjson = data['systems'];
}
else{
  newjson = {};
}
  newjson[document.getElementById("addsystem").value] = {'heat':parseInt(document.getElementById("systemheat").value),'damage':parseInt(document.getElementById("systemdamage").value),'power':parseInt(document.getElementById("systempower").value)};
  emit("update",{'systems':newjson});
}
function dosystems(json){
document.getElementById("systemlist").innerHTML = "";
for(var key in json){
  if (json.hasOwnProperty(key)) {
    document.getElementById("systemlist").innerHTML += "<span onclick='removesystem(\""+key+"\")'>"+key+":</span><input type='text' value='"+json[key].heat+"' style='width:30px' onchange='changesystem(this,\""+key+"\",\"heat\")' /><input type='text' value='"+json[key].damage+"' style='width:30px' onchange='changesystem(this,\""+key+"\",\"damage\")' /><input type='text' value='"+json[key].power+"' style='width:30px' onchange='changesystem(this,\""+key+"\",\"power\")' /><br />";
  }
}
}
function changesystem(object,system,property){
  newjson = data['systems'];
  newjson[system][property] = parseInt(object.value);
emit("update",{'systems':newjson});
}
function removesystem(key){
  newjson = data['systems'];
  delete newjson[key];
  emit("update",{'systems':newjson});
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
    if(key == "alert"){
      document.getElementById("alert").value = json[key];
    }
    if(key == "probing"){
      document.getElementById("probing").value = json[key];
    }
    if(key == "scanning"){
      document.getElementById("scanning").value = json[key];
    }
    if(key == "scan"){
      document.getElementById("scan").value = json[key];
    }
    if(key == "diagnosing"){
      document.getElementById("diagnosing").value = json[key];
    }
    if(key == "diagnostic"){
      document.getElementById("diagnostic").value = json[key];
    }
    if(key == "commanding"){
      document.getElementById("commanding").value = json[key];
    }
    if(key == "command"){
      document.getElementById("command").value = json[key];
    }
    if(key == "analysis"){
      document.getElementById("analysis").value = json[key];
    }
    if(key == "probe"){
      document.getElementById("probe").value = json[key];
    }
    if(key == "y"){
    	document.getElementById("y").value = json[key];
    }
    if(key == "zzzzzzfixing"){
      document.getElementById("zzzzzzfixing").value = json[key];
    }
    if(key == "focus"){
      document.getElementById("focus").value = json[key];
    }
    if(key == "z"){
    	document.getElementById("z").value = json[key];
    }
    if(key == "warp"){
      document.getElementById("warp").value = json[key];
    }
    if(key == "target"){
      document.getElementById("target").value = json[key];
    }
    if(key == "shields"){
      document.getElementById("shields").checked = json[key];
    }
    if(key == "warpbroken"){
          document.getElementById("warpbroken").checked = json[key];
    }
    if(key == "impulsebroken"){
              document.getElementById("impulsebroken").checked = json[key];
    }
    if(key == "thrusterbroken"){
              document.getElementById("thrusterbroken").checked = json[key];
    }
    if(key == "coursebroken"){
              document.getElementById("coursebroken").checked = json[key];
    }
    if(key == "mapbroken"){
              document.getElementById("mapbroken").checked = json[key];
    }
    if(key == "targetbroken"){
              document.getElementById("targetbroken").checked = json[key];
    }
    if(key == "shieldbroken"){
              document.getElementById("shieldbroken").checked = json[key];
    }
    if(key == "phaserbroken"){
              document.getElementById("phaserbroken").checked = json[key];
    }
    if(key == "torpedobroken"){
              document.getElementById("torpedobroken").checked = json[key];
    }
    if(key == "hailbroken"){
              document.getElementById("hailbroken").checked = json[key];
    }
    if(key == "probebroken"){
              document.getElementById("probebroken").checked = json[key];
    }
    if(key == "scanbroken"){
              document.getElementById("scanbroken").checked = json[key];
    }
    if(key == "analysisbroken"){
              document.getElementById("analysisbroken").checked = json[key];
    }
    if(key == "transporterbroken"){
              document.getElementById("transporterbroken").checked = json[key];
    }
    if(key == "powerbroken"){
              document.getElementById("powerbroken").checked = json[key];
    }
    if(key == "heatbroken"){
              document.getElementById("heatbroken").checked = json[key];
    }
    if(key == "diagnosticbroken"){
              document.getElementById("diagnosticbroken").checked = json[key];
    }
    if(key == "commandbroken"){
              document.getElementById("commandbroken").checked = json[key];
    }
    if(key == "eta"){
    	document.getElementById("etatext").innerHTML = json[key];
    }
    if(key == "impulse"){
      document.getElementById("impulse").value = json[key];
    }
    if(key == "securityalert"){
      document.getElementById("securityalert").value = json[key];
    }
    if(key == "hailing"){
    	document.getElementById("hailing").value = json[key];
    }
    if(key == "hailed"){
    	document.getElementById("hailed").value = json[key];
    }
    if(key == "torpedoes"){
      document.getElementById("torpedoes").value = json[key];
    }
    if(key == "team1"){
    	document.getElementById("team1").value = json[key];
    }
    if(key == "team2"){
    	document.getElementById("team2").value = json[key];
    }
    if(key == "team3"){
    	document.getElementById("team3").value = json[key];
    }
    if(key == "team4"){
    	document.getElementById("team4").value = json[key];
    }
    if(key == "mapping"){
        	document.getElementById("mapping").value = json[key];
    }
    if(key == "map"){
        	document.getElementById("map").value = json[key];
    }
    if(key == "coolant"){
      document.getElementById("coolant").value = json[key];
    }
    if(key == "maxpower"){
      document.getElementById("maxpower").value = json[key];
    }
    if(key == "ships"){
      doships(json[key]);
    }
    if(key == "radars"){
      doradars(json[key]);
    }
    if(key == "systems"){
      dosystems(json[key]);
    }
    if(key == "maps"){
      domaps(json[key]);
    }
    if(key == "objects"){
      doobjects(json[key]);
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
