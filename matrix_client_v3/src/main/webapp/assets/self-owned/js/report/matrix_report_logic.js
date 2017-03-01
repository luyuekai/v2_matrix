
var isView = false;
function switchMode(){
  if(isView){
    editMode();
  }else{
    viewMode();
  }
}
function viewMode() {
  if(isView){
    return;
  }
  isView = true;
  console.log("2 view mode");
  $('#sidebar').css('display', 'none');
  $('#navbar').css('display', 'none');
  $('#report_menubar_div').css('display', 'none');
  $('#footer_div').css('display', 'none');
  $('#help-actions').css('display', 'none');

  if(reportViewModel){
    reportViewModel.inactive_cells();
  }
}

function editMode() {
  if(!isView){
    return;
  }
  isView = false;
  console.log("2 view mode");
  $('#sidebar').css('display', '');
  $('#navbar').css('display', '');
  $('#report_menubar_div').css('display', '');
  $('#footer_div').css('display', '');
  $('#help-actions').css('display', '');
}


var SharePOJO = SharePOJO || {};
SharePOJO = {
  environmentCheck: function() {
    console.log("SHARE FUNCTION ENVIRONMENT CHECK...");

    console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[BEGIN]");
    var tokenFlag = $.hasUrlParam('token');
    if (tokenFlag) {
      console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[FINISHED & RESULT:SUCCESSED]");
    } else {
      SharePOJO.redirect('NORMAL');
      console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[FINISHED & RESULT:FAILED]");
      return;
    }
    console.log("ENVIRONMENT CHECK [STEP 2: Get token ]...[BEGIN]");
    var token = $.urlParamValue('token');
    if (token) {
      console.log("ENVIRONMENT CHECK [STEP 2: Get token]...[FINISHED & RESULT:SUCCESSED]");
    } else {
      SharePOJO.redirect('INVALID');
      console.log("ENVIRONMENT CHECK [STEP 2: Get token]...[FINISHED & RESULT:FAILED]");
    }

    console.log("ENVIRONMENT CHECK [STEP 3: validate token from SERVER side ... please invoke the correct URL and handle the response]...[BEGIN]");
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/share/fetch/' + token, null, "MATRIX_SHARE_SUCCESS", "MATRIX_SHARE_FAILED", "MATRIX_SHARE_SERVICE_FAILED");
  },

  redirect: function(type) {
    if (type == 'INVALID') {
      console.log("REDIRECT TO INVALID PAGE");
      window.location.href = "404.html";
    } else if (type == 'EXPIRED') {
      console.log("REDIRECT TO EXPIRED PAGE");
      window.location.href = "404.html";
    } else if (type == 'NORMAL') {
      console.log("REDIRECT TO EDIT PAGE");
    }
  }
}
$.subscribe("MATRIX_SHARE_SUCCESS", successListener);
$.subscribe("MATRIX_SHARE_FAILED", failedListener);
$.subscribe("MATRIX_SHARE_SERVICE_FAILED", failedServiceListener);

function successListener() {
  if (arguments && arguments[1]) {
    var json = arguments[1].result[0];
    if (reportViewModel) {
      reportViewModel.deserialize_report(json);
    }
  }
}

function failedListener() {
  console.log("Server Failed!");
}

function failedServiceListener() {
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    if (errorMessage == "Token Invalid!") {
      console.log('request action invoked[request_invalid]');
      SharePOJO.redirect('INVALID');
    } else if (errorMessage == "Token Expire!") {
      console.log('request action invoked[request_expired]');
      SharePOJO.redirect('EXPIRED');
    }
  }
}



var converter = new showdown.Converter();
converter.setOption("tables", true);

var reportViewModel = new ReportViewModel();

reportViewModel.addCell();

ko.applyBindings(reportViewModel, document.getElementById('main_content_div'));

SharePOJO.environmentCheck();
