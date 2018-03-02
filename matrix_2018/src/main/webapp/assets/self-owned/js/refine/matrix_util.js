var Matrix_Util = {
  /**
   * 获取Server路径 比如 http://localhost:8080
   */
  get_server_path: function() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    return prePath;
  },
  /**
   * 获取项目路径 比如 http://localhost:8080/matrix_2018
   */
  get_project_path: function() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
  },
  /**
   * 随机生成一个UniqueID
   */
  gen_id: function() {
    return Math.round(Math.random() * 100) + "_" + (new Date()).getTime() + "_" + (new Date()).getTime();
  },

  /**
   * 请求本地的数据源
   * 测试路径:
   * Matrix_Util.request_local(Matrix_Util.get_project_path() + '/assets/self-owned/data/server_mock_data.json', Matrix_Util.print_handler);
   *
   * @param  {[必填项]} url     请求的地址，比如在本地的json文件
   *                          示例：Matrix_Util.get_project_path() + '/assets/self-owned/data/server_mock_data.json'
   * @param  {[必填项]} handler 返回结果后的处理函数
   * @return {[type]}         无返回值，属于异步调用
   */
  request_local: function(url, handler) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      success: function(json) {
        if (handler) {
          handler(json);
        }
      },
      error: function(xhr, status) {
        console.log('Sorry, there was a problem on SERVER_REQUEST_ACTION process!');
      },
      complete: function(xhr, status) {}
    });
  },


  /**
   * 请求远程数据源或REST
   * 测试路径:
   * Matrix_Util.request_remote(Matrix_Util.get_project_path() + '/api/mock/post/success', Matrix_Util.print_handler);
   *
   * @param  {[必填项]} url                           [请求的地址，比如REST接口]
   *                                                 示例：Matrix_Util.get_project_path() + '/api/mock/post/success'
   * @param  {[必填项]} handler                       [返回正确结果后的处理函数]
   * @param  {[选填项]} option_param                  [请求的参数]
   * @param  {[选填项]} option_type                   [请求的类型，默认为POST]
   * @param  {[选填项]} option_need_wrap              [请求是否需要包含额外数据]
   * @param  {[选填项]} option_wrap_data              [请求包含的额外数据]
   * @param  {[选填项]} option_respones_error_handler [结果异常处理函数]
   * @param  {[选填项]} option_service_error_handler  [服务异常处理函数]
   * @return                                         [无返回值，属于异步调用]
   */
  request_remote: function(url, handler, option_param, option_type, option_need_wrap, option_wrap_data, option_respones_error_handler, option_service_error_handler) {
    var listener_response_error = option_respones_error_handler || DEFAULT_MATRIX_SERVER_RESPONSE_ERROR_HANDLER;
    var listener_service_error = option_service_error_handler || DEFAULT_MATRIX_SERVER_SERVICE_EXCEPTION_HANDLER;
    var post_contentType = "application/x-www-form-urlencoded;charset=UTF-8";
    var get_contentType = "application/json;charset=UTF-8";
    var default_contentType = post_contentType;
    var request_type = option_type || "POST";
    var request_data = option_param || null;
    if (request_type.toUpperCase() == 'GET') {
      default_contentType = get_contentType;
    }
    $.ajax({
      url: url,
      data: request_data,
      type: request_type,
      contentType: default_contentType,
      dataType: 'json',
      success: function(json) {
        if (json.hasError) {
          // console.log("SERVER_REQUEST_ACTION get error: " + json.errorMessage);
          if (option_need_wrap) {
            json = {
              'response': json,
              'addtion': option_wrap_data
            };
          }
          if (listener_response_error) {
            listener_response_error(json);
          }
        } else {
          if (option_need_wrap) {
            json = {
              'response': json,
              'addtion': option_wrap_data
            };
          }
          if (handler) {
            handler(json);
          }
        }
      },
      error: function(xhr, status) {
        // console.log('Sorry, there was a problem on SERVER_REQUEST_ACTION process!');
        if (option_need_wrap) {
          var wrapJson = {
            'addtion': option_wrap_data
          };
          if (listener_service_error) {
            listener_service_error(wrapJson);
          }
        } else {
          if (listener_service_error) {
            listener_service_error(xhr);
          }
        }

      },
      complete: function(xhr, status) {}
    });
  },

  /**
   * 默认的打印结果测试函数
   * @param  {[type]} json [description]
   * @return {[type]}      [description]
   */
  print_handler: function(json) {
    console.log(json);
  },

  //original: [{},{},{}]
  // 比如:
  // [
  //   {"id": 1,"name": "bill","sex": "male","age": 32,"email": "bill@matrix.com","phone": 13912738475},
  //   {"id": 2,"name": "amanda","sex": "female","age": 32,"email": "amanda@matrix.com","phone": 13912738475},
  //   {"id": 3,"name": "carina","sex": "female","age": 32,"email": "carina@matrix.com","phone": 13912738475},
  //   {"id": 4,"name": "tom","sex": "male","age": 32,"email": "tom@matrix.com","phone": 13912738475}
  // ]
  //return : {header:[],result:[[],[],[]]}
  json2table: function(inputData) {
    var result = {};
    var headers = Matrix_Util.buildKeys(inputData);
    var dataArray = [];
    $.each(inputData, function(index, value) {
      var singleRowData = [];
      $.each(headers, function(i, v) {
        if (value[v] !== null) {
          singleRowData.push(value[v]);
        } else {
          singleRowData.push("");
        }
      });
      dataArray.push(singleRowData);
    });
    result.header = headers;
    result.result = dataArray;
    return result;
  },

  /**
   * 将数据（一般是数组数据）按照属性提取出标准的key属性列表
   * 举例：
   *  原始数据 [{"key_time":"20150513","key_1":"安徽","key_2":"移动","key_3":"3rdpartyflow"}]
   *  返回结果 ["key_time", "key_1", "key_2", "key_3"]
   */
  buildKeys: function(inputDataArray) {
    var finished = false;
    var result = [];
    $.each(inputDataArray, function(i, data) {
      if (finished) {
        return;
      }
      for (var key in data) {
        result.push(key);
      }
      finished = true;
    });
    return result;
  },

  //original: [{},{},{}]
  //return : {header:[],result:[[],[],[]]}
  serverJsonData2TableData: function(inputData) {
    var resultJsonObject = {};
    var headers = Matrix_Util.buildKeys(inputData);

    var dataArray = [];
    $.each(inputData, function(index, value) {
      var singleRowData = [];
      $.each(headers, function(i, v) {
        if (value[v] !== null) {
          singleRowData.push(value[v]);
        } else {
          singleRowData.push("");
        }
      });
      dataArray.push(singleRowData);
    });
    resultJsonObject.header = headers;
    resultJsonObject.result = dataArray;

    return resultJsonObject;
  },

  shallowClone: function(oldObject) {
    return jQuery.extend({}, oldObject);
  },
  deepClone: function(oldObject) {
    return jQuery.extend(true, {}, oldObject);
  },

  dispatchGenericResponse: function(responseJSON, listener_response_success, listener_response_error) {
    listener_response_success = listener_response_success || "SERVER_RESPONSE_SUCCESS";
    listener_response_error = listener_response_error || "SERVER_RESPONSE_ERROR";
    if (responseJSON.hasError) {
      $.publish(listener_response_error, responseJSON);
    } else {
      $.publish(listener_response_success, responseJSON);
    }
  },

  /**
   * 通用的业务处理函数，比如新增操作，更新操作，删除操作
   *
   * @param  {[type]} function_validate 客户端验证函数
   * @param  {[type]} function_execute  和服务器端交互函数
   * @param  {[type]} vm                GenericPageViewModel
   * @return {[type]}                   [description]
   */
  default_process_handler: function(function_validate, function_execute, vm) {
    if (function_validate && function_execute && vm) {
      if (!vm.validation(function_validate)) {
        return;
      } else {
        function_execute();
      }
    }
  },

  formatTime: function(input, format) {
    var date = new Date();
    date.setTime(input);
    format = format ? format : "yyyy-MM-dd hh:mm:ss S";
    return date.Format(format);
  },
};

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
  DEFAULT_MIN_HEIGHT: 160,
  cache: {

  },
  cache_chart: function(chart_container_id, chart, chart_setting_info) {
    var cache = {
      'chart_container_id': chart_container_id,
      'chart': chart,
      'chart_setting_info': chart_setting_info
    };
    Matrix_DOM_Util.cache[chart_container_id] = cache;
  },

  // 拷贝一个dom元素，并将其放置在指定的div容器内
  // 相当于一个完整的COPY+PASTE操作
  // 支持包含chart的dom
  clone_dom: function(destination_parent_div_id, original_dom_id) {
    var dom = Matrix_DOM_Util.copy_dom(original_dom_id);
    if ($(dom).height < Matrix_DOM_Util.DEFAULT_MIN_HEIGHT) {
      $(dom).height(Matrix_DOM_Util.DEFAULT_MIN_HEIGHT);
    }
    var chart_container_div = $(dom).find('.matrix_chart_container');
    var tmp_chart_id = Matrix_Util.gen_id() + "_chart";
    if (chart_container_div.length > 0) {
      chart_container_div.attr('id', tmp_chart_id);
      chart_container_div.empty();
    }

    Matrix_DOM_Util.paste_dom(destination_parent_div_id, dom);

    if (chart_container_div.length > 0) {
      var origin_chart_container_id = $('#' + original_dom_id).find('.matrix_chart_container').attr('id');
      var cached_chart = Matrix_DOM_Util.cache[origin_chart_container_id];
      if (!cached_chart) {
        alert('chart not cached!');
      } else {
        Matrix_Chart_Util.gen_chart(tmp_chart_id, cached_chart.chart.getOption(), cached_chart.chart_setting_info);
      }
    }
    return dom;
  },

  // 拷贝一个dom元素，并返回其拷贝值
  // 若未指定拷贝后的dom元素id，函数按照当前前端时间戳生成一个默认dom元素id
  // 返回值：生成的拷贝后的dom对象，或空对象
  copy_dom: function(original_dom_id) {
    if (original_dom_id) {
      // generate div
      var context_div_clone = $('#' + original_dom_id).clone().removeAttr('id');
      var tmp_id = Matrix_Util.gen_id() + "_dom";
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

  // 通过chart的option参数，将其还原成chart，放置到指定的div中
  // 返回值：生成的chart对象，异常则返回空对象
  // chart_setting_info包含额外的一些附加信息，比如ds和chart type，这两个属性不属于option的直接可以获得属性
  // chart_setting_info格式:
  // {
  //    'chart_ds':...,
  //    'chart_type':...
  // }
  gen_chart: function(chart_container_id, chart_option_info, chart_setting_info) {
    var chart;
    if (ChartPOJO && chart_container_id) {
      chart = ChartPOJO.generate_default_chart(chart_container_id);
      var option = null;
      if (typeof chart_option_info === "string") {
        option = Matrix_DOM_Util.deserialize_chart_option(chart_option_info);
      } else if (typeof chart_option_info === "object") {
        option = chart_option_info;
      }
      if (option) {
        chart = ChartPOJO.reset_chart_option(chart, option);
      }
      if (chart_setting_info) {
        Matrix_Chart_Util.reset_chart_ds(chart, chart_setting_info.chart_ds, chart_setting_info.chart_type);
      }
      if (!$('#' + chart_container_id).hasClass('matrix_chart_container')) {
        $('#' + chart_container_id).addClass('matrix_chart_container');
      }
      Matrix_DOM_Util.cache_chart(chart_container_id, chart, chart_setting_info);
    }
    return chart;
  },

  reset_chart_ds: function(chart, chart_ds, chart_type) {
    if (chart && ds) {
      var interval = chart_ds.refresh_interval || 10;
      setInterval(function() {
        Matrix_Chart_Util.retrieve_chart_ds(chart, chart_ds, chart_type);
      }, 1000 * interval);

      Matrix_Chart_Util.retrieve_chart_ds(chart, chart_ds, chart_type);
    }
  },

  retrieve_chart_ds: function(chart, chart_ds, chart_type) {
    var wrapper = {
      'chart': chart,
      'ds': chart_ds,
      'chartType': chart_type
    };
    var url = wrapper.ds.ds;
    var rest_mode = wrapper.ds.rest_mode;
    var request_params = wrapper.ds.request_params || null;
    if (request_params) {
      request_params = JSON.parse(request_params);
    }
    $.serverRequest(url, request_params, "SUCCESS_LISTENER_DYNAMIC_CHART", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", rest_mode, true, wrapper);
  },

  retrieve_chart_ds_listener: function() {
    if (arguments && arguments[1]) {
      var server_data = arguments[1].response;
      var ds = arguments[1].addtion.ds;
      var chart = arguments[1].addtion.chart;
      var chart_type = arguments[1].addtion.chartType;
      var tableData;
      if (ds.json_rule) {
        var tmp = 'server_data.' + ds.json_rule;
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

function DEFAULT_MATRIX_SERVER_RESPONSE_SUCCESS_HANDLER(json) {
  if (json) {
    var formattedStr = JSON.stringify(json, null, 2);
    Matrix_UI.message_success(formattedStr, "Server Service Success!", "Please read the message below:");
  }
}

function DEFAULT_MATRIX_SERVER_RESPONSE_ERROR_HANDLER(json) {
  if (json) {
    var formattedStr = JSON.stringify(json, null, 2);
    Matrix_UI.message_error(formattedStr, "Server Service Error!", "Please read the message below:");
  }
}

function DEFAULT_MATRIX_SERVER_SERVICE_EXCEPTION_HANDLER(json) {
  if (json) {
    Matrix_UI.message_error("Catch Fatal Exception From Server!", "Fatal Exception!", "Please read the message below:");
  }
}

var GENERIC_ADD = function(requestPOJO) {
  if (requestPOJO) {
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    Matrix_Util.request_remote(Matrix_Util.get_server_path() + '/service_generic_query/api/cud/add', DEFAULT_MATRIX_SERVER_RESPONSE_SUCCESS_HANDLER, data);
  }
};
var GENERIC_UPDATE = function(requestPOJO) {
  if (requestPOJO) {
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    Matrix_Util.request_remote(Matrix_Util.get_server_path() + '/service_generic_query/api/cud/update', DEFAULT_MATRIX_SERVER_RESPONSE_SUCCESS_HANDLER, data);
  }
};

var GENERIC_ADD_TEST = function() {
  var time = (new Date()).getTime();
  var time_format = Matrix_Util.formatTime(time, 'yyyy-MM-dd');
  var requestPOJO = {
    "className": "v2.service.generic.query.entity.Genericentity",
    "attributes": {
      "type": "MATRIX_TUTORIALS_EXAMPLE_ENTITY",
      "creator": "MATRIX",
      "numberalpha": time,
      "stringalpha": time_format,
      "name": "name_" + Matrix_Util.gen_id(),
      "description": "description_" + time_format,
      "enabled": true,
      "valid": true,
      "deleted": false,
    }
  };
  GENERIC_ADD(requestPOJO);
};
var GENERIC_UPDATE_TEST = function(id) {
  if(!id) return;
  var time = (new Date()).getTime();
  var time_format = Matrix_Util.formatTime(time, 'yyyy-MM-dd');
  var requestPOJO = {
    "className": "v2.service.generic.query.entity.Genericentity",
    "attributes": {
      "type": "MATRIX_TUTORIALS_EXAMPLE_ENTITY",
      "id":id,
      "numberalpha": time,
      "stringalpha": time_format,
      "name": "name_" + Matrix_Util.gen_id(),
      "description": "description_" + time_format,
      "enabled": true,
      "valid": true,
      "deleted": false,
    }
  };
  GENERIC_UPDATE(requestPOJO);
};
var GENERIC_LOGIC_DELETE_TEST = function(id) {
  if(!id) return;
  var time = (new Date()).getTime();
  var time_format = Matrix_Util.formatTime(time, 'yyyy-MM-dd');
  var requestPOJO = {
    "className": "v2.service.generic.query.entity.Genericentity",
    "attributes": {
      "type": "MATRIX_TUTORIALS_EXAMPLE_ENTITY",
      "id":id,
      "numberalpha": time,
      "stringalpha": time_format,
      "name": "name_" + Matrix_Util.gen_id(),
      "description": "description_" + time_format,
      "enabled": true,
      "valid": true,
      "deleted": true,
    }
  };
  GENERIC_UPDATE(requestPOJO);
};
Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}



var ValidationPOJO = ValidationPOJO || {};
ValidationPOJO = {
  validateNotNull: function(input) {
    if (ValidationPOJO.validateMustNumber(input)) {
      return true;
    } else {
      var result = false;
      if (input && input.length > 0) {
        result = true;
      } else {
        result = false;
      }
      return result;
    }
  },
  validateNotMax: function(input) {
    var result = false;
    if (input && input.length <= 255) {
      result = true;
    } else {
      result = false;
    }
    return result;
  },
  validateNoMoreThan5000: function(input) {
    var result = false;
    if (input && input.length < 5000) {
      result = true;
    } else {
      result = false;
    }
    return result;
  },
  validateMustNumber: function(input) {
    try {
      return jQuery.isNumeric(input);
      // input = parseFloat(input);
      // if (typeof input == 'number') {
      //   return true;
      // } else {
      //   return false;
      // }
    } catch (ex) {
      return false;
    }
  },
  validateNOTNegative: function(input) {
    if (ValidationPOJO.validateMustNumber(input) && input >= 0) {
      return true;
    } else {
      return false;
    }
  },
  validateSpecialChars: function(input) {
    // console.log("The validate input special chars operation has been invoked!");
    var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\\/`\|])*)$/);
    var result = input.match(regEx);
    if (result == null) {
      // console.log("The validate input operation result: false---"+input);
      return false;
    } else {
      // console.log("The validate input operation result: true---"+input);
      return true;
    }
  },
  validateFilePath: function(input) {
    // console.log("The validate input special chars operation has been invoked!");
    var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\`\|])*)$/);
    var result = input.match(regEx);
    if (result == null) {
      // console.log("The validate input operation result: false---"+input);
      return false;
    } else {
      // console.log("The validate input operation result: true---"+input);
      return true;
    }
  },
  validateInputLength: function(input) {
    //        console.log("The validate input length operation has been invoked!");
    var result = false;
    if (input && input.length >= 6 && input.length <= 20) {
      result = true;
    } else {
      result = false;
    }
    //        console.log("The validate input length operation result:[" + input + "] is " + result);
    return result;
  },
  validateEmailPattern: function(input) {
    // console.log("The validate input email pattern operation has been invoked!");
    var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    var regEx = new RegExp(reMail);
    var result = false;
    if (regEx.test(input)) {
      result = true;
    }
    // console.log("The validate input email pattern operation result:["+input+"] is "+result);
    return result;
  },
  validatePhonePattern: function(input) {
    var tel = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
    var regEx = new RegExp(tel);
    var result = false;
    if (regEx.test(input)) {
      result = true;
    }
    return result;
  },
  KEY_NOT_NULL: 'KEY_NOT_NULL',
  KEY_ARRAY_NOT_NULL: 'KEY_ARRAY_NOT_NULL',
  KEY_NOT_MAX: 'KEY_NOT_MAX',
  KEY_TOO_LONG: 'KEY_TOO_LONG',
  KEY_SPECIAL: 'KEY_SPECIAL',
  KEY_EMAIL: 'KEY_EMAIL',
  KEY_LENGTH_SCOPE: 'KEY_LENGTH_SCOPE',
  KEY_NOT_NEGATIVE: 'KEY_NOT_NEGATIVE',
  KEY_MUST_NUMBER: 'KEY_MUST_NUMBER',
  KEY_MUST_PHONE_NUMBER: 'KEY_MUST_PHONE_NUMBER',
  KEY_FILE_PATH: 'KEY_FILE_PATH',
  validate: function(inputName, inputValue, errorMessageRef, validateFunctions, emptyFlag) {
    if (emptyFlag) {

    } else {
      if (!inputValue) {
        // errorMessageRef.push(inputName + " 不能为空");
        errorMessageRef.push(inputName + " can not be empty");
        return;
      }
    }

    if (inputName && inputValue && errorMessageRef && validateFunctions) {
      for (i = 0; i < validateFunctions.length; i++) {
        var key = validateFunctions[i];
        if (ValidationPOJO.KEY_NOT_NULL == key) {
          if (!ValidationPOJO.validateNotNull(inputValue)) {
            // errorMessageRef.push(inputName + " 不能为空");
            errorMessageRef.push(inputName + " can not be empty");
          }
        }
        if (ValidationPOJO.KEY_ARRAY_NOT_NULL == key) {
          if (!ValidationPOJO.validateNotNull(inputValue)) {
            // errorMessageRef.push(inputName + " 不能为空数组");
            errorMessageRef.push(inputName + " can not be empty array");
          }
        }
        if (ValidationPOJO.KEY_TOO_LONG == key) {
          if (!ValidationPOJO.validateNoMoreThan5000(inputValue)) {
            // errorMessageRef.push(inputName + " 超过输入最大限制[5000字符]");
            errorMessageRef.push(inputName + " exceed max limit");
          }
        }
        if (ValidationPOJO.KEY_NOT_MAX == key) {
          if (!ValidationPOJO.validateNotMax(inputValue)) {
            // errorMessageRef.push(inputName + " 超过输入最大限制");
            errorMessageRef.push(inputName + " exceed max limit");
          }
        }
        if (ValidationPOJO.KEY_SPECIAL == key) {
          if (!ValidationPOJO.validateSpecialChars(inputValue)) {
            // errorMessageRef.push(inputName + " 含有特殊字符");
            errorMessageRef.push(inputName + " contain special character");
          }
        }
        if (ValidationPOJO.KEY_EMAIL == key) {
          if (!ValidationPOJO.validateEmailPattern(inputValue)) {
            // errorMessageRef.push(inputName + " 不符合正确的邮箱格式");
            errorMessageRef.push(inputName + " is not valid email format");
          }
        }
        if (ValidationPOJO.KEY_LENGTH_SCOPE == key) {
          if (!ValidationPOJO.validateInputLength(inputValue)) {
            // errorMessageRef.push(inputName + " 长度不满足格式要求");
            errorMessageRef.push(inputName + " is not in the correct length scope");
          }
        }
        if (ValidationPOJO.KEY_NOT_NEGATIVE == key) {
          if (!ValidationPOJO.validateNOTNegative(inputValue)) {
            // errorMessageRef.push(inputName + " 必须为非负数");
            errorMessageRef.push(inputName + " can not be negetive");
          }
        }
        if (ValidationPOJO.KEY_MUST_NUMBER == key) {
          if (!ValidationPOJO.validateMustNumber(inputValue)) {
            // errorMessageRef.push(inputName + " 必须是数字");
            errorMessageRef.push(inputName + " must be number");
          }
        }
        if (ValidationPOJO.KEY_MUST_PHONE_NUMBER == key) {
          if (!ValidationPOJO.validatePhonePattern(inputValue)) {
            // errorMessageRef.push(inputName + " 必须是合法的电话号码");
            errorMessageRef.push(inputName + " must valid phone number");
          }
        }
        if (ValidationPOJO.KEY_FILE_PATH == key) {
          if (!ValidationPOJO.validateFilePath(inputValue)) {
            // errorMessageRef.push(inputName + " 必须是合法的文件路径");
            errorMessageRef.push(inputName + " can not be illegal file path");
          }
        }
      }
    } else {
      return;
    }
  }
};
