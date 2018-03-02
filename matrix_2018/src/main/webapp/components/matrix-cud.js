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
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}

function server_request_query() {

}

function server_request_add(name, description) {
  var time = (new Date()).getTime();
  var time_format = Matrix_Util.formatTime(time, 'yyyy-MM-dd');
  var requestPOJO = {
    "className": "v2.service.generic.query.entity.Genericentity",
    "attributes": {
      "type": "MATRIX_TUTORIALS_EXAMPLE_ENTITY",
      "creator": "MATRIX",
      "numberalpha": time,
      "stringalpha": time_format,
      "name": name,
      "description": description,
      "enabled": true,
      "valid": true,
      "deleted": false,
    }
  };
}

function server_request_update() {

}

function server_request_delete() {

}
