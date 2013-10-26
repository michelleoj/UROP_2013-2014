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



//change exit link with stimsViewed info
if (num==3){
	$("#exitURL").attr("href", "http://survey2.gongos.com/GP120236C/I519.aspx?pid="+uid+"&s1="+stimsViewed[0]+"&s2="+stimsViewed[1]+"&s3="+stimsViewed[2]);}
else if (num==2){
	$("#exitURL").attr("href", "http://survey2.gongos.com/GP120236C/I519.aspx?pid="+uid+"&s1="+stimsViewed[0]+"&s2="+stimsViewed[1]);}
else if (num==1){
		$("#exitURL").attr("href", "http://survey2.gongos.com/GP120236C/I519.aspx?pid="+uid+"&s1="+stimsViewed[0]);
	}