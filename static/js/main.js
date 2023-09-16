function dosubmit(string) {
  document.getElementById("stationform").action = string + "/";
  document.getElementById("stationform").submit();
}
function dologin() {
  document.getElementById("fdform").submit();
}
