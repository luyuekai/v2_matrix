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
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}

function request_success() {
  Matrix_Util.request_remote(Matrix_Util.get_project_path() + '/api/mock/post/success', successListener);
}
function request_warning() {
  Matrix_UI.message_warning("This is Mock Client Error!", "Be Careful!", "Please read the message below:");
}

function request_error() {
  Matrix_Util.request_remote(Matrix_Util.get_project_path() + '/api/mock/service_error', successListener,null,'GET');
}

function request_exception() {
  Matrix_Util.request_remote(Matrix_Util.get_project_path() + '/api/mock/server_error', successListener,null,'GET');
}

function successListener(json) {
  DEFAULT_MATRIX_SERVER_RESPONSE_SUCCESS_HANDLER(json);
}
