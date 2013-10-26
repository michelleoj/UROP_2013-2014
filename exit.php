 <?php

// ini_set('display_errors',1);
// ini_set('session.gc_maxlifetime', 18000);
// error_reporting(E_ALL|E_STRICT);

// include "dbaccess.php";
// session_start();
// include "cell.php";

//$db_resource = mysql_connect($db_server,$db_user,$db_password);
//if(!$db_resource) echo "Failed to connect to database";

//$queryString = "?userID=".$_SESSION['uid']."&s1=".$_SESSION['stims'][0]."&s2=".$_SESSION['stims'][1]."&s3=".$_SESSION['stims'][2]."&s4=".$_SESSION['stims'][3];
//echo($queryString);
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

<br><br><a id="exitURL" href = "#"><img src = "nextArrow.gif"></a>
</div>
</div>
</body>
</html>
