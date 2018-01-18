/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
  console.log("ENV SETUP INVOKED!");
  vm_env_setup();
}

var data_agg = [
  [
    {'街道':'桂圆','最大值':0.53,'最小值':0.27,'平均值':0.42,'标准差':0.03},
    {'街道':'园岭','最大值':0.58,'最小值':0.29,'平均值':0.40,'标准差':0.03},
    {'街道':'南园','最大值':0.46,'最小值':0.31,'平均值':0.40,'标准差':0.02},
    {'街道':'翠竹','最大值':0.53,'最小值':0.27,'平均值':0.44,'标准差':0.04},
    {'街道':'东门','最大值':0.51,'最小值':0.31,'平均值':0.44,'标准差':0.03},
    {'街道':'蛇口','最大值':0.50,'最小值':0.31,'平均值':0.40,'标准差':0.02},
    {'街道':'东晓','最大值':0.55,'最小值':0.31,'平均值':0.43,'标准差':0.04},
    {'街道':'莲花','最大值':0.57,'最小值':0.30,'平均值':0.42,'标准差':0.04},
    {'街道':'龙华','最大值':0.55,'最小值':0.32,'平均值':0.40,'标准差':0.02}, 
    
    {'街道':'清水','最大值':0.62,'最小值':0.28,'平均值':0.36,'标准差':0.04},
    {'街道':'石岩','最大值':0.58,'最小值':0.28,'平均值':0.36,'标准差':0.02},
    {'街道':'华富','最大值':0.58,'最小值':0.29,'平均值':0.39,'标准差':0.03},
    {'街道':'大浪','最大值':0.60,'最小值':0.32,'平均值':0.39,'标准差':0.02},
    {'街道':'民治','最大值':0.60,'最小值':0.18,'平均值':0.38,'标准差':0.03},
    {'街道':'沙井','最大值':0.60,'最小值':0.28,'平均值':0.38,'标准差':0.02},
    {'街道':'观澜','最大值':0.64,'最小值':0.29,'平均值':0.37,'标准差':0.02},
    {'街道':'福永','最大值':0.56,'最小值':0.27,'平均值':0.37,'标准差':0.03},
    {'街道':'公明','最大值':0.55,'最小值':0.28,'平均值':0.38,'标准差':0.02},
     
    {'街道':'松岗','最大值':0.59,'最小值':0.29,'平均值':0.38,'标准差':0.02},
    {'街道':'布吉','最大值':0.54,'最小值':0.28,'平均值':0.39,'标准差':0.03}
  ],
];



function vm_env_setup() {

  // *******YOUR SHOULD CODING IN HERE:*******
  // function BusinessPOJO() {
  //   var self = this;
  //   self.elements = new ServerPagingViewModel();
  // ,'二产':,'三产':}
  function BusinessPOJO() {
    var self = this;
    self.user = ko.observable('MATRIX');
    self.tableModel = ko.observable();
  }
  var businessPOJO = new BusinessPOJO();
  var serverData = data_agg[0];
  var tm = new ThinListViewModel();
  var tableData = DataTransferPOJO.serverJsonData2TableData(serverData);
  tm.buildData(tableData.result);
  tm.columnNames(tableData.header);
  tm.isDisplayPager(true);
  tm.buildView();
  tm.pageMaxSize(100);
  businessPOJO.tableModel(tm);
  vm.businessPOJO(businessPOJO);
  }
