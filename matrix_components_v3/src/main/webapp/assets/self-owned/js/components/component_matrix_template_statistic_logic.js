var ds = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"SUM_NUMBER\",\"index\":0,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"CREATE_TIME\",\"index\":1,\"isChecked\":true,\"isDisplay\":true}]",
  "refresh_interval": "10",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{\"queryJson\":\"{\\\"className\\\":\\\"Genericentity\\\",\\\"groupMap\\\":{\\\"stringalpha\\\":\\\"stringalpha\\\"},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false}}\"}",
  "pageMaxSize": 10,
  "mock": false
};
var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  dynamic_table_env_setup();
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
  vm.businessPOJO(businessPOJO);
};

function dynamic_table_env_setup() {
  MATRIX_DYNAMIC_TABLE_ENV_SETUP();
  setTimeout(function() {
    create_dynamic_table(ds, 'copy_table_parent_div', 'copied_table_div');
    create_dynamic_chart_pie(ds, 'copy_chart_parent_div');
  }, 600)
}
