console.log('extension click there?', $('.extension-click'));
		$('.extension-click').on('click', function(event) {
			console.log('clicked');

			  $(window).bind('storage', function (e) {
			    console.log('storage changed');
			  });

			  localStorage.setItem('a', 'test');

			chrome.extension.sendRequest({type: "writeClick", stimID: "3", target: event.target.getAttribute("clicktext")});
		});