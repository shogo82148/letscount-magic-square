var PERIOD_SHOW = 50;
var COUNT_PERIOD_SHOW = 31;
var SLEEP_TIME = 0;
var nowimpl = !!Date.now;
var lastMatrix;
addEventListener('message', onMessage, false);

function onMessage(e) {
    var data = e.data;
    var startTime = nowimpl ? Date.now() : +new Date();
    if(data.rows == 3) {
        count3();
    } else if(data.rows == 4) {
        PERIOD_SHOW = 0;
        COUNT_PERIOD_SHOW = 1;
        SLEEP_TIME = 10;
        count4();
    } else if(data.rows == 5) {
        count5();
    }
    // 結果出力
    postMessage({
        matrix: lastMatrix,
        count: count,
        time: (nowimpl ? Date.now() : +new Date()) - startTime
    });
}

function count3() {
    /* <COUNT3> */
}

function count4() {
    /* <COUNT4> */
}

function count5() {
    /* <COUNT5> */
}


var count = [0]; // 見つけた魔方陣の数
var lastShowTime = nowimpl ? Date.now() : +new Date();
function show_ans(matrix) {
    // カウントアップ処理
    var i = 0;
    count[0] += 1;
    for(i=0; count[i]>=10000; i++) {
        count[i] = 0;
        if(count[i+1]) {
            count[i+1] += 1;
        } else {
            count[i+1] = 1;
        }
    }
    lastMatrix = matrix;

    if(count[0] % COUNT_PERIOD_SHOW !=0) return;

    // 時間計測
    var now = nowimpl ? Date.now() : +new Date();
    if(now - lastShowTime < PERIOD_SHOW) return;
    lastShowTime = now;

        // ウエイトを挿入
    while(now - lastShowTime < SLEEP_TIME) {
        now = nowimpl ? Date.now() : +new Date();
    }

    // 経路表示
    postMessage({
        matrix: matrix,
        count:  count
    });
    lastShowTime = now;
}
