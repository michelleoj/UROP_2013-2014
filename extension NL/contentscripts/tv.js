//modifies the TV page. gets segment from chrome extension background page
//then displays correct video

var seg = -1;
chrome.extension.sendRequest({type: "getUserSegment"}, 
								function(response){
									seg = response.segment;

if (seg == 1){
	//HTML5
	$("body").html('<div id="video" style="width: 900px; height:560px; margin-left:auto; margin-right:auto; margin-top:0px; background-color:#000"><video id="my_video_1" autoplay preload="auto" width="900" height="540" data-setup="{}"><source src="videos/Peugeot 107.mp4" type="video/mp4"></video></div><div id = "tvbackground"><img src = "img/tvstand.jpg" width="1024px" height="944px" style="position: absolute; top:6px"></div>');
}

else if (seg == 2){
	//HTML5
	$("body").html('<div id="video" style="width: 900px; height:560px; margin-left:auto; margin-right:auto; margin-top:0px; background-color:#000"><video id="my_video_1" autoplay preload="auto" width="900" height="540" data-setup="{}"><source src="videos/Opel Corsa.mov" type="video/mov"></video></div><div id = "tvbackground"><img src = "img/tvstand.jpg" width="1024px" height="944px" style="position: absolute; top:6px"></div>');

}

else if (seg == 3){
	//HTML5
	$("body").html('<div id="video" style="width: 900px; height:560px; margin-left:auto; margin-right:auto; margin-top:0px; background-color:#000"><video id="my_video_1" autoplay preload="auto" width="900" height="540" data-setup="{}"><source src="videos/Opel Astra GTC.mpg" type="video/mpg"></video></div><div id = "tvbackground"><img src = "img/tvstand.jpg" width="1024px" height="944px" style="position: absolute; top:6px"></div>');

};

else if (seg == 4){
	//HTML5
	$("body").html('<div id="video" style="width: 900px; height:560px; margin-left:auto; margin-right:auto; margin-top:0px; background-color:#000"><video id="my_video_1" autoplay preload="auto" width="900" height="540" data-setup="{}"><source src="videos/Opel Insignia.mov" type="video/mov"></video></div><div id = "tvbackground"><img src = "img/tvstand.jpg" width="1024px" height="944px" style="position: absolute; top:6px"></div>');


});