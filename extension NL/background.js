//general handler for all messages targeted at the Chrome Extension, sent by content script

var stimURLs = {
	"Facebook": "http://www.facebook.com",
	"TV" : "http://74.207.227.126/nl/tv/tv.html", //for some reason the relative URL doesnt work... so hard-coding here. 
	"Controle": "http://74.207.227.126/nl/artikel.htm"  //english version of article. not nested in the nl folder
};

//this is where state is stored in the chrome extension
var seg = -1;
var userid = -1;

var start = -1;
var end = -1;

// var stims;
// var count = 0;
// var sEnforce = false;
// var stimsDone = false;

chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		
		if(request.type == "showStim"){
			var stimUrl = stimURLs[request.stimtype];
			var index;
			var tabindex;
			chrome.tabs.query({
		        url: "http://74.207.227.126/nl/stim.php"
		    }, function(tabs) {
		        // result is an array of tab.Tabs
		         // There's exactely one tab matching the query.
	            var tabindex;
	            // details.message holds the original message
	            for (var i = 0; i < tabs.length; i++) {
	            	tabindex = tabs[i].index;
		            console.log(tabs[i].title, ' tab index: ', tabs[i].index);
		        }
	            sendResponse({ type: "test", index: tabindex });
	            console.log(tabindex);
				chrome.tabs.create({"url": stimUrl, "index": tabindex+1});
		    });



//			sendResponse({text: request.type + " successful"});
		}
		
		else if(request.type == "setUserInfo"){
			seg = request.seg;
			userid = request.userid;	
			sendResponse({text: request.type + " successful"});
		}
		
		else if(request.type == "getUserID") {
			sendResponse({uid: userid});
		}
		
		else if(request.type == "getUserSegment"){
			sendResponse({segment: seg});
		}
		
		else if(request.type == "writeBrowsingHistory"){
			var startbrowse =  request.startTime;
			var endbrowse = request.endTime;
//			//in case this is not the first try, delete all others from db
//			$.post('http://74.207.227.126/writetodb.php', {requestType: "deleteBrowsingHistory", stimID: request.stimID}, function(){

			chrome.history.search({text: "", startTime: startbrowse, endTime: endbrowse}, function(results){
				//loop through backwards so that entries are recorded in chronological order
				for (var i = results.length-1; i>=0; i--){
//					console.log(results[i].url+" at "+results[i].lastVisitTime);
				$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "browsingHistory", url: results[i].url, stimID: request.stimID, time: results[i].lastVisitTime, userID: request.userID});
				}
			}); 
//			});
		}
		
		else if(request.type == "recordTimes") {
			start = request.start;
			end = request.end;
			sendResponse({text: request.type + " successful"});
		}
		
		else if(request.type == "getTimes") {
			sendResponse({startTime: start, endTime: end});
		}
		
		else if(request.type == "updateStop") {
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "updateStop", stimID: request.stimID, userID: request.userID}) //why is this from request?
		}
		
		else if(request.type == "writeClick") {
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "action", actionType: "click", target: request.target, stimID: request.stimID, userID: userid});
		}
		
		else if(request.type == "writeComment") {
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "action", actionType: "comment", target: "null", stimID: request.stimID, userID: userid});
		}

		else if (request.type == "startTiming") {
			$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "startTiming", stimID: request.stimID, userID: request.userID});
		}
		else if(request.type == "enforcement") {
			if (request.enforcementType == "softEnforce") {
				$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "softEnforce", stimID: request.stimID, userID: request.userID}).fail(function(msg) {
					alert(msg);
				});
			}
			else if (request.enforcementType == "hardEnforce") {
				$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "enforcement", enforcementType: "hardEnforce", stimID: request.stimID, userID: request.userID}).fail(function(msg) {
					alert(msg);
				});
			}
			sendResponse({text:"enforcement successful"});
		}
	});


	
