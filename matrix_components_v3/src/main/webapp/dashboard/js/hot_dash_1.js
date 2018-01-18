/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var bar_option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    color: ["rgb(33,133,197)", "rgb(126,206,253)", "rgb(237,218,183)"],
    legend: {
        textStyle: {
            color: 'rgba(255,255,255,1)'
        },
        data: ['住宅基准地价', '户均月租水平', '户均住宅面积']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        show: false,
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,1)'
            }
        },
        type: 'category',
        data: ['园岭街道', '香蜜湖街道', '沙头街道', '南园街道', '南湖街道', '莲花街道', '华富街道', '桂园街道', '福田街道', '东门街道']
    },
    series: [
        {
            name: '住宅基准地价',
            type: 'bar',
            data: [3812.92, 4177.11, 4044.52, 4081.46, 4096.31, 3821.80, 3743.51, 3813.69, 3988.00, 3876.77]
        },
        {
            name: '户均月租水平',
            type: 'bar',
            data: [1591.090, 1644.770, 1295.530, 1735.970, 1728.830, 1733.870, 1957.960, 1395.900, 1777.760, 1404.210]
        }
    ]
};

var eco_chart = echarts.init(document.getElementById('bar_chart'));
eco_chart.setOption(bar_option);
eco_chart.dispatchAction({
    type: 'showTip',
    dataIndex: 9
});
var j = 8
var bar_interval = window.setInterval(function () {
    if (j < 0) {
        j = 9;
    }
    eco_chart.dispatchAction({
        type: 'showTip',
        dataIndex: j
    });
    j--;
}, 3000);