var vm = new GenericPageViewModel();
//Clean Data Bind Node for dynamic table
ko.cleanNode($('#template-matrix-main-div')[0]);
// Apply data bind in view model and the whole dom
ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
// Refrence the entire page view model to current view model as cache
current_vm = vm;

function env_setup() {
  vm_env_setup();
  query_chain_env_setup();
  dynamic_table_env_setup();
  search_env_setup();
  scroll_env_setup();
}
function env_refresh(){
  //refresh statistic
  query_chain_env_setup();

  //refresh charts
  // create_dynamic_chart_pie(ds_statistic_by_date, 'copy_chart_parent_div1');
  // create_dynamic_chart_pie(ds_statistic_by_business, 'copy_chart_parent_div2');
  // create_dynamic_chart_pie(ds_statistic_by_user, 'copy_chart_parent_div3');

  //refresh scroll
  ScrollPOJO.setup();
}

// Setup the business model with view model
function vm_env_setup() {
  function BusinessPOJO() {
    var self = this;
    self.total_counts = ko.observable();
    self.total_active_counts = ko.observable();
    self.total_finished_counts = ko.computed(function() {
      return self.total_counts()-self.total_active_counts();
    }, this);
    self.self_counts = ko.observable();
    self.self_active_counts = ko.observable();
    self.self_finished_counts = ko.computed(function() {
      return self.self_counts()-self.self_active_counts();
    }, this);

    self.user = ko.observable('MATRIX');
    self.time = ko.observable((new Date()).getTime());
    self.formatTime = ko.computed(function() {
      return UtilPOJO.formatTime(self.time(), 'yyyy-MM-dd');
    }, this);
    self.title = ko.observable();
    self.description = ko.observable();

    self.build_requestPOJO = function(){
      self.time((new Date()).getTime());
      var requestPOJO = {
          "className": "v2.service.generic.query.entity.Genericentity",
          "attributes": {
              "type": "MATRIX_TEMPLATE_ADD",
              "creator": self.user(),
              "numberalpha": self.time(),
              "stringalpha": self.formatTime(),
              "name": self.title(),
              "description": self.description(),
              "enabled": true,
              "valid": true,
              "deleted": false,
          }
      };
      return requestPOJO;
    }

    self.elements = new ServerPagingViewModel();
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
};

function query_chain_env_setup() {
  var statistic_self_counts={
    'queryJson': $.toJSON({
      "className": "Genericentity",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "creator": 'MATRIX',
        "type": "MATRIX_TEMPLATE_ADD",
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_self_active_counts={
    'queryJson': $.toJSON({
      "className": "Genericentity",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "creator": 'MATRIX',
        "type": "MATRIX_TEMPLATE_ADD",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_total_counts={
    'queryJson': $.toJSON({
      "className": "Genericentity",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "eqMap": {
        "type": "MATRIX_TEMPLATE_ADD",
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  var statistic_total_active_counts={
    'queryJson': $.toJSON({
      "className": "Genericentity",
      "pageMaxSize": 10,
      "currentPageNumber": 1,
      "likeORMap": {
      },
      "eqMap": {
        "type": "MATRIX_TEMPLATE_ADD",
        "deleted": false
      },
      "inMap": {},
      "orderMap": {
        "id": false
      }
    })
  };

  QueryChainPOJO.queryArray = [];
  QueryChainPOJO.queryArray.push({'id':1,'tag':'self_counts','query':statistic_self_counts});
  QueryChainPOJO.queryArray.push({'id':2,'tag':'self_active_counts','query':statistic_self_active_counts});
  QueryChainPOJO.queryArray.push({'id':3,'tag':'total_counts','query':statistic_total_counts});
  QueryChainPOJO.queryArray.push({'id':4,'tag':'total_active_counts','query':statistic_total_active_counts});
  $.subscribe("query_chain_finished", statistic_result_listener);
  QueryChainPOJO.query();

}

var statistic_result_listener = function() {
  if(vm && vm.businessPOJO()){
    var results = QueryChainPOJO.queryResults;
    $.each(results,function(index,value){
      if(value.query.tag=='self_counts'){
        vm.businessPOJO().self_counts(value.response.totalCounts);
      }
      if(value.query.tag=='self_active_counts'){
        vm.businessPOJO().self_active_counts(value.response.totalCounts);
      }
      if(value.query.tag=='total_counts'){
        vm.businessPOJO().total_counts(value.response.totalCounts);
      }
      if(value.query.tag=='total_active_counts'){
        vm.businessPOJO().total_active_counts(value.response.totalCounts);
      }
    })
  }
}


function dynamic_table_env_setup() {
  setTimeout(function() {
    create_dynamic_chart_pie(ds_statistic_by_date, 'copy_chart_parent_div1');
    create_dynamic_chart_pie(ds_statistic_by_business, 'copy_chart_parent_div2');
    create_dynamic_chart_pie(ds_statistic_by_user, 'copy_chart_parent_div3');
  }, 600)
}

var ds_statistic_by_date = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"SUM_NUMBER\",\"index\":0,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"CREATE_TIME\",\"index\":1,\"isChecked\":true,\"isDisplay\":true}]",
  "refresh_interval": "100",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{\"queryJson\":\"{\\\"className\\\":\\\"Genericentity\\\",\\\"groupMap\\\":{\\\"stringalpha\\\":\\\"stringalpha\\\"},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false}}\"}",
  "pageMaxSize": 10,
  "mock": false
};

var ds_statistic_by_user = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"SUM_NUMBER\",\"index\":0,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"USER\",\"index\":1,\"isChecked\":true,\"isDisplay\":true}]",
  "refresh_interval": "100",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{\"queryJson\":\"{\\\"className\\\":\\\"Genericentity\\\",\\\"groupMap\\\":{\\\"creator\\\":\\\"creator\\\"},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false}}\"}",
  "pageMaxSize": 10,
  "mock": false
};

var ds_statistic_by_business = {
  "ds": "http://localhost:8080/service_generic_query/api/query",
  "header_json": "[{\"data\":\"SUM_NUMBER\",\"index\":0,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"BUSINESS_STATUS\",\"index\":1,\"isChecked\":true,\"isDisplay\":true}]",
  "refresh_interval": "100",
  "json_rule": "result",
  "rest_mode": "POST",
  "request_params": "{\"queryJson\":\"{\\\"className\\\":\\\"Genericentity\\\",\\\"groupMap\\\":{\\\"id\\\":\\\"id\\\"},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false}}\"}",
  "pageMaxSize": 10,
  "mock": false
};


// *******YOUR SHOULD CODING IN HERE:*******
var businessValidation = function() {
  var errorMessages = [];
  //validate logic...

  //validate
  ValidationPOJO.validate("User", vm.businessPOJO().user(), errorMessages, ['KEY_NOT_NULL']);
  ValidationPOJO.validate("Time", vm.businessPOJO().time(), errorMessages, ['KEY_NOT_NULL']);
  ValidationPOJO.validate("Title", vm.businessPOJO().title(), errorMessages, ['KEY_NOT_NULL']);

  return errorMessages;
}

// *******YOUR SHOULD CODING IN HERE:*******
var runService = function() {
  default_add_logic();
}


$.subscribe("MATRIX_API_SUCCESS_EVENT", MATRIX_API_SUCCESS_EVENT_HANDLER);

function MATRIX_API_SUCCESS_EVENT_HANDLER() {
  if (arguments && arguments[1]) {
    if(arguments[1].addtion && arguments[1].addtion['TAG']=='MATRIX_ADD'){
      env_refresh();
    }
  }
}

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
