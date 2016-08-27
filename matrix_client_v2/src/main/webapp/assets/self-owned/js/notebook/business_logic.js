var switchBookmark_businessLogic = function(ni, bi, notebookListViewModel) {
  var notebook_index = 'notebookDIV' + ni;
  var bookmark_index = 'notebook' + ni + '_bookmark' + bi;
  var self = notebookListViewModel;
  $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_active');
  $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_normal');
  $('#' + notebook_index + ' button.matrix_bookmark').addClass('bookmark_normal');
  $('#' + bookmark_index).addClass('bookmark_active');
  $('#' + bookmark_index).removeClass('bookmark_normal');
  var original_bi = self.notebooks()[ni].console.currentBookmark();

  if (bi != original_bi) {
    self.notebooks()[ni].console.currentBookmark(bi);
    var cacheData = {
      'notebook_index': ni,
    };
    CachePOJO.businessPOJO = cacheData;
    self.notebooks()[ni].result.isDisplay_hive(false);
    self.notebooks()[ni].result.isDisplay_sql(false);
    self.notebooks()[ni].result.isDisplay_pig(false);
    self.notebooks()[ni].result.isDisplay_spark(false);
    self.notebooks()[ni].result.isDisplay_impala(false);
    self.notebooks()[ni].result.isDisplay_markdown(false);
    if (bi === 1) {
      self.notebooks()[ni].result.isDisplay_hive(true);

    }
    if (bi === 2) {
      self.notebooks()[ni].result.isDisplay_sql(true);

    }
    if (bi === 3) {
      self.notebooks()[ni].result.isDisplay_pig(true);

    }
    if (bi === 4) {
      self.notebooks()[ni].result.isDisplay_spark(true);

    }
    if (bi === 5) {
      self.notebooks()[ni].result.isDisplay_impala(true);

    }
    if (bi === 6) {
      self.notebooks()[ni].result.isDisplay_markdown(true);
    }
  }
};


var switchState_businessLogic = function(notebook, componentType) {
  if ('console' === componentType) {
    notebook.console.isDisplay(!notebook.console.isDisplay());
    return;
  }
  if ('result' === componentType) {
    notebook.result.isDisplay(!notebook.result.isDisplay());
    return;
  }
  if ('status' === componentType) {
    notebook.status.isDisplay(!notebook.status.isDisplay());
    return;
  }
  if ('chart' === componentType) {
    notebook.chartPanel.isDisplay(!notebook.chartPanel.isDisplay());
    return;
  }
};

var addNotebook_businessLogic = function(notebookListViewModel) {
  var self = notebookListViewModel;
  var notebook = new NotebookViewModel(null, false, true);
  self.notebooks.push(notebook);
  autosize($('textarea'));
  notebook_textarea_keyboard_event_listener(); // need to do this for setup new notebook feature
  var index = self.notebooks().length - 1;

  notebook.result.isDisplay_hive(true); // default display hive result
};

var resetNotebook_businessLogic = function(notebookListViewModel) {
  var self = notebookListViewModel;
  self.notebooks.removeAll();
  self.addNotebook();
  // self.chartPanel.charts.removeAll();
  // self.chartPanel.isDisplay(false);
};



var run_businessLogic = function(currentData, currentIndex, notebookListViewModel) {
  var self = notebookListViewModel;
  console.log("The index [" + currentIndex + "] notebook has been clicked!");
  var notebook = self.notebooks()[currentIndex];
  notebook.alerts.resultVisible(false);
  notebook.status.currentStatus("RUNNING");
  notebook.status.currentStatusClass("fa fa-spinner fa-spin");
  notebook.status.progress(0);
  blockCheck(currentIndex);
  notebook.result.isDisplay(false);

  var bi = notebook.console.currentBookmark(); // bookmark index
  if (bi === 1) {
    //hive business logic
  }
  if (bi === 2) {
    //sql business logic
  }
  if (bi === 3) {
    //pig business logic
  }
  if (bi === 4) {
    //spark business logic
  }
  if (bi === 5) {
    //impala business logic
  }
  if (bi === 6) {
    var markdown_result = getMarkdownContext('notebookTextArea' + currentIndex);
    notebook.result.result_markdown.data(markdown_result);
    console.log(markdown_result);
  }



  retrieveData_mock(notebook, currentIndex);
}


var notebook_textarea_keyboard_event_listener = function() {
  $("textarea").keypress(function(event) {
    if (event.keyCode == 13 && event.shiftKey) {
      var dom_element_id = $(document.activeElement).attr('id');
      if (dom_element_id && dom_element_id.indexOf('notebookTextArea') == 0) {
        var runButton_id = dom_element_id.replace('TextArea', 'RunButton');
        $('#' + runButton_id).click();
      }
    }
  });
}

var blockCheck = function(currentIndex) {
  var notebook = notebookListViewModel.notebooks()[currentIndex];

  if (notebook.status.currentStatus() === 'RUNNING') {
    $('#notebookDIV' + currentIndex).block({
      message: null
    });
  } else {
    $('#notebookDIV' + currentIndex).unblock();
  }
}

var mock_count = 0; // used for mock up
var retrieveData_mock = function(currentNotebook, currentIndex) {
  mock_count++;
  if (mock_count % 4 == 1) {
    console.log('request action invoked[request_success]');
    $.serverRequest($.getRootPath() + '/api/mock/success', null, "SEARCH_SUCCESS_LISTENER", "PAGING_SEARCH_FAILED", "SERVICE_GENERIC_QUERY_FAILED", 'GET', true, currentIndex);
  } else if (mock_count % 4 == 2) {
    console.log('request action invoked[request_warning]');
    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[currentIndex];

      setTimeout(function() {
        notebook.alerts.warningResponse("This is Mock Client Error!", "Be Careful!", "Please read the message below:");
        notebook.status.currentStatus("SERVICE ERROR");
        notebook.status.currentStatusClass("fa fa-exclamation");
        notebook.status.progress(100);
        blockCheck(currentIndex);
      }, 2000);
    }
  } else if (mock_count % 4 == 3) {
    console.log('request action invoked[request_error]');
    $.serverRequest($.getRootPath() + '/api/mock/service_error', null, "SEARCH_SUCCESS_LISTENER", "PAGING_SEARCH_FAILED", "SERVICE_GENERIC_QUERY_FAILED", 'GET', true, currentIndex);
  } else if (mock_count % 4 == 0) {
    console.log('request action invoked[request_exception]');
    $.serverRequest($.getRootPath() + '/api/mock/server_error', null, "SEARCH_SUCCESS_LISTENER", "PAGING_SEARCH_FAILED", "SERVICE_GENERIC_QUERY_FAILED", 'GET', true, currentIndex);
  }
}



// *******Server Side Retrieve Data Listener JS Code*******
$.subscribe("SEARCH_SUCCESS_LISTENER", successListener);
$.subscribe("PAGING_SEARCH_FAILED", failedListener);
$.subscribe("SERVICE_GENERIC_QUERY_FAILED", failedServiceListener);

function failedServiceListener() {

  var request_notebook_index = arguments[1].addtion;
  if (notebookListViewModel) {
    var notebook = notebookListViewModel.notebooks()[request_notebook_index];


    setTimeout(function() {
      notebook.alerts.errorResponse("Catch Fatal Exception From Server!", "Fatal Exception!", "Please read the message below:");
      notebook.status.currentStatus("SERVER ERROR");
      notebook.status.currentStatusClass("fa fa-exclamation");
      notebook.status.progress(100);
      blockCheck(request_notebook_index);
    }, 2000);
  }
  console.log("request_notebook_index is:" + request_notebook_index);
}

function failedListener() {
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    var request_notebook_index = arguments[1].addtion;
    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[request_notebook_index];

      setTimeout(function() {
        notebook.alerts.errorResponse(errorMessage, "Server Service Error!", "Please read the message below:");
        notebook.status.currentStatus("SERVICE ERROR");
        notebook.status.currentStatusClass("fa fa-exclamation");
        notebook.status.progress(100);
        blockCheck(request_notebook_index);
      }, 2000);
    }
    console.log("request_notebook_index is:" + request_notebook_index);
    console.log("response context is:" + JSON.stringify(arguments[1].response));
  }
}

function successListener() {
  if (arguments && arguments[1]) {
    var request_notebook_index = arguments[1].addtion;

    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[request_notebook_index];


      setTimeout(function() {
        notebook.alerts.correctResponse("Return Mock Success Response", "Successed!", "Congratulations!");
        notebook.status.currentStatus("FINISHED");
        notebook.status.currentStatusClass("fa fa-check");
        notebook.status.progress(100);
        blockCheck(request_notebook_index);
        notebook.result.isDisplay(true);
      }, 2000);
    }
    console.log("request_notebook_index is:" + request_notebook_index);
    console.log("response context is:" + JSON.stringify(arguments[1].response));
  }
}
