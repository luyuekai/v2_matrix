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
    self.progress = ko.observable(0);
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}

function increaseProgress() {
  if(vm.businessPOJO()){
    var progress = vm.businessPOJO().progress();
    if (progress < 100) {
      progress++;
    }
    vm.businessPOJO().progress(progress);
  }
}
function resetProgress() {
  if(vm.businessPOJO()){
    vm.businessPOJO().progress(0);
  }
}
setInterval(function() {
  increaseProgress();
}, 100);
