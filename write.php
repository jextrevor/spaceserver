<?php
$myfile = fopen("fd.txt", "w")
$txt = $_SERVER['REMOTE_ADDR'];
fwrite($myfile, $txt);
fclose($myfile);
?>
