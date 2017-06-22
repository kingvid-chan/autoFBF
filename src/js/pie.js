var Highcharts = require('highcharts');
Highcharts.getOptions().plotOptions.pie.colors = ['#ffdf50', '#4eead3', '#b19cff', '#38c7f9'];
module.exports = function(data) {
    var wW = $(window).width();
    data.forEach(function(item){
        var name = '',
            num = 0;
        for (var i = 0; i < item.name.length; i++) {
            if ((new RegExp("^[\\u4e00-\\u9fa5]$")).test(item.name[i])) {
                name+=item.name[i];
            }else{
                name+=(item.name[i] + (item.name[i+1]?item.name[i+1]:''));
                i++;
            }
            num++;

            if (num>4) {
                name+='...';
                break;
            }
        }
        item.wholeName = item.name;
        item.name = name;
    })
    Highcharts.chart('pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: null,
            width: wW,
            height: 0.6 * wW
        },
        credits: false,
        style: {
            fontFamily: 'microsoft yahei'
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                borderColor: "#000000",
                borderWidth: 1,
                size: '80%',
                dataLabels: {
                    enabled: true,
                    connectorColor: '#000000',
                    format: '{point.name}<br>{point.percentage:.1f} %',
                    distance: 5,
                    style: {
                        color: '#000000'
                    }
                }
            }
        },
        tooltip: {
            formatter: function() {
                return '<span style="color:'+this.color+', font-size: 12px">' + this.point.wholeName + '<br><b style="color:'+this.color+'">●</b>'+ this.series.name + '：'+this.y+'%'+'</span>';
            }
        },
        series: [{
            type: 'pie',
            name: '品类消费占比',
            data: data
        }]
    });
}
