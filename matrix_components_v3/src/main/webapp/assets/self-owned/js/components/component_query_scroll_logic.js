// *******Data Bind JS Code*******
var vm = new GenericPageViewModel();
ko.cleanNode($('#contentDIV')[0]);
ko.applyBindings(vm, document.getElementById('contentDIV'));
current_vm = vm;


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
  SearchPOJO.likeOrMap = ["stringalpha","username"];
  SearchPOJO.sortKey = ['numberalpha'];
  SearchPOJO.requestPOJO_prototype = {
    "className": "Share",
    "orderMap": {
      "id": false
    },
    "pageMaxSize": ScrollPOJO.pageMaxSize,
    "currentPageNumber": ScrollPOJO.page || 1,
    "eqMap": {
      "type": "MATRIX_REPORT_DRAFT",
      "deleted": false
    },
    "inMap": {},
  };
}
function scroll_env_setup(){
  ScrollPOJO.listener = default_retrive_api;
  ScrollPOJO.setup();
}
