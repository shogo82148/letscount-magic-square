var PERIOD_SHOW = 0;
var COUNT_PERIOD_SHOW = 1;
var SLEEP_TIME = 0;
var nowimpl = !!Date.now;

addEventListener('message', onMessage, false);

function onMessage(e) {
    var data = e.data;
    if(data.rows == 3) {
        count3();
    }
}

function count3() {
    var used = 0;
    for(var x11 = 1; x11 <= 9; x11++) {
        if((used & (1 << x11))) continue;
        used |= (1 << x11);
        var min_x22 = Math.max(1,15-(x11)-3*3);
        var max_x22 = Math.min(9,15-(x11)-1);
        for(var x22 = min_x22; x22 <= max_x22; x22++) {
            if((used & (1 << x22))) continue;
            used |= (1 << x22);
            X33: {
                var x33 = 15 - (x11+x22);
                if(x11 < x33 ||x33 < 1 || (used & (1 << x33))) break X33;
                used |= (1 << x33);
                var min_x13 = Math.max(1,15-(x11)-3*3,15-(x33)-3*3);
                var max_x13 = Math.min(9,15-(x11)-1,15-(x33)-1);
                for(var x13 = min_x13; x13 <= max_x13; x13++) {
                    if(!(x11 < x13) || (used & (1 << x13))) continue;
                    used |= (1 << x13);
                    X31: {
                        var x31 = 15 - (x13+x22);
                        if(x13 < x31 ||x31 < 1 || (used & (1 << x31))) break X31;
                        used |= (1 << x31);
                        X12: {
                            var x12 = 15 - (x11+x13);
                            if(x12 < 1 || (used & (1 << x12))) break X12;
                            used |= (1 << x12);
                            X23: {
                                var x23 = 15 - (x13+x33);
                                if(x23 < 1 || (used & (1 << x23))) break X23;
                                used |= (1 << x23);
                                X21: {
                                    var x21 = 15 - (x22+x23);
                                    if(x21+x11+x31 != 15 || x21 < 1 || (used & (1 << x21))) break X21;
                                    used |= (1 << x21);
                                    X32: {
                                        var x32 = 15 - (x12+x22);
                                        if(x32+x31+x33 != 15 || x32 < 1 || (used & (1 << x32))) break X32;
                                        used |= (1 << x32);
                                        show_ans([x11,x12,x13,x21,x22,x23,x31,x32,x33]);
                                        used &= ~(1 << x32);
                                    }
                                    used &= ~(1 << x21);
                                }
                                used &= ~(1 << x23);
                            }
                            used &= ~(1 << x12);
                        }
                        used &= ~(1 << x31);
                    }
                    used &= ~(1 << x13);
                }
                used &= ~(1 << x33);
            }
            used &= ~(1 << x22);
        }
        used &= ~(1 << x11);
    }

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
