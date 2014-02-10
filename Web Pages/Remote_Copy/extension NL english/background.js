//general handler for all messages targeted at the Chrome Extension, sent by content script

var stimURLs = {
	"Facebook": "http://www.facebook.com",
	"TV" : "http://74.207.227.126/nl/tv/tv.html", //for some reason the relative URL doesnt work... so hard-coding here. 
	"Control": "http://74.207.227.126/c/u.html"  //english version of article. not nested in the nl folder
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

chrome.extension.onRequest.addListener(
	function(request,sender,sendResponse){
		
		if(request.type == "showStim"){
			var stimUrl = stimURLs[request.stimtype];
			chrome.tabs.create({"url": stimUrl});
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

		// else if (request.type == "startTiming") {
			// $.post('http://74.207.227.126/writetodb.php', {requestType: "startTiming", stimID: stims[count-1], userID: userid});
		// }
		// else if(request.type == "hardEnforce") {
			// count -= 1;
// //			$.post('http://74.207.227.126/writetodb.php', {requestType: "enforcement", enforcementType: "hardEnforce", stimID: stims[count], userID: userid});
// //			$.post('http://74.207.227.126/writetodb.php', {requestType: "deleteStart", stimID: stims[count], userID: userid}); decided we'd rather have this info, especially since we don't need to delete this for timing purposes anymore
			// sendResponse({text:"hardEnforce successful"});
		// }
		// else if(request.type == "softEnforce") {
			// count -= 1;
// //			sEnforce = true;
// //			$.post('http://74.207.227.126/writetodb.php', {requestType: "enforcement", enforcementType: "softEnforce", stimID: stims[count], userID: userid});
			// sendResponse({text:"softEnforce successful"});
		// }
	});

	
	
