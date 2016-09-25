var conn_options = {
'sync disconnect on unload':true
};
data = {}
var events;
var socket = io.connect(window.location.href,conn_options);
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
    document.getElementById("powerlist").innerHTML += key+' <button class="btn btn-warning btn-xs" onclick="decrease(\''+key+'\');sound(\'buttonshort.wav\');" >Decrease Power</button><button class="btn btn-warning btn-xs"  onclick="increase(\''+key+'\');sound(\'buttonshort.wav\');">Increase Power</button><div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" id="'+key+'power" style="width: '+json[key].power+'%;"></div></div>';
    document.getElementById("heatlist").innerHTML += key+'<div class="progress" onclick="cool(\''+key+'\');sound(\'buttonshort.wav\');"><div class="progress-bar progress-bar-danger" role="progressbar" id="'+key+'heat" style="width: '+json[key].heat+'%;"></div></div>';
    document.getElementById("repairlist").innerHTML += key+'<div class="progress" onclick="fix(\''+key+'\');sound(\'button.wav\');"><div class="progress-bar progress-bar-info" role="progressbar" id="'+key+'damage" style="width: '+json[key].damage+'%;"></div></div>';
  }
}

   		for(var keyd in json){
   			if(json.hasOwnProperty(keyd)){
   				document.getElementById(keyd+"damage").className = "progress-bar progress-bar-info";
   			}
   		}
    	if(!!document.getElementById(data.zzzzzzfixing+"damage")){
    	document.getElementById(data.zzzzzzfixing+"damage").className = "progress-bar progress-bar-info progress-bar-striped active";
    }
}
function decrease(keyd){
	if(checkIt('power')){emit('broadcast',{'sound':'error.mp3'});return false;}
	newjson = data['systems'];
	newjson[keyd].power -= 10;
	if(newjson[keyd].power < 0){
		newjson[keyd].power = 0;
	}
	totalpower = 0;
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			totalpower += newjson[key].power
		}
	}
	interval = (data.maxpower - totalpower) / (count(newjson)-1);
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			if(key != keyd){
				newjson[key].power += interval;
			}
		}
	}
	emit("update",{'systems':newjson});
	emit('broadcast',{'sound':'info.wav'});
}
function increase(keyd){
	if(checkIt('power')){emit('broadcast',{'sound':'error.mp3'});return false;}
	newjson = data['systems'];
	oldpower = newjson[keyd].power;
	newjson[keyd].power += 10;
	if(newjson[keyd].power > 100){
		newjson[keyd].power = 100;
	}
	totalpower = 0;
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			totalpower += newjson[key].power
		}
	}
	interval = (data.maxpower - totalpower) / (count(newjson)-1);
	ready = true;
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			if(key != keyd){
				if(newjson[key].power < -interval){
					ready = false;
				}
			}
		}
	}
	if(ready == true){
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			if(key != keyd){
				newjson[key].power += interval;
			}
		}
	}
}
else{
	newjson[keyd].power = oldpower;
	increasee(keyd,9);
}
	emit("update",{'systems':newjson});
	emit('broadcast',{'sound':'info.wav'});
}
function increasee(keyd,magnitude){
	newjson = data['systems'];
	oldpower = newjson[keyd].power;
	newjson[keyd].power += magnitude;
	if(newjson[keyd].power > 100){
		newjson[keyd].power = 100;
	}
	totalpower = 0;
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			totalpower += newjson[key].power
		}
	}
	interval = (data.maxpower - totalpower) / (count(newjson)-1);
	ready = true;
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			if(key != keyd){
				if(newjson[key].power < -interval){
					ready = false;
				}
			}
		}
	}
	if(ready == true){
	for(var key in newjson){
		if(newjson.hasOwnProperty(key)){
			if(key != keyd){
				newjson[key].power += interval;
			}
		}
	}
}
else{
	newjson[keyd].power = oldpower;
	if(magnitude > 0){
	increasee(keyd,magnitude - 1);
}
}
	emit("update",{'systems':newjson});
}
function cool(key){
	if(checkIt('heat')){emit('broadcast',{'sound':'error.mp3'});return false;}
	newjson = data['systems'];
	if(data.coolant > 10){
	if(newjson[key].heat >= 10){
		newjson[key].heat -= 10;
		data.coolant -= 10;
	}
	else{
		data.coolant -= newjson[key].heat;
		newjson[key].heat = 0;
	}
}
	emit('update',{'systems':newjson,'coolant':data.coolant});
	emit('broadcast',{'sound':'info.wav'});
}
function fix(key){
	emit('update',{'zzzzzzfixing':key});
	emit('broadcast',{'sound':'processing.mp3'});
}
function count(obj) {
   var count=0;
   for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
         ++count;
      }
   }
   return count;
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
    
        if(key == "engineerlockdown"){
                    	if(json[key] == true){
                	  		document.getElementById("bodycontainer").style.display = "none";
                	  	}
                	  	else{
                	  		document.getElementById("bodycontainer").style.display = "initial";
                  	}
    }
    if(key == "zzzzzzfixing"){
    	if (typeof data.systems != "undefined") {
   		for(var keyd in data.systems){
   			if(data.systems.hasOwnProperty(keyd)){
   				document.getElementById(keyd+"damage").className = "progress-bar progress-bar-info";
   			}
   		}
		}
    	if(!!document.getElementById(json[key]+"damage")){
    	document.getElementById(json[key]+"damage").className = "progress-bar progress-bar-info progress-bar-striped active";
    }
    }
    if(key == "diagnosing"){
    	if(json[key] == ""){
    		document.getElementById("diagnosing").innerHTML = "";
    	}
    	else{
    	document.getElementById("diagnosing").innerHTML = "Currently Diagnosing: "+json[key]+" <button class='btn btn-warning' onclick=\"emit('update',{'diagnosing':''});sound('buttonshort.wav');\">Cancel</button>";
    }
    }
    if(key == "diagnostic"){
    	document.getElementById("diagnostic").innerHTML = json[key];
    }
    if(key == "commanding"){
    	document.getElementById("commanding").value = json[key];
    }
    if(key == "command"){
    	document.getElementById("command").innerHTML = json[key];
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

