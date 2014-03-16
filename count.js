var PERIOD_SHOW = 50;
var COUNT_PERIOD_SHOW = 31;
var SLEEP_TIME = 0;
var nowimpl = !!Date.now;

addEventListener('message', onMessage, false);

function onMessage(e) {
    var data = e.data;
    count(data.rows, data.cols);
}

function count(rows, cols) {
}
