/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var defaultColor = [
    ["rgb(242,118,73)", "rgb(242,157,53)", "rgb(242,193,46)"], //242,82,82 orange
    ["#F2794C", "#FFB752", "#F5D993"], //F24238 orange1
    ["rgb(231,76,60)", "rgb(236,240,241)", "rgb(52,152,219)"],
    ["rgb(205,44,36)", "rgb(242,89,75)", "rgb(242,131,107)"],
    ["rgb(33,133,197)", "rgb(126,206,253)", "rgb(237,218,183)"], //24,49,82 blue
];

var seriesLabel = {
    normal: {
        show: true,
    }
}

var bar_option = {
    tooltip: {
        trigger: 'axis',
        triggerOn: 'none',
        axisPointer: {
            type: 'shadow'
        }
    },
    color: defaultColor[4],
    legend: {
        textStyle: {
            color: 'rgba(255,255,255,1)'

        },
        data: ['最高温', '最低温', '平均温']
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
        data: ['大浪', '福永', '公明', '观澜', '华富', '民治', '清水河', '沙井', '石岩', '松岗']
    },
    series: [
        {
            label: seriesLabel,
            name: '最高温',
            type: 'bar',
            data: [49.41, 46.66, 48.08, 54.70, 45.44, 48.67, 49.54, 50.12, 49.76, 47.53]
        },
        {
            label: seriesLabel,
            name: '最低温',
            type: 'bar',
            data: [18.92, 17.89, 18.96, 20.03, 19.93, 6.80, 19.13, 19.30, 18.21, 18.80]
        },
        {
            label: seriesLabel,
            name: '平均温',
            type: 'bar',
            data: [26.29, 27.30, 27.81, 27.39, 27.04, 26.74, 25.79, 27.64, 26.61, 27.48]
        }
    ]
};


var eco_chart = echarts.init(document.getElementById('bar2_chart'));
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





var pie_option = {
    title: {
        text: '医疗机构',
        left: 'center',
        top: '43%',
        padding: [24, 0],
        textStyle: {
            color: '#fff',
            fontSize: 28,
            align: 'center'
        }
    },
    color: defaultColor[4],
    tooltip: {
        trigger: 'item',
        triggerOn: 'none',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        textStyle: {
            color: 'rgba(255,255,255,1)'
        },
        orient: 'vertical',
        x: 'left',
        data: ['二级医院', '三级医院']
    },
    series: [
        {
            name: '医疗机构',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    formatter: '{b}\n{d}%',
                    fontSize: 20,

                },

            },
            labelLine: {
                normal: {
                    show: true
                }
            },
            data: [
                {value: 25, name: '二级医院'},
                {value: 7, name: '三级医院'}
            ]
        }
    ]
};

var pie_chart = echarts.init(document.getElementById('pie_chart'));
pie_chart.setOption(pie_option);
pie_chart.dispatchAction({
    type: 'highlight',
    name: "三级医院",
});
pie_chart.dispatchAction({
    type: 'downplay',
    name: "二级医院",
});
pie_chart.dispatchAction({
    type: 'showTip',
    name: "三级医院"
});
var k = 1;
var bar_interval = window.setInterval(function () {
    if (k < 0) {
        k = 1;
    }

    if (k == 1) {
        pie_chart.dispatchAction({
            type: 'highlight',
            name: "二级医院",
        });
        pie_chart.dispatchAction({
            type: 'downplay',
            name: "三级医院",
        });
        pie_chart.dispatchAction({
            type: 'showTip',
            name: "二级医院"
        });
        var name = "二级医院";
    } else if (k == 0) {
        pie_chart.dispatchAction({
            type: 'highlight',
            name: "三级医院",
        });
        pie_chart.dispatchAction({
            type: 'downplay',
            name: "二级医院",
        });
        pie_chart.dispatchAction({
            type: 'showTip',
            name: "三级医院"
        });
        var name = "三级医院";
    }
    k--;
}, 3000);

