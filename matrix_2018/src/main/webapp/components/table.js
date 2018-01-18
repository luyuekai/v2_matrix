var ds = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"id\",\"index\":0,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanalpha\",\"index\":1,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanbeta\",\"index\":2,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleandelta\",\"index\":3,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleangamma\",\"index\":4,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"category\",\"index\":5,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"createtime\",\"index\":6,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"creator\",\"index\":7,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"deleted\",\"index\":8,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"description\",\"index\":9,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"enabled\",\"index\":10,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastmodifier\",\"index\":11,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastupdatetime\",\"index\":12,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"modifycount\",\"index\":13,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"name\",\"index\":14,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"numberalpha\",\"index\":15,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberbeta\",\"index\":16,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberdelta\",\"index\":17,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberepsilon\",\"index\":18,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbereta\",\"index\":19,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbergamma\",\"index\":20,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberkappa\",\"index\":21,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlambda\",\"index\":22,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlota\",\"index\":23,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberomega\",\"index\":24,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbertheta\",\"index\":25,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberzeta\",\"index\":26,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"parentid\",\"index\":27,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"priority\",\"index\":28,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"status\",\"index\":29,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringalpha\",\"index\":30,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"stringbeta\",\"index\":31,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringdelta\",\"index\":32,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringepsilon\",\"index\":33,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringeta\",\"index\":34,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringgamma\",\"index\":35,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringkappa\",\"index\":36,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlambda\",\"index\":37,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlota\",\"index\":38,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringomega\",\"index\":39,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringtheta\",\"index\":40,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringzeta\",\"index\":41,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"type\",\"index\":42,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"valid\",\"index\":43,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"children\",\"index\":44,\"isChecked\":false,\"isDisplay\":true}]",
  "refresh_interval": "2",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }",
  "pageMaxSize": 10,
  "mock": true
}
var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  // table_env_setup_static();

  table_env_setup_dynamic();
}


// Setup the business model with view model
function vm_env_setup() {
  //Clean Data Bind Node for dynamic table
  ko.cleanNode($('#template-matrix-main-div')[0]);
  // Apply data bind in view model and the whole dom
  ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
  // Refrence the entire page view model to current view model as cache
  current_vm = vm;
  var businessPOJO = new GenericBusinessPOJO();

  // businessPOJO = mock_data(businessPOJO);
  businessPOJO.tableModel = ko.observable();
  businessPOJO.tableModel(new MatrixTableVM());

  businessPOJO.tableDOM = ko.observable();
  businessPOJO.tableDOM(new MatrixTableTemplate());

  vm.businessPOJO(businessPOJO);
};

function mock_data(businessPOJO) {
  businessPOJO.tableModel = ko.observable();
  var column_names = ["key", "value"];
  var colunm_data = [
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
  var tm = new MatrixTableVM();
  // tm.buildData(colunm_data);
  // tm.columnNames(column_names);
  // tm.isDisplayPager(true);
  // tm.buildView();
  // tm.pageMaxSize(5);
  tm.build(column_names, colunm_data);
  businessPOJO.tableModel(tm);
  return businessPOJO;
}



// function table_env_setup(){
//   MATRIX_DYNAMIC_TABLE_ENV_SETUP();
//   setTimeout(function(){
//     create_dynamic_table(ds, 'copy_table_parent_div', 'copied_table_div');
//   },600)
// }
//
function table_env_setup_static() {
  init_matrix_table_env();
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
  create_static_table_template('copy_table_parent_div',vm.businessPOJO().tableDOM(),_ds);
}
function table_env_setup_dynamic() {
  init_matrix_table_env();
  var _ds = {
    "type":"dynamic",
    "url": "http://localhost:8080/service_generic_query/api/query",
    "header_json": "[{\"data\":\"id\",\"index\":0,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanalpha\",\"index\":1,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanbeta\",\"index\":2,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleandelta\",\"index\":3,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleangamma\",\"index\":4,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"category\",\"index\":5,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"createtime\",\"index\":6,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"creator\",\"index\":7,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"deleted\",\"index\":8,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"description\",\"index\":9,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"enabled\",\"index\":10,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastmodifier\",\"index\":11,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastupdatetime\",\"index\":12,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"modifycount\",\"index\":13,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"name\",\"index\":14,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"numberalpha\",\"index\":15,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberbeta\",\"index\":16,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberdelta\",\"index\":17,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberepsilon\",\"index\":18,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbereta\",\"index\":19,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbergamma\",\"index\":20,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberkappa\",\"index\":21,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlambda\",\"index\":22,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlota\",\"index\":23,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberomega\",\"index\":24,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbertheta\",\"index\":25,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberzeta\",\"index\":26,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"parentid\",\"index\":27,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"priority\",\"index\":28,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"status\",\"index\":29,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringalpha\",\"index\":30,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"stringbeta\",\"index\":31,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringdelta\",\"index\":32,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringepsilon\",\"index\":33,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringeta\",\"index\":34,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringgamma\",\"index\":35,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringkappa\",\"index\":36,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlambda\",\"index\":37,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlota\",\"index\":38,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringomega\",\"index\":39,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringtheta\",\"index\":40,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringzeta\",\"index\":41,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"type\",\"index\":42,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"valid\",\"index\":43,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"children\",\"index\":44,\"isChecked\":false,\"isDisplay\":true}]",
    "json_rule": "result",
    "rest_mode": "POST",
    "request_params": "{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }"
  }
  create_static_table_template('copy_table_parent_div',vm.businessPOJO().tableDOM(),_ds);
}


function data_env_setup() {
  Matrix_Util.request_local(Matrix_Util.get_project_path() + '/assets/self-owned/data/server_mock_data.json', data_handler);
}

function data_handler(json) {

  var tm = new MatrixTableVM();
  tm.buildJSON(json);
  vm.businessPOJO().tableModel(tm);
}

function t() {
  Matrix_Util.request_remote(Matrix_Util.get_project_path() + '/api/mock/post/success', Matrix_Util.print_handler);
  // $.serverRequest($.getServerRoot() + '/matrix_components_v3/api/mock/success', null, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", 'GET');
}
