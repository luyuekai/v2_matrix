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
    {'市区':'市南区','GDP':543,'一产':0,'二产':59.5,'三产':484},{'市区':'市北区','GDP':280,'一产':0,'二产':54.17,'三产':225},
    {'市区':'四方区','GDP':170,'一产':0,'二产':74.51,'三产':96},{'市区':'李沧区','GDP':213,'一产':0.02,'二产':117.93,'三产':95},
    {'市区':'崂山区','GDP':317,'一产':4.86,'二产':178.15,'三产':134},{'市区':'黄岛区','GDP':1003,'一产':3.77,'二产':654,'三产':253},
    {'市区':'城阳区','GDP':702,'一产':14.29,'二产':434,'三产':197},{'市区':'胶州市','GDP':557,'一产':39.39,'二产':319,'三产':212},
    {'市区':'即墨市','GDP':573,'一产':47.87,'二产':313,'三产':179},{'市区':'平度市','GDP':524,'一产':79.70,'二产':265,'三产':181},
    {'市区':'胶南市','GDP':549,'一产':43.36,'二产':324,'三产':152},{'市区':'莱西市','GDP':393,'一产':43.72,'二产':197,'三产':59}
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
  tm.pageMaxSize(12);
  businessPOJO.tableModel(tm);
  vm.businessPOJO(businessPOJO);
  }
