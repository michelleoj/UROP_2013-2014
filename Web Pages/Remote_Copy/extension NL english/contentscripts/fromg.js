//userscript that runs on the landing page fromg.php to pull in state from gongos
//and store in the background page 

//NOTE: for now, I used a GET for the request Gongos will send. 

// Read a page's GET URL variables and return them as an associative array.
//source: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

localStorage.incremented = "False";
var uid = getUrlVars()["uid"];
var segment = getUrlVars()["segment"];
var referringLink = decodeURIComponent(getUrlVars()["return"]);
localStorage.link = referringLink;

//fromg.php tries to store user in database
//if userid already recorded, then creates oldID div with "True"

//if a new user (not oldID) then we want to reset all variables stored
if ($("#oldID").html() != "True") {
	localStorage.count = "0";
	localStorage.done = "False";
	localStorage.enforce = "none";
	localStorage.pastStim = "first";
//	localStorage.softEnforce = "False";
//	localStorage.hardEnforce = "False";
	console.log("New ID");
	localStorage.uid = uid;
	localStorage.segment = segment;

	//read stims from page (fromg.php processes cell and puts stim order in divs)
	var num = 0;
	$(".stimOrder").each(function(i) {
//		console.log("stim "+i+" is "+this.innerHTML);
		localStorage[i]=this.innerHTML;
		num += 1;
	});
	localStorage.numStims = num;

	//no need to send cell info, since that's coming in to back-end in the php side
	//6/1/12: sending cell info now, using extension to display stimuli
	//6/15/12: now cell info is stored in local storage, not needed in background page
	chrome.extension.sendRequest({type: "setUserInfo", seg: segment, userid: uid}, 
									function(response){
										console.log(response.text);
									});
}

//if user has already been to fromg.php before
else {
	//once they are done, recorded in database. fromg.php checks and creates userDone div with "True" if user has finished stims previously.
	//if done, send to exit page
	if(($("#userDone").html() == "True") || localStorage.done == "True") {
		window.location = "exit.php";
	}
	
	//if coming back but not done, get segment and id back from local storage into background page
	//other state is still saved in local storage
	else {
		localStorage.enforce = "none";
		localStorage.pastStim = localStorage[localStorage.count];
		localStorage.uid = uid;
		localStorage.segment = segment;
//		localStorage.hardEnforce = "False";
//		localStorage.softEnforce = "False";
		chrome.extension.sendRequest({type: "setUserInfo", seg: segment, userid: uid}, 
									function(response){
										console.log(response.text);
									});
	}
}
