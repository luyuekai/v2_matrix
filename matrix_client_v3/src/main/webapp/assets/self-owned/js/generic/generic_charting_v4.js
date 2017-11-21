//Echarts Default Configuration Begin
var default_chart_type = ['grid_heatmap', 'sankey', 'boxplot', 'treemap', 'river', 'radar', 'pie', 'circular', 'graph', 'force', 'parallel', 'scatter', 'line', 'bar', 'area'];

var default_color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
var default_tooltip = {
    position: 'top',
    trigger: 'item',
};
var default_labelStyle = {
    //color: 'white',
    fontWeight: 'bold',
    fontSize: '12'
};
var default_legend = {
    type: 'scroll',
    orient: 'vertical',
    // orient:'horizontal',
    // left: 'center',
    left: 'right',
    top: 'top',
    padding: [0, 20, 0, 0],
    data: [],
    textStyle: default_labelStyle
};
var default_title = {
    show: true,
    x: 'left',
    padding: [0, 0, 0, 20],
    textStyle: default_labelStyle,
    text: "Matrix Chart",
};
var default_scatterScale = {
    min_scale: 10,
    max_scale: 50
};
var default_scale_setting = {
    enable: false,
    useData: false,
    min_scale: 10,
    max_scale: 50,
    min_value: 1,
    max_value: 10000
};
var default_grid = {
    left: '10%',
    right: '10%',
};
var default_xAxis = {
    data: [],
    axisLabel: {
        // interval: 0, // 强制显示所有标签
        // rotate: -45,
        textStyle: default_labelStyle,
    },
    axisLine: {
        lineStyle: {
            //color: '#fff'
        }
    },
    splitLine: {
        show: false
    }
};
var default_yAxis = {
    data: null,
    axisLabel: {
        // rotate: 45,
        textStyle: default_labelStyle,
    },
    axisLine: {
        lineStyle: {
            //color: '#fff'
        }
    },
    splitLine: {
        show: false
    }
};
var default_dataZoom = [{
        type: 'slider',
        orient: 'horizontal',
        left: 'center',
        textStyle: default_labelStyle,
        start: 0,
        end: 100
    }, {
        type: 'inside',
        orient: 'horizontal',
        textStyle: default_labelStyle,
        start: 0,
        end: 100
    }];
var default_series_object = {
    name: 'Matrix Series',
    type: '',
    itemStyle: {
        normal: {}
    },
    data: []
};

//Echarts Default Configuration End

var interval;      //Dynamic Datasource interval        考虑放在chart editor页面

var ChartPOJO = ChartPOJO || {};
ChartPOJO = {
    pendingResizingEvent : [],
    generate_default_chart: function (chart_div_id,theme) {
        $('#' + chart_div_id).empty();
        var option_chart = {};
        // option_chart.color = ClonePOJO.deepClone(default_color);
        option_chart.color = default_color;
        option_chart.title = ClonePOJO.deepClone(default_title);
        option_chart.tooltip = ClonePOJO.deepClone(default_tooltip);
        option_chart.legend = ClonePOJO.deepClone(default_legend);
        option_chart.legend.data.push([]);
        option_chart.series = [];
        var chart = echarts.init(document.getElementById(chart_div_id),theme);
        chart.parent_div_id = chart_div_id;
        return ChartPOJO.reset_chart_option(chart, option_chart);
    },
    reset_chart_option: function (chart, option, cleanFlag) {
        if (cleanFlag) {
            chart.clear();
        }
        chart.setOption(option);
        $(window).resize(function () {
          var evt = {
            chart : chart,
            timeout : setTimeout(function () {
                chart.resize();
            }, 500)
          };
          var events = [];
          $.each(ChartPOJO.pendingResizingEvent, function(i, e) {
            if(e.chart === chart) {
              clearTimeout(e.timeout);
            } else {
              events.push(e);
            }
          });
          events.push(evt);
          ChartPOJO.pendingResizingEvent = events;
        });
        return chart;
    },
    reset_chart_type: function (chart, chart_type) {
        if (!chart || !chart_type) {
            return null;
        }
        if (chart_type == 'grid_heatmap') {
            return HeatMap_Grid_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'sankey') {
            return Sankey_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'boxplot') {
            return Boxplot_ChartPOJO.initialize_chart(chart, [], []);
        }
        if (chart_type == 'treemap') {
            return Treemap_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'themeRiver') {
            return River_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'radar') {
            return Radar_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'pie') {
            return Pie_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'circular') {
            return Circular_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'graph') {
            return Graph_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'force') {
            return Force_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'parallel') {
            return Parallel_ChartPOJO.initialize_chart(chart);
        }
        if (chart_type == 'scatter') {
            return Descartes_ChartPOJO.initialize_chart(chart, 'scatter');
        }
        if (chart_type == 'line') {
            return Descartes_ChartPOJO.initialize_chart(chart, 'line');
        }
        if (chart_type == 'area') {
            return Descartes_ChartPOJO.initialize_chart(chart, 'area');
        }
        if (chart_type == 'bar') {
            return Descartes_ChartPOJO.initialize_chart(chart, 'bar');
        }
        if (chart_type == 'wordCloud') {
            return Cloud_ChartPOJO.initialize_chart(chart);
        }
    },
    has_series_data_item: function (chart, data_item_name) {
        return (ChartPOJO.get_series_data_item_index(chart, data_item_name) > -1);
    },
    get_series_data_item_index: function (chart, data_item_name) {
        var option = chart.getOption();
        var search_index = -1;
        $.each(option.series[0].data, function (index, value) {
            if (value.name == data_item_name) {
                search_index = index;
            }
        });
        return search_index;
    },
    add_series_data_item: function (chart, data_item) {
        var option = ClonePOJO.deepClone(chart.getOption());
        option.series[0].data.push(data_item);
        option.legend[0].data.push(data_item.name)
        return ChartPOJO.reset_chart_option(chart, option);
    },
    remove_series_data_item: function (chart, data_item_index) {
        if (chart && (data_item_index > -1)) {
            var option = ClonePOJO.deepClone(chart.getOption());
            option.series[0].data.splice(data_item_index, 1);
            return ChartPOJO.reset_chart_option(chart, option);
        } else {
            return chart;
        }
    },
    remove_series_data_item_by_name: function (chart, data_item_name) {
        var data_item_index = ChartPOJO.get_series_data_item_index(chart, data_item_name);
        if (chart && (data_item_index > -1)) {
            var option = ClonePOJO.deepClone(chart.getOption());
            option.series[0].data.splice(data_item_index, 1);
            return ChartPOJO.reset_chart_option(chart, option);
        } else {
            return chart;
        }
    },
    addSeries: function (chart, series_name, series_type, series_data, scale_setting) {
        var option = chart.getOption();

        var series_object = {
            name: series_name,
            type: series_type,
            data: series_data
        };
        if (series_type === 'area') {
            // area acutal is a line chart and has area style fill
            series_object.areaStyle = {
                normal: {}
            };
            series_object.type = 'line';
        }
        if (series_type === 'bar') {
            series_object.barGap = '10%';
        }
        if (series_type === 'parallel') {
            series_object.lineStyle = {
                normal: {
                    width: 3,
                    opacity: 0.5
                }
            }
        }
        if (series_type === 'scatter') {

            scale_setting = scale_setting || default_scale_setting;
            if (scale_setting.enable) {
                if (scale_setting.useData) {

                    var min = null;
                    var max = null;
                    $.each(series_data, function (index, value) {
                        if (Number(value)) {
                            if (!min) {
                                min = Number(value);
                                max = Number(value);
                            }
                            if (min > Number(value)) {
                                min = Number(value);
                            }
                            if (max < Number(value)) {
                                max = Number(value);
                            }
                        }
                    });
                    scale_setting.min_value = min;
                    scale_setting.max_value = max;
                }
                ChartPOJO.current_scale_setting = scale_setting;
                series_object = {
                    name: series_name,
                    type: series_type,
                    data: series_data,
                    symbolSize: function (val, param) {
                        return ChartPOJO.getScaleBySeries(chart, val, param.seriesIndex, ChartPOJO.current_scale_setting.min_value, ChartPOJO.current_scale_setting.max_value);
                    }
                };
            } else {
                series_object = {
                    name: series_name,
                    type: series_type,
                    data: series_data,
                };
            }
        }
        option.series.push(series_object);
        option.legend[0].data.push(series_name);

        chart.setOption(option);


        return chart;
    },
    removeSeries: function (chart, series_name) {
        var option = ClonePOJO.deepClone(chart.getOption());

        var tmp_series = [];
        var tmp_legends = [];
        $.each(option.series, function (index, series_object) {
            if (!(series_object && series_object.name == series_name)) {
                tmp_series.push(series_object);
            }
        });

        $.each(option.legend[0].data, function (index, legend_object) {

            if (!(legend_object && legend_object == series_name)) {
                tmp_legends.push(legend_object);
            }
        })
        option.series = tmp_series;
        option.legend[0].data = tmp_legends;

        return ChartPOJO.reset_chart_option(chart, option, true);
    },
    removeAllSeries: function (chart) {
        var option = ClonePOJO.deepClone(chart.getOption());

        var tmp_series = [];
        var tmp_legends = [];
        option.series = tmp_series;
        option.legend[0].data = tmp_legends;

        return ChartPOJO.reset_chart_option(chart, option, true);
    },
    cleanChart: function (parent_div_id) {
        $('#' + parent_div_id).empty();
    },
    getScale: function (value, value_min, value_max, scale_min, scale_max) {
        if (!value || !value_min || !value_max) {
            return default_scatterScale.min_scale;
        }
        scale_min = scale_min || default_scatterScale.min_scale;
        scale_max = scale_max || default_scatterScale.max_scale;
        var result = scale_min;

        result = scale_min + (value - value_min) / (value_max - value_min) * (scale_max - scale_min);
        result = Math.round(result);
        return result;
    },
    getScaleBySeries: function (chart, value, seriesIndex, min, max) {
        if (chart && seriesIndex) {
            var series = chart.getOption().series[seriesIndex];
            if (!min && !max) {
                if (series && series.data) {
                    $.each(series.data, function (index, value) {
                        if (Number(value)) {
                            if (!min) {
                                min = Number(value);
                                max = Number(value);
                            }
                            if (min > Number(value)) {
                                min = Number(value);
                            }
                            if (max < Number(value)) {
                                max = Number(value);
                            }
                        }
                    });
                }
            }
            return ChartPOJO.getScale(value, min, max);
        }
    },
    reset_Axis: function (chart, axis_type, axis_data) {
        var option = ClonePOJO.deepClone(chart.getOption());
        option.xAxis = ClonePOJO.deepClone(default_xAxis);
        option.yAxis = ClonePOJO.deepClone(default_yAxis);

        if (axis_type == "y") {
            option.yAxis.data = axis_data;
            option.dataZoom = [];
            option.xAxis = {
                type: 'value',
                boundaryGap: [0, 0.01]
            }
        } else {
            option.xAxis.data = axis_data;
            option.dataZoom = [{
                    type: 'slider',
                    orient: 'horizontal',
                    left: 'center',
                    textStyle: ClonePOJO.deepClone(default_labelStyle),
                    start: 0,
                    end: 100
                }, {
                    type: 'inside',
                    orient: 'horizontal',
                    textStyle: ClonePOJO.deepClone(default_labelStyle),
                    start: 0,
                    end: 100
                }];
        }
        return ChartPOJO.reset_chart_option(chart, option, true);
    },
    addStack: function (chart, stack_name, series_name) {
        var option = ClonePOJO.deepClone(chart.getOption());
        $.each(option.series, function (index, value) {
            if (value.name == series_name) {
                value.stack = stack_name;
            }
        });

        return ChartPOJO.reset_chart_option(chart, option, true);
    },
    removeStack: function (chart, stack_name) {
        if (!stack_name) {
            return chart;
        }
        var option = ClonePOJO.deepClone(chart.getOption());
        $.each(option.series, function (index, value) {
            if (value.stack == stack_name) {
                value.stack = null;
            }
        });
        return ChartPOJO.reset_chart_option(chart, option, true);
    },
    getStacks: function (chart) {
        var stacks = [];
        $.each(chart.getOption().series, function (index, value) {
            if (value.stack && stacks.indexOf(value.stack) == -1) {
                stacks.push(value.stack);
            }
        });
        return stacks;
    },
    deserialize_chart_option: function (json) {
        var option = $.parseJSON(json);
        return option;
    },
    renderChart: function (parent_div_id, option) {
        if (parent_div_id && option) {
            var chart = echarts.init(document.getElementById(parent_div_id));
            // 使用刚指定的配置项和数据显示图表。
            chart.setOption(option);

            $(window).resize(function () {
                setTimeout(function () {
                    chart.resize();
                }, 500);
            });
            return chart;
        }
    },
    serialize_chart_option: function (option) {
        return $.toJSON(option);
    },
    dataSourceRenderDash: function (chart_type, origin_data, headerViewModel, chart) {
        switch (chart_type) {
            case 'bar':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chart = ChartPOJO.reset_Axis(chart, 'x', chartData.header);
                chart = Descartes_ChartPOJO.reset_series_data(chart, chartData.result, 'bar');
                break;
            case 'line':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chart = ChartPOJO.reset_Axis(chart, 'x', chartData.header);
                chart = Descartes_ChartPOJO.reset_series_data(chart, chartData.result, 'line');
                break;
            case 'scatter':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chart = ChartPOJO.reset_Axis(chart, 'x', chartData.header);
                chart = Descartes_ChartPOJO.reset_series_data(chart, chartData.result, 'scatter');
                break;
            case 'area':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chart = ChartPOJO.reset_Axis(chart, 'x', chartData.header);
                chart = Descartes_ChartPOJO.reset_series_data(chart, chartData.result, 'area');
                break;
            case 'pie':
                var chartData = DataTransferPOJO.extractDataByHeaderPie(origin_data, headerViewModel);
                chart = Pie_ChartPOJO.initialize_chart(chart, chartData.result);
                chart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: chartData.legend
                    }
                })
                break;
            case 'radar':
                var chartData = DataTransferPOJO.extractDataByHeaderRadar(origin_data, headerViewModel);
                chart = Radar_ChartPOJO.initialize_chart(chart, chartData.result, chartData.header);
                chart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: chartData.legend
                    }
                })
                break;
            case 'parallel':
                var chartData = DataTransferPOJO.extractDataByHeaderParallel(origin_data, headerViewModel);
                chart = ChartPOJO.generate_default_chart('main_chart');
                chart = Parallel_ChartPOJO.initialize_chart(chart, chartData.header);
                chart = ChartPOJO.addSeries(chart, null, 'parallel', chartData.result);
                break;
            case 'themeRiver':
                var chartData = DataTransferPOJO.extractDataByHeaderRiver(origin_data, headerViewModel);
                chart = River_ChartPOJO.initialize_chart(chart, chartData.result);
                break;
            case 'boxplot':
                var chartData = DataTransferPOJO.extractDataByHeaderBoxplot(origin_data, headerViewModel);
                console.log(chartData);
                chart = Boxplot_ChartPOJO.initialize_chart(chart, chartData.result, chartData.header);
                break;
            default:
                break;
        }
    },
    dataSourceRenderChart: function (chart_type, origin_data, headerViewModel) {
        switch (chart_type) {
            case 'bar':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chartViewModel.chart = ChartPOJO.reset_Axis(chartViewModel.chart, 'x', chartData.header);
                chartViewModel.chart = Descartes_ChartPOJO.reset_series_data(chartViewModel.chart, chartData.result, 'bar');
                break;
            case 'line':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chartViewModel.chart = ChartPOJO.reset_Axis(chartViewModel.chart, 'x', chartData.header);
                chartViewModel.chart = Descartes_ChartPOJO.reset_series_data(chartViewModel.chart, chartData.result, 'line');
                break;
            case 'scatter':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chartViewModel.chart = ChartPOJO.reset_Axis(chartViewModel.chart, 'x', chartData.header);
                chartViewModel.chart = Descartes_ChartPOJO.reset_series_data(chartViewModel.chart, chartData.result, 'scatter');
                break;
            case 'area':
                var chartData = DataTransferPOJO.extractDataByHeader(origin_data, headerViewModel);
                chartViewModel.chart = ChartPOJO.reset_Axis(chartViewModel.chart, 'x', chartData.header);
                chartViewModel.chart = Descartes_ChartPOJO.reset_series_data(chartViewModel.chart, chartData.result, 'area');
                break;
            case 'pie':
                var chartData = DataTransferPOJO.extractDataByHeaderPie(origin_data, headerViewModel);
                chartViewModel.chart = Pie_ChartPOJO.initialize_chart(chartViewModel.chart, chartData.result);
                chartViewModel.chart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: chartData.legend
                    }
                })
                break;
            case 'radar':
                var chartData = DataTransferPOJO.extractDataByHeaderRadar(origin_data, headerViewModel);
                chartViewModel.chart = Radar_ChartPOJO.initialize_chart(chartViewModel.chart, chartData.result, chartData.header);
                chartViewModel.chart.setOption({
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data: chartData.legend
                    }
                })
                break;
            case 'parallel':
                var chartData = DataTransferPOJO.extractDataByHeaderParallel(origin_data, headerViewModel);
                chartViewModel.chart = ChartPOJO.generate_default_chart('main_chart');
                chartViewModel.chart = Parallel_ChartPOJO.initialize_chart(chartViewModel.chart, chartData.header);
                chartViewModel.chart = ChartPOJO.addSeries(chartViewModel.chart, null, 'parallel', chartData.result);
                break;
            case 'themeRiver':
                var chartData = DataTransferPOJO.extractDataByHeaderRiver(origin_data, headerViewModel);
                chartViewModel.chart = River_ChartPOJO.initialize_chart(chartViewModel.chart, chartData.result);
                break;
            case 'boxplot':
                var chartData = DataTransferPOJO.extractDataByHeaderBoxplot(origin_data, headerViewModel);
                console.log(chartData);
                chartViewModel.chart = Boxplot_ChartPOJO.initialize_chart(chartViewModel.chart, chartData.result, chartData.header);
                break;
            default:
                break;
        }
    },
    renderDynamicChart: function (ds, chart) {
        ds.ds = JSON.parse(ds.ds);
        ChartPOJO.retrieveDataSource(chart, ds);
        interval = setInterval(function () {
            console.log('refresh chart');
            ChartPOJO.retrieveDataSource(chart, ds);
        }, 1000 * ds.refreshInterval);
    },
    retrieveDataSource: function (chart, ds) {
        console.log("retrieveChartData");
        var url = ds.ds.attr.ds;
        var rest_mode = ds.ds.attr.rest_mode;
        var request_params = ds.ds.attr.request_params || null;
        if (request_params) {
            request_params = JSON.parse(request_params);
        }

//        var requestPOJO = {
//            "dbName": ds.ds,
//            "sql": ds.sql
//        };
        var wrapper = {
            'chart': chart,
            'ds': ds
        };
//        var data = {
//            'queryInfo': $.toJSON(requestPOJO)
//        };
        $.serverRequest(url, request_params, "successGetChartData", "failedGetChartData", "serverGetChartData", rest_mode, true, wrapper)
//        $.serverRequest($.getServerRoot() + '/generic_charting_client/api/connection/query', data, "successGetChartData", "failedGetChartData", "serverGetChartData", 'POST', true, wrapper);
    }
}

//Dynamic Chart Retrieve Listener

$.subscribe("successGetChartData", successGetChartData);
$.subscribe("failedGetChartData", failedGetChartData);
$.subscribe("serverGetChartData", serverGetChartData);

function serverGetChartData() {

}
function failedGetChartData() {

}
function successGetChartData() {
    if (arguments && arguments[1]) {
        var server_data = arguments[1].response;
        var ds = arguments[1].addtion.ds;
        var tableData;
        console.log(arguments[1]);
        if (ds.ds.mode == 'database') {
            var rawData = DataTransferPOJO.transferHiveDataRaw(arguments[1].response.result[0]);
            if (arguments[1].addtion.ds.isTransferT) {
                rawData = DataTransferPOJO.transferT(rawData.result);
                //做数据转置
            }
            tableData = DataTransferPOJO.divideHeaderFromData(rawData.result);
        } else if (ds.ds.mode == 'api') {
            var tmp = 'server_data.' + ds.ds.attr.json_rule
            server_data = eval(tmp);
            tableData = DataTransferPOJO.serverJsonData2TableData(server_data);
        }
        ChartPOJO.reset_chart_type(arguments[1].addtion.chart, arguments[1].addtion.ds.chartType);
        ChartPOJO.removeAllSeries(arguments[1].addtion.chart);
        ChartPOJO.dataSourceRenderChart(arguments[1].addtion.ds.chartType, tableData.result, JSON.parse(arguments[1].addtion.ds.header))
        LoaderUtil.remove_v3('chart_content_body_div')
    }
}




var HeatMap_Grid_ChartPOJO = HeatMap_Grid_ChartPOJO || {};
HeatMap_Grid_ChartPOJO = {
    data_prototype: {
        x_data: null,
        y_data: null,
        min_scale: null,
        max_scale: null,
        series_data: null
    },
    default_grid: {
        height: '80%',
        y: '10%'
    },
    default_xAxis: {
        type: 'category',
        data: [],
        splitArea: {
            show: true
        }
    },
    default_yAxis: {
        type: 'category',
        data: [],
        splitArea: {
            show: true
        }
    },
    default_visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'vertical',
        left: 'right',
        top: '5%'
    },
    default_series: [{
            name: 'Matrix Heatmap Series',
            type: 'heatmap',
            data: [],
            label: {
                normal: {
                    show: true
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }],
    initialize_chart: function (chart, data_prototype) {
        if (!chart) {
            return null;
        }
        if (!data_prototype) {
            data_prototype = ClonePOJO.deepClone(HeatMap_Grid_ChartPOJO.data_prototype);
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = ClonePOJO.deepClone(chart.getOption());
        option.grid = HeatMap_Grid_ChartPOJO.default_grid;
        if (!option.xAxis || option.xAxis.length < 1) {
            option.xAxis = ClonePOJO.deepClone(HeatMap_Grid_ChartPOJO.default_xAxis);
            option.xAxis.data = data_prototype.x_data || option.xAxis.data || [];
        } else {
            option.xAxis[0].data = data_prototype.x_data || option.xAxis[0].data || [];
        }
        if (!option.yAxis || option.yAxis.length < 1) {
            option.yAxis = ClonePOJO.deepClone(HeatMap_Grid_ChartPOJO.default_yAxis);
            option.yAxis.data = data_prototype.y_data || option.yAxis.data || [];
        } else {
            option.yAxis[0].data = data_prototype.y_data || option.yAxis[0].data || [];
        }
        if (!option.visualMap || option.visualMap.length < 1) {
            option.visualMap = ClonePOJO.deepClone(HeatMap_Grid_ChartPOJO.default_visualMap);
            option.visualMap.min = data_prototype.min_scale || option.visualMap.min || 0;
            option.visualMap.max = data_prototype.max_scale || option.visualMap.max || 10;
        } else {
            option.visualMap[0].min = data_prototype.min_scale || option.visualMap[0].min || 0;
            option.visualMap[0].max = data_prototype.max_scale || option.visualMap[0].max || 10;
        }
        if (!option.series || option.series.length < 1) {
            option.series = ClonePOJO.deepClone(HeatMap_Grid_ChartPOJO.default_series);
        }
        option.series[0].data = data_prototype.series_data || option.series[0].data || [];
        return ChartPOJO.reset_chart_option(chart, option);
    },
}


var Sankey_ChartPOJO = Sankey_ChartPOJO || {};
Sankey_ChartPOJO = {
    default_series: [{
            type: 'sankey',
            data: [{
                    'name': 'matrix'
                }],
            links: [],
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
            },
            lineStyle: {
                normal: {
                    color: 'source',
                    curveness: 0.5
                }
            }
        }],
    initialize_chart: function (chart, nodes, links, update) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        if (!update || !option.series || option.series.length < 1) {
            option.series = ClonePOJO.deepClone(Sankey_ChartPOJO.default_series);
        }
        if (nodes) {
            option.series[0].data = nodes;
        }
        if (links) {
            option.series[0].links = links;
        }
        return ChartPOJO.reset_chart_option(chart, option);
    },
}

var default_boxplot_data = echarts.dataTool.prepareBoxplotData([
    []
]);
var Boxplot_ChartPOJO = Boxplot_ChartPOJO || {};
Boxplot_ChartPOJO = {
    default_tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'shadow'
        }
    },
    default_xAxis: {
        type: 'category',
        data: [0],
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
            show: false
        },
        axisLabel: {
            formatter: 'boxplot {value}'
        },
        splitLine: {
            show: false
        }
    },
    default_yAxis: {
        type: 'value',
        splitArea: {
            show: true
        }
    },
    get_series_option: function (boxplot_data) {
        return [{
                name: 'boxplot',
                type: 'boxplot',
                data: boxplot_data.boxData,
                itemStyle: {
                    normal: {
                        borderColor: '#1ABC9C'
                    },
                    emphasis: {
                        borderColor: '#5DADE2'
                    }
                },
                tooltip: {
                    formatter: function (param) {
                        return [
                            'Boxplot: ' + param.name,
                            'max: ' + param.data[4],
                            'Q3: ' + param.data[3],
                            'median: ' + param.data[2],
                            'Q1: ' + param.data[1],
                            'min: ' + param.data[0]
                        ].join('<br/>')
                    }
                }
            }, {
                name: 'outlier',
                type: 'scatter',
                itemStyle: {
                    normal: {
                        color: '#1ABC9C'
                    },
                    emphasis: {
                        color: '#5DADE2'
                    }
                },
                data: boxplot_data.outliers
            }];
    },
    get_xAxis_option: function (boxplot_data) {
        return {
            type: 'category',
            data: boxplot_data.axisData,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: false
            }
        };
    },
    initialize_chart: function (chart, data, names) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        option.origin_data = [];
        option.origin_name = [];

        option.yAxis = Boxplot_ChartPOJO.default_yAxis;
//        option.tooltip = Boxplot_ChartPOJO.default_tooltip;
        if (data) {
            var origin_data = DataTransferPOJO.prepareDataBox(data, names);
            option.origin_data = data;
            option.origin_name = names;
            option.series = Boxplot_ChartPOJO.get_series_option(origin_data);
            option.xAxis = Boxplot_ChartPOJO.get_xAxis_option(origin_data);
        } else {
            option.xAxis = Boxplot_ChartPOJO.default_xAxis;
        }
        return ChartPOJO.reset_chart_option(chart, option, true);
    },
}


var Treemap_ChartPOJO = Treemap_ChartPOJO || {};
Treemap_ChartPOJO = {
    default_series: [{
            name: 'Matrix Treemap',
            type: 'treemap',
            leafDepth: null,
            label: {
                show: true,
                formatter: '{b}'
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff'
                }
            },
            data: [],
            tooltip: {
                formatter: function (param) {
                    return [
                        'Name: ' + param.data.name,
                        'Value: ' + param.data.value,
                        'ID: ' + param.data.id
                    ].join('<br/>')
                }
            }
        }],
    initialize_chart: function (chart, data, leafDepth) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        option.series = ClonePOJO.deepClone(Treemap_ChartPOJO.default_series);
        if (data) {
            option.series[0].data = data;
        }
        if (leafDepth) {
            option.series[0].leafDepth = leafDepth;
        }
        return ChartPOJO.reset_chart_option(chart, option);
    },
}


var River_ChartPOJO = River_ChartPOJO || {};
River_ChartPOJO = {
    default_series: [{
            type: 'themeRiver',
            data: [],
            label: {
                normal: {
                    show: false
                }
            }
        }],
    default_singleAxis: {
        max: 'dataMax',
        min: 'dataMin',
        type: 'value'
    },
    default_tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
            }
        }
    },
    initialize_chart: function (chart, data, river_type) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        option.series = ClonePOJO.deepClone(River_ChartPOJO.default_series);
        option.singleAxis = ClonePOJO.deepClone(River_ChartPOJO.default_singleAxis);
        option.tooltip = ClonePOJO.deepClone(River_ChartPOJO.default_tooltip);
        if (data) {
            option.series[0].data = data;
        }
        if (river_type) {
            option.singleAxis.type = river_type;
        }
        return ChartPOJO.reset_chart_option(chart, option);
    }
}

var Radar_ChartPOJO = Radar_ChartPOJO || {};
Radar_ChartPOJO = {
    initialize_chart: function (chart, series_data, indicator) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        option.radar = {
            // shape: 'circle',
            indicator: indicator || []
        };
        if (option.series[0]) {
            console.log(option.series.pop())
        }
        if (series_data) {
            series_data.forEach(function (element) {
                option.legend[0].data.push(element.name);
            })
        }
        option.series.push({
            type: 'radar',
            data: series_data || []
        });

        return ChartPOJO.reset_chart_option(chart, option);
    },
}

var Pie_ChartPOJO = Pie_ChartPOJO || {};
Pie_ChartPOJO = {
    initialize_chart: function (chart, data) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        chart.clear();
        option.series = [];
        option.series.push({
            name: 'Matrix Pie',
            type: 'pie',
            data: data || []
        });
        return ChartPOJO.reset_chart_option(chart, option);
    },
}

var Force_ChartPOJO = Force_ChartPOJO || {};
Force_ChartPOJO = {
    initialize_chart: function (chart, nodes, links, categories) {
        if (!chart) {
            return null;
        }
        var option = {
            color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
            title: default_title,
            tooltip: {
                position: 'top'
            },
            series: [{
                    type: 'graph',
                    layout: 'force',
                    data: nodes || [],
                    links: links || [],
                    categories: categories || [],
                }]
        };
        chart.clear();
        return ChartPOJO.reset_chart_option(chart, option);
    },
}

var Graph_ChartPOJO = Graph_ChartPOJO || {};
Graph_ChartPOJO = {
    initialize_chart: function (chart, nodes, links, categories) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var legend = [];
        if (categories) {
            legend = [{
                    data: categories.map(function (a) {
                        return a.name;
                    })
                }];
        }
        ;
        var option = {
            color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
            title: default_title,
            tooltip: {
                position: 'top'
            },
            legend: legend,
            series: [{
                    type: 'graph',
                    layout: 'none',
                    data: nodes || [],
                    links: links || [],
                    categories: categories || [],
                }]
        };
        chart.clear();
        return ChartPOJO.reset_chart_option(chart, option);
    },
    add_data: function (chart, data_name, x_value, y_value, data_value, category) {
        if (ChartPOJO.has_series_data_item(chart, data_name)) {
            return chart;
        }
        var node = {
            'name': data_name,
            'value': data_value,
            'symbolSize': data_value,
            'x': x_value,
            'y': y_value,
            'label': {
                normal: {
                    show: data_value > 0
                }
            },
            'category': category
        }
        return ChartPOJO.add_series_data_item(chart, node);
    },
}

var Circular_ChartPOJO = Circular_ChartPOJO || {};
Circular_ChartPOJO = {
    initialize_chart: function (chart, nodes, links, categories) {
        if (!chart) {
            return null;
        }
        var option = {
            color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
            title: default_title,
            tooltip: {
                position: 'top'
            },
            series: [{
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    data: nodes || [],
                    links: links || [],
                    categories: categories || [],
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                }]
        };
        chart.clear();
        return ChartPOJO.reset_chart_option(chart, option);
    },
    add_data: function (chart, data_name, data_value, category) {
        if (ChartPOJO.has_series_data_item(chart, data_name)) {
            return chart;
        }
        var node = {
            'name': data_name,
            'value': data_value,
            'symbolSize': data_value,
            'label': {
                normal: {
                    show: data_value > 0
                }
            },
            'category': category
        }
        return ChartPOJO.add_series_data_item(chart, node);
    },
}

var Parallel_ChartPOJO = Parallel_ChartPOJO || {};
Parallel_ChartPOJO = {
    default_parallel: {
        left: '5%',
        right: '18%',
        bottom: 100,
        parallelAxisDefault: {
            type: 'value',
            name: 'parallel',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                color: '#000',
                fontSize: 12
            },
            axisLine: {
                lineStyle: {
                    color: '#aaa'
                }
            },
            axisTick: {
                lineStyle: {
                    color: '#777'
                }
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#000'
                }
            }
        }
    },
    initialize_chart: function (chart, parallel_axis_data_input, data) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();
        var parallel_axis_data = parallel_axis_data_input || [];
        var computed_axis = [];
        $.each(parallel_axis_data, function (index, value) {
            var tmp = {
                dim: index,
                name: value
            };
            computed_axis.push(tmp);
        });
        if (option.series[0]) {
            option.series.pop();
        }
        option.parallelAxis = computed_axis;
        if (data) {
            option.visualMap = {
                show: false,
                type: 'piecewise',
                categories: ["demo1", "demo2", "demo3"],
                dimension: 6,
                orient: 'horizontal',
                top: 0,
                left: 'center',
                inRange: {
                    color: ['#c23531', '#2f4554', '#61a0a8']
                },
                outOfRange: {
                    color: '#ddd'
                },
                seriesIndex: [0]
            }
        }
        // option.parallelAxis = [
        //     {dim: 0, name: schema[0].text, inverse: true, max: 31, nameLocation: 'start'},
        //     {dim: 1, name: schema[1].text},
        //     {dim: 2, name: schema[2].text},
        //     {dim: 3, name: schema[3].text},
        //     {dim: 4, name: schema[4].text},
        //     {dim: 5, name: schema[5].text},
        //     {dim: 6, name: schema[6].text},
        //     {dim: 7, name: schema[7].text,
        //     type: 'category', data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染']}
        // ];

        option.parallel = ClonePOJO.deepClone(Parallel_ChartPOJO.default_parallel);
        option.series.push({
            name: 'Matrix Parallel',
            type: 'parallel',
            itemStyle: {
                normal: {}
            },
            data: data || []
        });
        return ChartPOJO.reset_chart_option(chart, option);
    },
}



var schema = [{
        name: 'date',
        index: 0,
        text: '日期'
    }, {
        name: 'AQIindex',
        index: 1,
        text: 'AQI'
    }, {
        name: 'PM25',
        index: 2,
        text: 'PM2.5'
    }, {
        name: 'PM10',
        index: 3,
        text: 'PM10'
    }, {
        name: 'CO',
        index: 4,
        text: ' CO'
    }, {
        name: 'NO2',
        index: 5,
        text: 'NO2'
    }, {
        name: 'SO2',
        index: 6,
        text: 'SO2'
    }, {
        name: '等级',
        index: 7,
        text: '等级'
    }];

var Cloud_ChartPOJO = Cloud_ChartPOJO || {};
Cloud_ChartPOJO = {
    initialize_chart: function (chart) {
        var option = {
            series: [
                {
                    type: 'wordCloud',
                    shape: 'ellipse',
                    gridSize: 8,
                    textStyle: {
                        normal: {
                            fontFamily: '微软雅黑',
                            color: function () {
                                var colors = ['#fda67e', '#81cacc', '#cca8ba', "#88cc81", "#82a0c5", '#fddb7e', '#735ba1', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
                                return colors[parseInt(Math.random() * 10)];
                            }
                        }
                    },
                    data: null
                }
            ]
        };
        return ChartPOJO.reset_chart_option(chart, option);
    }
}

var Descartes_ChartPOJO = Descartes_ChartPOJO || {};
Descartes_ChartPOJO = {
    initialize_chart: function (chart, type, show_split_line, x_Axis_data, series_name, series_data) {
        if (!chart) {
            return null;
        }
        var chart_parent_div_id = chart.parent_div_id;
        var option = chart.getOption();


        option.grid = ClonePOJO.deepClone(default_grid);
        option.xAxis = ClonePOJO.deepClone(default_xAxis);

        option.xAxis.splitLine.show = show_split_line;
        if (x_Axis_data) {
            option.xAxis.data = x_Axis_data;
        }

        option.yAxis = ClonePOJO.deepClone(default_yAxis);

        option.yAxis.splitLine.show = show_split_line;
        option.dataZoom = ClonePOJO.deepClone(default_dataZoom);

        chart = ChartPOJO.reset_chart_option(chart, option);
        if (series_name && series_data) {

            chart = ChartPOJO.addSeries(chart, series_name, type, series_data);
        }



        return chart;
    },
    //[{"name":"name1","data":[1,2]},{"name":"name2","data":[2,3]}]
    reset_series_data: function (chart, series_data, type, scale_setting) {
        ChartPOJO.removeAllSeries(chart);
        $.each(series_data, function (index, value) {
            var series_item_name = value.name;
            var series_item_data = value.data;
            if (series_item_name && series_item_data) {
                chart = ChartPOJO.addSeries(chart, series_item_name, type, series_item_data, scale_setting);
            }
        });
        return chart;
    },
    build_series_data: function (chart) {
        var result = [];
        if (chart) {
            var s = chart.getOption().series;
            $.each(s, function (index, value) {
                var series_object = {
                    name: value.name,
                    type: value.type,
                    data: value.data
                };
                result.push(series_object);
            })

        }

        return result;
    }
}







//有关dynamic dashboard

function renderDynamicDash(ds, chart, id) {
    retrieveDataSourceDash(chart, ds);
    var interval = setInterval(function () {
        console.log('refresh chart');
        retrieveDataSourceDash(chart, ds);
    }, 1000 * ds.refreshInterval)
    vm.businessPOJO().refreshIntervalArray[id] = interval;
}

function retrieveDataSourceDash(chart, ds) {
    console.log("retrieveChartData");
    var url = ds.ds.attr.ds;
    var rest_mode = ds.ds.attr.rest_mode;
    var request_params = ds.ds.attr.request_params || null;
    if (request_params) {
        request_params = JSON.parse(request_params);
    }

//        var requestPOJO = {
//            "dbName": ds.ds,
//            "sql": ds.sql
//        };
    var wrapper = {
        'chart': chart,
        'ds': ds
    };
    $.serverRequest(url, request_params, "successGetDashData", "failedGetDashData", "serverGetDashData", rest_mode, true, wrapper);
}

$.subscribe("successGetDashData", successGetDashData);


// $.subscribe("failedGetChartData", failedGetChartData);
// $.subscribe("serverGetChartData", serverGetChartData);

function successGetDashData() {
    if (arguments && arguments[1]) {
        var server_data = arguments[1].response;
        var ds = arguments[1].addtion.ds;
        var tableData;
        var ds_header = JSON.parse(arguments[1].addtion.ds.header);
        console.log(arguments[1]);
        if (ds.ds.mode == 'database') {
            var rawData = DataTransferPOJO.transferHiveDataRaw(arguments[1].response.result[0]);
            if (arguments[1].addtion.ds.isTransferT) {
                rawData = DataTransferPOJO.transferT(rawData.result);
                //做数据转置
            }
            tableData = DataTransferPOJO.divideHeaderFromData(rawData.result);
            var header = tableData.header;
            var old_header = []

            for (var i in ds_header) {
                old_header.push(ds_header[i].data)
            }
            for (var i in header) {
                if (old_header.indexOf(header[i]) < 0) {
                    var headerView = {
                        "data": header[i],
                        "index": i,
                        "isChecked": true,
                        "isDisplay": true,
                        "isLegend": false
                    };
                    ds_header.push(headerView);
                }
            }
        } else if (ds.ds.mode == 'api') {
            var tmp = 'server_data.' + ds.ds.attr.json_rule
            server_data = eval(tmp);
            tableData = DataTransferPOJO.serverJsonData2TableData(server_data);
        }
        ChartPOJO.reset_chart_type(arguments[1].addtion.chart, arguments[1].addtion.ds.chartType);
        ChartPOJO.removeAllSeries(arguments[1].addtion.chart);
        ChartPOJO.dataSourceRenderDash(arguments[1].addtion.ds.chartType, tableData.result, ds_header, arguments[1].addtion.chart)
//        LoaderUtil.remove_v3('chart_content_body_div')
    }

}

function Theme() {
    var black = {
        "color": [
            "#fc97af",
            "#87f7cf",
            "#f7f494",
            "#72ccff",
            "#f7c5a0",
            "#d4a4eb",
            "#d2f5a6",
            "#76f2f2"
        ],
        "backgroundColor": "rgba(41,52,65,1)",
        "textStyle": {},
        "title": {
            "textStyle": {
                "color": "#ffffff"
            },
            "subtextStyle": {
                "color": "#dddddd"
            }
        },
        "line": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "4"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "3"
                }
            },
            "symbolSize": "0",
            "symbol": "circle",
            "smooth": true
        },
        "radar": {
            "itemStyle": {
                "normal": {
                    "borderWidth": "4"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "3"
                }
            },
            "symbolSize": "0",
            "symbol": "circle",
            "smooth": true
        },
        "bar": {
            "itemStyle": {
                "normal": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                },
                "emphasis": {
                    "barBorderWidth": 0,
                    "barBorderColor": "#ccc"
                }
            }
        },
        "pie": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "scatter": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "boxplot": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "parallel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "sankey": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "funnel": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "gauge": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                },
                "emphasis": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            }
        },
        "candlestick": {
            "itemStyle": {
                "normal": {
                    "color": "#fc97af",
                    "color0": "transparent",
                    "borderColor": "#fc97af",
                    "borderColor0": "#87f7cf",
                    "borderWidth": "2"
                }
            }
        },
        "graph": {
            "itemStyle": {
                "normal": {
                    "borderWidth": 0,
                    "borderColor": "#ccc"
                }
            },
            "lineStyle": {
                "normal": {
                    "width": "1",
                    "color": "#ffffff"
                }
            },
            "symbolSize": "0",
            "symbol": "circle",
            "smooth": true,
            "color": [
                "#fc97af",
                "#87f7cf",
                "#f7f494",
                "#72ccff",
                "#f7c5a0",
                "#d4a4eb",
                "#d2f5a6",
                "#76f2f2"
            ],
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#293441"
                    }
                }
            }
        },
        "map": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#999999",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,178,72,1)",
                    "borderColor": "#eb8146",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#893448"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(137,52,72)"
                    }
                }
            }
        },
        "geo": {
            "itemStyle": {
                "normal": {
                    "areaColor": "#f3f3f3",
                    "borderColor": "#999999",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "areaColor": "rgba(255,178,72,1)",
                    "borderColor": "#eb8146",
                    "borderWidth": 1
                }
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#893448"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "rgb(137,52,72)"
                    }
                }
            }
        },
        "categoryAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#aaaaaa"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#e6e6e6"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "valueAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#aaaaaa"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#e6e6e6"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "logAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#aaaaaa"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#e6e6e6"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "timeAxis": {
            "axisLine": {
                "show": true,
                "lineStyle": {
                    "color": "#666666"
                }
            },
            "axisTick": {
                "show": false,
                "lineStyle": {
                    "color": "#333"
                }
            },
            "axisLabel": {
                "show": true,
                "textStyle": {
                    "color": "#aaaaaa"
                }
            },
            "splitLine": {
                "show": false,
                "lineStyle": {
                    "color": [
                        "#e6e6e6"
                    ]
                }
            },
            "splitArea": {
                "show": false,
                "areaStyle": {
                    "color": [
                        "rgba(250,250,250,0.05)",
                        "rgba(200,200,200,0.02)"
                    ]
                }
            }
        },
        "toolbox": {
            "iconStyle": {
                "normal": {
                    "borderColor": "#999999"
                },
                "emphasis": {
                    "borderColor": "#666666"
                }
            }
        },
        "legend": {
            "textStyle": {
                "color": "#999999"
            }
        },
        "tooltip": {
            "axisPointer": {
                "lineStyle": {
                    "color": "#cccccc",
                    "width": 1
                },
                "crossStyle": {
                    "color": "#cccccc",
                    "width": 1
                }
            }
        },
        "timeline": {
            "lineStyle": {
                "color": "#87f7cf",
                "width": 1
            },
            "itemStyle": {
                "normal": {
                    "color": "#87f7cf",
                    "borderWidth": 1
                },
                "emphasis": {
                    "color": "#f7f494"
                }
            },
            "controlStyle": {
                "normal": {
                    "color": "#87f7cf",
                    "borderColor": "#87f7cf",
                    "borderWidth": 0.5
                },
                "emphasis": {
                    "color": "#87f7cf",
                    "borderColor": "#87f7cf",
                    "borderWidth": 0.5
                }
            },
            "checkpointStyle": {
                "color": "#fc97af",
                "borderColor": "rgba(252,151,175,0.3)"
            },
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#87f7cf"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#87f7cf"
                    }
                }
            }
        },
        "visualMap": {
            "color": [
                "#fc97af",
                "#87f7cf"
            ]
        },
        "dataZoom": {
            "backgroundColor": "rgba(255,255,255,0)",
            "dataBackgroundColor": "rgba(114,204,255,1)",
            "fillerColor": "rgba(114,204,255,0.2)",
            "handleColor": "#72ccff",
            "handleSize": "100%",
            "textStyle": {
                "color": "#333333"
            }
        },
        "markPoint": {
            "label": {
                "normal": {
                    "textStyle": {
                        "color": "#293441"
                    }
                },
                "emphasis": {
                    "textStyle": {
                        "color": "#293441"
                    }
                }
            }
        }
    }
//    var option = chartViewModel.chart.getOption()
//    option.title[0].textStyle.color = black.title.textStyle.color;
//    option.title[0].subtextStyle.color = black.title.subtextStyle.color;
//    option.color = black.color;
//    option.backgroundColor = black.backgroundColor;
//    chartViewModel.chart.setOption(option)
    echarts.registerTheme('black', black);
}
