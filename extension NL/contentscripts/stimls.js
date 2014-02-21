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
if (localStorage[0] == "0") { //tv has different enforcement times. must watch most of ad
	hardTime = 75000;
} else if (localStorage[0] == 1) {
	hardTime = 60000;
	
}
console.log('hardTime', hardTime);


//moved a lot of state from background page to HTML5 local storage
//easier to retrieve info, and is preserved indefinitely (even if browser closes)

//when page loads, check enforcement and display stimuli properly
$(document).ready(function(){
	
	chrome.runtime.sendMessage({type: "getUserID"}, function(response) {
	if(response.uid == -1) {
		chrome.runtime.sendMessage({type: "setUserInfo", userid: localStorage.uid, seg: localStorage.segment});
	}
	//enforcement
	chrome.runtime.sendMessage({type: "getTimes"}, function(response) {
		lastStart = response.startTime;
		lastEnd = response.endTime;
		totalTime = lastEnd-lastStart; //time spent on last stimuli
		console.log("The time spent on the last stimuli was "+totalTime+", start was "+lastStart+", end was "+lastEnd);
		
		//initialize as hasn't clicked in facebook ad
		
		
		//enforcement listeners for facebook 
		if (localStorage[0] == 1) {

			chrome.storage.onChanged.addListener(function(changes, namespace) {
			  for (key in changes) {
			    var storageChange = changes[key];
			    console.log('Storage key "%s" in namespace "%s" changed. ' +
			                'Old value was "%s", new value is "%s".',
			                key,
			                namespace,
			                storageChange.oldValue,
			                storageChange.newValue);
			    localStorage.hasClicked = storageChange.newValue;
			    console.log('hasClicked is now ', localStorage.hasClicked);
			   
			  }
			});

			console.log('bool logic 1: ', (totalTime > 0), (totalTime < hardTime), (localStorage.enforce !="soft"), (JSON.parse(localStorage.hasClicked)));
			console.log('bool logic 2: ', (totalTime > 0), (totalTime < softTime), (localStorage.enforce !="soft"), (JSON.parse(localStorage.hasClicked)));
			console.log('bool logic 3: ', (totalTime > 0), (totalTime < hardTime), (localStorage.enforce !="soft"), (JSON.parse(localStorage.hasClicked)));
			console.log('bool logic 4: ', (totalTime > 0), (totalTime < softTime), (localStorage.enforce !="soft"), (JSON.parse(localStorage.hasClicked)));

			chrome.runtime.sendMessage('bool logic 1: ' + (totalTime > 0) + ' ' + (totalTime < hardTime) + ' ' + (localStorage.enforce !="soft") + ' ' +  (!JSON.parse(localStorage.hasClicked)));
			chrome.runtime.sendMessage('bool logic 2: ' + (totalTime > 0) + ' ' +  (totalTime < softTime) + ' ' +  (localStorage.enforce !="soft") + ' ' +  (!JSON.parse(localStorage.hasClicked)));
			chrome.runtime.sendMessage('bool logic 3: ' + (totalTime > 0) + ' ' +  (totalTime < hardTime) + ' ' +  (localStorage.enforce !="soft") + ' ' +  (!JSON.parse(localStorage.hasClicked)));
			chrome.runtime.sendMessage('bool logic 4: ' + (totalTime > 0) + ' ' +  (totalTime < softTime) + ' ' + (localStorage.enforce !="soft") + ' ' +  (!JSON.parse(localStorage.hasClicked)));
			
			if (((totalTime > 0) && (localStorage.enforce !="soft")) && ((totalTime < hardTime) || (!JSON.parse(localStorage.hasClicked)))) {
				if(JSON.parse(localStorage.hasClicked) == false) {
					$("#enforcementMessage").html("<b>Gelieve meer tijd op de website te besteden. Heeft u al op het bovenste bericht geklikt? Klik nogmaals op de link om terug te gaan naar de website.</b><br><br>");
				} else {
					$("#enforcementMessage").html("<b>Gelieve meer tijd op website te besteden, gebruik de pagina zoals u normaal ook zou doen. Klik nogmaals op de link om verder te gaan.</b><br><br>");
				}
				if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
				localStorage.done = "False";
				var currStim = localStorage[localStorage.count];
				// $.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "hardEnforce", stimID: currStim, userID: localStorage.uid}).done(function() {
				// 	console.log('i wrote to db successfully');
				// }).fail(function() {
				//     console.log( "error; didn't save" );
				// });
				chrome.runtime.sendMessage({type: "enforcement", enforcementType: "hardEnforce", stimID: currStim, userID: localStorage.uid});
				localStorage.enforce = "hard";
				showStimuli();
				$("a:last").hide();
			}
			else if (((totalTime > 0) && (localStorage.enforce !="soft")) && ((totalTime < softTime) || (!JSON.parse(localStorage.hasClicked))))  {
				$("#softEnforcementMessage").html("<b>Bent u klaar met het bekijken van de media? Als u klaar bent om verder te gaan, klik dan nogmaals op de pijl. Indien u terug wilt gaan, kunt u de pagina heropenen door nogmaals op de link te klikken.</b><br><br>");
				if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
				localStorage.done = "False";
				var currStim = localStorage[localStorage.count];
				// $.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "softEnforce", stimID: currStim, userID: localStorage.uid}).done(function() {
				// 	console.log('i wrote to db successfully');
				// }).fail(function() {
				//     console.log( "error; didn't save" );
				// });
				chrome.runtime.sendMessage({type: "enforcement", enforcementType: "softEnforce", stimID: currStim, userID: localStorage.uid});
				localStorage.enforce = "soft";
				showStimuli();
				$("#nextInstructions").html('<br><b>Klik op de onderstaande pijl om terug te keren naar de enqu&#234;te.</b><br><br>');
			}

			//if done with stimuli, send to exit page
			else if (localStorage.done =="True") {
				// console.log("considered done"); for logic testing purposes 
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


		} 
		else { //in the case where it's not the facebook stim
			//hard enforcement
			if ((totalTime > 0) && (totalTime < hardTime) && (localStorage.enforce !="soft")) {
				$("#enforcementMessage").html("<b>Gelieve meer tijd op website te besteden, gebruik de pagina zoals u normaal ook zou doen. Klik nogmaals op de link om verder te gaan.</b><br><br>");
				if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
				localStorage.done = "False";
				var currStim = localStorage[localStorage.count];
				// $.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "hardEnforce", stimID: currStim, userID: localStorage.uid}).done(function() {
				// 	console.log('i wrote to db successfully');
				// }).fail(function() {
				//     console.log( "error; didn't save" );
				// });
				chrome.runtime.sendMessage({type: "enforcement", enforcementType: "hardEnforce", stimID: currStim, userID: localStorage.uid});
				localStorage.enforce = "hard";
				showStimuli();
				$("a:last").hide();
			}
			//soft enforcement
			else if ((totalTime > 0) && (totalTime < softTime) && (localStorage.enforce !="soft")) {
				$("#softEnforcementMessage").html("<b>Bent u klaar met het bekijken van de media? Als u klaar bent om verder te gaan, klik dan nogmaals op de pijl. Indien u terug wilt gaan, kunt u de pagina heropenen door nogmaals op de link te klikken.</b><br><br>");
				if(localStorage.incremented == "True") {localStorage.count = parseInt(localStorage.count) - 1;}
				localStorage.done = "False";
				var currStim = localStorage[localStorage.count];
				// $.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "softEnforce", stimID: currStim, userID: localStorage.uid}).done(function() {
				// 	console.log('i wrote to db successfully');
				// }).fail(function() {
				//     console.log( "error; didn't save" );
				// });
				chrome.runtime.sendMessage({type: "enforcement", enforcementType: "softEnforce", stimID: currStim, userID: localStorage.uid});
				localStorage.enforce = "soft";
				showStimuli();
				$("#nextInstructions").html('<br><b>Klik op de onderstaande pijl om terug te keren naar de enqu&#234;te.</b><br><br>');

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
		}


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
	$("#mediaTitle").html("Media Oefening - "+header1Text[stimNames[localStorage[counter]]]);
	$("#linkToStimulus").html('<a href="/#" onclick="return false">Klik hier</a> '+clickheretoviewText[stimNames[localStorage[counter]]]);
	$("#instructions").html(instructions[stimNames[localStorage[counter]]]);
	$("#stimulusname").attr({stimulus: stimNames[localStorage[counter]], stimID: localStorage[counter]});
}

//click handler for link to view stimuli
$("#linkToStimulus").click(function(){
	clickedLink = true;
	var stimulus = $("#stimulusname").attr("stimulus");
	var stimid = $("#stimulusname").attr("stimID");
	
	
	chrome.runtime.sendMessage({type: "showStim", stimtype: stimulus}, function(response) {
		console.log('tab index: ', response.index);
	});

	
	//start timing
	var d = new Date();
	startTime = d.getTime();
	$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "startTiming", stimID: stimid, userID: localStorage.uid, enforce: localStorage.enforce});
	
	//Show next arrow, change instructions
	$("a:last").show();
	$("#nextInstructions").html('<br><b>Klik op de onderstaande pijl om terug te keren naar de enqu&#234;te.</b><br><br>');
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

		
		chrome.runtime.sendMessage({type: "recordTimes", start: startTime, end: endTime}, function(response) {console.log(response.text);});
		//only want to write browsing history if they've clicked on the stimuli and browsed since the last time they clicked the arrow
		if (clickedLink) {
			var uid = localStorage.uid;
			chrome.runtime.sendMessage({type: "writeBrowsingHistory", stimID: stimid, startTime: startTime, endTime: endTime, userID: uid});
			var currStim = localStorage[localStorage.count];
//			$.post('http://74.207.227.126/writetodb.php', {requestType: "updateStop", stimID: currStim, userID: localStorage.uid});
			chrome.runtime.sendMessage({type: "updateStop", stimID: currStim, userID: uid}); //not sure why this has to go through extension, but direct post doesn't work
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
		
