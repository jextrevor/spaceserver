<?php
$myfile = fopen("fd.txt", "r") or die("ERROR");
echo fread($myfile,filesize("fd.txt"));
fclose($myfile);
?>