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

function dynamic_table_env_setup(){
  MATRIX_DYNAMIC_TABLE_ENV_SETUP();
  setTimeout(function(){
    create_dynamic_table(ds, 'copy_table_parent_div', 'copied_table_div');
  },600)
}
