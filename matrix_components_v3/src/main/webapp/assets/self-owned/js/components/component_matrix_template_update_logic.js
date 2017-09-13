// *******Data Bind JS Code*******
// Initialize Generic Page View Model as entire page data bind parent element
var vm = new GenericPageViewModel();

function env_setup() {
  cookie_env_setup();
  vm_env_setup();
}

function cookie_env_setup(){
  var status_lag = $.hasUrlParam('status');
  var type_flag = $.hasUrlParam('type');
  if (status_lag && type_flag) {
    var status = $.urlParamValue('status');
    var type = $.urlParamValue('type');
    if(status && type){
      var cookie_value = UtilPOJO.getCookie(type);
      console.log(cookie_value);
      if(cookie_value){
        CachePOJO.businessPOJO = JSON.parse(cookie_value);
        //clear cookie
        UtilPOJO.clearCookie(type);
      }
    }
  }
}
// Setup the business model with view model
function vm_env_setup() {
  // Clean Data Bind Node
  ko.cleanNode($('#template-matrix-main-div')[0]);
  // Apply data bind in view model and the whole dom
  ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
  // Refrence the entire page view model to current view model as cache
  current_vm = vm;
  // *******YOUR SHOULD CODING IN HERE:*******
  function BusinessPOJO() {
    var self = this;
    self.id = null;
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
              "id":self.id,
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
  }
  var businessPOJO = new BusinessPOJO();
  if(CachePOJO.businessPOJO){
    businessPOJO.id = CachePOJO.businessPOJO.id;
    businessPOJO.user(CachePOJO.businessPOJO.creator);
    businessPOJO.title(CachePOJO.businessPOJO.name);
    businessPOJO.description(CachePOJO.businessPOJO.description);
    businessPOJO.time(CachePOJO.businessPOJO.numberalpha);
  }
  vm.businessPOJO(businessPOJO);
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


$.subscribe("MATRIX_API_SUCCESS_EVENT", function(){console.log("MATRIX_API_SUCCESS_EVENT INVOKED!")});
