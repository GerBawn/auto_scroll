document.addEventListener('DOMContentLoaded', function () {
    var submit = document.getElementById('submit'),
        distance = document.getElementById('distance'),
        interval = document.getElementById('interval');

    //查询当前页面是否正在滚动
    sendMsgToActiveTab({action: 'query'}, function (response) {
        if (response.scroll === true) {
            submit.innerText = '停止';
            distance.value = response.distance;
            interval.value = response.interval;
        } else {
            submit.innerText = '开始';
            distance.value = '';
            interval.value = '';
        }
    });

    submit.onclick = function () {
        var msg;
        var $this = this;
        if (this.innerText == '开始') {
            msg = {
                action: 'exec',
                scroll: true,
                distance: distance.value,
                interval: interval.value
            };
            sendMsgToActiveTab(msg, function (response) {
                $this.innerText = '停止';
            });
        } else {
            msg = {
                action: 'exec',
                scroll: false
            };
            sendMsgToActiveTab(msg, function (resposne) {
                $this.innerText = '开始';
            });
        }
    }
});

function sendMsgToActiveTab (msg, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, msg, callback);
    });
}