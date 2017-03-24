var labelStyle = {
  //color: 'white',
  fontWeight: 'bold',
  fontSize: '12'
};

var scatterScale = {
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

var gridSupportArray = ['bar', 'line', 'scatter', 'area'];


var ChartPOJO = ChartPOJO || {};

ChartPOJO = {

  current_chart: null,

  current_scale_setting: null,

  generateGridChart: function(chart_div_id, chart_type, chart_title, show_split_line, x_Axis_data, series_name, series_data) {
    var option_chart = {};
    option_chart.color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: chart_title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}"
    };
    option_chart.tooltip = tooltip;

    // 初始化 legend:
    var legend = {
      orient: 'vertical',
      // orient:'horizontal',
      // left: 'center',
      left: 'right',
      top: 'top',
      padding: [0, 20, 0, 0],
      data: [],
      textStyle: labelStyle
    };
    option_chart.legend = legend;
    option_chart.legend.data.push(series_name);

    // 初始化 toolbox:
    var toolbox = {
      show: true,
      orient: 'horizontal',

    }

    // 初始化 grid、x & y Axis
    if (gridSupportArray.indexOf(chart_type) > -1) {
      option_chart.grid = {
        left: '10%',
        right: '10%',
        // top:'10%',
        // bottom:'10%'

      };
      // 初始化 X 坐标轴
      option_chart.xAxis = {
        axisLabel: {
          // interval: 0, // 强制显示所有标签
          // rotate: -45,
          textStyle: labelStyle,
        },
        axisLine: {
          lineStyle: {
            //color: '#fff'
          }
        },
        splitLine: {
          show: show_split_line
        },
        data: x_Axis_data
      };
      option_chart.yAxis = {
        axisLabel: {
          // rotate: 45,
          textStyle: labelStyle,
        },
        axisLine: {
          lineStyle: {
            //color: '#fff'
          }
        },
        splitLine: {
          show: show_split_line
        },
      };
    }

    // 初始化 dataZoom:
    // 默认只初始 X data zoom,因为 Y zoom发现样式有一些问题，尝试调整没有太好解决方案
    // data zoom 支持 slider和inside
    option_chart.dataZoom = [{
        type: 'slider',
        orient: 'horizontal',
        left: 'center',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }, {
        type: 'inside',
        orient: 'horizontal',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }
      // ,{
      //   type: 'slider',
      //   orient: 'vertical',
      //   // left: '95%',
      //   textStyle: labelStyle,
      //   start: 0,
      //   end: 100
      // }, {
      //   type: 'inside',
      //   orient: 'vertical',
      //   textStyle: labelStyle,
      //   start: 0,
      //   end: 100
      // }
    ];

    option_chart.series = [];
    var series_object = {
      name: series_name,
      type: chart_type,
      // stack: 'server',
      itemStyle: {
        normal: {
          //color: '#aa10c9',
        }
      },
      data: series_data
    };
    if (chart_type === 'area') {
      // area acutal is a line chart and has area style fill
      series_object.areaStyle = {
        normal: {}
      };
      series_object.type = 'line';
    }
    option_chart.series.push(series_object);

    var chart = echarts.init(document.getElementById(chart_div_id));



    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },
  generateScatterChart: function(chart_div_id, chart_title, series_name, series_data) {
    var option_chart = {};
    option_chart.color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: chart_title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}"
    };
    option_chart.tooltip = tooltip;

    // 初始化 legend:
    var legend = {
      orient: 'vertical',
      // orient:'horizontal',
      // left: 'center',
      left: 'right',
      top: 'top',
      padding: [0, 20, 0, 0],
      data: [],
      textStyle: labelStyle
    };
    option_chart.legend = legend;
    option_chart.legend.data.push(series_name);

    // 初始化 toolbox:
    var toolbox = {
      show: true,
      orient: 'horizontal',

    }

    // 初始化 grid、x & y Axis
    option_chart.grid = {
      left: '10%',
      right: '10%',
      // top:'10%',
      // bottom:'10%'

    };
    // 初始化 X 坐标轴
    option_chart.xAxis = {
      axisLabel: {
        // interval: 0, // 强制显示所有标签
        // rotate: -45,
        textStyle: labelStyle,
      },
      axisLine: {
        lineStyle: {
          //color: '#fff'
        }
      },
    };
    option_chart.yAxis = {
      axisLabel: {
        // rotate: 45,
        textStyle: labelStyle,
      },
      axisLine: {
        lineStyle: {
          //color: '#fff'
        }
      }
    };

    // 初始化 dataZoom:
    // 默认只初始 X data zoom,因为 Y zoom发现样式有一些问题，尝试调整没有太好解决方案
    // data zoom 支持 slider和inside
    option_chart.dataZoom = [{
      type: 'slider',
      orient: 'horizontal',
      left: 'center',
      textStyle: labelStyle,
      start: 0,
      end: 100
    }, {
      type: 'inside',
      orient: 'horizontal',
      textStyle: labelStyle,
      start: 0,
      end: 100
    }];

    option_chart.series = [];
    var series_object = {
      name: series_name,
      type: 'scatter',
      itemStyle: {
        normal: {}
      },
      data: series_data
    };
    option_chart.series.push(series_object);
    var chart = echarts.init(document.getElementById(chart_div_id));
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  generateParallelChart: function(chart_div_id, chart_title, parallel_axis_data, series_name, series_data) {



    var option_chart = {};
    option_chart.color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: chart_title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}"
    };
    option_chart.tooltip = tooltip;

    // 初始化 legend:
    var legend = {
      orient: 'vertical',
      // orient:'horizontal',
      // left: 'center',
      left: 'right',
      top: 'top',
      padding: [0, 20, 0, 0],
      data: [],
      textStyle: labelStyle
    };
    option_chart.legend = legend;
    option_chart.legend.data.push(series_name);



    var computed_axis = [];
    $.each(parallel_axis_data, function(index, value) {
      var tmp = {
        dim: index,
        name: value
      };
      computed_axis.push(tmp);
    });
    option_chart.parallelAxis = computed_axis;

    option_chart.parallel = {
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
    };


    option_chart.series = [];
    var series_object = {
      name: series_name,
      type: 'parallel',
      itemStyle: {
        normal: {}
      },
      data: series_data
    };
    option_chart.series.push(series_object);
    var chart = echarts.init(document.getElementById(chart_div_id));
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  generatePieChart: function(chart_div_id, pie_title, pie_name, pie_data) {
    var option_chart = {};
    option_chart.color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: pie_title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}"
    };
    option_chart.tooltip = tooltip;


    option_chart.series = [];
    var series_object = {
      name: pie_name,
      type: 'pie',
      data: pie_data
    };
    option_chart.series.push(series_object);

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  addPieData: function(chart, data_name, data_value) {
    var option = ClonePOJO.deepClone(chart.getOption());

    var obj = {
      'name': data_name,
      'value': data_value
    }
    option.series[0].data.push(obj);

    chart.clear();

    chart.setOption(option);

    return chart;
  },
  removePieData: function(chart, data_name) {
    var option = ClonePOJO.deepClone(chart.getOption());
    var data = [];

    $.each(option.series[0].data, function(index, value) {
      if (value.name != data_name) {
        data.push(value);
      }
    });

    option.series[0].data = data;

    chart.clear();

    chart.setOption(option);

    return chart;
  },

  generateRadarChart: function(chart_div_id, title, indicator, series_data) {
    var option_chart = {};
    option_chart.color = ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'];
    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}"
    };
    option_chart.tooltip = tooltip;
    var radar = {
      // shape: 'circle',
      indicator: indicator
    };
    option_chart.radar = radar;
    option_chart.series = [];
    var series_object = {
      type: 'radar',
      data: series_data
    };
    option_chart.series.push(series_object);

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },
  add_radar_indicator: function(chart, indicator_name, max_value) {
    var option = ChartPOJO.cloneChartOption(chart);
    var obj = {
      'name': indicator_name,
      'max': max_value
    }
    option.radar[0].indicator.push(obj);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_radar_indicator: function(chart, data_name) {
    var option = ClonePOJO.deepClone(chart.getOption());
    var data = [];

    $.each(option.radar[0].indicator, function(index, value) {
      if (value.name != data_name) {
        data.push(value);
      }
    });

    option.radar[0].indicator = data;

    chart.clear();

    chart.setOption(option);

    return chart;
  },

  add_radar_data: function(chart, data_name, data_value) {
    var option = ClonePOJO.deepClone(chart.getOption());

    var obj = {
      'name': data_name,
      'value': data_value
    }
    option.series[0].data.push(obj);

    chart.clear();

    chart.setOption(option);

    return chart;
  },
  remove_radar_data: function(chart, data_name) {
    var option = ClonePOJO.deepClone(chart.getOption());
    var data = [];

    $.each(option.series[0].data, function(index, value) {
      if (value.name != data_name) {
        data.push(value);
      }
    });

    option.series[0].data = data;

    chart.clear();

    chart.setOption(option);

    return chart;
  },

  clean_radar_indicator: function(chart) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.radar[0].indicator = [];
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  generateBoxplotChart: function(chart_div_id, title, origin_data) {
    if (!echarts) {
      return;
    }
    var data = echarts.dataTool.prepareBoxplotData(origin_data);
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      origin_data: origin_data,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: data.axisData,
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
      yAxis: {
        type: 'value',
        splitArea: {
          show: true
        }
      },
      series: [{
        name: 'boxplot',
        type: 'boxplot',
        data: data.boxData,
        itemStyle: {
          normal: {
            borderColor: '#1ABC9C'
          },
          emphasis: {
            borderColor: '#5DADE2'
          }
        },
        tooltip: {
          formatter: function(param) {
            return [
              'Boxplot: ' + param.name,
              'upper: ' + param.data[4],
              'Q3: ' + param.data[3],
              'median: ' + param.data[2],
              'Q1: ' + param.data[1],
              'lower: ' + param.data[0]
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
        data: data.outliers
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  add_boxplot_data: function(chart, data_value) {
    var option = ClonePOJO.deepClone(chart.getOption());
    if (!option.origin_data || !option.chart_div_id) {
      return chart;
    }
    option.origin_data.push(data_value);
    var title = option.title.text;
    var chart_div_id = option.chart_div_id;
    return ChartPOJO.generateBoxplotChart(chart_div_id, title, option.origin_data);
  },
  remove_boxplot_data: function(chart, data_index) {
    var option = ClonePOJO.deepClone(chart.getOption());
    var data = [];
    option.origin_data.splice(data_index, 1);
    var title = option.title.text;
    var chart_div_id = option.chart_div_id;
    return ChartPOJO.generateBoxplotChart(chart_div_id, title, option.origin_data);
  },

  reset_grid_heatmap_x: function(chart, x) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.xAxis[0].data = x;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  reset_grid_heatmap_y: function(chart, x) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.yAxis[0].data = x;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  reset_grid_heatmap_min_max: function(chart, min, max) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.visualMap[0].min = min;
    option.visualMap[0].max = max;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  reset_grid_heatmap_data: function(chart, data) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.series[0].data = data;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  add_grid_heatmap_data: function(chart, x, y, num) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value[0] == x && value[1] == y) {
        search_index = index;
        value[2] = num;
      }
    });
    if (search_index == -1) {
      var tmp = [x, y, num];
      option.series[0].data.push(tmp);
    }

    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_grid_heatmap_data: function(chart, x, y) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value[0] == x && value[1] == y) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].data.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  generateGridHeatmapChart: function(chart_div_id, title, x, y, min, max, data) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },
      animation: false,
      grid: {
        height: '80%',
        y: '10%'
      },
      xAxis: {
        type: 'category',
        data: x,
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: y,
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: min || 0,
        max: max || 10,
        calculable: true,
        orient: 'vertical',
        left: 'right',
        top: '5%'
      },
      series: [{
        name: 'Punch Card',
        type: 'heatmap',
        data: data,
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
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },


  generateSankeyChart: function(chart_div_id, title, nodes, links) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      series: [{
        type: 'sankey',
        data: nodes,
        links: links,
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
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  add_sankey_data: function(chart, data_name) {
    var option = ChartPOJO.cloneChartOption(chart);
    var node = {
      'name': data_name
    }
    option.series[0].data.push(node);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_sankey_data: function(chart, data_name) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value.name == data_name) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].data.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  add_sankey_link: function(chart, source, target, value) {
    var option = ChartPOJO.cloneChartOption(chart);
    var link = {
      "source": source,
      "target": target,
      "value": value
    }
    option.series[0].links.push(link);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_sankey_link: function(chart, source, target) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].links, function(index, value) {
      if (value.source == source && value.target == target) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].links.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  generateGraphChart: function(chart_div_id, title, nodes, links, categories) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      series: [{
        type: 'graph',
        layout: 'none',
        data: nodes,
        links: links,
        categories: categories,
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },
  add_graph_data: function(chart, data_name, x_value, y_value, category) {
    var option = ChartPOJO.cloneChartOption(chart);

    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value.name == data_name) {
        search_index = index;
      }
    });
    if (search_index > -1) {
      return chart;
    }
    var node = {
      'name': data_name,
      'x': x_value,
      'y': y_value,
      'category': category
    }
    option.series[0].data.push(node);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  generateCircularChart: function(chart_div_id, title, nodes, links, categories) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      series: [{
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: nodes,
        links: links,
        categories: categories,
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

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  add_circular_data: function(chart, data_name, data_value, category) {
    var option = ChartPOJO.cloneChartOption(chart);

    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value.name == data_name) {
        search_index = index;
      }
    });
    if (search_index > -1) {
      return chart;
    }
    var node = {
      'name': data_name,
      'value': data_value,
      'symbolSize':data_value,
      'label':{
            normal: {
                show: data_value > 10
            }
        },
      'category': category
    }
    option.series[0].data.push(node);
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  generateForceChart: function(chart_div_id, title, nodes, links, categories) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      series: [{
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: links,
        categories: categories,
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },
  add_force_data: function(chart, data_name, data_value, category) {
    var option = ChartPOJO.cloneChartOption(chart);

    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value.name == data_name) {
        search_index = index;
      }
    });
    if (search_index > -1) {
      return chart;
    }
    var node = {
      'name': data_name,
      'value': data_value,
      'draggable': true,
      'category': category
    }
    option.series[0].data.push(node);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_force_data: function(chart, data_name) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value.name == data_name) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].data.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  add_force_link: function(chart, source, target) {
    var option = ChartPOJO.cloneChartOption(chart);
    var link = {
      "source": source,
      "target": target
    }
    option.series[0].links.push(link);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_force_link: function(chart, source, target) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].links, function(index, value) {
      if (value.source == source && value.target == target) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].links.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  generateRiverChart: function(chart_div_id, title, river_type, data) {
    if (!echarts) {
      return;
    }
    var option_chart = {};
    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      singleAxis: {
        max: 'dataMax',
        min: 'dataMin',
        type: river_type
      },
      series: [{
        type: 'themeRiver',
        data: data,
        label: {
          normal: {
            show: true
          }
        }
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },
  add_river_data: function(chart, data_name, data_axis, data_value) {
    var option = ChartPOJO.cloneChartOption(chart);
    var arr = [data_axis, data_value, data_name];
    option.series[0].data.push(arr);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_river_data: function(chart, data_name, data_axis) {
    var option = ChartPOJO.cloneChartOption(chart);
    var search_index = -1;
    $.each(option.series[0].data, function(index, value) {
      if (value[0] == data_axis && value[2] == data_name) {
        search_index = index;
      }
    });
    if (search_index == -1) {
      return chart;
    }
    option.series[0].data.splice(search_index, 1);
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  generateTreemapChart: function(chart_div_id, title, data, leafDepth) {
    if (!echarts) {
      return;
    }
    var option_chart = {};

    option_chart = {
      color: ['#1ABC9C', '#5DADE2', '#FFC153', '#EC7063', '#CC99CC', '#666666', '#5E5E73', '#FFBC11'],
      chart_div_id: chart_div_id,
      title: {
        show: true,
        x: 'left',
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
        text: title || "Untitled",
      },
      tooltip: {
        position: 'top'
      },

      series: [{
        name: title,
        type: 'treemap',
        leafDepth: leafDepth,
        label: {
          show: true,
          formatter: '{b}'
        },
        itemStyle: {
          normal: {
            borderColor: '#fff'
          }
        },
        data: data,
        tooltip: {
          formatter: function(param) {
            return [
              'Name: ' + param.data.name,
              'Value: ' + param.data.value,
              'ID: ' + param.data.id
            ].join('<br/>')
          }
        }
      }]
    };

    var chart = echarts.init(document.getElementById(chart_div_id));


    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);

    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },

  reset_Axis: function(chart, axis_type, axis_data) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.xAxis = {
      axisLabel: {

        textStyle: labelStyle,
      },
      axisLine: {
        lineStyle: {}
      },
      data: null
    };
    option.yAxis = {
      axisLabel: {
        textStyle: labelStyle,
      },
      axisLine: {
        lineStyle: {}
      },
      data: null
    };

    if (axis_type == "y") {
      option.yAxis.data = axis_data;
      option.dataZoom = [];
    } else {
      option.xAxis.data = axis_data;
      option.dataZoom = [{
        type: 'slider',
        orient: 'horizontal',
        left: 'center',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }, {
        type: 'inside',
        orient: 'horizontal',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }];
    }

    chart.clear();
    chart.setOption(option);

    return chart;
  },

  addSeries: function(chart, series_name, series_type, series_data, scale_setting) {
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
    if (series_type === 'scatter') {

      scale_setting = scale_setting || default_scale_setting;
      if (scale_setting.enable) {
        if (scale_setting.useData) {

          var min = null;
          var max = null;
          $.each(series_data, function(index, value) {
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
          symbolSize: function(val, param) {
            return ChartPOJO.getScaleBySeries(val, param.seriesIndex, ChartPOJO.current_scale_setting.min_value, ChartPOJO.current_scale_setting.max_value);
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

  removeSeries: function(chart, series_name) {
    var option = ClonePOJO.deepClone(chart.getOption());

    var tmp_series = [];
    var tmp_legends = [];
    $.each(option.series, function(index, series_object) {
      if (!(series_object && series_object.name == series_name)) {
        tmp_series.push(series_object);
      }
    });

    $.each(option.legend[0].data, function(index, legend_object) {

      if (!(legend_object && legend_object == series_name)) {
        tmp_legends.push(legend_object);
      }
    })
    option.series = tmp_series;
    option.legend[0].data = tmp_legends;

    chart.clear();

    chart.setOption(option);

    return chart;
  },

  addStack: function(chart, stack_name, series_name) {
    var option = ClonePOJO.deepClone(chart.getOption());
    $.each(option.series, function(index, value) {
      if (value.name == series_name) {
        value.stack = stack_name;
      }
    });

    chart.clear();

    chart.setOption(option);

    return chart;
  },

  removeStack: function(chart, stack_name) {
    if (!stack_name) {
      return chart;
    }
    var option = ClonePOJO.deepClone(chart.getOption());
    $.each(option.series, function(index, value) {
      if (value.stack == stack_name) {
        value.stack = null;
      }
    });
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  getStacks: function(chart) {
    var stacks = [];
    $.each(chart.getOption().series, function(index, value) {
      if (value.stack && stacks.indexOf(value.stack) == -1) {
        stacks.push(value.stack);
      }
    });
    return stacks;
  },

  updateSeriesName: function(old_name, new_name) {
    var stacks = [];
    var option = ClonePOJO.deepClone(chart.getOption());
    $.each(option.series, function(index, value) {
      if (value.name == old_name) {
        value.name = new_name;
      }
    });
    $.each(option.legend, function(index, value) {
      if (value.name == old_name) {
        value.name = new_name;
      }
    });
    chart.clear();
    chart.setOption(option);
  },

  cloneChartOption: function(chart) {
    var option = ClonePOJO.deepClone(chart.getOption());
    return option;
  },


  resetTitle: function(chart, titleViewModel) {
    if (chart && titleViewModel) {
      var option = ChartPOJO.cloneChartOption(chart);
      var title = {
        padding: [0, 0, 0, 20],
        textStyle: labelStyle,
      };
      title.text = titleViewModel.title_name();
      title.show = titleViewModel.title_display();
      title.link = titleViewModel.title_link();
      title.target = titleViewModel.title_target();
      title.textAlign = titleViewModel.title_align();
      title.textBaseline = titleViewModel.title_baseline();

      title.subtext = titleViewModel.sub_title_name();
      title.sublink = titleViewModel.sub_title_link();
      title.subtarget = titleViewModel.sub_title_target();

      title.itemGap = titleViewModel.title_gap();

      option.title = title;
      chart.clear();
      chart.setOption(option);
    }
  },

  getScale: function(value, value_min, value_max, scale_min, scale_max) {
    if (!value || !value_min || !value_max) {
      return scatterScale.min_scale;
    }
    scale_min = scale_min || scatterScale.min_scale;
    scale_max = scale_max || scatterScale.max_scale;
    var result = scale_min;

    result = scale_min + (value - value_min) / (value_max - value_min) * (scale_max - scale_min);
    result = Math.round(result);
    return result;
  },

  getScaleBySeries: function(value, seriesIndex, min, max) {
    if (ChartPOJO.current_chart && seriesIndex) {
      var series = ChartPOJO.current_chart.getOption().series[seriesIndex];
      if (!min && !max) {
        if (series && series.data) {
          $.each(series.data, function(index, value) {
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

  cleanChart: function(parent_div_id) {
    $('#' + parent_div_id).empty();
  },
  newChart: function(parent_div_id) {
    $('#' + parent_div_id).empty();
    var chart = echarts.init(document.getElementById(parent_div_id));
    var option = {};
    chart.setOption(option);
    $(window).resize(function() {
      setTimeout(function() {
        chart.resize();
      }, 500);
    });
    return chart;
  },


  serialize_chart_option: function(chart) {
    var option = ChartPOJO.cloneChartOption(chart);

    return $.toJSON(option);
  },

  clean_chart_data: function(chart) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.series[0].data = [];
    chart.clear();
    chart.setOption(option);
    return chart;
  },

  deserialize_chart_option: function(json) {
    var option = $.parseJSON(json);
    return option;
  },

  renderChart: function(parent_div_id, option) {
    if (parent_div_id && option) {
      var chart = echarts.init(document.getElementById(parent_div_id));
      // 使用刚指定的配置项和数据显示图表。
      chart.setOption(option);

      $(window).resize(function() {
        setTimeout(function() {
          chart.resize();
        }, 500);
      });
      return chart;
    }
  },
  reset_series_data: function(chart, data) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.series[0].data = data;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  reset_river_type: function(chart, river_type) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.singleAxis[0].type = river_type;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  reset_treemap_drilldown: function(chart, drilldown_value) {
    var option = ChartPOJO.cloneChartOption(chart);
    option.series[0].leafDepth = drilldown_value;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  add_treemap_node: function(chart, parent_id, child_name, child_value) {
    var option = ChartPOJO.cloneChartOption(chart);
    var treemap_array = option.series[0].data;
    var child = {
      'name': child_name,
      'value': child_value,
      'children': []
    };
    if (!parent_id) {
      // add to the first level
      var prepare_id = treemap_array.length + 1;
      child.id = prepare_id;
      treemap_array.push(child);
    } else {
      ChartPOJO.add_treemap_child(treemap_array, parent_id, child);
    }

    option.series[0].data = treemap_array;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  remove_treemap_node: function(chart, node_id) {
    var option = ChartPOJO.cloneChartOption(chart);
    var treemap_array = option.series[0].data;
    ChartPOJO.remove_treemap_child(treemap_array, node_id);
    option.series[0].data = treemap_array;
    chart.clear();
    chart.setOption(option);
    return chart;
  },
  add_treemap_child: function(treemap_array, parent_id, child) {
    $.each(treemap_array, function(index, value) {
      ChartPOJO.add_child_iterator(value, parent_id, child);
    })
  },

  add_child_iterator: function(node, parent_id, child) {
    if (node.id == parent_id) {
      var child_id = ChartPOJO.compute_child_id(node, child);
      child.id = child_id;
      node.children.push(child);
      return;
    }
    if (node.children && node.children.length) {
      for (var i = 0; i < node.children.length; i++) {
        ChartPOJO.add_child_iterator(node.children[i], parent_id, child);
      }
    }
  },

  remove_treemap_child(treemap_array, child_id) {
    $.each(treemap_array, function(index, value) {
      ChartPOJO.remove_child_iterator(value, child_id);
    })
  },

  remove_child_iterator: function(node, child_id) {
    var flag = false;
    for (var i in node.children) {
      if (node.children[i].id == child_id) {
        node.children.splice(i, 1);
        flag = true;
      }
    }
    if (!flag) {
      for (var i in node.children) {
        flag = flag || ChartPOJO.remove_child_iterator(node.children[i], child_id);
      }
    }
    return flag;
  },

  compute_child_id: function(parent, child) {
    var parent_id = parent.id;
    if (!parent.children) {
      parent.children = [];
    }
    var suffix_id = parent.children.length + 1;
    var child_id = String(parent.id) + String(suffix_id);
    return child_id;
  },



}
