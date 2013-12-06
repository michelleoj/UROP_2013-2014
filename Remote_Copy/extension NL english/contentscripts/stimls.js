var startTime;
var endTime;
var lastStart;
var lastEnd;
var totalTime;


var clickedLink = false;

var softTime = 30000;
var hardTime = 10000;
if (localStorage.pastStim == "undefined") {localStorage.pastStim = localStorage[parseInt(localStorage.count) - 1];}
console.log("Last stim was "+localStorage.pastStim);
if (localStorage.pastStim == "0") { //tv has different enforcement times. must watch most of ad
	hardTime = 24000;
}

//moved a lot of state from background page to HTML5 local storage
//easier to retrieve info, and is preserved indefinitely (even if browser closes)

//when page loads, check enforcement and display stimuli properly
$(document).ready(function(){
	
	chrome.extension.sendRequest({type: "getUserID"}, function(response) {
	if(response.uid == -1) {
		chrome.extension.sendRequest({type: "setUserInfo", userid: localStorage.uid, seg: localStorage.segment});
	}
	//enforcement
	chrome.extension.sendRequest({type: "getTimes"}, function(response) {
		lastStart = response.startTime;
		lastEnd = response.endTime;
		totalTime = lastEnd-lastStart; //time spent on last stimuli
		console.log("The time spent on the last stimuli was "+totalTime+", start was "+lastStart+", end was "+lastEnd);
		
		//hard enforcement
		if ((totalTime != 0) && (totalTime < hardTime) && (localStorage.enforce !="soft")) {
			$("#enforcementMessage").html("<b>Please spend more time on the site, using it as you normally would. Click on the link again to continue.</b><br><br>");
			if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
			localStorage.done = "False";
			var currStim = localStorage[localStorage.count];
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "hardEnforce", stimID: currStim, userID: localStorage.uid});
			localStorage.enforce = "hard";
			showStimuli();
			$("a:last").hide();
		}
		//soft enforcement
		else if ((totalTime != 0) && (totalTime < softTime) && (localStorage.enforce !="soft")) {
			$("#softEnforcementMessage").html("<b>Are you finished viewing this media? If you are ready to continue, click on the arrow again. If you would like to go back, you may reopen the stimuli by clicking above again.</b><br><br>");
			if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
			localStorage.done = "False";
			var currStim = localStorage[localStorage.count];
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "softEnforce", stimID: currStim, userID: localStorage.uid});
			localStorage.enforce = "soft";
			showStimuli();
			$("#nextInstructions").html('<br><b>Now click the arrow below to continue with the survey.</b><br><br>');
		}
		
		//if done with stimuli, send to exit page
		else if (localStorage.done =="True") {
			window.location = "exit.php";
		}
		
		//if they were above soft limit or they already got the soft enforcement message, go on to the next stimuli
		else {
//			chrome.extension.sendRequest({type: "resetEnforce"});
			localStorage.incremented = "False";
			localStorage.enforce = "none";
			showStimuli();
			$("a:last").hide();
		}
		
		localStorage.pastStim = "undefined";
	});
	});
});

//function that changes fields for stimuli
function showStimuli() {
	//changes title, instructions, stimulus name, etc using counter and stim list stored in background page
	//gets info from instructions.js, which is included
	var counter = localStorage.count;
	if (parseInt(counter) >= parseInt(localStorage.numStims)) {
		localStorage.done = "True";
		window.location = "exit.php";
	}
	console.log("On stimuli "+counter+", stimuli is "+localStorage[counter]);
	$("#mediaTitle").html("Media Exercise - "+header1Text[stimNames[localStorage[counter]]]);
	$("#linkToStimulus").html('<a href="/#" onclick="return false">Click here</a> '+clickheretoviewText[stimNames[localStorage[counter]]]);
	$("#instructions").html(instructions[stimNames[localStorage[counter]]]);
	$("#stimulusname").attr({stimulus: stimNames[localStorage[counter]], stimID: localStorage[counter]});
}

//click handler for link to view stimuli
$("#linkToStimulus").click(function(){
	clickedLink = true;
	var stimulus = $("#stimulusname").attr("stimulus");
	var stimid = $("#stimulusname").attr("stimID");
	
	//content scripts can't open new tabs, but the background page can. 
	// send message to background page to open a new tab
	chrome.extension.sendRequest({type: "showStim", stimtype: stimulus});
	
	//start timing
	var d = new Date();
	startTime = d.getTime();
	$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "startTiming", stimID: stimid, userID: localStorage.uid, enforce: localStorage.enforce});
	
	//Show next arrow, change instructions
	$("a:last").show();
	$("#nextInstructions").html('<br><b>Now click the arrow below to continue with the survey.</b><br><br>');
});

//click handler for "done" arrow
$("a:last").click(function(){
		var stimulus = $("#stimulusname").attr("stimulus");
		var stimid = $("#stimulusname").attr("stimID");
		var d2 = new Date();
		endTime = d2.getTime();
		
//		if they haven't clicked on the link at all, want them to fail enforcement
//		not sure if this is needed or not...
		if ((typeof startTime == 'undefined') && (lastEnd != -1)) {
			startTime = -1;
		}
		
		chrome.extension.sendRequest({type: "recordTimes", start: startTime, end: endTime}, function(response) {console.log(response.text);});
		//only want to write browsing history if they've clicked on the stimuli and browsed since the last time they clicked the arrow
		if (clickedLink) {
			var uid = localStorage.uid;
			chrome.extension.sendRequest({type: "writeBrowsingHistory", stimID: stimid, startTime: startTime, endTime: endTime, userID: uid});
			var currStim = localStorage[localStorage.count];
//			$.post('http://74.207.227.126/writetodb.php', {requestType: "updateStop", stimID: currStim, userID: localStorage.uid});
			chrome.extension.sendRequest({type: "updateStop", stimID: currStim, userID: uid}); //not sure why this has to go through extension, but direct post doesn't work
			//why doesn't direct route work here??
		}
		
		//increase counter for next stim, check if done
		localStorage.count = parseInt(localStorage.count) + 1;
		localStorage.incremented = "True";
		if (localStorage.count == localStorage.numStims) {
			localStorage.done = "True";
		}
		else {
			localStorage.done = "False";
		}
});
		
