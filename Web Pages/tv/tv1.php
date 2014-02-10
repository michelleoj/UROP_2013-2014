<?php

ini_set('display_errors',0);
error_reporting(E_ALL|E_STRICT);
//error_reporting (E_ALL ^ E_NOTICE);

include "dbaccess.php";
session_start();
$db_resource = mysql_connect($db_server,$db_user,$db_password);
if(!$db_resource) echo "Failed to connect to database. Please refresh the page.";

$uid = $_SESSION['uid']; //already have this stored in the extensions
$segment = $_SESSION['segment'];

if ($_SESSION['counter'] > 0) {
	$query = "SELECT TIME_TO_SEC(TIMEDIFF(NOW(),`starttime`)) as totaltime FROM `mchlljy+nl_db`.`users_stimuli_startstop` WHERE `userID` = '$uid' and `stimID` = '0'";
	$sql = mysql_query($query);
	$row = mysql_fetch_array($sql);
	$timediff = $row['totaltime'];

	if ($timediff > 40) {
		$query = "UPDATE `mchlljy+nl_db`.`users_stimuli_startstop` SET `stoptime`=NOW() WHERE `userid`='$uid' and `stimID`='0'";
		$sql = mysql_query($query);
		$_SESSION['enforced']=False;
	}
	else {
		$_SESSION['enforced']=True;
		$_SESSION['enforce']='hard';
		$_SESSION['counter'] = 0;
		$query = "DELETE from `mchlljy+nl_db`.`users_stimuli_startstop` WHERE `userID`='$uid' and `stimID`='0'";
		$sql = mysql_query($query);
		$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_enforcement` (`userID`,`stimID`, `enforcementType`) VALUES ('$uid', '0', 'hardEnforce')";
		$sql = mysql_query($query);
	}
}
else {
	$_SESSION['enforced']=False;
}

if($_SESSION['counter'] >= 1) {
	header('Location: ../exitnc.php');
}
else {
	$enforce = $_SESSION['enforce'];
	$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_startstop` (`userID`,`stimID`, `starttime`, `enforceStatus`) VALUES ('$uid', '0', NOW(), '$enforce')";
	$sql = mysql_query($query); 
}

?>
<html>
<head>

<style>
body{
	text-align: center;
}

#tv{
	position:absolute;
	left: 50%; 
	margin-left: -512px;  
	
	top: 40px;
	z-index:-10;
	width: 1024px;
	height: 944px;
}

#video{
	margin-top: 20px;
	z-index:5;
}
</style>

</head>

<!--photo credit http://media.simplyelectricals.co.uk/catalog/product/c/i/cirrus-8157-nc-01-er.jpg -->
<body>
<?php 
	if(isset($_SESSION['enforced']) && $_SESSION['enforced'] == True) {
		echo '<p><font color="red">Please spend more time watching the full excerpt. Click the arrow when you are finished to continue. </font><a href="tv1.php"><img src="../nextArrow.gif"></a></p>';
	}
	else {
		echo '<p>Click on the arrow when you are done viewing the media. <a href="tv1.php"><img src="../nextArrow.gif"></a></p>';
	}
?>
<div id = 'container'>
	<div id = 'video'>
		<object width='800' height='480'><param name='movie' value='http://www.youtube.com/v/OD7DD18YrJI?version=3&amp;hl=en_US&amp;rel=0&amp;showinfo=0&amp;controls=0&amp;modestbranding=1&amp;autoplay=1&disablekb=1'></param>
		<param name='allowFullScreen' value='true'>
		</param><param name='allowscriptaccess' value='always'>
		</param><embed src='http://www.youtube.com/v/OD7DD18YrJI?version=3&amp;hl=en_US&amp;rel=0&amp;showinfo=0&amp;controls=0&amp;modestbranding=1&amp;autoplay=1&disablekb=1' type='application/x-shockwave-flash' width='800' height='480' allowscriptaccess='always' allowfullscreen='true'>
		</embed></object>
	</div>
	<div id = 'tvbackground'>
		<img id="tv" src = 'img/tvstand.jpg'>
	</div>
</div>
<?php
$_SESSION['counter'] = $_SESSION['counter'] + 1; 
?>
</body>
</html>