document.addEventListener('DOMContentLoaded', function(){
	var time;
	document.getElementById('submit').onclick = function(){
		if (this.innerText == '开始') {
			var msg = {
				action: true,
				distance: document.getElementById('distance').value,
				interval: document.getElementById('interval').value
			};
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, msg, function(response){
					console.log(response);
					time = response.time;
				});
			});
			this.innerText = '停止';
		} else {
			var msg = {
				action: false,
				time: time
			}
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, msg);
			});
			this.innerText = '开始';
		}
	}
});