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

function count5() {
    var used = 0;
    for(var x22 = 1; x22 <= 25; x22++) {
        if((used & (1 << x22))) continue;
        used |= (1 << x22);
        for(var x44 = 1; x44 <= 25; x44++) {
            if(!(x22 < x44) || (used & (1 << x44))) continue;
            used |= (1 << x44);
            for(var x24 = 1; x24 <= 25; x24++) {
                if(!(x22 < x44) || (used & (1 << x24))) continue;
                used |= (1 << x24);
                for(var x42 = 1; x42 <= 25; x42++) {
                    if(!(x24 < x42) || (used & (1 << x42))) continue;
                    used |= (1 << x42);
                    for(var x11 = 1; x11 <= 25; x11++) {
                        if((used & (1 << x11))) continue;
                        used |= (1 << x11);
                        var min_x33 = Math.max(1,65-(x11+x22+x44)-5*5);
                        var max_x33 = Math.min(25,65-(x11+x22+x44)-1);
                        for(var x33 = min_x33; x33 <= max_x33; x33++) {
                            if((used & (1 << x33))) continue;
                            used |= (1 << x33);
                            X55: {
                                var x55 = 65 - (x11+x22+x33+x44);
                                if(x55 < 1 || (used & (1 << x55))) break X55;
                                used |= (1 << x55);
                                var min_x15 = Math.max(1,65-(x24+x33+x42)-5*5);
                                var max_x15 = Math.min(25,65-(x24+x33+x42)-1);
                                for(var x15 = min_x15; x15 <= max_x15; x15++) {
                                    if((used & (1 << x15))) continue;
                                    used |= (1 << x15);
                                    X51: {
                                        var x51 = 65 - (x15+x24+x33+x42);
                                        if(x51 < 1 || (used & (1 << x51))) break X51;
                                        used |= (1 << x51);
                                        for(var x12 = 1; x12 <= 25; x12++) {
                                            if((used & (1 << x12))) continue;
                                            used |= (1 << x12);
                                            var min_x13 = Math.max(1,65-(x11+x12+x15)-5*5);
                                            var max_x13 = Math.min(25,65-(x11+x12+x15)-1);
                                            for(var x13 = min_x13; x13 <= max_x13; x13++) {
                                                if((used & (1 << x13))) continue;
                                                used |= (1 << x13);
                                                X14: {
                                                    var x14 = 65 - (x11+x12+x13+x15);
                                                    if(x14 < 1 || (used & (1 << x14))) break X14;
                                                    used |= (1 << x14);
                                                    for(var x21 = 1; x21 <= 25; x21++) {
                                                        if((used & (1 << x21))) continue;
                                                        used |= (1 << x21);
                                                        var min_x23 = Math.max(1,65-(x21+x22+x24)-5*5);
                                                        var max_x23 = Math.min(25,65-(x21+x22+x24)-1);
                                                        for(var x23 = min_x23; x23 <= max_x23; x23++) {
                                                            if((used & (1 << x23))) continue;
                                                            used |= (1 << x23);
                                                            X25: {
                                                                var x25 = 65 - (x21+x22+x23+x24);
                                                                if(x25 < 1 || (used & (1 << x25))) break X25;
                                                                used |= (1 << x25);
                                                                var min_x31 = Math.max(1,65-(x11+x21+x51)-5*5);
                                                                var max_x31 = Math.min(25,65-(x11+x21+x51)-1);
                                                                for(var x31 = min_x31; x31 <= max_x31; x31++) {
                                                                    if((used & (1 << x31))) continue;
                                                                    used |= (1 << x31);
                                                                    X41: {
                                                                        var x41 = 65 - (x11+x21+x31+x51);
                                                                        if(x41 < 1 || (used & (1 << x41))) break X41;
                                                                        used |= (1 << x41);
                                                                        var min_x32 = Math.max(1,65-(x12+x22+x42)-5*5);
                                                                        var max_x32 = Math.min(25,65-(x12+x22+x42)-1);
                                                                        for(var x32 = min_x32; x32 <= max_x32; x32++) {
                                                                            if((used & (1 << x32))) continue;
                                                                            used |= (1 << x32);
                                                                            X52: {
                                                                                var x52 = 65 - (x12+x22+x32+x42);
                                                                                if(x52 < 1 || (used & (1 << x52))) break X52;
                                                                                used |= (1 << x52);
                                                                                var min_x34 = Math.max(1,65-(x14+x24+x44)-5*5,65-(x31+x32+x33)-5*5);
                                                                                var max_x34 = Math.min(25,65-(x14+x24+x44)-1,65-(x31+x32+x33)-1);
                                                                                for(var x34 = min_x34; x34 <= max_x34; x34++) {
                                                                                    if((used & (1 << x34))) continue;
                                                                                    used |= (1 << x34);
                                                                                    X35: {
                                                                                        var x35 = 65 - (x31+x32+x33+x34);
                                                                                        if(x35 < 1 || (used & (1 << x35))) break X35;
                                                                                        used |= (1 << x35);
                                                                                        X45: {
                                                                                            var x45 = 65 - (x15+x25+x35+x55);
                                                                                            if(x45 < 1 || (used & (1 << x45))) break X45;
                                                                                            used |= (1 << x45);
                                                                                            X43: {
                                                                                                var x43 = 65 - (x41+x42+x44+x45);
                                                                                                if(x43 < 1 || (used & (1 << x43))) break X43;
                                                                                                used |= (1 << x43);
                                                                                                X53: {
                                                                                                    var x53 = 65 - (x13+x23+x33+x43);
                                                                                                    if(x53 < 1 || (used & (1 << x53))) break X53;
                                                                                                    used |= (1 << x53);
                                                                                                    X54: {
                                                                                                        var x54 = 65 - (x14+x24+x34+x44);
                                                                                                        if(x54+x51+x52+x53+x55 != 65 || x54 < 1 || (used & (1 << x54))) break X54;
                                                                                                        used |= (1 << x54);
                                                                                                        show_ans([x11,x12,x13,x14,x15,x21,x22,x23,x24,x25,x31,x32,x33,x34,x35,x41,x42,x43,x44,x45,x51,x52,x53,x54,x55]);
                                                                                                        used &= ~(1 << x54);
                                                                                                    }
                                                                                                    used &= ~(1 << x53);
                                                                                                }
                                                                                                used &= ~(1 << x43);
                                                                                            }
                                                                                            used &= ~(1 << x45);
                                                                                        }
                                                                                        used &= ~(1 << x35);
                                                                                    }
                                                                                    used &= ~(1 << x34);
                                                                                }
                                                                                used &= ~(1 << x52);
                                                                            }
                                                                            used &= ~(1 << x32);
                                                                        }
                                                                        used &= ~(1 << x41);
                                                                    }
                                                                    used &= ~(1 << x31);
                                                                }
                                                                used &= ~(1 << x25);
                                                            }
                                                            used &= ~(1 << x23);
                                                        }
                                                        used &= ~(1 << x21);
                                                    }
                                                    used &= ~(1 << x14);
                                                }
                                                used &= ~(1 << x13);
                                            }
                                            used &= ~(1 << x12);
                                        }
                                        used &= ~(1 << x51);
                                    }
                                    used &= ~(1 << x15);
                                }
                                used &= ~(1 << x55);
                            }
                            used &= ~(1 << x33);
                        }
                        used &= ~(1 << x11);
                    }
                    used &= ~(1 << x42);
                }
                used &= ~(1 << x24);
            }
            used &= ~(1 << x44);
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
