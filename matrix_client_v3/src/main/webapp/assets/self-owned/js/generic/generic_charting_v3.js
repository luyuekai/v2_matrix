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

  addPieData: function(chart, data_name,data_value) {
    var option = ClonePOJO.deepClone(chart.getOption());

    var obj = {
      'name':data_name,
      'value':data_value
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
      if(value.name!=data_name){
        data.push(value);
      }
    });

    option.series[0].data=data;

    chart.clear();

    chart.setOption(option);

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
      return;
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

  updateSeriesName: function(old_name,new_name) {
    var stacks = [];
    var option = ClonePOJO.deepClone(chart.getOption());
    $.each(option.series, function(index, value) {
      if(value.name==old_name){
        value.name = new_name;
      }
    });
    $.each(option.legend, function(index, value) {
      if(value.name==old_name){
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
  newChart:function(parent_div_id){
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

  deserialize_chart_option: function(json) {
    var option = $.parseJSON(json);
    return option;
  },

  renderChart:function(parent_div_id,option){
    if(parent_div_id&&option){
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
  }

}
