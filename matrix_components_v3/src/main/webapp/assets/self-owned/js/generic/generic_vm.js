var current_vm = null;

function GenericPageViewModel() {
  var self = this;
  // Attribute for validation error flag
  self.hasError = ko.observable(false);
  self.errorMessage = ko.observableArray([]);


  self.response_vm = ko.observable(new ResponseViewModel());
  // Business POJO|Model for reference
  self.businessPOJO = ko.observable();


  self.validation = function(fn) {
    var flag = false;
    if (fn && jQuery.isFunction(fn)) {
      // console.log("Now validation the paging elements with business function...")
      self.clearMessageDIV();
      var errorMessages = fn();
      if (errorMessages.length > 0) {
        self.errorMessage(errorMessages);
      } else {
        flag = true;
      }
      self.hasError(!flag);
    } else {
      console.log("***Warning***[MATRIX Generic Page View Model Validation NOT PASSED! The business function not initialize!]");
    }
    return flag;
  };

  self.clearMessageDIV = function() {
    self.errorMessage.removeAll();
    self.hasError(false);
  };

}

function GenericBusinessPOJO() {
  var self = this;
  self.elements = new ServerPagingViewModel();
}

function ResponseViewModel() {
  var self = this;
  self.styleClass = ko.observable("alert-success");
  self.resultVisible = ko.observable(false);
  self.resultTitle = ko.observable("Successed");
  self.resultSubTitle = ko.observable("[General Search]");
  self.resultContent = ko.observable("This is the result content...");

  self.errorResponse = function(content, title, subTitle) {
    self.response("alert-danger", content || "", title || 'Error', subTitle || "");
  };

  self.correctResponse = function(content, title, subTitle) {
    self.response("alert-success", content || "", title || 'Success', subTitle || "");
  };

  self.warningResponse = function(content, title, subTitle) {
    self.response("alert-warning", content || "", title || 'Warning', subTitle || "");
  }

  self.response = function(response_level, content, title, subTitle) {
    self.styleClass(response_level);
    self.resultTitle(title);
    self.resultSubTitle(subTitle);
    self.resultContent(content);
    self.resultVisible(true);
  };

  self.reset = function() {
    self.resultVisible(false);
    self.resultTitle(":");
    self.resultSubTitle("");
    self.resultContent("");
  }
}

function default_execute() {
  // validation failed
  // show validation error message in the warning DIV...
  if (!vm.validation(businessValidation)) {
    return;
  } else {
    // validation correct
    // do your business...
    runService();
  }
}



function default_search_data() {
  if (ScrollPOJO) {
    ScrollPOJO.reset();
  }
  default_retrive_api();
}

var default_retrive_api = function() {
  var keyword = SearchPOJO.keywords;
  var requestPOJO = SearchPOJO.build_requestPOJO();
  if (requestPOJO) {
    if(ScrollPOJO.page>1){

    }
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/query', data, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER","POST",true,{'TAG':'MATRIX_SEARCH'});
  }
}

var default_add_logic = function() {
  LoaderUtil.add_v3('template-matrix-main-div');
  default_add_api(vm.businessPOJO().build_requestPOJO());
}

var default_update_logic = function() {
  LoaderUtil.add_v3('template-matrix-main-div');
  default_update_api(vm.businessPOJO().build_requestPOJO());
}

var default_remove_logic = function() {
  LoaderUtil.add_v3('template-matrix-main-div');
  default_update_api(vm.businessPOJO().build_requestPOJO());
}

var default_add_api = function(requestPOJO) {
  if (requestPOJO) {
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/add', data, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER","POST",true,{'TAG':'MATRIX_ADD'});
  }
}

var default_update_api = function(requestPOJO) {
  if (requestPOJO) {
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/update', data, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER","POST",true,{'TAG':'MATRIX_UPDATE'});
  }
}
var default_remove_api = function(requestPOJO) {
  if (requestPOJO) {
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/remove', data, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER","POST",true,{'TAG':'MATRIX_REMOVE'});
  }
}
function default_retrive_server_error_listener() {
  LoaderUtil.remove_v3('template-matrix-main-div');
  if (current_vm) {
    current_vm.response_vm().errorResponse("Please contact with the system admin for more information...", "[MATRIX SERVER RESPONSE]", "***SERVER ERROR***");
    setTimeout(function() {
      vm.response_vm().reset();
    }, 10000);
  }
}

function default_retrive_service_failed_listener() {
  LoaderUtil.remove_v3('template-matrix-main-div');
  if (current_vm && arguments && arguments[1]) {
    var response = arguments[1];
    if (arguments[1].response) {
      response = arguments[1].response;
    }
    var errorMessage = response.errorMessage;
    current_vm.response_vm().errorResponse(errorMessage, "[MATRIX SERVER RESPONSE]", "***SERVICE FAILED***");
    setTimeout(function() {
      vm.response_vm().reset();
    }, 10000);
  }
}

function default_retrive_service_success_listener() {
  LoaderUtil.remove_v3('template-matrix-main-div');
  if (current_vm && arguments && arguments[1]) {
    var response = arguments[1];
    var addtion = null;
    if (arguments[1].response) {
      response = arguments[1].response;
      addtion = arguments[1].addtion;
    }
    if (response.result) {
      var data = response.result;
      if(addtion){
        if(addtion['TAG']=='MATRIX_SEARCH'){
          //MATRIX SEARCH DEFAULT HANDLER
          if(current_vm.businessPOJO()&&current_vm.businessPOJO().elements){
            ScrollPOJO.displayResult = ScrollPOJO.displayResult.concat(data);
            if (data.length < ScrollPOJO.pageMaxSize) {
              ScrollPOJO.hasNewData = false;
            }
            var results = ScrollPOJO.displayResult.sort(SearchPOJO.sort);
            current_vm.businessPOJO().elements.viewData(results);
          }
        }else if(addtion['TAG']=='MATRIX_ADD'){

        }else if(addtion['TAG']=='MATRIX_UPDATE'){

        }else if(addtion['TAG']=='MATRIX_REMOVE'){

        }
      }
    }
    current_vm.response_vm().correctResponse("CONGRATULATIONS", "[MATRIX SERVER RESPONSE]", "***SERVICE SUCCESSED***");
    setTimeout(function() {
      vm.response_vm().reset();
    }, 3000);
    $.publish("MATRIX_API_SUCCESS_EVENT", arguments[1]);
  }
}

function default_switch2detail_page($data,page_url,status,type){
  if($data && page_url && status && type){
    UtilPOJO.setCookie(type,JSON.stringify($data),1);
    window.open($.getRootPath() + page_url+'?status='+status+'&type='+type);
  }
}

function default_backfill_data($data){
  if(vm && vm.businessPOJO() && vm.businessPOJO().fulfill){
    vm.businessPOJO().fulfill($data);
  }
}

// *******Server Side Retrieve Data Listener JS Code*******
$.subscribe("DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", default_retrive_service_success_listener);
$.subscribe("DEFAULT_RETRIEVE_API_FAILED_LISTENER", default_retrive_service_failed_listener);
$.subscribe("DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", default_retrive_server_error_listener);

function UNIT_TEST_FOR_CLIENT_VALIDATION() {
  //scenario for the success validation
  vm.validation(function() {
    return [];
  });
  //scenario for the failed validation
  vm.validation(function() {
    return ["UNIT_TEST_FOR_CLIENT_VALIDATION: scenario for the failed validation"];
  });

  console.log("***Applause***[MATRIX UNIT_TEST_FOR_CLIENT_VALIDATION PASSED!]");
}

function UNIT_TEST_FOR_SERVER_RESPONSE() {
  //scenario for the success response
  $.serverRequest($.getServerRoot() + '/matrix_components_v3/api/mock/success', null, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", 'GET');
  //scenario for the failed response
  $.serverRequest($.getServerRoot() + '/matrix_components_v3/api/mock/service_error', null, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", 'GET');
  //scenario for the server exception response
  $.serverRequest($.getServerRoot() + '/matrix_components_v3/api/mock/server_error', null, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", 'GET');

  console.log("***Applause***[MATRIX UNIT_TEST_FOR_SERVER_RESPONSE PASSED!]");
}

function UNIT_TEST_FOR_MASKER_AND_LOADER() {
  LoaderUtil.add_v3('template-matrix-main-div');
  console.log("***Applause***[MATRIX UNIT_TEST_FOR_MASKER_AND_LOADER PASSED!]");
}

function UNIT_TEST_ENVIRONMENT_RESET() {
  setTimeout(function() {
    //reset the client validation environment
    vm.clearMessageDIV();
    //reset the server response environment
    vm.response_vm().reset();
    //reset the loader environment
    LoaderUtil.remove_v3('template-matrix-main-div');
  }, 500)
}

function UNIT_TEST_SUITE() {
  setTimeout(function() {
    UNIT_TEST_FOR_CLIENT_VALIDATION();
    UNIT_TEST_FOR_SERVER_RESPONSE();
    UNIT_TEST_FOR_MASKER_AND_LOADER();
    UNIT_TEST_ENVIRONMENT_RESET();
  }, 1000)
}

function DOM_ENV_SETUP() {
  // $('input').keypress(function(event) {
  //   if (event.keyCode == 13) {
  //     event.preventDefault();
  //   }
  // });
}
