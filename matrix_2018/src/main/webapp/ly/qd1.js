
var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  init_matrix_table_env();
}


// Setup the business model with view model
function vm_env_setup() {
  //Clean Data Bind Node for dynamic table
  ko.cleanNode($('#template-matrix-main-div')[0]);
  // Apply data bind in view model and the whole dom
  ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
  // Refrence the entire page view model to current view model as cache
  current_vm = vm;

  function BusinessPOJO() {
      var self = this;
      self.searchWords = ko.observable('工业');
      self.searchResults = ko.observableArray([]);
      self.searchResultNum = ko.observable(0);
      self.tableDOM = ko.observable();
      self.tableDOM(new MatrixTableTemplate());
  }

  var businessPOJO = new BusinessPOJO();

  vm.businessPOJO(businessPOJO);
}


function server_request_mock(){
  Matrix_Util.request_local(Matrix_Util.get_project_path() + '/assets/self-owned/data/qd_search.json', server_response_mock);
}

function server_response_mock(json){
  console.log(json);
  vm.businessPOJO().searchResultNum(json.result.length);
  vm.businessPOJO().searchResults(json.result);
  var e = json.result[0];
  console.log(e);
  var colunm_names = [];
  var colunm_data = e.data;
  e.x.forEach(function (ex) {
      colunm_names.push(ex.name);
  });
  console.log(colunm_data);
  console.log(colunm_names);
  var _ds = {};
  _ds.type = 'static';
  _ds.header = colunm_names;
  _ds.result = colunm_data;
  _ds.isDisplayPager = false;
  _ds.pageMaxSize = 5;
  create_table_template('copy_table_parent_div',vm.businessPOJO().tableDOM(),_ds);
  // vm.businessPOJO().searchResults().forEach(function (e) {
  //     console.log("-------->");
  //     console.log(e);
  //     var colunm_names = [];
  //     var colunm_data = e.data;
  //     e.x.forEach(function (ex) {
  //         colunm_names.push(ex.name);
  //     });
  //     console.log(colunm_data);
  //     console.log(colunm_names);
  // });
  // table_template_env_setup_mock();
}

function table_template_env_setup_mock(){

  var _ds = {};
  _ds.type = 'static';
  _ds.header = ["Name2", "Value2"];
  _ds.result = [
    ["张国立", "56"],
    ["王刚", "55"],
    ["张铁林", "58"],
    ["张国立", "56"],
    ["王刚", "55"],
    ["张铁林", "58"],
    ["张国立", "56"],
    ["王刚", "55"],
    ["张铁林", "58"]
  ];
  _ds.isDisplayPager = false;
  _ds.pageMaxSize = 5;
  for(var i=0;i<5;i++){
    var dom_gen = Matrix_DOM_Util.clone_dom('ly_parent','ly_container');
    var id_gen = Matrix_Util.gen_id();
    $(dom_gen).find('.ly_table')[0].id = id_gen;
    create_table_template(id_gen,vm.businessPOJO().tableDOM(),_ds);
  }
  // create_table_template('copy_table_parent_div',vm.businessPOJO().tableDOM(),_ds);
}

function table_template_clone_mock(){
  var dom_gen = Matrix_DOM_Util.clone_dom('ly_parent','ly_container');
  var id_gen = Matrix_Util.gen_id();
  $(dom_gen).find('.ly_table')[0].id = id_gen;
  alert($(dom_gen).find('.ly_table')[0].id);
}
