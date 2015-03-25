var conn_options = {
'sync disconnect on unload':true,
'transports':['flashsocket','htmlfile','xhr-polling','jsonp-polling','websocket']
};
data = {}
var peer = new Peer('commander', {key: 'x7imbejnpg2pgb9'}); 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
peer.on('call', function(call) {
  navigator.getUserMedia({video: false, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
});
var socket = io.connect('http://'+window.location.hostname+':'+window.location.port+'/commander',conn_options);
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
    if(key == "missiondata"){
    	document.getElementById("missiondata").innerHTML = markdown.toHTML(json[key]);
    }
    
        if(key == "commanderlockdown"){
                    	if(json[key] == true){
                	  		var nodes = document.body.childNodes;
            			for(var i=0; i<nodes.length; i++) {
            			    if(nodes[i].nodeName != "#text"){
				                			         nodes[i].style.display = "none";
            			     }
            }
                	  	}
                	  	else{
                	  		var nodes = document.body.childNodes;
            						for(var i=0; i<nodes.length; i++) {
            						    if(nodes[i].nodeName != "#text"){
							                			         nodes[i].style.display = "initial";
            			     }
            }
                  	}
    }
    if(key == "alert"){
    	if(json[key] == "0"){
		document.getElementById("greenalertbutton").style['box-shadow'] = "0 0 30px #00FF00";
		document.getElementById("yellowalertbutton").style['box-shadow'] = "none";
		document.getElementById("redalertbutton").style['box-shadow'] = "none";
	}
	if(json[key] == "1"){
		document.getElementById("greenalertbutton").style['box-shadow'] = "none";
		document.getElementById("yellowalertbutton").style['box-shadow'] = "0 0 30px #FFFF00";
		document.getElementById("redalertbutton").style['box-shadow'] = "none";
	}
	if(json[key] == "2"){
		document.getElementById("greenalertbutton").style['box-shadow'] = "none";
		document.getElementById("yellowalertbutton").style['box-shadow'] = "none";
		document.getElementById("redalertbutton").style['box-shadow'] = "0 0 30px #FF0000";
	}
    }
  }
}
}
