//content script for facebook

//this content script inserts a new item into the user's news feed by hijacking the first one 
//(hijacking the first one doesn't really delete it since it shows up as soon as the next story is bumped)
//also more efficient than adding an element, I think

//note: tried to make this as un-ajaxed as possible. what we're doing is really tough to ajax since Facebook starts to bleep in the console about displaying unsecure content

//clear the first story
var storytoinsert = $("#home_stream").find("li:first").clone().empty().prependTo($("#home_stream"));
var story = "";

//don't know what this div does
//story = story.concat("<div class='storyHighlightIndicatorWrapper'></div>");

//main story content div
//story = story.concat("<div class='storyContent' id='ourStoryContent'><div class='UIImageBlock clearfix'>");
story = story.concat("<div class='clearfix storyContent'>");

//the profile pic on the left (Sam McDonald)
story = story.concat("<a class='actorPhoto lfloat' tabindex='-1' href='https://www.facebook.com/profile.php?id=100003777526441' aria-hidden='true' data-ft='{&quot;type&quot;:60,&quot;tn&quot;:&quot;\u003C&quot;}' data-hovercard='/ajax/hovercard/hovercard.php?id=100003777526441'><img class='_s0 profilePic _rw img' src='https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc4/370389_100003777526441_975946891_n.jpg' alt='' clicktext='actor'></a>");

//the inner content
story = story.concat("<div class = 'storyInnerContent UIImageBlock_Content UIImageBlock_MED_Content'>");

//hide story or report as spam button
story = story.concat("<div class='uiInlineBlock  mlm uiPopover highlightSelector uiStreamHide' data-ft='{&quot;type&quot;:55,&quot;tn&quot;:&quot;V&quot;}' id='ue1upx_79'><a class='uiStreamContextButton uiPopoverTriggerElem highlightSelectorButton' href='#' aria-haspopup='true' rel='toggle' id='ue1upx_80'></a></div>");

//main wrapper
story = story.concat("<div class='mainWrapper'>");

//header says: Samuel Madden and 2 others from your Extended Network shared a link
story = story.concat("<h6 class = 'uiStreamMessage uiStreamHeadline uiStreamPassive' data-ft='{'tn':'B','type':1}'>");
story = story.concat("<a class='passiveName' href='https://www.facebook.com/profile.php?id=100003777526441' data-ft='{'tn':';'}' data-hovercard='/ajax/hovercard/user.php?id=100003777526441'><b clicktext='actor'>Sam McDonald</b></a>");
story = story.concat(" and ");
story = story.concat('<a data-hover="tooltip" title="Glynn Urban &#013;Rob Maury" tooltip-position="below" clicktext="actor">2 others</a>');
story = story.concat(" from your Extended Network shared ");
story = story.concat('<a href="http://www.facebook.com/chevrolet" data-ft="{&quot;tn&quot;:&quot;P&quot;}" data-hovercard="/ajax/hovercard/page.php?id=77589292295" aria-owns="u36lbe_1" aria-controls="u36lbe_1" aria-haspopup="true" id="js_2" clicktext="brand">Chevrolet</a>');
story = story.concat("'s ");
story = story.concat('<a class="pronoun-link " href="http://www.facebook.com/photo.php?fbid=10150652385022296&amp;set=a.85544662295.79912.77589292295&amp;type=1" data-ft="{&quot;tn&quot;:&quot;A&quot;}" clicktext="photo">photo</a>.</h6>');

//photo content and blurb
story = story.concat('<div class="mvm uiStreamAttachments clearfix fbMainStreamAttachment"><div>');
story = story.concat('<a class="uiPhotoThumb largePhoto" href="http://www.facebook.com/photo.php?fbid=10150652385022296&amp;set=a.85544662295.79912.77589292295&amp;type=1&amp;ref=nf" rel="theater" ajaxify="http://www.facebook.com/photo.php?fbid=10150652385022296&amp;set=a.85544662295.79912.77589292295&amp;type=1&amp;ref=nf&amp;src=http%3A%2F%2Fsphotos.xx.fbcdn.net%2Fhphotos-ash4%2F427569_10150652385022296_77589292295_8916875_1750723335_n.jpg&amp;size=960%2C293&amp;theater" target="" data-ft="{&quot;type&quot;:41,&quot;tn&quot;:&quot;E&quot;}" aria-label="Photo"><img class="img" src="http://sphotos.xx.fbcdn.net/hphotos-ash4/s320x320/427569_10150652385022296_77589292295_8916875_1750723335_n.jpg" alt="" width="300" height="91" clicktext="photo"></a>');
story = story.concat('<div class="fsm fwn fcg"><div class="uiAttachmentTitle" data-ft="{&quot;type&quot;:11,&quot;tn&quot;:&quot;C&quot;}"><strong><a href="http://www.facebook.com/media/set/?set=a.85544662295.79912.77589292295&amp;type=3" target="" data-hovercard="/ajax/hovercard/page.php?id=77589292295" clicktext="album">Wall Photos</a></strong> </div><span class="caption" data-ft="{&quot;tn&quot;:&quot;L&quot;}"><div id="id_4fc5cef705ff41496484938" class="text_exposed_root">SXSW is all about inspiration and innovation, the driving forces behind our yout<span class="text_exposed_hide">...</span><span class="text_exposed_show">h concept cars, Tru 140S and Code 130R. Tell us which car inspires you: <a href="http://spr.ly/TruVCode" target="_blank" rel="nofollow nofollow" onmousedown="UntrustedLink.bootstrap($(this), &quot;8AQFWuH60&quot;, event, bagof(null));" clicktext="contentLink">http://spr.ly/TruVCode</a></span><span class="text_exposed_hide"><span class="text_exposed_link"><a onclick="CSS.addClass($(&quot;id_4fc5cef705ff41496484938&quot;), &quot;text_exposed&quot;);" clicktext="expand">See More</a></span></span></div></span><div class="mts uiAttachmentDesc translationEligibleUserAttachmentMessage" data-ft="{&quot;tn&quot;:&quot;M&quot;}"><div><div class="fsm fwn fcg">By: <span class="uiAttachmentDetails" data-ft="{&quot;type&quot;:12}"><a href="http://www.facebook.com/chevrolet" data-hovercard="/ajax/hovercard/page.php?id=77589292295" clicktext="brand">Chevrolet</a></span></div></div></div></div>');
story = story.concat('</div></div>');

//stuff in between video and what people said about it (like, comment, share links)
story = story.concat("<span class='uiStreamFooter'><span class='UIActionLinks UIActionLinks_bottom'>");
story = story.concat('<button id="ourLikeButton" class="like_link stat_elem as_link" title="Like this item" type="submit" name="like" data-ft="{&quot;tn&quot;:&quot;&gt;&quot;,&quot;type&quot;:22}"><span id="ourLike" class="default_message" clicktext="like">Like</span><span id="ourDislike" class="saving_message" clicktext="unlike">Unlike</span></button>');
story = story.concat(" · ");
story = story.concat('<label id="ourCommentButton" class="uiLinkButton comment_link" title="Leave a comment"> <input data-ft="{&quot;type&quot;:24,&quot;tn&quot;:&quot;S&quot;}" type="button" value="Comment" onclick="return fc_click(this);" clicktext="comment"></label>');
story = story.concat(" · ");
story = story.concat('<a class="share_action_link" title="Send this to friends or post it on your timeline." clicktext="share">Share</a>');
story = story.concat("</span></span>");

//Stuff under like, comment, share (shows up if you press those buttons)
story = story.concat('<div><ul class="uiList uiUfi focus_target fbUfi">');
story = story.concat('<li id="showOnClick" class="ufiNub uiListItem uiListVerticalItemBorder"><i></i></li>');
story = story.concat('<li id="showOnLike" class="ufiItem uiUfiLike uiListItem uiListVerticalItemBorder"><div class="UIImageBlock clearfix"><a class="UIImageBlock_Image UIImageBlock_ICON_Image" href="#" tabindex="-1" aria-hidden="true"><label class="uiUfiLikeIcon" title="Like this item" onclick="this.form.like.click();"></label></a><div class="UIImageBlock_Content UIImageBlock_ICON_Content">You like this.</div></div></li>');
story = story.concat('<li class="translateable_info hidden_elem uiListItem  uiListVerticalItemBorder"><input type="hidden" autocomplete="off" name="translate_on_load" value=""></li>');

//comments
//get their name, profile picture and link
var profpic = $(".fbxWelcomeBoxImg").attr("src");
var proflink = $(".fbxWelcomeBoxBlock").attr("href");
var profname = $(".fbxWelcomeBoxName").html();

//comment list
//gets added onto every time user posts
story = story.concat('<li class="uiUfiComments uiListItem uiListVerticalItemBorder"><ul id="ourCommentList" class="commentList">');
var comment = '<li class="uiUfiComment ufiItem ufiItem"><div class="UIImageBlock clearfix uiUfiActorBlock"><a class="actorPic UIImageBlock_Image UIImageBlock_SMALL_Image" href="'+proflink+'" tabindex="-1"><img class="uiProfilePhoto uiProfilePhotoMedium img" src="'+profpic+'"></a><label data-hover="tooltip" title="Remove" class="deleteAction stat_elem UIImageBlock_Ext uiCloseButton"><input type="submit"></label><div class="commentContent UIImageBlock_Content UIImageBlock_SMALL_Content"><a class="actorName" href="'+proflink+'">'+profname+'</a><span data-jsid="text" class="commentBody ourCommentBody"> Testing comments</span><span></span><div class="commentActions fsm fwn fcg"><a class="uiLinkSubtle">a few minutes ago</a> · <span class="comment_like_2740170 fsm fwn fcg"><button class="stat_elem as_link cmnt_like_link" type="submit" title="Like this comment"><span class="default_message">Like</span></button></span></div></div></div></li>';
story = story.concat('</ul></li>');

//comment box
story = story.concat('<li id="ourAddComment" class="uiUfiAddComment clearfix uiUfiSmall ufiItem ufiItem uiListItem uiListVerticalItemBorder uiUfiAddCommentCollapsed"><div class="UIImageBlock clearfix mentionsAddComment"><div class="commentArea UIImageBlock_Content UIImageBlock_ICON_Content"><div class="commentBox"><div class="uiMentionsInput textBoxContainer"><div class="highlighter"><div><span class="highlighterContent"></span></div></div><div class="uiTypeahead mentionsTypeahead"><div class="wrap"><input type="hidden" autocomplete="off" class="hiddenInput"><div class="innerWrap"><textarea class="enter_submit DOMControl_placeholder uiTextareaNoResize uiTextareaAutogrow textBox mentionsTextarea textInput" title="Write a comment..." placeholder="Write a comment..." name="add_comment_text" autocomplete="off" aria-autocomplete="list" aria-expanded="false" aria-invalid="false" aria-owns="typeahead_list_uv5o1r_29" role="textbox" onkeydown="Bootloader.loadComponents([&quot;control-textarea&quot;], function() { TextAreaControl.getInstance(this) }.bind(this)); " clicktext="commentBox">Write a comment...</textarea></div></div></div><input type="hidden" autocomplete="off" class="mentionsHidden"></div></div><label class="mts commentBtn stat_elem hidden_elem optimistic_submit uiButton uiButtonConfirm" for="uv5o1r_31"><input value="Comment" class="enter_submit_target" name="comment" type="submit"></label></div></div></li>');
story = story.concat('</ul></div>');

//closing the  divs
story = story.concat("</div></div></div></div>");

//add story to news feed
storytoinsert.append(story);

//start with like, comment sections hidden
$("#showOnClick").hide();
$("#showOnLike").hide();
$("#ourAddComment").hide();

//click listeners for like, comment buttons that toggle those sections
var count = 0;
$("#ourLikeButton").click(function(){
	count += 1;
	$("#ourLike").toggle();
	$("#ourDislike").toggle();
	if (count%2 == 1) {
		$("#showOnClick").show();
		$("#ourAddComment").show();
	}
	else {
		$("#showOnClick").hide();
		$("#ourAddComment").hide();
	}
	$("#showOnLike").toggle();
});
$("#ourCommentButton").click(function(){
	$("#showOnClick").show();
	$("#ourAddComment").show();
});

//Event listener for comment text box, posting comments
var commentDone = false;
var commenttext = "";
$("#ourAddComment").find(".textBox").keydown(function(event){processComment(event);});

function processComment(event) { //fromCharCode(event.keyCode) is really unreliable, so this makes you look like you're making lots of typos. oh well. don't know how to fix.

	// if previous comment text was already posted, empty it
	if (commentDone) {
		commenttext = "";
		commentDone = false;
	}
	
	//comment is done if they press enter, so add comment to list
	if (event.keyCode == 13) {
		commentDone = true;
		commenttext = commenttext.toLowerCase();
		$("#ourAddComment").find(".textBox").attr("value", ""); //empty text box again
		
		//basic comment template, add to list of comments
		$("#ourCommentList").append(comment);
		//replace default comment text with their comment
		$("#ourCommentList").find(":last-child").filter(".uiUfiComment").find(".ourCommentBody").html(" "+commenttext);
		//record comment action in database
		chrome.extension.sendRequest({type: "writeComment", stimID: "3"});
	}
	
	//account for backspacing
	if (event.keyCode == 8) {
		commenttext = commenttext.slice(0, -1);
	}
	
	else {
		commenttext = commenttext.concat(String.fromCharCode(event.keyCode));
	}
}

storytoinsert.mousedown(function(event) {
	chrome.extension.sendRequest({type: "writeClick", stimID: "3", target: event.target.getAttribute("clicktext")});
});

//Ensures that script runs when they click on FB logo or Home buttton
$("#pageLogo").find("a").attr("href", "https://www.facebook.com/");
$("#navHome").find("a").attr("href", "https://www.facebook.com/");

