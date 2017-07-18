// *******Data Bind JS Code*******
var vm = new GenericPageViewModel();
ko.cleanNode($('#template-matrix-main-div')[0]);
// Apply data bind in view model and the whole dom
ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
current_vm = vm;

function env_setup() {
  vm_env_setup();
  search_env_setup();
  scroll_env_setup();
}

// Setup the business model with view model
function vm_env_setup() {

  // *******YOUR SHOULD CODING IN HERE:*******
  // function BusinessPOJO() {
  //   var self = this;
  //   self.elements = new ServerPagingViewModel();
  // }
  var businessPOJO = new GenericBusinessPOJO();
  vm.businessPOJO(businessPOJO);
};
function search_env_setup(){
  SearchPOJO.listener = default_search_data;
  SearchPOJO.likeOrMap = ["creator","stringalpha","name","description"];
  SearchPOJO.sortKey = ['numberalpha'];
  SearchPOJO.build_requestPOJO_prototype = function(){
    var result = {
      "className": "Genericentity",
      "orderMap": {
        "id": false
      },
      "pageMaxSize": ScrollPOJO.pageMaxSize,
      "currentPageNumber": ScrollPOJO.page || 1,
      "eqMap": {
        "type": "MATRIX_TEMPLATE_ADD",
        "deleted": false
      },
      "inMap": {},
    };
    return result;
  }
}
function scroll_env_setup(){
  ScrollPOJO.listener = default_retrive_api;
  ScrollPOJO.setup();
}
