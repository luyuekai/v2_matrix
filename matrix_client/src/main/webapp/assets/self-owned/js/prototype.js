$.hasUrlParam = function(name) {
  var results = new RegExp('[\?&]' + name).exec(window.location.href);
  if (results == null) {
    return false;
  } else {
    return true;
  }
}
$.urlParamValue = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}
$.getRootPath = function() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
  return (prePath + postPath);
}
$.getServerRoot = function() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  return prePath;
}

$(document).ready(function() {
  $('#navDIV').load($.getRootPath() + '/assets/self-owned/html/header.html');
  $('#navAuthDIV').load($.getRootPath() + '/assets/self-owned/html/authHeader.html');
  $('#footerDIV').load($.getRootPath() + '/assets/self-owned/html/footer.html');
  $('#carouseContentDIV').load($.getRootPath() + '/assets/self-owned/html/carouse.html');
  $('#commentsDIV').load($.getRootPath() + '/assets/self-owned/html/comments.html');
  $(function() {
    $('[data-toggle="tooltip"]').tooltip()
  });
});

var ClonePOJO = ClonePOJO || {};
ClonePOJO = {
    shallowClone: function(oldObject) {
        return jQuery.extend({}, oldObject);
    },
    deepClone: function(oldObject) {
        return jQuery.extend(true, {}, oldObject);
    }
};
var UtilPOJO = UtilPOJO || {};
UtilPOJO = {
    removeEmptyChars: function(element, index, array) {
        return (element !== "");
    },
    getValue: function(input) {
        if (typeof(input) === 'undefind') {
            return '';
        } else {
            return input;
        }
    },
    encode: function(obj) {
        // return obj.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
        return escape(obj);
    },
    decode: function(obj) {
        // return unescape(obj.replace(/&#x/g, '%u').replace(/;/g, ''));
        return unescape(obj);
    },

    formatTime:function(input){
        var date = new Date();
        date.setTime(input);
        return date.Format("yyyy-MM-dd hh:mm:ss S");
    }
}

var TableUtil = TableUtil || {};
TableUtil = {

  generateHeaderArray: function(headerArray) {

    var TablePOJO = {
      currentColumns: 0,
      resultHeader: [],
      dataArray: []
    };

    var rowspan, colspan = [],
      repeat = [],
      totalColums = 1,
      resultHeader = [];
    rowspan = headerArray.length;

    console.log('rowspan is ' + rowspan);
    $.each(headerArray, function(idx, val) {
      var arrLenght = val.length;
      console.log('element ' + idx + ' is ' + val + ' and the length is ' + arrLenght);
      totalColums = totalColums * arrLenght;

      $.each(colspan, function(idx, val) {
        val = val * arrLenght;
        colspan[idx] = val;

      });
      colspan.push(1);

      repeat.push(totalColums / arrLenght);

    });

    $.each(colspan, function(idx, val) {
      console.log('header layer ' + idx + ' has ' + val + ' colspan every column ');
    });

    $.each(repeat, function(idx, val) {
      console.log('header layer ' + idx + ' needs ' + val + ' repeat times ');
    });

    totalColums = totalColums + 1; // add date column

    TablePOJO.currentColumns = totalColums;

    console.log("total columns are " + totalColums);


    $.each(headerArray, function(idx, val) {
      var currentLevelHeader = [];
      var currentColspan = colspan[idx];
      var currentRepeatTimes = repeat[idx];
      var cursor = 0;
      if (idx == 0) {
        //add date column
        currentLevelHeader.push({
          title: '时间',
          field: 'date',
          rowspan: rowspan,
          align: 'center',
          valign: 'middle'
        });
      }
      //val is also a array

      for (var i = 0; i < currentRepeatTimes; i++) {
        $.each(val, function(idx, innerVal) {
          if (currentColspan == 1) {
            //node
            var innerData = {
              title: innerVal,
              field: 'value' + cursor,
              align: 'center'
            };
            currentLevelHeader.push(innerData);
            cursor++;
          } else {
            //parent
            var innerData = {
              title: innerVal,
              colspan: currentColspan,
              align: 'center',
            };
            currentLevelHeader.push(innerData);
          }
        });
      }


      resultHeader.push(currentLevelHeader);
    });


    $.each(resultHeader, function(idx, val) {
      var arrLenght = val.length;
      console.log('resultHeader ' + idx + ' length is ' + arrLenght);
      var content = "";
      $.each(val, function(idx, innerVal) {
        content = content + $.toJSON(innerVal) + ";";
      });
      console.log('resultHeader ' + idx + ' content are: ' + content);
    });

    TablePOJO.resultHeader = resultHeader;
    return TablePOJO;
  },



  constructHeader: function(tableRef, TablePOJO) {
    var columns = [];


    tableRef.bootstrapTable('destroy').bootstrapTable({
      columns: TablePOJO.resultHeader,
      data: []
    });
    return TablePOJO;
  },

  constructData: function(tableRef, TablePOJO, dataArray) {
    tableRef.bootstrapTable('destroy').bootstrapTable({
      columns: TablePOJO.resultHeader,
      data: dataArray,
    });
    TablePOJO.dataArray = dataArray;
    return TablePOJO;
  },
  constructTableALL: function(tableRef, TablePOJO) {
    tableRef.bootstrapTable('destroy').bootstrapTable({
      columns: TablePOJO.resultHeader,
      data: TablePOJO.dataArray
    });
  }
}


var DataPOJO = DataPOJO||{};
DataPOJO={
  //保存传入数据
  inputData:[],
  //保存当前转换后的数据
  outputData:[],
  //时间维度过滤器，默认以年为单位，从2000-1-1到当前日期为时间范围,小时范围从0-23
  filter_Date:{
    type:'year',                        //year,month,day
    begin:new Date(2000,0,1,0,0,0),     // default 2000-1-1
    end: new Date(),                    // default today
    hourFrom:0,
    hourTo:23
  },
  //业务维度过滤器：省、运营商、数据类型、接口类型、采集点
  filter_province:[],
  filter_company:[],
  filter_dataType:[],
  filter_interface:[],
  filter_nodes:[],
  //业务维度表头构造顺序:['province','company','dataType','interface','node']代表五级表头的顺序包含，默认为省的一层表头
  tableHeaderOrder:['province'],
  //表头
  tableHeader:[],

  //通过table header order和业务维度过滤器生成表头，举例
  //假设：
  //tableHeaderOrder：['province','company','dataType','interface']
  //provinces:['安徽', '广东', '辽宁', '黑龙江', '浙江', '江苏'],
  //business:['中国移动', '中国联通', '中国电信'],
  //dataType:['userlog', 'userflow', 'userurl', 'http', 'rowflow'],
  //interfaceType:['gg', 'pi']
  //那么按照顺序将filter的省、运营商、接口类型、数据类型灌入到数组中，再调用
  //TableUtil.generateHeaderArray()来生成表头
  //将生成的表头保存在DataPOJO.tableHeader对象中
  constructHeader:function(){

  },

  //类型转换函数，通过算法进行数据筛选、过滤，返回指定的结果
  transferData:function(){
    DataPOJO.outputData = DataPOJO.inputData;
    //business logic
    return DataPOJO.outputData;
  },
}



var LoaderUtil = LoaderUtil || {};
LoaderUtil = {

  loaderComponent:'<div class="loader-container text-center color-white"><div><i class="fa fa-spinner fa-pulse fa-3x"></i></div><div>Loading</div></div>',

  addMask:function(div_id) {
    if (!$('#' + div_id).hasClass('loader')) {
      $('#' + div_id).addClass('loader');
    }
  },
  removeMask:function(div_id) {
    if ($('#' + div_id).hasClass('loader')) {
      $('#' + div_id).removeClass('loader');
    }
  },

  addLoader:function(div_id) {
    if (!$('#' + div_id).find('.loader-container').length) {
      var $loader = $(LoaderUtil.loaderComponent);
      $loader.appendTo('#' + div_id);
    }
    LoaderUtil.addMask(div_id);
  },

  removeLoader:function(div_id) {
    var $loaderComponents = $('#' + div_id).find('.loader-container');
    $loaderComponents.remove();
  },

  add:function(div_id) {
    LoaderUtil.addLoader(div_id);
  },

  remove:function(div_id) {
    LoaderUtil.removeMask(div_id);
  }

}
