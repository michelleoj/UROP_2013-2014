<?php

ini_set('display_errors',1);
ini_set('session.gc_maxlifetime', 18000);
error_reporting(E_ALL|E_STRICT);


//this file codes the different cells. 
//cells run from 1 to 8 (full factorial)

//coded as following: 
//each cell is an array of length 4, representing the stimuli in the following order: 
// TV, Facebook, Control (branded)

//MAIN EXPERIMENT: 
$cells = array(
		//MAIN EXPERIMENT
		
		"1"=> array(FALSE,FALSE,TRUE), //Control
		"2"=> array(TRUE,FALSE,FALSE), //TV
		"3"=> array(FALSE,TRUE,FALSE), //Facebook
		"4"=> array(TRUE,TRUE,FALSE), //TV, Facebook

		//test cell
		"test"=> array(TRUE,TRUE,TRUE)
);

$stims = array(
		0=> "TV",
		1=> "Facebook",
		2=> "Control", //branded
);




//process the array, pulling out the TRUEs, then randomizing 
function processCell($cell,$stims){
	$processedStims = array();
	for($i=0;$i<sizeOf($cell);$i++){
		if($cell[$i]) array_push($processedStims,$i);
	}
	
	shuffle($processedStims);
	return $processedStims;
}

?>
