<?php

ini_set('display_errors',1);
ini_set('session.gc_maxlifetime', 18000);
error_reporting(E_ALL|E_STRICT);

include "dbaccess.php";
session_start();
include "cell.php";

$db_resource = mysql_connect($db_server,$db_user,$db_password);
if(!$db_resource) echo "Failed to connect to database";

$uid = $_SESSION['uid'];

$query = "UPDATE `pmma`.`users` SET `done`='True', `doneTime`=NOW() WHERE `userID`='$uid'";
$sql = mysql_query($query);

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
<h2>Thanks for completing the media exercises!</h2>
Please click the <b>arrow</b> to return to the survey.
<a id="exitURL" href = "http://survey2.gongos.com/GP1728S2/I519.aspx<?php echo '?s1=1&s2=0&s3=0&s4=0&uid='.$uid?>"><img src = "nextArrow.gif"></a>
</div>
</div>
</body>
</html>
