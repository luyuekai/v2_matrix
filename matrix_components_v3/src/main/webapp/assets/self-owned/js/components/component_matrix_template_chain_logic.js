var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  query_chain_env_setup();
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
    self.self_saved_counts = ko.observable();
    self.self_shared_counts = ko.observable();
    self.total_shared_counts = ko.observable();
    self.total_template_counts = ko.observable();
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
};

function query_chain_env_setup() {
  var statistic_self_saved={
    'queryJson': $.toJSON({
      "className": "Share",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "username": 'matrix',
        "type": "MATRIX_REPORT_DRAFT",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_self_shared={
    'queryJson': $.toJSON({
      "className": "Share",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "username": 'matrix',
        "type": "MATRIX_REPORT_DRAFT",
        "tag": "SHARE",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_all_shared={
    'queryJson': $.toJSON({
      "className": "Share",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "type": "MATRIX_REPORT_DRAFT",
        "tag": "SHARE",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_all_template={
    'queryJson': $.toJSON({
      "className": "Share",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "likeORMap": {
        "stringbeta": 'TEMPLATE'
      },
      "eqMap": {
        "type": "MATRIX_REPORT_DRAFT",
        "tag": "SHARE",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  QueryChainPOJO.queryArray = [];
  QueryChainPOJO.queryArray.push({'id':1,'tag':'statistic_self_saved','query':statistic_self_saved});
  QueryChainPOJO.queryArray.push({'id':2,'tag':'statistic_self_shared','query':statistic_self_shared});
  QueryChainPOJO.queryArray.push({'id':3,'tag':'statistic_all_shared','query':statistic_all_shared});
  QueryChainPOJO.queryArray.push({'id':4,'tag':'statistic_all_template','query':statistic_all_template});
  $.subscribe("query_chain_finished", statistic_result_listener);
  QueryChainPOJO.query();

}

var statistic_result_listener = function() {
  if(vm && vm.businessPOJO()){
    var results = QueryChainPOJO.queryResults;
    $.each(results,function(index,value){
      if(value.query.tag=='statistic_self_saved'){
        vm.businessPOJO().self_saved_counts(value.response.totalCounts);
      }
      if(value.query.tag=='statistic_self_shared'){
        vm.businessPOJO().self_shared_counts(value.response.totalCounts);
      }
      if(value.query.tag=='statistic_all_shared'){
        vm.businessPOJO().total_shared_counts(value.response.totalCounts);
      }
      if(value.query.tag=='statistic_all_template'){
        vm.businessPOJO().total_template_counts(value.response.totalCounts);
      }
    })
  }
}
