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

function my_asm_module(stdlib, foreign, heap) {
    "use asm";

    var show_ans3 = foreign.show_ans3;
    var show_ans4 = foreign.show_ans4;
    var show_ans5 = foreign.show_ans5;

    function max(a, b) {
        a = a | 0;
        b = b | 0;
        return ((a|0) < (b|0) ? (b|0) : (a|0)) | 0;
    }

    function min(a, b) {
        a = a | 0;
        b = b | 0;
        return ((a|0) < (b|0) ? (a|0) : (b|0)) | 0;
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

    return {
        count3: count3,
        count4: count4,
        count5: count5
    };
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

var module = my_asm_module(
    {}, {
        show_ans3: function(x11,x12,x13,x21,x22,x23,x31,x32,x33) {
            show_ans([x11,x12,x13,x21,x22,x23,x31,x32,x33]);
        },
        show_ans4: function(x11,x12,x13,x14,x21,x22,x23,x24,x31,x32,x33,x34,x41,x42,x43,x44) {
            show_ans([x11,x12,x13,x14,x21,x22,x23,x24,x31,x32,x33,x34,x41,x42,x43,x44]);
        },
        show_ans5: function(x11,x12,x13,x14,x15,x21,x22,x23,x24,x25,x31,x32,x33,x34,x35,x41,x42,x43,x44,x45,x51,x52,x53,x54,x55) {
            show_ans([x11,x12,x13,x14,x15,x21,x22,x23,x24,x25,x31,x32,x33,x34,x35,x41,x42,x43,x44,x45,x51,x52,x53,x54,x55]);
        }
    }
);
var count3 = module.count3;
var count4 = module.count4;
var count5 = module.count5;
