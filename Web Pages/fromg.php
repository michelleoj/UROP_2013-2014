<?php

ini_set('display_errors',1);
ini_set('session.gc_maxlifetime', 18000);
error_reporting(E_ALL|E_STRICT);

include "dbaccess.php";
session_start();
include "cell.php";

$db_resource = mysql_connect($db_server,$db_user,$db_password);
if(!$db_resource) echo "Failed to connect to database. Please refresh the page.";
?>

<?php
$segment = mysql_real_escape_string($_GET['segment']);
$uid = mysql_real_escape_string($_GET['uid']);
$cell = mysql_real_escape_string($_GET['Quota4']);

//checking URL for errors in segment or cell, and records errors in database.
$segList = array("1", "2", "3");
if (!(in_array($segment, $segList))) {
	$url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	$error = "INSERT INTO `mchlljy+nl_db`.`errors` (`url`, `type`, `userid`) VALUES ('$url', 'wrongSeg', '$uid')";
	$result = mysql_query($error);
}
if (!(array_key_exists($cell, $cells))) {
	$url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
	$error = "INSERT INTO `mchlljy+nl_db`.`errors` (`url`, `type`, `userid`) VALUES ('$url', 'wrongCell', '$uid')";
	$result = mysql_query($error);
}

// looks up cell the user is in
$randomizedStims = processCell($cells[$cell],$stims);

//put info on stims into divs so that contentscript can pick it up
echo '<div id="randomizedStims">';
for ($i=0; $i<sizeOf($randomizedStims); $i++) {
	echo '<div class="stimOrder" style="display:none">'.(string)$randomizedStims[$i].'</div>';
}
echo '</div>';
 
//store in session
//landmark: this is where state is stored in the session'
//do we need any of this anymore??
$_SESSION['uid'] = $uid;
$_SESSION['segment'] = $segment;
//$_SESSION['stims'] = $randomizedStims;
$_SESSION['counter'] = 0; 
$_SESSION['enforce'] = 'none';

//store user in db
$query = "INSERT INTO `mchlljy+nl_db`.`users` (`userid`, `segment`, `cell`, `timestamp`, `doneTime`) VALUES ('$uid', '$segment', '$cell', NOW(), NOW())";
$sql = mysql_query($query);
if (!$sql){
//note: could fail if user is already in DB, for example
//makes note of error and creates oldID div so contentscript knows
$url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$error = "INSERT INTO `mchlljy+nl_db`.`errors` (`url`, `type`, `userid`) VALUES ('$url', 'oldID', '$uid')";
$result = mysql_query($error);
echo '<div id="oldID" style="display:none">True</div>';

//check if user has already finished before from database, creates userDone div
$doneQ = "SELECT `done` from `mchlljy+nl_db`.`users` WHERE `userid`='$uid'";
$doneR = mysql_query($doneQ);
$row = mysql_fetch_array($doneR);
if ($row[0] == "True") {
	echo '<div id="userDone" style="display:none">True</div>';
	$_SESSION['done']=True;
}
};

//store user order in db
$query2 = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_order` (`userid`";
for($i=0;$i<sizeOf($randomizedStims);$i++){
	$query2.= ",`stim".(string)($i+1)."`";
};
$query2.=") VALUES ('$uid'";
for($j=0;$j<sizeOf($randomizedStims);$j++){
	$query2.=",'".(string)$randomizedStims[$j]."'";
};
$query2.=")";
$sql2 = mysql_query($query2);
if(!$sql2){
//echo ($query2);
}
?>


<html>
<head>
<link rel="stylesheet" type="text/css" href="gongos.css" />
<title>Auto Enquete</title>
</head>
<body>
<div id="container">
<div id="header">
	<div id="headerLeft"></div>
	<div id="headerMiddle"></div>
	<div id="headerRight"></div>
</div>
<div id="surveyContainer" class="clearfix">
	<h2><b>Welkom op de media website.</b></h2>
	Hier zult u media bekijken en gebruiken. Wanneer u klaar bent, wordt u teruggestuurd naar de enqu&#234;te om een aantal extra vragen te beantwoorden.
	<p style="color:red"> Let op: Dit is een experimenteel onderzoeksproject, daardoor zou dit onderzoek kunnen afwijken van het huidige marktaanbod.</p>
	Bent u er klaar voor? Geweldig! Klik dan op de <b>pijl</b> om te beginnen!
	<a href = "stim.php"><img src = "nextArrow.gif"></a>
</div>
</div>
</body>
</html>
