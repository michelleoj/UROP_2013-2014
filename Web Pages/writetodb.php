<?php
/* Handles database write POST requests
*/

//ini_set('display_errors',1);
ini_set('display_errors',0);
ini_set('session.gc_maxlifetime', 18000);
error_reporting(E_ALL|E_STRICT);

include "dbaccess.php";
include "cell.php";
session_start();

$db_resource = mysql_connect($db_server,$db_user,$db_password);
if(!$db_resource) echo "Failed to connect to database";

//get request type
$requestType = null;
if (isset($_POST['requestType'])){
	$requestType = mysql_real_escape_string($_POST['requestType']);
};

switch ($requestType)
{
case "action":
	//get actionType
	$stimID = null;
	if (isset($_POST['stimID'])){
		$stimID = mysql_real_escape_string($_POST['stimID']);
	};
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$actionType = null;
	if (isset($_POST['actionType'])){
		$actionType = mysql_real_escape_string($_POST['actionType']);
	};
	$target = null;
	if (isset($_POST['target'])){
		$target = mysql_real_escape_string($_POST['target']);
	};
	mysql_query("SET NAMES 'utf8'");
	$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_actions` (`userID`,`stimID`, `actionType`, `target`) VALUES ('$userID', '$stimID', '$actionType', '$target')";
	$sql = mysql_query($query);
	if (!$sql){
	
	}; echo "action write done"; break;
	
case "browsingHistory":
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$url = null;
	if (isset($_POST['url'])){
		$url = mysql_real_escape_string($_POST['url']);
	};
	$stimID = null;
	if (isset($_POST['stimID'])){
		$stimID = mysql_real_escape_string($_POST['stimID']);
	};
	$time = null;
	if (isset($_POST['time'])){
		$time = mysql_real_escape_string($_POST['time']);
	};
	$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_browsinghistory` (`userID`,`stimID`, `url`, `time`) VALUES ('$userID', '$stimID', '$url', '$time')";
	$sql = mysql_query($query);
	if (!$sql){
	
	}; echo "browsingHistory write done"; break;
	
case "enforcement":
	$enforcementType = null;
	if (isset($_POST['enforcementType'])){
		$enforcementType = mysql_real_escape_string($_POST['enforcementType']);
	};
	$stimID = null;
	if (isset($_POST['stimID'])){
		$stimID = mysql_real_escape_string($_POST['stimID']);
	};
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_enforcement` (`userID`,`stimID`, `enforcementType`) VALUES ('$userID', '$stimID', '$enforcementType')";
	$sql = mysql_query($query);
	if (!$sql){
		
	}; echo "enforcement write done";break;

case "startTiming":
	$stimID = null;
	if (isset($_POST['stimID'])){
		$stimID = mysql_real_escape_string($_POST['stimID']);
	};
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$enforce = null;
	if (isset($_POST['enforce'])){
		$enforce = mysql_real_escape_string($_POST['enforce']);
	};
	$query = "INSERT INTO `mchlljy+nl_db`.`users_stimuli_startstop` (`userID`,`stimID`, `starttime`, `enforceStatus`) VALUES ('$userID', '$stimID', NOW(), '$enforce')";
	$sql = mysql_query($query);
	if (!$sql){
		
	}; echo "startTime write done";break;
	
case "updateStop":
	$stimID = null;
	if (isset($_POST['stimID'])){
		$stimID = mysql_real_escape_string($_POST['stimID']);
	};
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$query = "UPDATE `mchlljy+nl_db`.`users_stimuli_startstop` SET `stoptime` = NOW() WHERE `userID` = '$userID' and `stimID` = '$stimID'";
	$sql = mysql_query($query);
	if (!$sql){
		echo ($query);
	}; break;
	
case "writeDone":
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$query = "UPDATE `mchlljy+nl_db`.`users` SET `done`='True', `doneTime`=NOW() WHERE `userID` = '$userID'";
	$sql = mysql_query($query);
	if (!$sql){
		echo ($query);
	}; break;
case "error":
	$userID = null;
	if (isset($_POST['userID'])){
		$userID = mysql_real_escape_string($_POST['userID']);
	};
	$url = null;
	if (isset($_POST['url'])){
		$url = mysql_real_escape_string($_POST['url']);
	};
	$type = null;
	if (isset($_POST['type'])){
		$type = mysql_real_escape_string($_POST['type']);
	};
	$error = "INSERT INTO `mchlljy+nl_db`.`errors` (`url`, `type`, `userid`) VALUES ('$url', '$type', '$userID')";
	$result = mysql_query($error);
	if (!$result){
		echo ($error);
	}; break;
	
default:
	echo "fail"; break;
};
?>