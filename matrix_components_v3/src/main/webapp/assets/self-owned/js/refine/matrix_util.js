// Matrix DOM Util 通用函数
// 功能包含：
//  1，克隆chart
//  2，克隆dom
//  3，复制dom
//  4，粘贴dom
//  5，序列化dom
//  6，反序列化dom
//  7，序列化chart option
//  8，反序列化chart option
var Matrix_DOM_Util = {

  // 通过chart的option参数，将其还原成chart，放置到指定的div中
  // 返回值：生成的chart对象，异常则返回空对象
  // chart_setting_info包含额外的一些附加信息，比如ds和chart type，这两个属性不属于option的直接可以获得属性
  // chart_setting_info格式:
  // {
  //    'chart_ds':...,
  //    'chart_type':...
  // }
  clone_chart: function(destination_div_id, chart_option_info,chart_setting_info) {
    if (ChartPOJO && destination_div_id) {
      var option = null;
      if (typeof chart_option_info === "string") {
        option = Matrix_DOM_Util.deserialize_chart_option(chart_option_info);
      } else if (typeof chart_option_info === "object") {
        option = chart_option_info;
      }
      if (option) {
        var chart = ChartPOJO.reset_chart_option(ChartPOJO.generate_default_chart(destination_div_id), option);
        if(chart_setting_info){
          Matrix_Chart_Util.reset_chart_ds(chart,chart_setting_info.chart_ds,chart_setting_info.chart_type);
        }
        return chart;
      }
    }
    return null;
  },

  clone_chart_container:function(destination_div_id,chart_option_info,chart_setting_info,original_dom_id,copied_dom_id,copied_chart_id){
    var tmp_dom_id = copied_dom_id || (new Date()).getTime() + "_dom";
    var tmp_chart_id = copied_chart_id || (new Date()).getTime() + "_chart";
    var dom = Matrix_DOM_Util.copy_dom(original_dom_id,tmp_dom_id);
    var chart_container_div = $(dom).find('.matrix_chart_container');
    chart_container_div.attr('id', copied_chart_id);
    chart_container_div.empty();
    Matrix_DOM_Util.paste_dom(destination_div_id,dom);

    return Matrix_DOM_Util.clone_chart(tmp_chart_id, chart_option_info,chart_setting_info);
  },

  // 拷贝一个dom元素，并将其放置在指定的div容器内
  // 相当于一个完整的COPY+PASTE操作
  clone_dom: function(destination_parent_div_id, original_dom_id, copied_dom_id) {
    return paste_dom(destination_parent_div_id, copy_dom(original_dom_id, copied_dom_id));
  },

  // 拷贝一个dom元素，并返回其拷贝值
  // 若未指定拷贝后的dom元素id，函数按照当前前端时间戳生成一个默认dom元素id
  // 返回值：生成的拷贝后的dom对象，或空对象
  copy_dom: function(original_dom_id, copied_dom_id) {
    if (original_dom_id) {
      // generate div
      var context_div_clone = $('#' + original_dom_id).clone().removeAttr('id');
      var tmp_id = copied_dom_id || (new Date()).getTime() + "_dom";
      context_div_clone.attr('id', tmp_id);
      context_div_clone.css('display', '');

      return context_div_clone[0];
    }
    return null;
  },

  // 将一个dom元素放置在指定的div容器内，类似于粘贴操作
  // 返回值：dom元素，或空对象
  paste_dom: function(destination_parent_div_id, dom_element) {
    if (destination_parent_div_id && dom_element) {
      var $div = $('#' + destination_parent_div_id);
      if ($div.length) {
        $div.append(dom_element);
      }
    }
    return dom_element;
  },

  // 将除了Chart之外的dom元素进行序列化操作转化为String
  serialize_dom: function(dom_id) {
    var s = new XMLSerializer();
    var d = document.getElementById(dom_id);
    return s.serializeToString(d);
  },

  // 将String反序列化成dom元素，Chart请使用对应的功能
  deserialize_dom: function(dom_json) {
    return $.parseHTML(dom_json);
  },

  // 将Chart的Option元素进行序列化操作
  serialize_chart_option: function(option) {
    return $.toJSON(option);
  },

  // 将String反序列化成chart的option元素
  deserialize_chart_option: function(json) {
    var option = $.parseJSON(json);
    return option;
  },

};

//这里面的函数应该属于generic_chart.js
//但暂时不修改那个文件，后续考虑merge操作
//chart_type: echart默认初始化后并没有type类型，它存在于option.series[0].type,但这种写法并不安全，因此我们增加了此参数
//没有将chart type放入到chart ds，是因为两者并没有直接的包含关系
//由于Generic_chart.js存在问题，目前这里只做架构的代码实现，并只支持pie图
var Matrix_Chart_Util = {
  reset_chart_ds: function(chart,chart_ds,chart_type) {
    if(chart && ds){
      var interval = chart_ds.refresh_interval || 10;
      setInterval(function(){
        Matrix_Chart_Util.retrieve_chart_ds(chart,chart_ds,chart_type);
      },1000*interval);

      Matrix_Chart_Util.retrieve_chart_ds(chart,chart_ds,chart_type);
    }
  },

  retrieve_chart_ds:function(chart,chart_ds,chart_type){
    var wrapper = {
      'chart':chart,
      'ds':chart_ds,
      'chartType':chart_type
    };
    var url = wrapper.ds.ds;
    var rest_mode = wrapper.ds.rest_mode;
    var request_params = wrapper.ds.request_params || null;
    if(request_params){
      request_params = JSON.parse(request_params);
    }
    $.serverRequest(url, request_params, "SUCCESS_LISTENER_DYNAMIC_CHART", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", rest_mode, true,wrapper);
  },

  retrieve_chart_ds_listener:function() {
    if (arguments && arguments[1]) {
      var server_data = arguments[1].response;
      var ds = arguments[1].addtion.ds;
      var chart = arguments[1].addtion.chart;
      var chart_type = arguments[1].addtion.chartType;
      var tableData;
      if(ds.json_rule){
        var tmp = 'server_data.'+ds.json_rule;
        server_data = eval(tmp);
        tableData = DataTransferPOJO.serverJsonData2TableData(server_data);
      }
      if (chart_type == "pie") {
        var chart_data = DataTransferPOJO.server_data_to_chart(server_data);
        // var chart_data = tableData.result;
        chart = ChartPOJO.removeAllSeries(chart);
        chart = Pie_ChartPOJO.initialize_chart(chart, chart_data);
      }
    }
  }
};

$.subscribe("SUCCESS_LISTENER_DYNAMIC_CHART", Matrix_Chart_Util.retrieve_chart_ds_listener);
