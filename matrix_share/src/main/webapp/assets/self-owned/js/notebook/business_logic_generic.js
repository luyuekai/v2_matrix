var initialize_notebook = function () {
    var bookmarkFlag = $.hasUrlParam('bookmark');
    if (bookmarkFlag) {
        var bookmark = $.urlParamValue('bookmark');
        setTimeout(function () {
            $('#notebook0_bookmark_' + bookmark).click();
        }, 200);
    }

    var defaultTable = $.urlParamValue("defaultTable")
    if (defaultTable) {
        notebookListViewModel.notebooks()[0].console.inputContent("select * from " + defaultTable + " limit 100;");
    } else {

        var script = $.urlParamValue("script")
        if (script) {
            script = unescape(script)
            notebookListViewModel.notebooks()[0].console.inputContent(script);
        }
    }

    // Has bug when this code fragment opened:
    // It's confilict with the text area input "SHIFT" means upcases and "ALT" does not work in html js interaction

    // $(document).keypress(function (event) {
    //     if (notebookListViewModel) {
    //         if (event.keyCode == 78 && event.shiftKey) {
    //             // shift+n
    //             addNotebook_businessLogic(notebookListViewModel);
    //         }
    //         if (event.keyCode == 82 && event.shiftKey) {
    //             // shift+r
    //             resetNotebook_businessLogic(notebookListViewModel);
    //         }
    //         if (event.keyCode == 99 && event.shiftKey) {
    //             // shift+c
    //             switchState_chartPanel_businessLogic();
    //         }
    //     }
    // });
}
var switchState_chartPanel_businessLogic = function () {
    if (notebookListViewModel) {
        notebookListViewModel.chartPanel.isDisplay(!notebookListViewModel.chartPanel.isDisplay());
    }
};
var switchBookmark_businessLogic = function (ni, bi, notebookListViewModel) {
    var notebook_index = 'notebookDIV' + ni;
    var bookmark_index = 'notebook' + ni + '_bookmark_' + bi;
    var self = notebookListViewModel;
    $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_active');
    $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_normal');
    $('#' + notebook_index + ' button.matrix_bookmark').addClass('bookmark_normal');
    $('#' + bookmark_index).addClass('bookmark_active');
    $('#' + bookmark_index).removeClass('bookmark_normal');
    var original_bi = self.notebooks()[ni].console.currentBookmark();

    if (bi != original_bi) {
        clean_status(ni);
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
        if (bi === "hive") {
            self.notebooks()[ni].result.isDisplay_hive(true);
        }
        if (bi === "sql") {
            self.notebooks()[ni].result.isDisplay_sql(true);
        }
        if (bi === "pig") {
            self.notebooks()[ni].result.isDisplay_pig(true);
        }
        if (bi === "spark") {
            if (notebookListViewModel.sparkSession.sessionId() == null) {
                console.log("notebookListViewModel.sparkSession.sessionId() == null");
                initSpark();
            }
            self.notebooks()[ni].result.isDisplay_spark(true);
        }
        if (bi === "impala") {
            self.notebooks()[ni].result.isDisplay_impala(true);
        }
        if (bi === "md") {
            self.notebooks()[ni].result.isDisplay_markdown(true);
        }
    }
};


var switchState_businessLogic = function (notebook, componentType) {
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

var addNotebook_businessLogic = function (notebookListViewModel) {
    var self = notebookListViewModel;
    var notebook = new NotebookViewModel(null, false, true);
    self.notebooks.push(notebook);

    var index = self.notebooks().length - 1;
    notebook.console.currentBookmark("hive"); //default bookmark as 1--hive
    notebook.result.isDisplay_hive(true); // default display hive result

    setTimeout(function () {
        autosize($('textarea'));
        notebook_textarea_keyboard_event_listener(); // need to do this for setup new notebook feature
    }, 500);

    clean_status(index);
};

var resetNotebook_businessLogic = function (notebookListViewModel) {
    var self = notebookListViewModel;
    self.notebooks.removeAll();
    self.addNotebook();
    self.chartPanel.charts.removeAll();
    self.chartPanel.isDisplay(false);
};


var clean_status = function(currentIndex){
  var self = notebookListViewModel;
  var notebook = self.notebooks()[currentIndex];
  if(notebook){
    notebook.alerts.resultVisible(false);
    notebook.status.currentStatus(ConstantsPOJO.Zh_READY);
    notebook.status.currentStatusClass("fa fa-plug");
    notebook.status.progress(-1);
    notebook.result.isDisplay(false);
    notebook.status.applicationId(null);
    notebook.status.outputDir(null);
  }
}

var running_status = function(currentIndex){
  var self = notebookListViewModel;
  var notebook = self.notebooks()[currentIndex];
  if(notebook){
    notebook.status.currentStatus(ConstantsPOJO.Zh_RUNNING);
    notebook.status.currentStatusClass("fa fa-spinner fa-spin");
    notebook.status.progress(0);
    blockCheck(currentIndex);
  }
}

var run_businessLogic = function (currentData, currentIndex, notebookListViewModel) {
    var self = notebookListViewModel;
    // console.log("The index [" + currentIndex + "] notebook has been clicked!");
    var notebook = self.notebooks()[currentIndex];
    var execute_sql_array = clean_array($.trim(notebook.console.inputContent().replace(/\n/g, " ")).split(";"));
    var execute_sql = execute_sql_array[execute_sql_array.length - 1];
    var hasLimit = (execute_sql.toLowerCase().indexOf("limit") != -1);
    var bi = notebook.console.currentBookmark(); // bookmark index
    if (bi === "impala" && !hasLimit) {
        function BusinessPOJO() {
            var self = this;
            self.index = currentIndex;
            self.notebookListViewModel = notebookListViewModel;
        }
        businessPOJO = new BusinessPOJO();
        ModalUtil.popup_modal_with_businessPOJO("Tips", '/assets/self-owned/html/notebook/impala_alert.html', businessPOJO);
    } else {
      clean_status(currentIndex);
      running_status(currentIndex);
        if (bi === "hive") {
            run_hive_service(currentIndex, self);
        }
        if (bi === "sql") {
            run_rdms_service(currentIndex, self);
        }
        if (bi === "pig") {
            //pig business logic
            run_pig_service(currentIndex, self);
        }
        if (bi === "spark") {
            run_spark_service(currentIndex, self);
        }
        if (bi === "impala") {
            run_impala_service(currentIndex, self);
        }
        if (bi === "md") {
            var markdown_result = getMarkdownContext('notebookTextArea' + currentIndex);
            notebook.result.result_markdown.data(markdown_result);
            notebook.status.currentStatus(ConstantsPOJO.Zh_FINISHED);
            notebook.status.currentStatusClass("fa fa-check");
            notebook.status.progress(100);
            notebook.result.isDisplay(true);
            blockCheck(currentIndex);

        }
    }



    //  retrieveData_mock(notebook, currentIndex);
}


var notebook_textarea_keyboard_event_listener = function () {
    $("textarea").keypress(function (event) {
        if (event.keyCode == 13 && event.shiftKey) {
            var dom_element_id = $(document.activeElement).attr('id');
            if (dom_element_id && dom_element_id.indexOf('notebookTextArea') == 0) {
                var runButton_id = dom_element_id.replace('TextArea', 'RunButton');
                $('#' + runButton_id).click();
            }
        }
    });
}

var blockCheck = function (currentIndex) {
    var notebook = notebookListViewModel.notebooks()[currentIndex];

    if (notebook.status.currentStatus() === ConstantsPOJO.Zh_RUNNING || notebook.status.currentStatus() === ConstantsPOJO.En_RUNNING) {
        $('#notebookDIV' + currentIndex).block({
            message: null
        });
    } else {
        $('#notebookDIV' + currentIndex).unblock();
    }
}


var to_job_detail = function(status,notebook){
  if(status && status.applicationId()){
    window.open($.getRootPath() + '/browser_job_detail.html?id='+status.applicationId()+'&type=id&version=undefined');
  }else {
      notebook.alerts.warningResponse("当前分析条件没有合适查看的作业详情", "提示:", "[作业详情]");
  }
}

var to_log_detail = function(status,notebook){
  if(status && status.applicationId()){
    window.open($.getRootPath() + '/browser_job_detail.html?id='+status.applicationId()+'&type=logs&version=undefined');
  }else {
      notebook.alerts.warningResponse("当前分析条件没有合适查看的日志详情", "提示:", "[日志详情]");
  }
}

var to_hdfs_detail = function(status,notebook){
  if(status && status.outputDir()){
    window.open($.getRootPath() + '/browser_hdfs.html?dir='+status.outputDir());
  }else {
      notebook.alerts.warningResponse("当前分析条件没有合适查看的HDFS输出文件", "提示:", "[HDFS输出文件]");
  }
}

var download_businessLogic = function (headers, data, type, notebook) {
    if (headers && data) {
        download(headers, data, type);
    } else {
        notebook.alerts.warningResponse("当前没有合适下载的数据结果", "提示:", "[导出/下载数据]");
    }

}

var prepare_analyze_businessLogic = function (headers, data, notebook) {
    if (headers && data) {
        headers = headers.filter(UtilPOJO.removeEmptyChars);
        // do something...
        var pojo = {
            'headers': headers,
            'data': data,
            'notebook': notebook
        }
        ModalUtil.popup_modal_with_businessPOJO('数据统计分析设置', '/assets/self-owned/html/notebook/modal_analyze.html', pojo);
    } else {
        notebook.alerts.warningResponse("当前没有合适分析的数据结果", "提示:", "[分析数据]");
    }
}



$.subscribe("NOTEBOOK_ANALYZE_EVENT", listener_NOTEBOOK_ANALYZE_EVENT);

function listener_NOTEBOOK_ANALYZE_EVENT() {
    if (arguments && arguments[1]) {
        console.log("Catch event [NOTEBOOK_ANALYZE_EVENT] and the response data are:");
        console.log(arguments[1]);
        var notebook = arguments[1].notebook;
        var tableData = arguments[1].tableData;
        var bookmark = notebook.console.currentBookmark();
        if (bookmark == 'hive') {
            analyze_result_display_businessLogic_hive(tableData, notebook);
        }
        if (bookmark == 'sql') {
            analyze_result_display_businessLogic_sql(tableData, notebook);
        }
        if (bookmark == 'impala') {
            analyze_result_display_businessLogic_impala(tableData, notebook);
        }

        ModalUtil.modal_close('popupModalPro');
    }

}

var setting_run_service_param_businessLogic = function (currentData, currentIndex, notebookListViewModel) {
    var self = notebookListViewModel;

    var bi = currentData.console.currentBookmark(); // bookmark index
    var businessPOJO;
    var modalLocation;
    if (bi === "hive") {
        //hive business logic
        modalLocation = "/assets/self-owned/html/notebook/hive_setting.html";

        function BusinessPOJO() {
            var self = this;
            self.index = currentIndex;
            self.notebookListViewModel = notebookListViewModel;
        }
        businessPOJO = new BusinessPOJO();
    }
    if (bi === "sql") {
        return;
        //sql business logic
    }
    if (bi === "pig") {
        return;
        //pig business logic
    }
    if (bi === "spark") {
        return;
        //spark business logic
    }
    if (bi === "impala") {
        return;
        //impala business logic
    }
    if (bi === "md") {
        var markdown_result = getMarkdownContext('notebookTextArea' + currentIndex);
        notebook.result.result_markdown.data(markdown_result);
        console.log(markdown_result);
        return;
    }

    ModalUtil.popup_modal_with_businessPOJO(bi + ' 高级功能设置', modalLocation, businessPOJO);

}

var save_script_businessLogic = function (currentData, currentIndex, notebookListViewModel) {
    var self = notebookListViewModel;

    var bi = currentData.console.currentBookmark(); // bookmark index
    var bussinessType = bi;

    function BusinessPOJO() {
        var self = this;
        self.title = ko.observable();
        self.description = ko.observable();
        self.content = ko.observable(currentData.console.inputContent());
        self.businessType = ko.observable(bussinessType);
    }
    var businessPOJO = new BusinessPOJO();

    ModalUtil.popup_modal_with_businessPOJO('保存脚本', '/assets/self-owned/html/notebook/save_script.html', businessPOJO);
}

var load_script_businessLogic = function (currentData, currentIndex, notebookListViewModel) {
    var self = notebookListViewModel;

    var bi = currentData.console.currentBookmark(); // bookmark index
    var bussinessType = bi;

    function BusinessPOJO() {
        var self = this;
        self.currentNotebook = currentData;
        self.bussinessType = ko.observable(bussinessType);
    }
    var businessPOJO = new BusinessPOJO();

    ModalUtil.popup_modal_with_businessPOJO('加载脚本', '/assets/self-owned/html/notebook/load_script.html', businessPOJO);
}

var load_hive_trace_businessLogic = function (currentData, currentIndex, notebookListViewModel) {
  function BusinessPOJO() {
      var self = this;
      self.currentNotebook = currentData;
      self.currentNotebookIndex = currentIndex;
  }
  var businessPOJO = new BusinessPOJO();
    ModalUtil.popup_modal_with_businessPOJO('回溯脚本', '/assets/self-owned/html/notebook/load_hive_trace.html',businessPOJO);
}

var download_notebooks = function(){
    function create_share_modal(){
        var shareJson = {
            'json': export_notebook(),
        }

        var data = {
            'shareJson': $.toJSON(shareJson)
        };
        return $.toJSON(data);
    }
    download_businessLogic([create_share_modal()],[[]],'.json');
}