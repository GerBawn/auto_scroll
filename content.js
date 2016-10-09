chrome.runtime.onMessage.addListener(function(message, send, sendResponse) {
	console.log(message);
	var action = message.action;
	if (action === true) {
		var distance = message.distance;
		var interval = message.interval;
		var time = setInterval(function(){
			window.scrollBy(0, distance);
		}, interval * 1000);
		sendResponse({time: time});
	} else {
		clearInterval(message.time);
	}
});