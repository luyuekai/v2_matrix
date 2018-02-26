var vm = new GenericPageViewModel();

function env_setup() {
  vm_env_setup();
  init_matrix_table_env();
  upload_env_setup();
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
    self.hi = ko.observable('123');
    self.upload_vm = ko.observable(new GenericUploadPageViewModel("ease", "system_matrix", "module_upload_template", "function_upload_image_example"));
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}

function upload_env_setup() {
  initialize_pic_upload_environment('input-upload-id', vm.businessPOJO().upload_vm(), "MATRIX_REPORT_UPLOAD_IMAGE_SUCCESS", "MATRIX_REPORT_UPLOAD_IMAGE_FAILED");
}

$.subscribe("MATRIX_REPORT_UPLOAD_IMAGE_SUCCESS", successListener_upload);
$.subscribe("MATRIX_REPORT_UPLOAD_IMAGE_FAILED", failedListener_upload);

function failedListener_upload() {
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    Matrix_UI.message_error(errorMessage, "Server Service Error!", "Please read the message below:");
  }
}

function successListener_upload() {
  if (arguments && arguments[1]) {
    var img_url_path = $.getServerRoot() + "/service_generic_query" + arguments[1].result[0].stringkappa;
    if (vm && vm.businessPOJO() && vm.businessPOJO().upload_vm()) {
      if (vm.businessPOJO().upload_vm().uploadedFileUrls.indexOf(img_url_path) == -1) {
        vm.businessPOJO().upload_vm().uploadedFileUrls.push(img_url_path);
      }
      Matrix_UI.message_success("Operation Success!", "Matrix Upload");
      setTimeout(function() {
        // $('#input-id').fileinput('refresh');
        $('#upload_component_div').css('display', 'none');
      }, 200);
    }
  }
}
