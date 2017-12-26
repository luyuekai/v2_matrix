var chart_scatter;
var option_scatter = null;

// *******Data Bind JS Code*******
// Initialize Generic Page View Model as entire page data bind parent element
var vm = new GenericPageViewModel();
// Clean Data Bind Node
ko.cleanNode($('#template-matrix-main-div')[0]);
// Apply data bind in view model and the whole dom
ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
// Refrence the entire page view model to current view model as cache
current_vm = vm;

function env_setup() {
  //do your env setup Business
  // console.log("ENV SETUP INVOKED!");
  vm_env_setup();
  data_env_setup();
}

function vm_env_setup() {

  // *******YOUR SHOULD CODING IN HERE:*******

  function BusinessPOJO() {
    var self = this;
    self.user = ko.observable('MATRIX');
    self.tableModel = ko.observable();
    self.data = null;
    self.chart_data_scatter = null;
    self.gdp_district_name_list = {}; //2011:['市南区', '市北区', '四方区', '李沧区', '崂山区', '黄岛区', '城阳区', '胶州市', '即墨市', '平度市', '胶南市', '莱西市']
    self.current_year_data = ko.observable();

    self.current_year_data.subscribe(function (newValue) {
      self.refresh_table();
      self.refresh_scatter_chart();
      self.refresh_axis_bar_chart();
    });

    self.refresh_table = function(){
      if(self.data && self.current_year_data()){
        var column_names = self.data.title[20];
        var data = self.current_year_data();
        var colunm_data = data[20];
        var tm = new ThinListViewModel();
        tm.buildData(colunm_data);
        tm.columnNames(column_names);
        tm.isDisplayPager(true);
        tm.buildView();
        tm.pageMaxSize(10);
        self.tableModel(tm);
      }
    };

    self.init_scatter_chart=function(){
      option_scatter = gen_option_scatter();
      if(option_scatter){
        chart_scatter = Matrix_Chart_Util.gen_chart('main', option_scatter);
      }
    };

    self.refresh_scatter_chart = function(){
      if(self.data && self.chart_data_scatter && self.current_year_data()){
        var data = self.current_year_data();
        var current_year = data[0];
        if(!chart_scatter){
          self.init_scatter_chart();
          return;
        }
        var opt_scatter = chart_scatter.getOption();
        var gdp_district_name_list = self.gdp_district_name_list;
        opt_scatter.angleAxis = {
          type: 'category',
          data: gdp_district_name_list[current_year],
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'dashed'
            }
          },
          axisLine: {
            show: false
          }
        };
        opt_scatter.series[0].data = self.chart_data_scatter[current_year];
        chart_scatter.setOption(opt_scatter);
      }
    };
    self.refresh_axis_bar_chart = function(){

    };
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
  }


function data_env_setup(){
  Matrix_Util.request_local(Matrix_Util.get_project_path() + '/demo/qd.json', data_handler);
}

function data_handler(json) {
  vm.businessPOJO().data = json;

  var chart_data_scatter = chart_data_init();
  if(chart_data_scatter){
    vm.businessPOJO().chart_data_scatter = chart_data_scatter;
  }

  if(json.data && json.data.length>0){
    vm.businessPOJO().current_year_data(json.data[0]);
  }

  data_refresh();


}

function data_refresh(){
  window.setInterval(function() {
    var data = vm.businessPOJO().data.data;
    var current_year_data = vm.businessPOJO().current_year_data();
    if(current_year_data){
      var current_year = current_year_data[0];
      var next_year_data_index = -1;
      for(var i = 0;i<data.length;i++){
        if(current_year == data[i][0]){
          next_year_data_index = i+1;
          if(next_year_data_index>=data.length){
            next_year_data_index = 0;
          }
          break;
        }
      }
      if(next_year_data_index>-1){
        vm.businessPOJO().current_year_data(data[next_year_data_index]);
      }
    }

  },3000);
}

function chart_data_init(){
  if(vm.businessPOJO().data){
    var result = {};
    var GDP_DISTRICT = {};
    // gdp_district_name_list
    $.each(vm.businessPOJO().data.data,function(index,value){

      var year = value[0];
      //[
      // ["黄岛区", 1003.17, 3.77, 654.25, 613.08, 345.15],
      // ["城阳区", 702.45, 14.29, 434.81, 404.85, 253.35]
      // ...
      //]
      var data = value[20];
      var list_district_name = [];
      var list_gdp_all = [];
      var list_gdp_1 = [];
      var list_gdp_2 = [];
      var list_gdp_2_i = [];
      var list_gdp_3 = [];
      var chart_data = [];
      for(var i = 0;i<data.length;i++){
        var current_district_data = data[i]; //["黄岛区", 1003.17, 3.77, 654.25, 613.08, 345.15]
        var name_district = current_district_data[0];
        list_district_name.push(name_district);
        var gdp_district = current_district_data[1]=="暂无数据"?NaN:current_district_data[1];
        list_gdp_all.push([4,i,gdp_district]);
        var gdp_1_district = current_district_data[2]=="暂无数据"?NaN:current_district_data[2];
        list_gdp_1.push([3,i,gdp_1_district]);
        var gdp_2_district = current_district_data[3]=="暂无数据"?NaN:current_district_data[3];
        list_gdp_2.push([2,i,gdp_2_district]);
        var gdp_2_i_district = current_district_data[4]=="暂无数据"?NaN:current_district_data[4];
        list_gdp_2_i.push([1,i,gdp_2_i_district]);
        var gdp_3_district = current_district_data[5]=="暂无数据"?NaN:current_district_data[5];
        list_gdp_3.push([0,i,gdp_3_district]);
      }
      $.each(list_gdp_3,function(k,v){
        chart_data.push(v);
      });
      $.each(list_gdp_2_i,function(k,v){
        chart_data.push(v);
      });
      $.each(list_gdp_2,function(k,v){
        chart_data.push(v);
      });
      $.each(list_gdp_1,function(k,v){
        chart_data.push(v);
      });
      $.each(list_gdp_all,function(k,v){
        chart_data.push(v);
      });
      result[year] = chart_data;
      GDP_DISTRICT[year] = list_district_name;

    });
    vm.businessPOJO().gdp_district_name_list =GDP_DISTRICT;
    return result;
  }
}


function gen_option_scatter(){
  if(!vm.businessPOJO().chart_data_scatter){
    return;
  }
  var series_data = vm.businessPOJO().chart_data_scatter[2010];
  var gdp_district_name_list = vm.businessPOJO().gdp_district_name_list;
  var option_scatter = {
    color: dark_color,
    title: {
      textStyle: labelStyle,
      text: "青岛市区GDP"
    },
    polar: {},
    tooltip: {
      formatter: function(params) {
        return params.value[2] + ' commits in ' + gdp_district_name_list[params.value[1]] + ' of ' + GDP_CATEGORY_REVERSE[params.value[0]];
      }
    },
    angleAxis: {
      type: 'category',
      data: gdp_district_name_list[2010],
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#999',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: labelStyle,
      }
    },
    radiusAxis: {
      type: 'category',
      data: GDP_CATEGORY_REVERSE,
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: labelStyle,
        rotate: 45
      }

    },
    series: [{
      name: 'Punch Card',
      type: 'scatter',
      coordinateSystem: 'polar',
      symbolSize: function(val) {
        return val[2] / 25;
      },
      animationEasing: 'linear',

      data: series_data
    }],
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
  };
  return option_scatter;
}
