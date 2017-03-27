
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

var add_content_div = function(content,x,y,x_width,y_height){
  x = x || 0;
  y = y || 0;
  x_width = x_width || 12;
  y_height = y_height || 4
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
  grid.addWidget(widget, x, y, x_width, y_height);
}

var addWidget_chart = function(option) {
  var grid = $('.grid-stack').data('gridstack');

  //step 2: clone draggableTemplate, and remove attribute of id
  var template = $('#draggableTemplate').clone().removeAttr('id');
  //step 3: find draggableTemplateContext DIV in the template, append the context into it
  var $draggableTemplateContext = template.find('.draggableTemplateContext');
  var $draggableTemplateContext_id = (new Date()).getTime();
  $draggableTemplateContext.attr('id', $draggableTemplateContext_id);
  // style="min-height:380px; max-height:380px;"
  // $draggableTemplateContext.css('min-height', '320px');
  $draggableTemplateContext.css('max-height', '960px');
  $draggableTemplateContext.css('height', '320px');
  // template.find('.draggableTemplateContext').append(context_div_clone);
  //step 4: add template into grid as widget
  var widget = $('<div></div>').append(template);
  grid.addWidget(widget, 0, 0, 6, 6);

  var chart = echarts.init(document.getElementById($draggableTemplateContext_id));
  // 使用刚指定的配置项和数据显示图表。
  chart.setOption(option);

  $draggableTemplateContext.attr('chart', chart);

  chartCache[$draggableTemplateContext_id] = chart;
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
}



var chartCache={

};
var initialize_workbench = function(){

    $('body').on('click', '.remove-drag', function(e) {
      e.preventDefault();
      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item')

      grid.removeWidget(el);
    });
    $('body').on('click', '.lock-drag', function(e) {
      e.preventDefault();
      var $unlock = $(this).next();
      $unlock.css('display', '');

      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item');
      grid.locked(el, true);

      $(this).css('display', 'none');
    });

    $('body').on('click', '.unlock-drag', function(e) {
      e.preventDefault();
      var $lock = $(this).prev();
      $lock.css('display', '');
      var grid = $('.grid-stack').data('gridstack'),
        el = $(this).closest('.grid-stack-item');

      grid.locked(el, false);
      $(this).css('display', 'none');
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
    });
}
