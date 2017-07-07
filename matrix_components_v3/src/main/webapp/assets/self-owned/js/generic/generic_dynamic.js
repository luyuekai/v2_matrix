var Matrix_Dynamic_Table_Cache = [];
function clone_table_chain(destination_div_id,new_div_id,vm_original){
  //1, clone matrix table wrapper div
  clone_component(destination_div_id,'wrapped_matrix_dynamic_table_div',new_div_id);

  //2, initialize view model
  var vm = new MatrixTable();
  ko.cleanNode($('#'+new_div_id)[0]);
  ko.applyBindings(vm,document.getElementById(new_div_id));

  //3, data bind
  setTimeout(function() {
    var tds = vm_original.table_data_source();
    if(tds && vm){
      vm.table_data_source(tds);
    }
  }, 500);

  //4, cache vm
  var cache = {
    'key':new_div_id,
    'vm':vm
  }

  Matrix_Dynamic_Table_Cache.push(cache);
}
function getViewModelFromCache(key){
  var result = null;
  $.each(Matrix_Dynamic_Table_Cache,function(i,v){
    if(v.key==key){
      result = v.vm;
    }
  })
  return result;
}

function MatrixTable(input) {
    this.table_data_source = ko.observable(input||null);
}


function initialize_environment(){
  ko.components.register('matrix_dynamic_table', {
      viewModel: function(params) {
          var self = this;
          //ds:{
          //  'ds':'ds_url',
          //  'header':'header view model',
          //  'refresh_interval':'30 seconds',
          //  'json_rule':'response.result'
          //}
          self.ds = params.value;

          self.ds.subscribe(function(newValue) {
              self.json_rule = newValue.json_rule;
              self.update_table();
              self.set_refresh_interval();

          });
          self.header = null;
          self.json_rule = null;
          self.tableModel = ko.observable(new ThinListViewModel());

          self.update_table = function(){

            if(self.ds()){
              var url = self.ds().ds;
              self.header = self.ds().header;
              $.serverRequest(url, null, "SUCCESS_LISTENER_DYNAMIC_TABLE", "FAILED_LISTENER_DYNAMIC_TABLE", "SERVER_FAILED_LISTENER_DYNAMIC_TABLE", 'POST', true,self);
            }
          }

          self.set_refresh_interval = function(){
            if(self.ds()){
              var interval = self.ds().refresh_interval || 10;
              setInterval(function(){
                self.update_table();
              },1000*interval)
            }
          }
      },
      template: { element: 'matrix_dynamic_table-template' }
  });

  $.subscribe("SUCCESS_LISTENER_DYNAMIC_TABLE", successListener_dynamic_table);
  $.subscribe("FAILED_LISTENER_DYNAMIC_TABLE", failedListener_dynamic_table);
  $.subscribe("SERVER_FAILED_LISTENER_DYNAMIC_TABLE", failedServiceListener_dynamic_table);
}



function successListener_dynamic_table() {
  if (arguments && arguments[1]) {
    var server_data = arguments[1].response;
    var matrix_dynamic_table = arguments[1].addtion;
    if(matrix_dynamic_table.json_rule){
      var tmp = 'server_data.'+matrix_dynamic_table.json_rule;
      server_data = eval(tmp);
    }

    var tableData = DataTransferPOJO.serverJsonData2TableData(server_data);
    var tableModel = new ThinListViewModel();
    tableModel.buildData(tableData.result);
    tableModel.columnNames(tableData.header);
    tableModel.isDisplayPager(true);
    tableModel.buildView();
    tableModel.pageMaxSize(5);
    if(matrix_dynamic_table.header){
      tableModel.headerViewData(matrix_dynamic_table.header);
    }
    matrix_dynamic_table.tableModel(tableModel);
  }
}
function failedListener_dynamic_table() {
  if (arguments && arguments[1]) {
    console.log(arguments);
    var errorMessage = arguments[1].errorMessage;
    genericModalViewModel.response(false, "Entity Operation", "[Failed]", errorMessage);
  }
}

function failedServiceListener_dynamic_table() {
  genericModalViewModel.response(false, "Entity Operation", "[Failed]", "SERVICE 'GENERIC XXX' FAILED! Please contact with the system admin for more information...");
}

// ds example
// var ds = {
//   'ds':'http://localhost:8080/matrix_components_v3/assets/self-owned/data/server_mock_data.json'
//   'header':headerViewData(),
//   'refresh_interval':10,
//   'json_rule':'response.result'
// }
function create_dynamic_table(ds,destination_div_id,new_div_id){

  //1, clone matrix table wrapper div
  clone_component(destination_div_id,'wrapped_matrix_dynamic_table_div',new_div_id);

  //2, initialize view model
  var vm = new MatrixTable();
  ko.cleanNode($('#'+new_div_id)[0]);
  ko.applyBindings(vm,document.getElementById(new_div_id));

  //3, data bind
  setTimeout(function() {
    if(ds && vm){
      vm.table_data_source(ds);
    }
  }, 500);

  //4, cache vm
  var cache = {
    'key':new_div_id,
    'vm':vm
  }

  Matrix_Dynamic_Table_Cache.push(cache);
}
