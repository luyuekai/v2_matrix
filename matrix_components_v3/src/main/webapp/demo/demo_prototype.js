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
  vm_env_setup();
  data_env_setup();
}

function vm_env_setup() {

  // *******YOUR SHOULD CODING IN HERE:*******

  function BusinessPOJO() {
    var self = this;

  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}


function data_env_setup() {

}
