<?php

$url = 'https://newsapi.org/v2/top-headlines?country=jp&apiKey=3e9962fc1cfd400d8c38d4f242682215';
$json = file_get_contents($url);
echo $json;

?>
