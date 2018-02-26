
var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  init_matrix_table_env();
  setTimeout(function(){
    create_table_template('copy_table_parent_div',new MatrixTableTemplate(),ds);
    // create_table_template('my_first_table_div',new MatrixTableTemplate(),ds);
  },200)

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




var ds = {
    'type': 'static',
    'header': ["姓名", "年龄"],
    'result': [
      ["Alick", "56"],
      ["Jason", "55"],
      ["Tom", "28"],
      ["Jerry", "16"],
      ["Aaron", "35"],
      ["Daniel", "53"],
      ["Life", "26"],
      ["Chapter", "75"],
      ["Frank", "28"]
    ],
    'isDisplayPager':true,
    'pageMaxSize':5
};
