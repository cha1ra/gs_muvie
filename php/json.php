<?php

$params = array('appid'=>'dj00aiZpPUU0N2laSUpaSzJPSyZzPWNvbnN1bWVyc2VjcmV0Jng9Y2U-');
$url = 'https://jlp.yahooapis.jp/MAService/V1/parse?';
$url .= 'appid='.$params['appid'];
$url .= '&sentence='.$_POST['sentence'];
$url .= '&results='.$_POST['results'];

$xml = file_get_contents($url);
echo $xml;

?>
