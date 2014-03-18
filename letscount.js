$(function() {
    var canvas = $('#path');
    var width = canvas.attr('width') * 1;
    var height = canvas.attr('height') * 1;
    var margin = 10;
    var ctx = canvas[0].getContext('2d');
    var workers;
    var counts;

    function start(rows, cols) {
        var i;
        // 古いワーカーは用済み
        if(workers) {
            for(i = 0; i< workers.length; i++) {
                if(workers[i]) {
                    workers[i].terminate();
                }
            }
            workers = undefined;
            // ピコピコ終わり
            picopico.stop();
        }
        if(rows<=0 || cols<=0) return ;

        $('#tellchildren').hide();

        //ピコピコする
        picopico.start();

        // 画面更新
        $('#problem-text').text(rows + '×'+  cols);

        // 新しいワーカーを作成・初期化
        var workerjs = 'count.js';
        var num_workers = $('#parallel').val();
        workers = [];
        counts = [];
        for(i = 0; i < num_workers; i++) {
            var worker;
            if(location.hostname == "localhost") {
                worker = new Worker(workerjs + '?' + Math.random());
            } else {
                worker = new Worker(workerjs);
            }
            worker.addEventListener('message', onMessage, false);
            worker.postMessage({
                rows: rows,
                cols: cols,
                no: i,
                workers: num_workers
            });
            workers.push(worker);
            counts.push([0]);
        }

        var xstep = (width - 2*margin) / cols;
        var ystep = (height - 2*margin) / rows;
        var resultText = $('#result-text');
        var units = ['', '万', '億', '兆', '京', '垓', '𥝱', '穣', '溝', '澗', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', '無量大数']; // 大きな数の単位

        drawGrid();

        // 魔方陣を表示する
        function onMessage(e) {
            var i;
            var data = e.data;
            drawGrid();
            if(data.matrix) {
                drawMatrix(data.matrix);
            }
            if(data.count) {
                counts[data.no] = data.count;
                showCount(totalCount(counts));
            }
            if('finished' in data) {
                console.log('Worker' + data.finished + ': ' + data.time + 'ms');
                workers[data.finished] = undefined;
                for(i = 0; i < workers.length; i++) {
                    if(workers[i]) break;
                }
                if( i >= workers.length ) {
                    picopico.stop();
                }
            }
        }

        // 描画
        function drawGrid() {
            var i, p1, p2;
            ctx.beginPath();
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 3;

            //横線
            for(i=0;i<=rows;i++) {
                p1 = toScreen(0, i);
                p2 = toScreen(cols, i);

                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }

            //縦線
            for(i=0;i<=cols;i++) {
                p1 = toScreen(i, 0);
                p2 = toScreen(i, rows);

                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
            }
            ctx.stroke();
        }

        // 魔方陣の中の数字を描画する
        function drawMatrix(matrix) {
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font = (xstep * 0.5) + "px ''";
            for(var i = 0; i < rows * cols; i++) {
                var val = matrix[i];
                var x = i % cols + 0.5;
                var y = Math.floor(i / cols) + 0.5;
                var p = toScreen(x, y);
                ctx.fillText(val, p.x, p.y, xstep);
            }
        }

        // 経路数の表示
        function showCount(count) {
            var s = '', i;
            for(i=0;i<count.length;i++) {
                s = (count[i+1] ? addzero(count[i]) : count[i]) + (units[i] || '') + s;
            }
            resultText.text(s);
            return s;

            // 0埋めをする
            function addzero(count) {
                if(count>=1000) {
                    return count;
                } else if(count>=100) {
                return '0' + count;
                } else if(count>=10) {
                return '00' + count;
                }
                return '000' + count;
            }
        }

        // 合計を計算する
        function totalCount(counts) {
            var i, j;
            var ans = [0];
            for(i = 0; i < counts.length; i++) {
                for(j = 0; j < counts[i].length; j++) {
                    if(ans[j]) {
                        ans[j] += counts[i][j];
                    } else {
                        ans[j] = counts[i][j];
                    }
                }
            }
            var digit = 0;
            j = ans.length;
            for(i=0; i < j || digit > 0; i++) {
                if(ans[i]) {
                    ans[i] += digit;
                } else {
                    ans[i] = digit;
                }
                digit = (ans[i]/10000) | 0;
                ans[i] %= 10000;
            }
            return ans;
        }

        // 画面上の位置を計算
        function toScreen(x, y) {
            return {
                x: x * xstep + margin,
                y: y * ystep + margin
            };
        }
    }

    function resize() {
        var parent = $('#patterns');
        var size = Math.min(parent.width(), parent.height()) * 0.8;
        var canvas = $('#path');
        var pos = parent.offset();
        canvas.width(size);
        var scale = size / canvas.attr('width');
        var top = pos.top + parent.height() * 0.1;
        var left = pos.left + (parent.width() - size) / 2;
        $('#start').css({
            top: top + margin * scale,
            left: left + margin * scale
        });
        $('#goal').css({
            top: top + canvas.height() - margin * scale,
            left: left + canvas.width() - margin * scale
        });
    }

    function share(size, patterns, time) {
        var textPattern = [
            '%sのときは、%dだってよ！%fかかったわ！',
            'はい、出ました！%sのときは%d通り！%fかかったわ！',
            'あ、なんかでてるね。%sのときは%d通り。すごいね！%fかかったわ！',
            'みんな、起きて！%sのときは%d通り。ものすごい数になってきたね。%fかかったわ！',
            '%sのときは、なんと！%d通り！めまいがしてきたわね！%fかかったわ！',
            'ツイニデタワ。%sノトキハ%d通り！皆ノ子孫ニ連絡シナキャ！%fカカッタワ！'
        ];
        var text = textPattern[Math.random()*textPattern.length|0];
        var hashtags = ['おねえさんのコンピュータ'];
        text = text.replace('%s', size);
        text = text.replace('%d', patterns);
        text = text.replace('%f', time/1000 + '秒');

        // $.browserは非推奨らしいけど、簡易判定で十分なのでとりあえずこれで
        if($.browser) {
            if($.browser.msis) {
                hashtags.push('ie');
            } else if($.browser.mozilla) {
                hashtags.push('firefox');
            } else if($.browser.webkit) {
                if(navigator.userAgent.toLowerCase().indexOf('chrome')>=0) {
                    hashtags.push('chrome');
                } else {
                    hashtags.push('safari');
                }
            } else if($.browser.opera) {
                hashtags.push('opera');
            }
        }

        var shareurl = 'https://twitter.com/share?' +
                'lang=ja&hashtags=' + encodeURIComponent(hashtags.join(',')) +
                '&text=' + encodeURIComponent(text);
        $('#tellchildren').attr('href', shareurl)
            .attr('title', text)
            .show();
    }

    // ピコピコする
    function PicoPico() {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        this.SAMPLE_RATE = 44100;
        if(AudioContext) {
            this.ctx = new AudioContext();
            this.SAMPLE_RATE = this.ctx.sampleRate;
        }
    }

    PicoPico.prototype.play = function(freqs) {
        var SAMPLE_RATE = this.SAMPLE_RATE;
        var notelength = SAMPLE_RATE * 0.05;
        var ctx = this.ctx;
        var src, buf, data, audio;
        if(ctx) {
            // For Webkit
            buf = ctx.createBuffer(1, freqs.length * notelength , SAMPLE_RATE);
            data = buf.getChannelData(0);
        } else if(window.Audio && window.Float32Array) {
            // For Firefox
            audio = new Audio();
            if(audio.mozSetup) {
                audio.mozSetup(1, this.SAMPLE_RATE);
            }
            data = new Float32Array(freqs.length * notelength);
        } else return;

        // 波形データ作成
        var i, j, offset = 0, x = 0;
        var step;
        var volume = ($('#volume').val() || 100) / 100;
        for(i=0; i<freqs.length; i++) {
            step = 2 * Math.PI * freqs[i] / this.SAMPLE_RATE;
            for(j=0;j<notelength;j++) {
                data[offset] = Math.sin(x)*volume;
                ++offset;
                x += step;
            }
        }

        // 再生
        if(ctx) {
            // for Webkit
            src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(ctx.destination);
            src.noteOn(0);
        } else {
            // for Firefox
            if(audio.mozWriteAudio) {
                audio.mozWriteAudio(data);
            }
            audio.play();
        }
    };

    // ピコピコ開始
    PicoPico.prototype.start = function() {
        var self = this;
        this.stop();
        this.timer = setInterval(function() {
            var i;
            var freqs = [];
            for(i = 0; i < 10; i++) {
                freqs.push(Math.random()*1200+400);
            }
            self.play(freqs);
        }, 500);
    };

    // ピコピコやめ
    PicoPico.prototype.stop = function() {
        if(!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
    };

    var picopico = new PicoPico();

    $(window).resize(resize);
    resize();

    $('input[type=button]').click(function() {
        start($(this).attr('rows')*1, $(this).attr('cols')*1);
    });
});
