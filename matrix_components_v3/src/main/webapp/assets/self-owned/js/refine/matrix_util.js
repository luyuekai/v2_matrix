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
  clone_chart: function(div_id, chart_option_info) {
    if (ChartPOJO && div_id) {
      var option = null;
      if (typeof chart_option_info === "string") {
        option = Matrix_DOM_Util.deserialize_chart_option(chart_option_info);
      } else if (typeof chart_option_info === "object") {
        option = chart_option_info;
      }
      if (option) {
        return ChartPOJO.reset_chart_option(ChartPOJO.generate_default_chart(div_id), option);
      }
    }
    return null;
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
