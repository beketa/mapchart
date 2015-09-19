<?php
$url = $_GET['url'];
$image = @imagecreatefrompng($url);
if (!$image) {
   header("HTTP/1.1 404 Not Found");
   exit;
}
header("Content-type: image/png");
$white = imagecolorallocate($image, 255, 255, 255);
imagecolortransparent($image, $white);
imagepng($image);
imagedestroy($image);
?>
