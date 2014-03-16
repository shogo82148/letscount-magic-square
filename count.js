var PERIOD_SHOW = 0;
var COUNT_PERIOD_SHOW = 1;
var SLEEP_TIME = 10;
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
    }
    // 結果出力
    postMessage({
        matrix: lastMatrix,
        count: count,
        time: (nowimpl ? Date.now() : +new Date()) - startTime
    });
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

function count4() {
    var used = 0;
    for(var x22 = 1; x22 <= 16; x22++) {
        if((used & (1 << x22))) continue;
        used |= (1 << x22);
        for(var x33 = 1; x33 <= 16; x33++) {
            if(!(x22 < x33) || (used & (1 << x33))) continue;
            used |= (1 << x33);
            for(var x23 = 1; x23 <= 16; x23++) {
                if(!(x22 < x23) || (used & (1 << x23))) continue;
                used |= (1 << x23);
                for(var x32 = 1; x32 <= 16; x32++) {
                    if(!(x23 < x32) || (used & (1 << x32))) continue;
                    used |= (1 << x32);
                    var min_x11 = Math.max(1,34-(x22+x33)-4*4);
                    var max_x11 = Math.min(16,34-(x22+x33)-1);
                    for(var x11 = min_x11; x11 <= max_x11; x11++) {
                        if((used & (1 << x11))) continue;
                        used |= (1 << x11);
                        X44: {
                            var x44 = 34 - (x11+x22+x33);
                            if(x44 < 1 || (used & (1 << x44))) break X44;
                            used |= (1 << x44);
                            var min_x14 = Math.max(1,34-(x23+x32)-4*4);
                            var max_x14 = Math.min(16,34-(x23+x32)-1);
                            for(var x14 = min_x14; x14 <= max_x14; x14++) {
                                if((used & (1 << x14))) continue;
                                used |= (1 << x14);
                                X41: {
                                    var x41 = 34 - (x14+x23+x32);
                                    if(x41 < 1 || (used & (1 << x41))) break X41;
                                    used |= (1 << x41);
                                    var min_x12 = Math.max(1,34-(x11+x14)-4*4,34-(x22+x32)-4*4);
                                    var max_x12 = Math.min(16,34-(x11+x14)-1,34-(x22+x32)-1);
                                    for(var x12 = min_x12; x12 <= max_x12; x12++) {
                                        if((used & (1 << x12))) continue;
                                        used |= (1 << x12);
                                        X13: {
                                            var x13 = 34 - (x11+x12+x14);
                                            if(x13 < 1 || (used & (1 << x13))) break X13;
                                            used |= (1 << x13);
                                            X42: {
                                                var x42 = 34 - (x12+x22+x32);
                                                if(x42 < 1 || (used & (1 << x42))) break X42;
                                                used |= (1 << x42);
                                                X43: {
                                                    var x43 = 34 - (x13+x23+x33);
                                                    if(x43+x41+x42+x44 != 34 || x43 < 1 || (used & (1 << x43))) break X43;
                                                    used |= (1 << x43);
                                                    var min_x21 = Math.max(1,34-(x11+x41)-4*4,34-(x22+x23)-4*4);
                                                    var max_x21 = Math.min(16,34-(x11+x41)-1,34-(x22+x23)-1);
                                                    for(var x21 = min_x21; x21 <= max_x21; x21++) {
                                                        if((used & (1 << x21))) continue;
                                                        used |= (1 << x21);
                                                        X24: {
                                                            var x24 = 34 - (x21+x22+x23);
                                                            if(x24 < 1 || (used & (1 << x24))) break X24;
                                                            used |= (1 << x24);
                                                            X31: {
                                                                var x31 = 34 - (x11+x21+x41);
                                                                if(x31 < 1 || (used & (1 << x31))) break X31;
                                                                used |= (1 << x31);
                                                                X34: {
                                                                    var x34 = 34 - (x14+x24+x44);
                                                                    if(x34+x31+x32+x33 != 34 || x34 < 1 || (used & (1 << x34))) break X34;
                                                                    used |= (1 << x34);
                                                                    show_ans([x11,x12,x13,x14,x21,x22,x23,x24,x31,x32,x33,x34,x41,x42,x43,x44]);
                                                                    used &= ~(1 << x34);
                                                                }
                                                                used &= ~(1 << x31);
                                                            }
                                                            used &= ~(1 << x24);
                                                        }
                                                        used &= ~(1 << x21);
                                                    }
                                                    used &= ~(1 << x43);
                                                }
                                                used &= ~(1 << x42);
                                            }
                                            used &= ~(1 << x13);
                                        }
                                        used &= ~(1 << x12);
                                    }
                                    used &= ~(1 << x41);
                                }
                                used &= ~(1 << x14);
                            }
                            used &= ~(1 << x44);
                        }
                        used &= ~(1 << x11);
                    }
                    used &= ~(1 << x32);
                }
                used &= ~(1 << x23);
            }
            used &= ~(1 << x33);
        }
        used &= ~(1 << x22);
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
