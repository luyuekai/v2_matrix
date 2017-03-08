
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
      reportViewModel.hasNewContent(false);
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














// *******Server Side Retrieve Data JS Code*******
var retrieveData_chart = function(page) {
  //        LoaderUtil.add('tableDIV');
  var requestPOJO = {
    "className": "Share",
    "orderMap": {
      "id": false
    },
    "pageMaxSize": pageMaxSize,
    "currentPageNumber": page || 1,
    "likeORMap": {

    },
    "eqMap": {
      "type": "MATRIX_CHART",
      "deleted": false
    },
    "inMap": {},
  };
  var data = {
    'queryJson': $.toJSON(requestPOJO)
  };
  $.serverRequest($.getServerRoot() + '/service_generic_query/api/query', data, "CHART_SEARCH_SUCCESS_LISTENER", "CHART_PAGING_SEARCH_FAILED", "CHART_SERVICE_GENERIC_QUERY_FAILED");
}


// *******Server Side Retrieve Data Listener JS Code*******
$.subscribe("CHART_SEARCH_SUCCESS_LISTENER", successListener_chart);
$.subscribe("CHART_PAGING_SEARCH_FAILED", failedListener_chart);
$.subscribe("CHART_SERVICE_GENERIC_QUERY_FAILED", failedServiceListener_chart);


function failedServiceListener_chart() {
  if(!genericModalViewModel){
    return;
  }
  genericModalViewModel.response(false, "SERVICE 'GENERIC QUERY", "[Failed]", "SERVICE 'GENERIC CUD' FAILED! Please contact with the system admin for more information...");
}

function failedListener_chart() {
  if(!genericModalViewModel){
    return;
  }
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    genericModalViewModel.response(false, "SERVICE 'GENERIC QUERY", "[Failed]", errorMessage);
  }
}

function successListener_chart() {
  if(!genericModalViewModel){
    return;
  }
  if (arguments && arguments[1]) {
    var data = arguments[1].result;
    displayResult = displayResult.concat(data);
    if (data.length < pageMaxSize) {
      hasNewData = false;
    }
    var history_scripts = displayResult.sort(sortTime);

    genericModalViewModel.businessPOJO().serverPagingViewModel.viewData(history_scripts);
  }
}

function sortTime(a, b) {
  return b.createtime - a.createtime;
}
