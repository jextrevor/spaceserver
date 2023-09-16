var conn_options = {
  "sync disconnect on unload": true,
};
data = {};
var requestID = undefined;
var redalert;
var yellowalert;

var engine = new Audio("/static/media/engine.mp3");
engine.addEventListener(
  "ended",
  function () {
    restartengine();
  },
  false
);
//engine.play();
// var peer = new Peer("mvs", { key: "x7imbejnpg2pgb9" });
// peer.on("error", function (err) {
//   if (err.type == "unavailable-id") {
//     alert(
//       "Someone is already on the Main View Screen - they will be the one that will have video call functionality."
//     );
//     peer.disconnect();
//   }
// });
// navigator.getUserMedia =
//   navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia;
// peer.on("call", function (call) {
//   navigator.getUserMedia(
//     { audio: true },
//     function (stream) {
//       call.answer(stream); // Answer the call with an A/V stream.
//       call.on("stream", function (remoteStream) {
//         console.log("yay");
//         $("#audiooutput").prop("src", URL.createObjectURL(remoteStream));
//         document.getElementById("audiooutput").volume = data.peervolume || 1;
//       });
//     },
//     function (err) {
//       console.log("Failed to get local stream", err);
//     }
//   );
// });
var socket = io.connect(
  window.location.protocol +
    "//" +
    document.domain +
    ":" +
    location.port +
    "/mvs",
  {}
);
socket.on("update", function (json) {
  update(json);
});
socket.on("sound", function (json) {
  var dataa = new Audio("/static/media/" + json);
  dataa.volume = data.soundvolume || 1;
  dataa.play();
});
socket.on("voice", function (json) {
  // var dataa = new Audio(
  //   "https://speechutil.com/convert/ogg?text=%27" +
  //     encodeURIComponent(json) +
  //     "%27"
  // );
  // dataa.volume = data.voicevolume || 1;
  // dataa.play();
});
background = new Audio("/static/media/background.mp3");
background.addEventListener(
  "ended",
  function () {
    restartbackground();
  },
  false
);
background.volume = data.musicvolume || 1;
background.play();
currentmusic = new Audio("/static/media/training.mp3");
currentmusic.volume = data.musicvolume || 1;
currentmusic.addEventListener(
  "ended",
  function () {
    picknewmusic();
  },
  false
);
function picknewmusic() {
  if (data.music.indexOf("training") > -1) {
    if (data.music.indexOf("2.") > -1) {
      emit("update", { music: "training3.mp3" });
    } else if (data.music.indexOf("3.") > -1) {
      emit("update", { music: "training.mp3" });
    } else {
      emit("update", { music: "training2.mp3" });
    }
  } else if (data.music.indexOf("travel") > -1) {
    if (data.music.indexOf("2.") > -1) {
      emit("update", { music: "travel3.mp3" });
    } else if (data.music.indexOf("3.") > -1) {
      emit("update", { music: "travel.mp3" });
    } else {
      emit("update", { music: "travel2.mp3" });
    }
  } else if (data.music.indexOf("intense") > -1) {
    if (data.music.indexOf("2.") > -1) {
      emit("update", { music: "intense3.mp3" });
    } else if (data.music.indexOf("3.") > -1) {
      emit("update", { music: "intense.mp3" });
    } else {
      emit("update", { music: "intense2.mp3" });
    }
  } else if (data.music.indexOf("tense") > -1) {
    if (data.music.indexOf("2.") > -1) {
      emit("update", { music: "tense3.mp3" });
    } else if (data.music.indexOf("3.") > -1) {
      emit("update", { music: "tense.mp3" });
    } else {
      emit("update", { music: "tense2.mp3" });
    }
  } else if (data.music.indexOf("battle") > -1) {
    if (data.music.indexOf("2.") > -1) {
      emit("update", { music: "battle3.mp3" });
    } else if (data.music.indexOf("3.") > -1) {
      emit("update", { music: "battle.mp3" });
    } else {
      emit("update", { music: "battle2.mp3" });
    }
  }
}
function emit(key, json) {
  socket.emit(key, json);
}
function setyellowalert() {
  document.getElementById("yellowalert").style.opacity = 0;
  document.getElementById("redalert").style.opacity = 0;
  $("#yellowalert").animate(
    {
      opacity: 0.15,
    },
    500,
    function () {
      $("#yellowalert").animate(
        {
          opacity: 0.0,
        },
        1000,
        function () {}
      );
    }
  );
}
function setredalert() {
  document.getElementById("yellowalert").style.opacity = 0;
  document.getElementById("redalert").style.opacity = 0;
  var dataa = new Audio("/static/media/alert.wav");
  dataa.volume = data.soundvolume || 1;
  dataa.play();
  $("#redalert").animate(
    {
      opacity: 0.15,
    },
    500,
    function () {
      $("#redalert").animate(
        {
          opacity: 0.0,
        },
        1000,
        function () {}
      );
    }
  );
}

function update(json) {
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      if (key == "warp") {
        if (data[key] == "0" && json[key] != "0") {
          if (data["screen"] == "") {
            showWarp(parseInt(json[key]) / 10);
          }
          var dataa = new Audio("/static/media/warp.mp3");
          dataa.volume = data.soundvolume || 1;
          dataa.play();
          engine = new Audio("/static/media/engine.mp3");
          engine.volume = data.soundvolume || 1;
          engine.addEventListener(
            "ended",
            function () {
              restartengine();
            },
            false
          );
          engine.play();
        } else if (data[key] != "0" && json[key] == "0") {
          if (typeof data["screen"] == "number") {
            showLogo();
          }
          var dataa = new Audio("/static/media/warpout.mp3");
          dataa.volume = data.soundvolume || 1;
          dataa.play();
          if (typeof engine != "undefined") {
            engine.pause();
          }
        }
      }
      if (key == "impulse") {
        if (data[key] == "0" && json[key] != "0") {
          engine = new Audio("/static/media/engine.mp3");
          engine.volume = data.soundvolume || 1;
          engine.addEventListener(
            "ended",
            function () {
              restartengine();
            },
            false
          );
          engine.play();
        } else if (data[key] != "0" && json[key] == "0") {
          if (typeof engine != "undefined") {
            engine.pause();
          }
        }
      }
      if (key == "impulse") {
        if (data[key] == "0" && json[key] != "0") {
          engine = new Audio("/static/media/engine.mp3");
          engine.volume = data.soundvolume || 1;
          engine.addEventListener(
            "ended",
            function () {
              restartengine();
            },
            false
          );
          engine.play();
        } else if (data[key] != "0" && json[key] == "0") {
          if (typeof engine != "undefined") {
            engine.pause();
          }
        }
      }

      if (key == "mvslockdown") {
        if (json[key] == true) {
          document.getElementById("bodycontainer").style.display = "none";
        } else {
          document.getElementById("bodycontainer").style.display = "initial";
        }
      }
      data[key] = json[key];
      if (key == "music") {
        currentmusic.pause();
        if (json[key] != "") {
          currentmusic = new Audio("/static/media/" + json[key]);
          currentmusic.volume = data.musicvolume || 1;
          currentmusic.addEventListener(
            "ended",
            function () {
              picknewmusic();
            },
            false
          );
          currentmusic.play();
        }
      }
      if (key == "muted") {
        $("#audiooutput").prop("muted", json[key]);
      }
      if (key == "peervolume") {
        document.getElementById("audiooutput").volume = json[key] || 1;
      }
      if (key == "soundvolume") {
        engine.volume = data.soundvolume || 1;
      }
      if (key == "musicvolume") {
        background.volume = data.musicvolume || 1;
        currentmusic.volume = data.musicvolume || 1;
      }
      if (key == "alert") {
        if (json[key] == 0) {
          clearInterval(redalert);
          clearInterval(yellowalert);
          document.getElementById("yellowalert").style.opacity = 0;
          document.getElementById("redalert").style.opacity = 0;
        }
        if (json[key] == 1) {
          clearInterval(redalert);
          clearInterval(yellowalert);
          document.getElementById("yellowalert").style.opacity = 0;
          document.getElementById("redalert").style.opacity = 0;
          yellowalert = setInterval(setyellowalert, 3000);
        }
        if (json[key] == 2) {
          clearInterval(redalert);
          clearInterval(yellowalert);
          document.getElementById("yellowalert").style.opacity = 0;
          document.getElementById("redalert").style.opacity = 0;
          redalert = setInterval(setredalert, 3000);
        }
      }
      if (key == "screen") {
        if (typeof json[key] != "string") {
          showWarp(json[key]);
        } else {
          if (json[key] == "") {
            showLogo();
          } else {
            showImage(json[key]);
          }
        }
      }
    }
  }
}
function restartbackground() {
  background = new Audio("/static/media/background.mp3");
  background.volume = data.musicvolume || 1;
  background.addEventListener(
    "ended",
    function () {
      restartbackground();
    },
    false
  );
  background.play();
}
function restartengine() {
  engine = new Audio("/static/media/engine.mp3");
  engine.volume = data.soundvolume || 1;
  engine.addEventListener(
    "ended",
    function () {
      restartengine();
    },
    false
  );
  engine.play();
}
function showLogo() {
  document.getElementById("logopage").style.display = "initial";
  document.getElementById("image").style.display = "none";
  document.getElementById("warpcanvas").style.display = "none";
}
function showImage(image) {
  document.getElementById("logopage").style.display = "none";
  document.getElementById("image").style.display = "initial";
  document.getElementById("image").src = "/static/media/" + image;
  document.getElementById("warpcanvas").style.display = "none";
}
function showWarp(warpspeed) {
  document.getElementById("logopage").style.display = "none";
  document.getElementById("image").style.display = "none";
  document.getElementById("warpcanvas").style.display = "initial";
  // requestAnimFrame shim
  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  })();
  window.cancelAnimFrame = (function () {
    return (
      window.cancelAnimationFrame ||
      window.webkitcancelAnimationFrame ||
      window.mozcancelAnimationFrame ||
      window.ocancelAnimationFrame ||
      window.mscancelAnimationFrame ||
      function (callback) {
        window.setTimeout(callback);
      }
    );
  })();
  if (requestID != undefined) {
    cancelAnimFrame(requestID);
  }
  requestID = undefined;
  // remove frame margin and scrollbars when maxing out size of canvas
  //document.body.style.margin = "0px";
  //document.body.style.overflow = "hidden";

  // get dimensions of window and resize the canvas to fit
  var width = window.innerWidth,
    height = window.innerHeight,
    canvas = document.getElementById("warpcanvas"),
    mousex = width / 2,
    mousey = height / 2;
  canvas.width = width;
  canvas.height = height;

  // get 2d graphics context and set global alpha
  var G = canvas.getContext("2d");
  G.globalAlpha = 0.25;

  // setup aliases
  var Rnd = Math.random,
    Sin = Math.sin,
    Floor = Math.floor;

  // constants and storage for objects that represent star positions
  var warpZ = 12,
    units = 500,
    stars = [],
    cycle = 0,
    Z = warpspeed;

  // mouse events

  // function to reset a star object
  function resetstar(a) {
    a.x = (Rnd() * width - width * 0.5) * warpZ;
    a.y = (Rnd() * height - height * 0.5) * warpZ;
    a.z = warpZ;
    a.px = 0;
    a.py = 0;
  }

  // initial star setup
  for (var i = 0, n; i < units; i++) {
    n = {};
    resetstar(n);
    stars.push(n);
  }

  // star rendering anim function
  var rf = function () {
    // clear background
    G.fillStyle = "#000";
    G.fillRect(0, 0, width, height);

    // mouse position to head towards
    var cx = mousex - width / 2 + width / 2,
      cy = mousey - height / 2 + height / 2;

    // update all stars
    var sat = Floor(Z * 500); // Z range 0.01 -> 0.5
    if (sat > 100) sat = 100;
    for (var i = 0; i < units; i++) {
      var n = stars[i], // the star
        xx = n.x / n.z, // star position
        yy = n.y / n.z,
        e = (1.0 / n.z + 1) * 2; // size i.e. z

      if (n.px !== 0) {
        // hsl colour from a sine wave
        G.strokeStyle = "hsl(" + ((cycle * i) % 360) + ",0%,100%)";
        G.lineWidth = e;
        G.beginPath();
        G.moveTo(xx + cx, yy + cy);
        G.lineTo(n.px + cx, n.py + cy);
        G.stroke();
      }

      // update star position values with new settings
      n.px = xx;
      n.py = yy;
      n.z -= Z;

      // reset when star is out of the view field
      if (n.z < Z || n.px > width || n.py > height) {
        // reset star
        resetstar(n);
      }
    }

    // colour cycle sinewave rotation
    //cycle += 0.01;

    requestID = requestAnimFrame(rf);
  };
  requestAnimFrame(rf);
}
