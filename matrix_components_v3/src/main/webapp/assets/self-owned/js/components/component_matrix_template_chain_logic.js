var ds = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"id\",\"index\":0,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanalpha\",\"index\":1,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanbeta\",\"index\":2,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleandelta\",\"index\":3,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleangamma\",\"index\":4,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"category\",\"index\":5,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"createtime\",\"index\":6,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"creator\",\"index\":7,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"deleted\",\"index\":8,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"description\",\"index\":9,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"enabled\",\"index\":10,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastmodifier\",\"index\":11,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastupdatetime\",\"index\":12,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"modifycount\",\"index\":13,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"name\",\"index\":14,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"numberalpha\",\"index\":15,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberbeta\",\"index\":16,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberdelta\",\"index\":17,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberepsilon\",\"index\":18,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbereta\",\"index\":19,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbergamma\",\"index\":20,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberkappa\",\"index\":21,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlambda\",\"index\":22,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlota\",\"index\":23,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberomega\",\"index\":24,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbertheta\",\"index\":25,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberzeta\",\"index\":26,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"parentid\",\"index\":27,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"priority\",\"index\":28,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"status\",\"index\":29,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringalpha\",\"index\":30,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"stringbeta\",\"index\":31,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringdelta\",\"index\":32,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringepsilon\",\"index\":33,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringeta\",\"index\":34,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringgamma\",\"index\":35,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringkappa\",\"index\":36,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlambda\",\"index\":37,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlota\",\"index\":38,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringomega\",\"index\":39,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringtheta\",\"index\":40,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringzeta\",\"index\":41,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"type\",\"index\":42,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"valid\",\"index\":43,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"children\",\"index\":44,\"isChecked\":false,\"isDisplay\":true}]",
  "refresh_interval": "2",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }",
  "pageMaxSize": 10,
  "mock": true
}
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
