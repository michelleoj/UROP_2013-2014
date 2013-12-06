var startTime;
var endTime;
var lastStart;
var lastEnd;
var totalTime;
var clickedLink = false;
var softEnforce = false;
var stimsDone = false;

$(document).ready(function(){
	//need to nest requests so that they are evaluated sequentially
	chrome.extension.sendRequest({type: "getEnforceDone"}, function(response) {
		softEnforce = response.softEnforce;
		console.log("softEnforce is "+softEnforce);
		stimsDone = response.done;
		
		//enforcement
		chrome.extension.sendRequest({type: "getTimes"}, function(response) {
			lastStart = response.startTime;
			lastEnd = response.endTime;
			console.log("The time spent on the last stimuli was "+response.totalTime+", start was "+lastStart+", end was "+lastEnd);
			totalTime = response.totalTime; //time spent on last stimuli
			//hard enforcement
			if (((totalTime != 0) && (totalTime < 10000) && !(softEnforce)) || ((lastStart == -1) && (lastEnd != -1) && !(softEnforce))) {
				$("#enforcementMessage").html("<b>Please spend more time on the site, using it as you normally would. Click on the link again to continue.</b><br><br>");
				chrome.extension.sendRequest({type: "hardEnforce"}, function(response){
					console.log(response.text);
					showStimuli();
					$("a:last").hide();
				});
			}
			//soft enforcement
			else if ((totalTime != 0) && (totalTime <30000) && !(softEnforce)) {
				$("#softEnforcementMessage").html("<b>Are you finished viewing this media? If you are ready to continue, click on the arrow again. If you would like to go back, you may reopen the stimuli by clicking above again.</b><br><br>");
				chrome.extension.sendRequest({type: "softEnforce"}, function(response){
					console.log(response.text);
					showStimuli();
					$("#nextInstructions").html('<br><b>Now click the arrow below to continue with the survey.</b><br><br>');
				});
			}
			//if done with stimuli, send to exit page
			else if (stimsDone) {
				window.location = "exit.php";
			}
			//if they were above 30 seconds or they already got the soft enforcement message, go on to the next stimuli
			else {
				chrome.extension.sendRequest({type: "resetEnforce"});
				showStimuli();
				$("a:last").hide();
			}
		});
	});
});

function showStimuli() {
	//changes title, instructions, stimulus name, etc using counter and stim list stored in background page
	//gets info from instructions.js, which is included in the manifest
	chrome.extension.sendRequest({type: "getStim"}, function(response) {
		console.log("On stimuli "+response.counter+", stimuli is "+response.currStim);
		$("#mediaTitle").html("Media Exercise - "+header1Text[stimNames[response.currStim]]);
		$("#linkToStimulus").html('<a href="/#" onclick="return false">Click here</a> '+clickheretoviewText[stimNames[response.currStim]]);
		$("#instructions").html(instructions[stimNames[response.currStim]]);
		$("#stimulusname").attr({stimulus: stimNames[response.currStim], stimID: response.currStim});
		
		
		//increase counter, make softEnforce flag false again
		chrome.extension.sendRequest({type: "nextStimChange"}, function(response) {
			console.log(response.text);
		});
	});
}

$("#linkToStimulus").click(function(){
	clickedLink = true;
	var stimulus = $("#stimulusname").attr("stimulus");
	var stimID = $("#stimulusname").attr("stimID");
	//content scripts can't open new tabs, but the background page can. 
	// send message to background page to open a new tab
	chrome.extension.sendRequest({type: "showStim", stimtype: stimulus}, 
								function(response){
									console.log(response.text);
								});
	//start the stimulus
	var d = new Date();
	startTime = d.getTime();
	chrome.extension.sendRequest({type: "startTiming"});
	$("a:last").show();
	$("#nextInstructions").html('<br><b>Now click the arrow below to continue with the survey.</b><br><br>');
//	$.post('http://74.207.227.126/writetodb.php', {requestType: "startTiming"}, function(){console.log("startTime logged")});
});

//add listener for "done" link to write browsing history to db
$("a:last").click(function(){
		var stimulus = $("#stimulusname").attr("stimulus");
		var stimID = $("#stimulusname").attr("stimID");
		var d2 = new Date();
		endTime = d2.getTime();
//		if they haven't clicked on the link at all, want them to fail enforcement
		if ((startTime == undefined) && (lastEnd != -1)) {
			startTime = -1;
		}
		chrome.extension.sendRequest({type: "recordTimes", start: startTime, end: endTime}, function(response) {console.log(response.text);});
		//only want to write browsing history if they've clicked on the stimuli and browsed since the last time they clicked the arrow
		if (clickedLink) {
			chrome.extension.sendRequest({type: "writeBrowsingHistory", stimID: stimID, startTime: startTime, endTime: endTime});
			chrome.extension.sendRequest({type: "updateStop"});
		}
		});
		
