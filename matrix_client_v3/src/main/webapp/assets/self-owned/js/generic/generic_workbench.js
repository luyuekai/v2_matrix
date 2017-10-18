

var serialize_dom = function(dom_id){
 var s = new XMLSerializer();
 var d = document.getElementById(dom_id);
 var str = s.serializeToString(d);
 return str;
}

var deserialize_dom = function(dom_str){
  return $.parseHTML(dom_str);
}


var clone_component = function(destination_parent_div_id,div_id,clone_div_id){

  if (div_id && destination_parent_div_id) {
    // generate div
    var context_div_clone = $('#'+div_id).clone().removeAttr('id');
    var tmp_id = clone_div_id||(new Date()).getTime() + "DIV";
    context_div_clone.attr('id', tmp_id);
    context_div_clone.css('display', '');

    // console.log("generate workbench table div is:");
    // console.log(context_div_clone);

    var $div = $('#'+destination_parent_div_id);
    if($div.length){
      $div.append(context_div_clone);
    }
    return tmp_id;
  }
}

var clone_component_v2 = function(div_id,clone_div_id){

  if (div_id) {
    // generate div
    var context_div_clone = $('#'+div_id).clone().removeAttr('id');
    var tmp_id = clone_div_id||(new Date()).getTime() + "DIV";
    context_div_clone.attr('id', tmp_id);
    context_div_clone.css('display', '');

    return context_div_clone[0];
  }
}

var create_client_table = function(header,data,parent_div_id,table_id,pagerDispalyFlag,vm){
  if(!$('#client_table_template_div').length){
    return vm;
  }
  if (header && data) {
    // generate div
    var context_div_clone = $('#client_table_template_div').clone().removeAttr('id');
    var tmp_id = table_id||(new Date()).getTime() + "DIV";
    context_div_clone.attr('id', tmp_id);
    context_div_clone.css('display', '');

    // console.log("generate workbench table div is:");
    // console.log(context_div_clone);

    var $div = $('#'+parent_div_id);
    if($div.length){
      $div.append(context_div_clone);
    }

    //data bind
    var tmp_vm = null;
    if(!vm){
      tmp_vm = new ThinListViewModel();
      ko.applyBindings(tmp_vm, document.getElementById(tmp_id));
      tmp_vm.pageMaxSize(100);
    }else{
      tmp_vm = vm;
    }
    tmp_vm.buildData(data);
    tmp_vm.columnNames(header);
    tmp_vm.buildView();
    tmp_vm.isDisplayPager(pagerDispalyFlag);

    return tmp_vm;
  }
}

var addWidget_clientTable = function(header, data) {
  if (header && data) {
    // generate div
    var context_div_clone = $('#client_table_template_div').clone().removeAttr('id');
    var tmp_id = (new Date()).getTime() + "DIV";
    context_div_clone.attr('id', tmp_id);
    context_div_clone.css('display', '');

    // console.log("generate workbench table div is:");
    // console.log(context_div_clone);

    // add to the workbench
    add_content_div(context_div_clone, 0, 0, 6, 6);

    //data bind
    var tmp_vm = new ListViewModel();
    ko.applyBindings(tmp_vm, document.getElementById(tmp_id));
    tmp_vm.pageMaxSize(5);
    tmp_vm.buildData(data);
    tmp_vm.columnNames(header);
    tmp_vm.buildView();

  }
}

//$('.grid-stack').data('gridstack').grid.nodes[0].el[0].id
var WorkbenchCache = {
  prototype_element:{
    widget_id:'12345678',
    widget_element:{
      "id":null,
      "isWidget":true,
      "widget_x":0,
      "widget_y":0,
      "widget_width:":6,
      "widget_height":5,
      "isChart":false,
      "data":null
    }
  },
  array_elements:[],
  updateCache:function(){
    var grid_nodes = $('.grid-stack').data('gridstack').grid.nodes;
    var new_array = [];
    $.each(grid_nodes,function(index,value){
      var id = value.el[0].id;
      $.each(WorkbenchCache.array_elements,function(i,v){
        if(v.widget_id == id){
          v.widget_element.widget_x = value.x;
          v.widget_element.widget_y = value.y;
          v.widget_element.widget_width = value.width;
          v.widget_element.widget_height = value.height;
          var prototype_element = {
            'widget_id':id,
            'widget_element':v.widget_element
          }
          new_array.push(prototype_element);
        }
      });
    });
    WorkbenchCache.array_elements = new_array;
  }
}

var add_content_div = function(content,x,y,x_width,y_height){
  x = x || 0;
  y = y || 0;
  x_width = x_width || 12;
  y_height = y_height || 4;
  var grid = $('.grid-stack').data('gridstack');
  //clone draggableTemplate, and remove attribute of id
  var template = $('#draggableTemplate').clone().removeAttr('id');
  //find draggableTemplateContext DIV in the template, append the context into it
  var $draggableTemplateContext = template.find('.draggableTemplateContext');
  var $draggableTemplateContext_id = (new Date()).getTime();
  $draggableTemplateContext.attr('id', $draggableTemplateContext_id);
  $draggableTemplateContext.append(content);
  //add template into grid as widget
  var widget = $('<div></div>').append(template);
  widget = grid.addWidget(widget, x, y, x_width, y_height);
  widget.attr('id', (new Date()).getTime()+'_widget');
  var element_prototype = {
    "id":$(content).attr('id'),
    "isWidget":true,
    "widget_x":x,
    "widget_y":y,
    "widget_width:":x_width,
    "widget_height":y_height,
    "isChart":false,
    "data":serialize_dom($(content).attr('id'))
  }
  var widget_prototype_element={
    widget_id:widget.attr('id'),
    widget_element:element_prototype
  }
  WorkbenchCache.array_elements.push(widget_prototype_element);
  return widget;
}

var addWidget_chart = function(option,x,y,x_width,y_height) {
  x = x || 0;
  y = y || 0;
  x_width = x_width || 6;
  y_height = y_height || 6;

  var grid = $('.grid-stack').data('gridstack');

  //step 2: clone draggableTemplate, and remove attribute of id
  var template = $('#draggableTemplate').clone().removeAttr('id');
  //step 3: find draggableTemplateContext DIV in the template, append the context into it
  var $draggableTemplateContext = template.find('.draggableTemplateContext');
  var $draggableTemplateContext_id = (new Date()).getTime();
  $draggableTemplateContext.attr('id', $draggableTemplateContext_id);
  // style="min-height:380px; max-height:380px;"
  // $draggableTemplateContext.css('min-height', '320px');
  // $draggableTemplateContext.css('max-height', '960px');
  // $draggableTemplateContext.css('height', '320px');
  // template.find('.draggableTemplateContext').append(context_div_clone);
  //step 4: add template into grid as widget
  var widget = $('<div></div>').append(template);
  grid.addWidget(widget,x, y, x_width, y_height);

  var chart = echarts.init(document.getElementById($draggableTemplateContext_id));
  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);



  $draggableTemplateContext.attr('chart', chart);

  chartCache[$draggableTemplateContext_id] = chart;

  widget.attr('id', (new Date()).getTime()+'_widget');
  var element_prototype = {
    "id":$draggableTemplateContext_id,
    "isWidget":true,
    "widget_x":0,
    "widget_y":0,
    "widget_width:":6,
    "widget_height":6,
    "isChart":true,
    "data":$.toJSON(option)
  }
  var widget_prototype_element={
    widget_id:widget.attr('id'),
    widget_element:element_prototype
  }
  WorkbenchCache.array_elements.push(widget_prototype_element);

  return chart;
}

var cleanWidget = function(){
  var grid = $('.grid-stack').data('gridstack');
  grid.removeAll();
}
var setup_default_workbench = function(){
  var options = {
    cellHeight: 60,
    verticalMargin: 20,
    alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    resizable: {
      handles: 'e, se, s, sw, w'
    },
    width: 12,
    float: false,
    removable: '.trash',
    removeTimeout: 100,
    acceptWidgets: '.grid-stack-item'
  };

  $('.grid-stack').gridstack(options);
  initialize_workbench();
  WorkbenchCache.array_elements = [];
}



var chartCache={

};
var refresh_workbench = function(){
  $.each(chartCache,function(index,chart){
    if(chart){
      chart.resize();
    }
  });
}

var initialize_workbench = function(){

    $('body').on('click', '.remove-drag', function(e) {
      e.preventDefault();
      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item')

      grid.removeWidget(el);
      $.publish("WORKBENCH_EVENT_CHANGE");
    });
    $('body').on('click', '.lock-drag', function(e) {
      e.preventDefault();
      var $unlock = $(this).next();
      $unlock.css('display', '');

      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item');
      grid.locked(el, true);

      $(this).css('display', 'none');
      $.publish("WORKBENCH_EVENT_CHANGE");
    });

    $('body').on('click', '.unlock-drag', function(e) {
      e.preventDefault();
      var $lock = $(this).prev();
      $lock.css('display', '');
      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item');

      grid.locked(el, false);
      $(this).css('display', 'none');
      $.publish("WORKBENCH_EVENT_CHANGE");
    });

    $('.grid-stack').on('resizestop', function(event, ui) {
      var grid = this;
      var element = event.target;
      console.log(grid);
      console.log(element);

      var $draggableTemplateContext = $(element).find('.draggableTemplateContext');
      var height_$draggableTemplateContext= $(element).height()-80;

      var $draggableTemplateContext_id = $draggableTemplateContext.attr('id');
      var $draggableTemplateContext_chart = $draggableTemplateContext.attr('chart');
      console.log($draggableTemplateContext_id);
      if ($draggableTemplateContext_id && $draggableTemplateContext_chart) {

        setTimeout(function() {
          // $draggableTemplateContext_chart.resize();
          var chart = chartCache[$draggableTemplateContext_id];
          if(chart){
            // var ht = $draggableTemplateContext.css('height');

            $draggableTemplateContext.height(height_$draggableTemplateContext);
            chart.resize();
          }

        }, 500);
      }
      $.publish("WORKBENCH_EVENT_CHANGE");
    });

    $('.grid-stack').on('change', function(event, items) {

    });
}
