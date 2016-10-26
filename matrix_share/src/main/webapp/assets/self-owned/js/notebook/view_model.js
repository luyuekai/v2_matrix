/**
 * View Model for the console zone in the notebook
 *
 */
function ConsoleViewModel(data, isChecked, isDisplay, notebook) {
  var self = this;
  self.notebook = notebook;
  self.data = data;
  self.inputContent = ko.observable('select * from xdr_ln.xdr_103 limit 10;');
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.isBlocking = ko.observable(false);
  self.currentBookmark = ko.observable();


  // self.currentBookmark.subscribe(function (newValue) {
  //   setTimeout(function() {
  //     // $('#notebook0_bookmark' + bookmark_suffix).click();
  //     console.log('--->');
  //   }, 200);
  // });

  self.inputContent.subscribe(function (newValue) {
    var bi = self.currentBookmark();
    if (bi === "md") {
      if (self.notebook) {
        var result = markdown.toHTML(newValue);
        self.notebook.result.result_markdown.data(result);
      }
    }
  });
}

/**
 * View Model for the result zone in the notebook
 *
 */
function ResultViewModel(data, isChecked, isDisplay, notebook) {
  var self = this;
  self.notebook = notebook;
  self.data = data;
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.isDisplay_hive = ko.observable(false);
  self.isDisplay_sql = ko.observable(false);
  self.isDisplay_pig = ko.observable(false);
  self.isDisplay_spark = ko.observable(false);
  self.isDisplay_impala = ko.observable(false);
  self.isDisplay_markdown = ko.observable(false);

  self.result_hive = new HiveResultViewModel(notebook);
  self.result_sql = new SqlResultViewModel(notebook);
  self.result_pig = new PigResultViewModel();
  self.result_spark = new SparkResultViewModel();
  self.result_impala = new ImpalaResultViewModel(notebook);
  self.result_markdown = new MarkdownResultViewModel();

}

function HiveResultViewModel(notebook) {
  var self = this;
  self.notebook = notebook;
  self.data_server = null;

  self.vm_server = new ListViewModel();
  self.vm_server_has_result = ko.observable(false);

  self.vm_analyze = new ListViewModel();
  self.vm_analyze_has_result = ko.observable(false);

  self.columns = ko.observable("");
  self.jobInfo = ko.observable();

  self.reset = function () {
    self.data_server = null;
    self.vm_server.clean();
    self.vm_server_has_result(false);
    self.vm_analyze.clean();
    self.vm_analyze_has_result(false);
    self.columns("");
    self.jobInfo(null);
  }


}
function SqlResultViewModel(notebook) {

  var self = this;
  self.notebook = notebook;
  self.data_server = null;
  self.table_data = ko.observable();
  self.data_offset = ko.observable(0);
  self.result_size = ko.observable(0);
  self.data_read_length = ko.observable(100);
  self.query_sql = ko.observable();
  self.vm_server = new ListViewModel();
  self.vm_server_has_result = ko.observable(false);

  self.vm_analyze = new ListViewModel();
  self.vm_analyze_has_result = ko.observable(false);
}
function PigResultViewModel() {
  var self = this;
}
function SparkResultViewModel(notebook) {
  var self = this;
  self.notebook = notebook;
//    self.sessionId = ko.observable();
//    self.sessionState = ko.observable();
//    self.sessionMessage = ko.observable();
//    self.sessionTimer = ko.observable();

  self.statementId = ko.observable();
  self.statementState = ko.observable();
  self.statementTimer = ko.observable();
  self.data = ko.observable();
}
function ImpalaResultViewModel(notebook) {
  var self = this;
  self.notebook = notebook;
  self.data_server = null;
  self.table_data = ko.observable();
  self.data_offset = ko.observable(0);
  self.result_size = ko.observable(0);
  self.data_read_length = ko.observable(100);
  self.query_sql = ko.observable();
  self.vm_server = new ListViewModel();
  self.vm_server_has_result = ko.observable(false);

  self.vm_analyze = new ListViewModel();
  self.vm_analyze_has_result = ko.observable(false);
}
function MarkdownResultViewModel() {
  var self = this;
  self.data = ko.observable();
}

/**
 * View Model for spark session
 *
 */
function SparkSessionViewModel() {
  var self = this;
  self.sessionId = ko.observable();
  self.sessionState = ko.observable();
  self.sessionMessage = ko.observable();
  self.sessionTimer = ko.observable();
}


/**
 * View Model for the status zone in the notebook
 *
 */
function StatusViewModel(data, isChecked, isDisplay) {
  var self = this;
  self.data = data;
  self.currentStatus = ko.observable(ConstantsPOJO.Zh_READY);
  self.currentStatusClass = ko.observable('fa fa-plug');
  self.outputDir = ko.observable();
  self.applicationId = ko.observable();
  self.progress = ko.observable(0);
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
}

/**
 * View Model for the single notebook
 *
 */
function NotebookViewModel(data, isChecked, isDisplay) {
  var self = this;
  self.data = data;
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
  self.console = new ConsoleViewModel(null, false, true, self);
  self.result = new ResultViewModel(null, false, false, self);
  self.status = new StatusViewModel(null, false, false);
  self.alerts = new ResponseViewModel(); // This model is located in the generic_query.js
}

/**
 * View Model for the whole DOM, it holds the whole notebook list elements
 *
 */
function NotebookListViewModel() {
  var self = this;
  self.data = null;
  // notebook elements for the whole DOM
  self.notebooks = ko.observableArray();
  // self.currentNotebook = ko.observable();
  self.chartPanel = new ChartListViewModel(self);

  self.sparkSession = new SparkSessionViewModel();
  
  self.modalPOJO = ko.observableArray();

  //单纯的界面逻辑函数： 重置当前notebook list
  self.resetNotebook = function () {
    resetNotebook_businessLogic(self);
    initSpark();
  };

  //单纯的界面逻辑函数： 新增一个notebook
  self.addNotebook = function () {
    addNotebook_businessLogic(self);
  };

  //单纯的界面逻辑函数： 删除当前notebook
  self.removeNotebook = function (current) {
    self.notebooks.remove(current);
  };

  //单纯的界面逻辑函数： 切换当前notebook的console,result,status区域的显示状态
  self.switchState = function (notebook, componentType) {
    switchState_businessLogic(notebook, componentType);
  };


  self.switchBookmark = function (ni, bi) {
    switchBookmark_businessLogic(ni, bi, self);
  };

  self.run = function (currentData, currentIndex) {
    run_businessLogic(currentData, currentIndex, self);
  }

  self.download = function (headers, data, type, notebook) {
    download_businessLogic(headers, data, type, notebook);
  }
  self.prepare_analyze = function (headers, data, notebook) {
    prepare_analyze_businessLogic(headers, data, notebook);
  }

  self.prepare_charting = function (headers, data, notebook) {
    prepare_charting_businessLogic(headers, data, notebook);
  }

  self.setting = function (currentData, index) {
    setting_run_service_param_businessLogic(currentData, index, self);
  }

  self.save_script = function (currentData, index) {
    save_script_businessLogic(currentData, index, self);
  }

  self.load_script = function (currentData, index) {
    load_script_businessLogic(currentData, index, self);
  }
  self.load_hive_trace = function (currentData, index) {
    load_hive_trace_businessLogic(currentData, index, self);
  }

}
