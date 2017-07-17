var current_vm = null;

function GenericPageViewModel() {
  var self = this;
  // Attribute for validation error flag
  self.hasError = ko.observable(false);
  self.errorMessage = ko.observableArray([]);

  // Attribute for server side response flag
  self.hasResult = ko.observable(false);

  // Attribute for result display DIV
  // styleClass use for display success or failed style, it include "alert-success" & "alert-danger"
  self.styleClass = ko.observable("alert-success");
  self.resultTitle = ko.observable("Result Title");
  self.resultSubTitle = ko.observable("Sub Title");
  self.resultContent = ko.observable("Content...");

  // Business POJO|Model for reference
  self.businessPOJO = ko.observable();


  self.validation = function(fn) {
    var flag = false;
    if (fn && jQuery.isFunction(fn)) {
      console.log("Now validation the paging elements with business function...")
      self.clearMessageDIV();
      var errorMessages = fn();
      if (errorMessages.length > 0) {
        self.errorMessage(errorMessages);
      } else {
        flag = true;
      }
      self.hasError(!flag);
    } else {
      console.log("validation not passed the business function, please fix it...");
    }
    return flag;
  };

  self.clearMessageDIV = function() {
    self.errorMessage.removeAll();
    self.hasError(false);
  };

  self.response = function(successFlag, resultTitle, resultSubTitle, resultContent) {
    self.hasResult(true);
    self.resultTitle(resultTitle);
    if (successFlag) {
      self.styleClass("alert-success");
    } else {
      self.styleClass("alert-danger");
    }
    self.resultSubTitle(resultSubTitle);
    self.resultContent(resultContent);
  }
}

function GenericBusinessPOJO() {
  var self = this;
  self.elements = new ServerPagingViewModel();
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
    var data = {
      'queryJson': $.toJSON(requestPOJO)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/query', data, "DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", "DEFAULT_RETRIEVE_API_FAILED_LISTENER", "DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER");
  }
}


function default_retrive_service_failed_listener() {
  if (current_vm) {
    current_vm.response(false, "Search", "[Failed]", "Please contact with the system admin for more information...");
  }
}

function default_retrive_server_error_listener() {
  if (current_vm && arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    current_vm.response(false, "Search", "[Failed]", errorMessage);
  }
}

function default_retrive_service_success_listener() {
  if (current_vm && arguments && arguments[1]) {
    var data = arguments[1].result;
    ScrollPOJO.displayResult = ScrollPOJO.displayResult.concat(data);
    //    console.log(data.length);
    if (data.length < ScrollPOJO.pageMaxSize) {
      ScrollPOJO.hasNewData = false;
    }
    var results = ScrollPOJO.displayResult.sort(SearchPOJO.sort);
    current_vm.businessPOJO().elements.viewData(results);
  }
}

// *******Server Side Retrieve Data Listener JS Code*******
$.subscribe("DEFAULT_RETRIEVE_API_SUCCESS_LISTENER", default_retrive_service_success_listener);
$.subscribe("DEFAULT_RETRIEVE_API_FAILED_LISTENER", default_retrive_service_failed_listener);
$.subscribe("DEFAULT_RETRIEVE_API_EXCEPTION_LISTENER", default_retrive_server_error_listener);
