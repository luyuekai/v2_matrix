var vm = Matrix_VM.page_vm;

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
    self.entityName = ko.observable();
    self.spvm = new ServerPagingViewModel();
    self.spvm.retrieveData = service_request;
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}


function service_request() {
  if(vm && vm.businessPOJO()){
    Matrix_UI.clean_ui();
    var spvm = vm.businessPOJO().spvm;
    var entityName = vm.businessPOJO().entityName();
    var query = {
      "className": entityName,
      "aliasMap": {},
      "pageMaxSize": spvm.pageMaxSize(),
      "currentPageNumber": spvm.currentPageNumber(),
      "likeORMap": {
        "name": spvm.searchKeyword(),
        "description": spvm.searchKeyword()
      },
      "eqMap": {},
      "inMap": {},
      "orderMap":{"id":false}
    };
    var data = {
      'queryJson': $.toJSON(query)
    };
    Matrix_Util.request_remote(Matrix_Util.get_server_path() + '/service_generic_query/api/query', service_response_handler, data);
  }
}

function service_response_handler(json) {
  if(vm && vm.businessPOJO()){
    var spvm = vm.businessPOJO().spvm;
    spvm.buildSearchData(json);
  }
}
