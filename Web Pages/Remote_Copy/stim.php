<?php

ini_set('display_errors',0);
//error_reporting(E_ALL|E_STRICT);
error_reporting (E_ALL ^ E_NOTICE);

//this file is the instructions page. provides a link to view the stimuli and a done button. 
//userscript delivers stimuli and instructions, also provides enforcement

//include "dbaccess.php";
session_start();

//if (isset($_SESSION['done']) && $_SESSION['done']) {
//	header( 'Location: http://74.207.227.126/china/exit.php' ) ;
//}

//$uid = $_SESSION['uid']; //already have this stored in the extensions
//$currStim = $_SESSION['stims'][$_SESSION['counter']]; //have this in the extension now, too
?>

<html>
<head>
<link rel="stylesheet" type="text/css" href="gongos.css" />
</head>
<body>
<div id="container">
<div id="header">
	<div id="headerLeft"></div>
	<div id="headerMiddle"></div>
	<div id="headerRight"></div>
</div>
<div id="surveyContainer" class="clearfix">

<h2 id="mediaTitle"></h2>

<b>Instructions</b><br><br>


<div id="enforcementMessage" style="color:red"></div>

<div id="instructions"></div>

<br>
<div id = "linkToStimulus"><a href="http://www.facebook.com" onclick="return false">Click here</a></div>
<div id = "nextInstructions"><br><b>Then close the new browser tab (not the browser) and return to this page.</b><br><br></div>


<div id = "softEnforcementMessage" style="color:red"></div>
<a href = "stim.php"><img src = "nextArrow.gif"></a>

<div id = "stimulusname" stimID = "404" stimulus = "Error"></div>
</div>
</div>
</body>
</html>








