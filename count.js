var PERIOD_SHOW = 50;
var COUNT_PERIOD_SHOW = 31;
var SLEEP_TIME = 0;
var nowimpl = !!Date.now;
var lastMatrix;
addEventListener('message', onMessage, false);

function onMessage(e) {
    var data = e.data;
    var startTime = nowimpl ? Date.now() : +new Date();
    var no = data.no;
    var workers = data.workers;

    if(data.rows == 3) {
        count3(no, workers);
    } else if(data.rows == 4) {
        PERIOD_SHOW = 0;
        COUNT_PERIOD_SHOW = 1;
        SLEEP_TIME = 10;
        count4(no, workers);
    } else if(data.rows == 5) {
        count5(no, workers);
    }
    // 結果出力
    postMessage({
        matrix: lastMatrix,
        count: count,
        finished: no,
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

    function count3(no, workers) {
        no = no | 0;
        workers = workers | 0;
        var max_x13 = 0, max_x22 = 0, min_x13 = 0, min_x22 = 0, x11 = 0, x12 = 0, x13 = 0, x21 = 0, x22 = 0, x23 = 0, x31 = 0, x32 = 0, x33 = 0;
        var used = 0;
        for(x11 = 1; (x11|0) <= (9|0); x11 = x11 + 1 | 0) {
            if((used & (1 << x11))) continue;
            used = used | (1 << x11);
            min_x22 = max(1|0,(15-(x11)-(9|0))|0)|0|0;
            max_x22 = min(9|0,(15-(x11)-(1|0))|0)|0|0;
            for(x22 = min_x22; (x22|0) <= (max_x22|0); x22 = x22 + 1 | 0) {
                if(used & (1 << x22)) continue;
                used = used | (1 << x22);
                X33: {
                    x33 = 15 - (x11+x22) | 0;
                    if(!((x11|0) < (x33|0))) break X33;
                    if((x33|0) < (1|0)) break X33;
                    if(used & (1 << x33)) break X33;
                    used = used | (1 << x33);
                    min_x13 = max(1|0,max((15-(x11)-(9|0))|0,(15-(x33)-(9|0))|0)|0)|0|0;
                    max_x13 = min(9|0,min((15-(x11)-(1|0))|0,(15-(x33)-(1|0))|0)|0)|0|0;
                    for(x13 = min_x13; (x13|0) <= (max_x13|0); x13 = x13 + 1 | 0) {
                        if(!((x11|0) < (x13|0))) continue;
                        if(used & (1 << x13)) continue;
                        used = used | (1 << x13);
                        X31: {
                            x31 = 15 - (x13+x22) | 0;
                            if(!((x13|0) < (x31|0))) break X31;
                            if((x31|0) < (1|0)) break X31;
                            if(used & (1 << x31)) break X31;
                            used = used | (1 << x31);
                            X12: {
                                x12 = 15 - (x11+x13) | 0;
                                if(!(( (((x11|0)<<20) + ((x22|0)<<16) + ((x33|0)<<12) + ((x13|0)<<8) + ((x31|0)<<4) + (x12|0) | 0) % (workers|0) | 0) == (no|0))) break X12;
                                if((x12|0) < (1|0)) break X12;
                                if(used & (1 << x12)) break X12;
                                used = used | (1 << x12);
                                X23: {
                                    x23 = 15 - (x13+x33) | 0;
                                    if((x23|0) < (1|0)) break X23;
                                    if(used & (1 << x23)) break X23;
                                    used = used | (1 << x23);
                                    X21: {
                                        x21 = 15 - (x22+x23) | 0;
                                        if(((x21+x11+x31)|0) != 15) break X21
                                        if((x21|0) < (1|0)) break X21;
                                        if(used & (1 << x21)) break X21;
                                        used = used | (1 << x21);
                                        X32: {
                                            x32 = 15 - (x12+x22) | 0;
                                            if(((x32+x31+x33)|0) != 15) break X32
                                            if((x32|0) < (1|0)) break X32;
                                            if(used & (1 << x32)) break X32;
                                            used = used | (1 << x32);
                                            show_ans3(no|0,x11|0,x12|0,x13|0,x21|0,x22|0,x23|0,x31|0,x32|0,x33|0);
                                            used = used & ~(1 << x32);
                                        }
                                        used = used & ~(1 << x21);
                                    }
                                    used = used & ~(1 << x23);
                                }
                                used = used & ~(1 << x12);
                            }
                            used = used & ~(1 << x31);
                        }
                        used = used & ~(1 << x13);
                    }
                    used = used & ~(1 << x33);
                }
                used = used & ~(1 << x22);
            }
            used = used & ~(1 << x11);
        }

    }

    function count4(no, workers) {
        no = no | 0;
        workers = workers | 0;
        var max_x11 = 0, max_x12 = 0, max_x14 = 0, max_x21 = 0, min_x11 = 0, min_x12 = 0, min_x14 = 0, min_x21 = 0, x11 = 0, x12 = 0, x13 = 0, x14 = 0, x21 = 0, x22 = 0, x23 = 0, x24 = 0, x31 = 0, x32 = 0, x33 = 0, x34 = 0, x41 = 0, x42 = 0, x43 = 0, x44 = 0;
        var used = 0;
        for(x22 = 1; (x22|0) <= (16|0); x22 = x22 + 1 | 0) {
            if((used & (1 << x22))) continue;
            used = used | (1 << x22);
            for(x33 = 1; (x33|0) <= (16|0); x33 = x33 + 1 | 0) {
                if(!((x22|0) < (x33|0))) continue;
                if((used & (1 << x33))) continue;
                used = used | (1 << x33);
                for(x23 = 1; (x23|0) <= (16|0); x23 = x23 + 1 | 0) {
                    if(!((x22|0) < (x23|0))) continue;
                    if((used & (1 << x23))) continue;
                    used = used | (1 << x23);
                    for(x32 = 1; (x32|0) <= (16|0); x32 = x32 + 1 | 0) {
                        if(!((x23|0) < (x32|0))) continue;
                        if((used & (1 << x32))) continue;
                        used = used | (1 << x32);
                        min_x11 = max(1|0,(34-(x22+x33)-(16|0))|0)|0|0;
                        max_x11 = min(16|0,(34-(x22+x33)-(1|0))|0)|0|0;
                        for(x11 = min_x11; (x11|0) <= (max_x11|0); x11 = x11 + 1 | 0) {
                            if(used & (1 << x11)) continue;
                            used = used | (1 << x11);
                            X44: {
                                x44 = 34 - (x11+x22+x33) | 0;
                                if(!(((((x22|0)<<25) + ((x33|0)<<20) + ((x23|0)<<15) + ((x32|0)<<10) + ((x11|0)<<5) + (x44|0) | 0) % (workers|0) | 0) == (no|0))) break X44;
                                if((x44|0) < (1|0)) break X44;
                                if(used & (1 << x44)) break X44;
                                used = used | (1 << x44);
                                min_x14 = max(1|0,(34-(x23+x32)-(16|0))|0)|0|0;
                                max_x14 = min(16|0,(34-(x23+x32)-(1|0))|0)|0|0;
                                for(x14 = min_x14; (x14|0) <= (max_x14|0); x14 = x14 + 1 | 0) {
                                    if(used & (1 << x14)) continue;
                                    used = used | (1 << x14);
                                    X41: {
                                        x41 = 34 - (x14+x23+x32) | 0;
                                        if((x41|0) < (1|0)) break X41;
                                        if(used & (1 << x41)) break X41;
                                        used = used | (1 << x41);
                                        min_x12 = max(1|0,max((34-(x11+x14)-(16|0))|0,(34-(x22+x32)-(16|0))|0)|0)|0|0;
                                        max_x12 = min(16|0,min((34-(x11+x14)-(1|0))|0,(34-(x22+x32)-(1|0))|0)|0)|0|0;
                                        for(x12 = min_x12; (x12|0) <= (max_x12|0); x12 = x12 + 1 | 0) {
                                            if(used & (1 << x12)) continue;
                                            used = used | (1 << x12);
                                            X13: {
                                                x13 = 34 - (x11+x12+x14) | 0;
                                                if((x13|0) < (1|0)) break X13;
                                                if(used & (1 << x13)) break X13;
                                                used = used | (1 << x13);
                                                X42: {
                                                    x42 = 34 - (x12+x22+x32) | 0;
                                                    if((x42|0) < (1|0)) break X42;
                                                    if(used & (1 << x42)) break X42;
                                                    used = used | (1 << x42);
                                                    X43: {
                                                        x43 = 34 - (x13+x23+x33) | 0;
                                                        if(((x43+x41+x42+x44)|0) != 34) break X43
                                                        if((x43|0) < (1|0)) break X43;
                                                        if(used & (1 << x43)) break X43;
                                                        used = used | (1 << x43);
                                                        min_x21 = max(1|0,max((34-(x11+x41)-(16|0))|0,(34-(x22+x23)-(16|0))|0)|0)|0|0;
                                                        max_x21 = min(16|0,min((34-(x11+x41)-(1|0))|0,(34-(x22+x23)-(1|0))|0)|0)|0|0;
                                                        for(x21 = min_x21; (x21|0) <= (max_x21|0); x21 = x21 + 1 | 0) {
                                                            if(used & (1 << x21)) continue;
                                                            used = used | (1 << x21);
                                                            X24: {
                                                                x24 = 34 - (x21+x22+x23) | 0;
                                                                if((x24|0) < (1|0)) break X24;
                                                                if(used & (1 << x24)) break X24;
                                                                used = used | (1 << x24);
                                                                X31: {
                                                                    x31 = 34 - (x11+x21+x41) | 0;
                                                                    if((x31|0) < (1|0)) break X31;
                                                                    if(used & (1 << x31)) break X31;
                                                                    used = used | (1 << x31);
                                                                    X34: {
                                                                        x34 = 34 - (x14+x24+x44) | 0;
                                                                        if(((x34+x31+x32+x33)|0) != 34) break X34
                                                                        if((x34|0) < (1|0)) break X34;
                                                                        if(used & (1 << x34)) break X34;
                                                                        used = used | (1 << x34);
                                                                        show_ans4(no|0,x11|0,x12|0,x13|0,x14|0,x21|0,x22|0,x23|0,x24|0,x31|0,x32|0,x33|0,x34|0,x41|0,x42|0,x43|0,x44|0);
                                                                        used = used & ~(1 << x34);
                                                                    }
                                                                    used = used & ~(1 << x31);
                                                                }
                                                                used = used & ~(1 << x24);
                                                            }
                                                            used = used & ~(1 << x21);
                                                        }
                                                        used = used & ~(1 << x43);
                                                    }
                                                    used = used & ~(1 << x42);
                                                }
                                                used = used & ~(1 << x13);
                                            }
                                            used = used & ~(1 << x12);
                                        }
                                        used = used & ~(1 << x41);
                                    }
                                    used = used & ~(1 << x14);
                                }
                                used = used & ~(1 << x44);
                            }
                            used = used & ~(1 << x11);
                        }
                        used = used & ~(1 << x32);
                    }
                    used = used & ~(1 << x23);
                }
                used = used & ~(1 << x33);
            }
            used = used & ~(1 << x22);
        }

    }

    function count5(no, workers) {
        no = no | 0;
        workers = workers | 0;
        var max_x13 = 0, max_x15 = 0, max_x23 = 0, max_x31 = 0, max_x32 = 0, max_x33 = 0, max_x34 = 0, min_x13 = 0, min_x15 = 0, min_x23 = 0, min_x31 = 0, min_x32 = 0, min_x33 = 0, min_x34 = 0, x11 = 0, x12 = 0, x13 = 0, x14 = 0, x15 = 0, x21 = 0, x22 = 0, x23 = 0, x24 = 0, x25 = 0, x31 = 0, x32 = 0, x33 = 0, x34 = 0, x35 = 0, x41 = 0, x42 = 0, x43 = 0, x44 = 0, x45 = 0, x51 = 0, x52 = 0, x53 = 0, x54 = 0, x55 = 0;
        var used = 0;
        for(x22 = 1; (x22|0) <= (25|0); x22 = x22 + 1 | 0) {
            if((used & (1 << x22))) continue;
            used = used | (1 << x22);
            for(x44 = 1; (x44|0) <= (25|0); x44 = x44 + 1 | 0) {
                if(!((x22|0) < (x44|0))) continue;
                if((used & (1 << x44))) continue;
                used = used | (1 << x44);
                for(x24 = 1; (x24|0) <= (25|0); x24 = x24 + 1 | 0) {
                    if(!((x22|0) < (x24|0))) continue;
                    if((used & (1 << x24))) continue;
                    used = used | (1 << x24);
                    for(x42 = 1; (x42|0) <= (25|0); x42 = x42 + 1 | 0) {
                        if(!((x24|0) < (x42|0))) continue;
                        if((used & (1 << x42))) continue;
                        used = used | (1 << x42);
                        for(x11 = 1; (x11|0) <= (25|0); x11 = x11 + 1 | 0) {
                            if(!(((((x22|0)<<20) + ((x44|0)<<15) + ((x24|0)<<10) + ((x42|0)<<5) + (x11|0) | 0) % (workers|0) | 0) == (no|0))) continue;
                            if((used & (1 << x11))) continue;
                            used = used | (1 << x11);
                            min_x33 = max(1|0,(65-(x11+x22+x44)-(25|0))|0)|0|0;
                            max_x33 = min(25|0,(65-(x11+x22+x44)-(1|0))|0)|0|0;
                            for(x33 = min_x33; (x33|0) <= (max_x33|0); x33 = x33 + 1 | 0) {
                                if(used & (1 << x33)) continue;
                                used = used | (1 << x33);
                                X55: {
                                    x55 = 65 - (x11+x22+x33+x44) | 0;
                                    if((x55|0) < (1|0)) break X55;
                                    if(used & (1 << x55)) break X55;
                                    used = used | (1 << x55);
                                    min_x15 = max(1|0,(65-(x24+x33+x42)-(25|0))|0)|0|0;
                                    max_x15 = min(25|0,(65-(x24+x33+x42)-(1|0))|0)|0|0;
                                    for(x15 = min_x15; (x15|0) <= (max_x15|0); x15 = x15 + 1 | 0) {
                                        if(used & (1 << x15)) continue;
                                        used = used | (1 << x15);
                                        X51: {
                                            x51 = 65 - (x15+x24+x33+x42) | 0;
                                            if((x51|0) < (1|0)) break X51;
                                            if(used & (1 << x51)) break X51;
                                            used = used | (1 << x51);
                                            for(x12 = 1; (x12|0) <= (25|0); x12 = x12 + 1 | 0) {
                                                if((used & (1 << x12))) continue;
                                                used = used | (1 << x12);
                                                min_x13 = max(1|0,(65-(x11+x12+x15)-(25|0))|0)|0|0;
                                                max_x13 = min(25|0,(65-(x11+x12+x15)-(1|0))|0)|0|0;
                                                for(x13 = min_x13; (x13|0) <= (max_x13|0); x13 = x13 + 1 | 0) {
                                                    if(used & (1 << x13)) continue;
                                                    used = used | (1 << x13);
                                                    X14: {
                                                        x14 = 65 - (x11+x12+x13+x15) | 0;
                                                        if((x14|0) < (1|0)) break X14;
                                                        if(used & (1 << x14)) break X14;
                                                        used = used | (1 << x14);
                                                        for(x21 = 1; (x21|0) <= (25|0); x21 = x21 + 1 | 0) {
                                                            if((used & (1 << x21))) continue;
                                                            used = used | (1 << x21);
                                                            min_x23 = max(1|0,(65-(x21+x22+x24)-(25|0))|0)|0|0;
                                                            max_x23 = min(25|0,(65-(x21+x22+x24)-(1|0))|0)|0|0;
                                                            for(x23 = min_x23; (x23|0) <= (max_x23|0); x23 = x23 + 1 | 0) {
                                                                if(used & (1 << x23)) continue;
                                                                used = used | (1 << x23);
                                                                X25: {
                                                                    x25 = 65 - (x21+x22+x23+x24) | 0;
                                                                    if((x25|0) < (1|0)) break X25;
                                                                    if(used & (1 << x25)) break X25;
                                                                    used = used | (1 << x25);
                                                                    min_x31 = max(1|0,(65-(x11+x21+x51)-(25|0))|0)|0|0;
                                                                    max_x31 = min(25|0,(65-(x11+x21+x51)-(1|0))|0)|0|0;
                                                                    for(x31 = min_x31; (x31|0) <= (max_x31|0); x31 = x31 + 1 | 0) {
                                                                        if(used & (1 << x31)) continue;
                                                                        used = used | (1 << x31);
                                                                        X41: {
                                                                            x41 = 65 - (x11+x21+x31+x51) | 0;
                                                                            if((x41|0) < (1|0)) break X41;
                                                                            if(used & (1 << x41)) break X41;
                                                                            used = used | (1 << x41);
                                                                            min_x32 = max(1|0,(65-(x12+x22+x42)-(25|0))|0)|0|0;
                                                                            max_x32 = min(25|0,(65-(x12+x22+x42)-(1|0))|0)|0|0;
                                                                            for(x32 = min_x32; (x32|0) <= (max_x32|0); x32 = x32 + 1 | 0) {
                                                                                if(used & (1 << x32)) continue;
                                                                                used = used | (1 << x32);
                                                                                X52: {
                                                                                    x52 = 65 - (x12+x22+x32+x42) | 0;
                                                                                    if((x52|0) < (1|0)) break X52;
                                                                                    if(used & (1 << x52)) break X52;
                                                                                    used = used | (1 << x52);
                                                                                    min_x34 = max(1|0,max((65-(x14+x24+x44)-(25|0))|0,(65-(x31+x32+x33)-(25|0))|0)|0)|0|0;
                                                                                    max_x34 = min(25|0,min((65-(x14+x24+x44)-(1|0))|0,(65-(x31+x32+x33)-(1|0))|0)|0)|0|0;
                                                                                    for(x34 = min_x34; (x34|0) <= (max_x34|0); x34 = x34 + 1 | 0) {
                                                                                        if(used & (1 << x34)) continue;
                                                                                        used = used | (1 << x34);
                                                                                        X35: {
                                                                                            x35 = 65 - (x31+x32+x33+x34) | 0;
                                                                                            if((x35|0) < (1|0)) break X35;
                                                                                            if(used & (1 << x35)) break X35;
                                                                                            used = used | (1 << x35);
                                                                                            X45: {
                                                                                                x45 = 65 - (x15+x25+x35+x55) | 0;
                                                                                                if((x45|0) < (1|0)) break X45;
                                                                                                if(used & (1 << x45)) break X45;
                                                                                                used = used | (1 << x45);
                                                                                                X43: {
                                                                                                    x43 = 65 - (x41+x42+x44+x45) | 0;
                                                                                                    if((x43|0) < (1|0)) break X43;
                                                                                                    if(used & (1 << x43)) break X43;
                                                                                                    used = used | (1 << x43);
                                                                                                    X53: {
                                                                                                        x53 = 65 - (x13+x23+x33+x43) | 0;
                                                                                                        if((x53|0) < (1|0)) break X53;
                                                                                                        if(used & (1 << x53)) break X53;
                                                                                                        used = used | (1 << x53);
                                                                                                        X54: {
                                                                                                            x54 = 65 - (x14+x24+x34+x44) | 0;
                                                                                                            if(((x54+x51+x52+x53+x55)|0) != 65) break X54
                                                                                                            if((x54|0) < (1|0)) break X54;
                                                                                                            if(used & (1 << x54)) break X54;
                                                                                                            used = used | (1 << x54);
                                                                                                            show_ans5(no|0,x11|0,x12|0,x13|0,x14|0,x15|0,x21|0,x22|0,x23|0,x24|0,x25|0,x31|0,x32|0,x33|0,x34|0,x35|0,x41|0,x42|0,x43|0,x44|0,x45|0,x51|0,x52|0,x53|0,x54|0,x55|0);
                                                                                                            used = used & ~(1 << x54);
                                                                                                        }
                                                                                                        used = used & ~(1 << x53);
                                                                                                    }
                                                                                                    used = used & ~(1 << x43);
                                                                                                }
                                                                                                used = used & ~(1 << x45);
                                                                                            }
                                                                                            used = used & ~(1 << x35);
                                                                                        }
                                                                                        used = used & ~(1 << x34);
                                                                                    }
                                                                                    used = used & ~(1 << x52);
                                                                                }
                                                                                used = used & ~(1 << x32);
                                                                            }
                                                                            used = used & ~(1 << x41);
                                                                        }
                                                                        used = used & ~(1 << x31);
                                                                    }
                                                                    used = used & ~(1 << x25);
                                                                }
                                                                used = used & ~(1 << x23);
                                                            }
                                                            used = used & ~(1 << x21);
                                                        }
                                                        used = used & ~(1 << x14);
                                                    }
                                                    used = used & ~(1 << x13);
                                                }
                                                used = used & ~(1 << x12);
                                            }
                                            used = used & ~(1 << x51);
                                        }
                                        used = used & ~(1 << x15);
                                    }
                                    used = used & ~(1 << x55);
                                }
                                used = used & ~(1 << x33);
                            }
                            used = used & ~(1 << x11);
                        }
                        used = used & ~(1 << x42);
                    }
                    used = used & ~(1 << x24);
                }
                used = used & ~(1 << x44);
            }
            used = used & ~(1 << x22);
        }

    }

    return {
        count3: count3,
        count4: count4,
        count5: count5
    };
}

var count = [0]; // 見つけた魔方陣の数
var lastShowTime = nowimpl ? Date.now() : +new Date();
function show_ans(no, matrix) {
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
        no: no,
        matrix: matrix,
        count:  count
    });
    lastShowTime = now;
}

var module = my_asm_module(
    {}, {
        show_ans3: function(no,x11,x12,x13,x21,x22,x23,x31,x32,x33) {
            show_ans(no,[x11,x12,x13,x21,x22,x23,x31,x32,x33]);
        },
        show_ans4: function(no,x11,x12,x13,x14,x21,x22,x23,x24,x31,x32,x33,x34,x41,x42,x43,x44) {
            show_ans(no,[x11,x12,x13,x14,x21,x22,x23,x24,x31,x32,x33,x34,x41,x42,x43,x44]);
        },
        show_ans5: function(no,x11,x12,x13,x14,x15,x21,x22,x23,x24,x25,x31,x32,x33,x34,x35,x41,x42,x43,x44,x45,x51,x52,x53,x54,x55) {
            show_ans(no,[x11,x12,x13,x14,x15,x21,x22,x23,x24,x25,x31,x32,x33,x34,x35,x41,x42,x43,x44,x45,x51,x52,x53,x54,x55]);
        }
    }
);
var count3 = module.count3;
var count4 = module.count4;
var count5 = module.count5;
