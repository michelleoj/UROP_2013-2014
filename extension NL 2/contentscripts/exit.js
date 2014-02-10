//content script for our exit page
//gets the stimuli that the user viewed from the background page and changes the link on the exit.php accordingly

var stimsViewed = new Array();
var uid = localStorage.uid;

//record that user has finished the stimuli in the database
$.post('http://74.207.227.126/nl/writetodb.php', {requestType: "writeDone", userID: uid});

//build stimsViewed array, in order


var num = parseInt(localStorage.numStims);
for (i=0; i< 3; i++) {
	if (i < num) {
		stimsViewed.push(parseInt(localStorage[i]));
		}
}

var exitURL = localStorage.link;

//change exit link with stimsViewed info
if (num==3){
	var stim1; var stim2; var stim3;
	switch(stimsViewed[0]) {
		case 0: stim1 = 1; break; //tv
		case 1: stim1 = 2; break; //facebook
		case 2: stim1 = 3; break; //control
	}
	switch(stimsViewed[1]) {
		case 0: stim2 = 1; break; //tv
		case 1: stim2 = 2; break; //facebook
		case 2: stim2 = 3; break; //control
	}
	switch(stimsViewed[2]) {
		case 0: stim3 = 1; break; //tv
		case 1: stim3 = 2; break; //facebook
		case 2: stim3 = 3; break; //control
	}
	$("#exitURL").attr("href", exitURL+"&s1="+stim1+"&s2="+stim2+"&s3="+stim3);
}
else if (num==2){
	var stim1; var stim2;
	switch(stimsViewed[0]) {
		case 0: stim1 = 1; break; //tv
		case 1: stim1 = 2; break; //facebook
		case 2: stim1 = 3; break; //control
	}
	switch(stimsViewed[1]) {
		case 0: stim2 = 1; break; //tv
		case 1: stim2 = 2; break; //facebook
		case 2: stim2 = 3; break; //control
	}
	$("#exitURL").attr("href", exitURL+"&s1="+stim1+"&s2="+stim2);
}
else if (num==1){
	var stim1;
	switch(stimsViewed[0]) {
		case 0: stim1 = 1; break; //tv
		case 1: stim1 = 2; break; //facebook
		case 2: stim1 = 3; break; //control
	}
	$("#exitURL").attr("href", exitURL+"&s1="+stim1);
}