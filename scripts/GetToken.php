<?php
function getToken () {
	$clientid = "3f3ff0e418bb4847898620d0739a2c5d";
	$secret = "EbexOHPGHl197lmcjNPjSfwl6cxR30ES";
	$url = "https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=$clientid&client_secret=$secret";
	
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_URL, $url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
	
	$output = curl_exec($curl);
	$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);
	

	$result = json_decode($output, true);
	if(isset($result['access_token'])){
		return $result['access_token'];
	} else {
		echo("PHP Script failed to get access token.");
	}
}
?>