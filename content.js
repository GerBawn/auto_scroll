var scroll = false;
var time, distance, interval;
chrome.runtime.onMessage.addListener(function (message, send, sendResponse) {
    var action = message.action;
    if (action == 'exec') {
        scroll = message.scroll;
        if (scroll === true) {
            distance = message.distance;
            interval = message.interval;
            time = setInterval(function () {
                window.scrollBy(0, distance);
            }, interval * 1000);
        } else {
            clearInterval(time);
        }
    } else if (action == 'query') {
        sendResponse({scroll: scroll, distance: distance, interval: interval});
    }

});