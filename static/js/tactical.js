var conn_options = {
  "sync disconnect on unload": true,
};
data = {};
var socket = io.connect(
  window.location.protocol +
    "//" +
    document.domain +
    ":" +
    location.port +
    "/tactical",
  {}
);
socket.on("update", function (json) {
  update(json);
});
function emit(key, json) {
  socket.emit(key, json);
}
function update(json) {
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      data[key] = json[key];
    }
    if (key == "ships") {
      doships(json[key]);
    }

    if (key == "tacticallockdown") {
      if (json[key] == true) {
        document.getElementById("bodycontainer").style.display = "none";
      } else {
        document.getElementById("bodycontainer").style.display = "initial";
      }
    }
    if (key == "target") {
      document.getElementById("targeted").innerHTML = json[key];
      document.getElementById("target2").innerHTML = json[key];
      if (json[key] == "") {
        document.getElementById("infoc").style.display = "none";
      } else {
        document.getElementById("infoc").style.display = "initial";
      }
      document.getElementById("cshields").innerHTML =
        data.ships[json[key]]["shields"];
      document.getElementById("chull").innerHTML =
        data.ships[json[key]]["hull"];
      document.getElementById("cengines").innerHTML =
        data.ships[json[key]]["engines"];
      document.getElementById("csystems").innerHTML =
        data.ships[json[key]]["systems"];
    }
    if (key == "team1") {
      document.getElementById("team1").value = json[key];
    }
    if (key == "team2") {
      document.getElementById("team2").value = json[key];
    }
    if (key == "team3") {
      document.getElementById("team3").value = json[key];
    }
    if (key == "team4") {
      document.getElementById("team4").value = json[key];
    }
    if (key == "torpedoes") {
      document.getElementById("torpedoes").innerHTML = json[key];
    }
    if (key == "securityalert") {
      document.getElementById("securityalert").innerHTML = json[key];
    }
    if (key == "shields") {
      if (json[key] == true) {
        document.getElementById("shields").innerHTML = "Up";
      } else {
        document.getElementById("shields").innerHTML = "Down";
      }
    }
    if (key == "hailing") {
      document.getElementById("hailing").innerHTML = json[key];
    }
    if (key == "hailed") {
      if (json[key] == "") {
        document.getElementById("hailed").innerHTML = "";
      } else {
        emit("broadcast", { sound: "hail.mp3" });
        document.getElementById("hailed").innerHTML =
          "Currently being hailed by " +
          json[key] +
          ' <button class=\'btn btn-success\' onclick=\'answer();sound("buttonshort.wav");emit("broadcast",{"sound":"hailstart.mp3"});\'>Answer</button><button class=\'btn btn-warning\' onclick=\'decline();sound("buttonshort.wav");\'>Decline</button>';
      }
    }
  }
}
function answer() {
  emit("update", { hailing: data.hailed, hailed: "" });
}
function decline() {
  emit("update", { hailed: "" });
}
function hail() {
  emit("update", { hailing: document.getElementById("tohail").value });
}
function send1() {
  emit("update", { team1: document.getElementById("team1").value });
}
function retreat1() {
  emit("update", { team1: "" });
}
function send2() {
  emit("update", { team2: document.getElementById("team2").value });
}
function retreat2() {
  emit("update", { team2: "" });
}
function send3() {
  emit("update", { team3: document.getElementById("team3").value });
}
function retreat3() {
  emit("update", { team3: "" });
}
function send4() {
  emit("update", { team4: document.getElementById("team4").value });
}
function retreat4() {
  emit("update", { team4: "" });
}
function charge1() {
  $("#phaser1").animate(
    {
      width: "100%",
    },
    5000
  );
}
function fire1() {
  if (document.getElementById("phaser1").style.width == "100%") {
    if (data.ships[data.target].shields == 0) {
      if (data.focus == "hull") {
        data.ships[data.target].hull -= 5;
      } else if (data.focus == "engines") {
        data.ships[data.target].engines -= 5;
      } else if (data.focus == "systems") {
        data.ships[data.target].systems -= 5;
      } else {
        data.ships[data.target].hull -= 1;
        data.ships[data.target].engines -= 1;
        data.ships[data.target].systems -= 1;
      }
    } else {
      data.ships[data.target].shields -= 5;
      if (data.ships[data.target].shields < 0) {
        data.ships[data.target].shields = 0;
      }
    }
    if (data.ships[data.target].hull < 0) {
      data.ships[data.target].hull = 0;
    }
    if (data.ships[data.target].engines < 0) {
      data.ships[data.target].engines = 0;
    }
    if (data.ships[data.target].systems < 0) {
      data.ships[data.target].systems = 0;
    }
    emit("update", { ships: data.ships });
    $("#phaser1").animate(
      {
        width: "0%",
      },
      500
    );
  }
}
function charge2() {
  $("#phaser2").animate(
    {
      width: "100%",
    },
    5000
  );
}
function fire2() {
  if (document.getElementById("phaser2").style.width == "100%") {
    if (data.ships[data.target].shields == 0) {
      if (data.focus == "hull") {
        data.ships[data.target].hull -= 5;
      } else if (data.focus == "engines") {
        data.ships[data.target].engines -= 5;
      } else if (data.focus == "systems") {
        data.ships[data.target].systems -= 5;
      } else {
        data.ships[data.target].hull -= 1;
        data.ships[data.target].engines -= 1;
        data.ships[data.target].systems -= 1;
      }
    } else {
      data.ships[data.target].shields -= 5;
      if (data.ships[data.target].shields < 0) {
        data.ships[data.target].shields = 0;
      }
    }
    if (data.ships[data.target].hull < 0) {
      data.ships[data.target].hull = 0;
    }
    if (data.ships[data.target].engines < 0) {
      data.ships[data.target].engines = 0;
    }
    if (data.ships[data.target].systems < 0) {
      data.ships[data.target].systems = 0;
    }
    emit("update", { ships: data.ships });
    $("#phaser2").animate(
      {
        width: "0%",
      },
      500
    );
  }
}
function charge3() {
  $("#phaser3").animate(
    {
      width: "100%",
    },
    5000
  );
}
function fire3() {
  if (document.getElementById("phaser3").style.width == "100%") {
    if (data.ships[data.target].shields == 0) {
      if (data.focus == "hull") {
        data.ships[data.target].hull -= 5;
      } else if (data.focus == "engines") {
        data.ships[data.target].engines -= 5;
      } else if (data.focus == "systems") {
        data.ships[data.target].systems -= 5;
      } else {
        data.ships[data.target].hull -= 1;
        data.ships[data.target].engines -= 1;
        data.ships[data.target].systems -= 1;
      }
    } else {
      data.ships[data.target].shields -= 5;
      if (data.ships[data.target].shields < 0) {
        data.ships[data.target].shields = 0;
      }
    }
    if (data.ships[data.target].hull < 0) {
      data.ships[data.target].hull = 0;
    }
    if (data.ships[data.target].engines < 0) {
      data.ships[data.target].engines = 0;
    }
    if (data.ships[data.target].systems < 0) {
      data.ships[data.target].systems = 0;
    }
    emit("update", { ships: data.ships });
    $("#phaser3").animate(
      {
        width: "0%",
      },
      500
    );
  }
}
function torpedo() {
  newdata = data["torpedoes"];
  if (newdata > 0) {
    newdata -= 1;
    if (data.ships[data.target].shields == 0) {
      if (data.focus == "hull") {
        data.ships[data.target].hull -= 10;
      } else if (data.focus == "engines") {
        data.ships[data.target].engines -= 10;
      } else if (data.focus == "systems") {
        data.ships[data.target].systems -= 10;
      } else {
        data.ships[data.target].hull -= 3;
        data.ships[data.target].engines -= 3;
        data.ships[data.target].systems -= 3;
      }
    } else {
      data.ships[data.target].shields -= 10;
      if (data.ships[data.target].shields < 0) {
        data.ships[data.target].shields = 0;
      }
    }
    if (data.ships[data.target].hull < 0) {
      data.ships[data.target].hull = 0;
    }
    if (data.ships[data.target].engines < 0) {
      data.ships[data.target].engines = 0;
    }
    if (data.ships[data.target].systems < 0) {
      data.ships[data.target].systems = 0;
    }
    emit("update", { torpedoes: newdata, ships: data.ships });
  }
}
function doships(json) {
  document.getElementById("radarlist").innerHTML = "";
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      document.getElementById("radarlist").innerHTML +=
        "<option>" + key + "</option>";
      if (key == data.target) {
        document.getElementById("cshields").innerHTML = json[key]["shields"];
        document.getElementById("chull").innerHTML = json[key]["hull"];
        document.getElementById("cengines").innerHTML = json[key]["engines"];
        document.getElementById("csystems").innerHTML = json[key]["systems"];
      }
    }
  }
}
function shieldup() {
  emit("update", { shields: true });
}
function shielddown() {
  emit("update", { shields: false });
}
function target() {
  emit("update", { target: document.getElementById("radarlist").value });
}
function cleartarget() {
  emit("update", { target: "" });
}
function showtarget() {
  document.getElementById("targetpage").style.display = "initial";
  document.getElementById("weaponpage").style.display = "none";
  document.getElementById("securitypage").style.display = "none";
  document.getElementById("targettab").className = "active";
  document.getElementById("weapontab").className = "";
  document.getElementById("securitytab").className = "";
}
function showweapon() {
  document.getElementById("targetpage").style.display = "none";
  document.getElementById("weaponpage").style.display = "initial";
  document.getElementById("securitypage").style.display = "none";
  document.getElementById("targettab").className = "";
  document.getElementById("weapontab").className = "active";
  document.getElementById("securitytab").className = "";
}
function showsecurity() {
  document.getElementById("targetpage").style.display = "none";
  document.getElementById("weaponpage").style.display = "none";
  document.getElementById("securitypage").style.display = "initial";
  document.getElementById("targettab").className = "";
  document.getElementById("weapontab").className = "";
  document.getElementById("securitytab").className = "active";
}
