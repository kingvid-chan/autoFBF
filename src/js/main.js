// 数字翻滚动效依赖于 countup.js 使用前请安装`npm install countup.js` 
var CountUp = require('countup.js');
var easingFn = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
}
$(document).ready(function() {
    $(".index").one('click touchmove', function(){
        $('.index').addClass('scaleOut');
        setTimeout(function() {
            $(".index").remove();
            $(".pages").removeClass('overflowHide');
        }, 800);
        // 初始化滑屏事件
        $('.pages').fullpage({
            drag: true,
            start: 0,
            duration: 100,
            page: '.page',
            der: 0.2,
            afterChange: function(e) {
                var con = $('.page').eq(e.cur);
                if (con.hasClass('page6')) {
                    // 绘制扇形图表
                    // 传入扇形图表数据，传数据时注意下格式
                    var pieData = [{
                        name: 'Firefox欢呼声',
                        y: 15
                    }, {
                        name: 'IE',
                        y: 10
                    }, {
                        name: '其他',
                        y: 5
                    }, {
                        name: '玩具游戏机你会说的话说的',
                        y: 100
                    }];
                    // 调用pie.js 并把图表数据传入
                    require('./pie.js')(pieData);
                }

                var num = parseInt(con.attr('data-num')),
                    kind = con.attr('data-kind');
                if (num && kind) {
                    var target = con.find('.t' + kind + ' .countUp')[0];
                    if (con.hasClass('page1')) {
                        setTimeout(function() {
                            var numAnim = new CountUp(target, 0, num, 0, 2);
                            numAnim.start();
                        }, 150);
                       
                    }else{
                        var numAnim = new CountUp(target, num>10 ? 0:100, num, 0, 2, {
                            easingFn: easingFn
                        });
                        numAnim.start();
                    }
                }
            }
        });
    });
});