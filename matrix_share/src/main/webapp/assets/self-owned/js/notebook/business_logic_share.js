// Function for serialize the notebook page model to savable data
var export_notebook = function() {
  var result = {};
  var serialize_notebook_data = serialize_notebook();

  result = serialize_notebook_data;
  console.log("The export notebook data is:");
  console.log(result);
  return result;
}
var serialize_notebook = function() {
  var notebookPage = {
    chartPanel: [],
    notebooks: []
  };
  $.each(notebookListViewModel.notebooks(), function(idx, notebook) {
    var notebookShareModel = new NotebookShareModel(null, false, true);
    //load console
    notebookShareModel.console.inputContent = notebook.console.inputContent();
    notebookShareModel.console.isDisplay = notebook.console.isDisplay();
    notebookShareModel.console.isBlocking = notebook.console.isBlocking();
    notebookShareModel.console.currentBookmark = notebook.console.currentBookmark();
    //load StatusViewModel
    notebookShareModel.status.currentStatus = notebook.status.currentStatus();
    notebookShareModel.status.currentStatusClass = notebook.status.currentStatusClass();
    notebookShareModel.status.progress = notebook.status.progress();
    notebookShareModel.status.isDisplay = notebook.status.isDisplay();
    //load alert
    notebookShareModel.alerts.styleClass = notebook.alerts.styleClass();
    notebookShareModel.alerts.resultVisible = notebook.alerts.resultVisible();
    notebookShareModel.alerts.resultTitle = notebook.alerts.resultTitle();
    notebookShareModel.alerts.resultSubTitle = notebook.alerts.resultSubTitle();
    notebookShareModel.alerts.resultContent = notebook.alerts.resultContent();
    //load result
    notebookShareModel.result.isDisplay = notebook.result.isDisplay();
    notebookShareModel.result.isDisplay_hive = notebook.result.isDisplay_hive();
    notebookShareModel.result.isDisplay_sql = notebook.result.isDisplay_sql();
    notebookShareModel.result.isDisplay_pig = notebook.result.isDisplay_pig();
    notebookShareModel.result.isDisplay_spark = notebook.result.isDisplay_spark();
    notebookShareModel.result.isDisplay_impala = notebook.result.isDisplay_impala();
    notebookShareModel.result.isDisplay_markdown = notebook.result.isDisplay_markdown();

    if (notebook.console.currentBookmark() == 'hive') {
      //fulfill hive
      notebookShareModel.result.result_hive.vm_server_has_result = notebook.result.result_hive.vm_server_has_result();
      notebookShareModel.result.result_hive.vm_server.serverData = notebook.result.result_hive.vm_server.serverData;
      notebookShareModel.result.result_hive.vm_server.columnNames = notebook.result.result_hive.vm_server.columnNames();

      notebookShareModel.result.result_hive.vm_analyze_has_result = notebook.result.result_hive.vm_analyze_has_result();
      notebookShareModel.result.result_hive.vm_analyze.serverData = notebook.result.result_hive.vm_analyze.serverData;
      notebookShareModel.result.result_hive.vm_analyze.columnNames = notebook.result.result_hive.vm_analyze.columnNames();

    } else if (notebook.console.currentBookmark() == 'sql') {
      //fulfill sql
      notebookShareModel.result.result_sql.vm_server_has_result = notebook.result.result_sql.vm_server_has_result();
      notebookShareModel.result.result_sql.vm_server.serverData = notebook.result.result_sql.vm_server.serverData;
      notebookShareModel.result.result_sql.vm_server.columnNames = notebook.result.result_sql.vm_server.columnNames();
      notebookShareModel.result.result_sql.data_offset = notebook.result.result_sql.data_offset();
      notebookShareModel.result.result_sql.result_size = notebook.result.result_sql.result_size();

      notebookShareModel.result.result_sql.vm_analyze_has_result = notebook.result.result_sql.vm_analyze_has_result();
      notebookShareModel.result.result_sql.vm_analyze.serverData = notebook.result.result_sql.vm_analyze.serverData;
      notebookShareModel.result.result_sql.vm_analyze.columnNames = notebook.result.result_sql.vm_analyze.columnNames();
    } else if (notebook.console.currentBookmark() == 'pig') {
      //fulfill pig
    } else if (notebook.console.currentBookmark() == 'spark') {
      //fulfill spark
      notebookShareModel.result.result_spark.data = notebook.result.result_spark.data();
    } else if (notebook.console.currentBookmark() == 'impala') {
      //fulfill impala
      notebookShareModel.result.result_impala.vm_server_has_result = notebook.result.result_impala.vm_server_has_result();
      notebookShareModel.result.result_impala.vm_server.serverData = notebook.result.result_impala.vm_server.serverData;
      notebookShareModel.result.result_impala.vm_server.columnNames = notebook.result.result_impala.vm_server.columnNames();

      notebookShareModel.result.result_impala.vm_analyze_has_result = notebook.result.result_impala.vm_analyze_has_result();
      notebookShareModel.result.result_impala.vm_analyze.serverData = notebook.result.result_impala.vm_analyze.serverData;
      notebookShareModel.result.result_impala.vm_analyze.columnNames = notebook.result.result_impala.vm_analyze.columnNames();
    } else if (notebook.console.currentBookmark() == 'md') {
      //fulfill markdown
      notebookShareModel.result.result_markdown.data = notebook.result.result_markdown.data();
    } else if (notebook.console.currentBookmark() == 7) {
      //fulfill machine learning
    }
    delete notebookShareModel.result["notebook"];
    delete notebookShareModel.result.result_hive["notebook"];
    notebookPage.notebooks.push(notebookShareModel);
  });

  $.each(notebookListViewModel.chartPanel.charts(), function(idx, chart) {
    delete chart.chartSetting.data["notebook"];
    notebookPage.chartPanel.push(chart.chartSetting);
  })
  return ko.toJSON(notebookPage);
}

// Function for deserialize the notebook page from saved data
var import_notebook = function(inputData) {
  inputData = $.parseJSON(inputData);

  // var tmp_vm = deserialize_notebook(inputData);
  // load_chartPanel(inputData);
  // ko.cleanNode($('#contentDIV')[0]);
  // ko.applyBindings(tmp_vm, document.getElementById('contentDIV'));
  // notebookListViewModel = tmp_vm;
  //    notebookListViewModel.chartPanel.charts.removeAll();
  // load_chartPanel(inputData);

  re_initialize_notebook_v2();
  deserialize_notebook_v2(inputData);
  load_chartPanel_v2(inputData);

  setTimeout(function() {
    autosize($('textarea'));
    notebook_textarea_keyboard_event_listener(); // need to do this for setup new notebook feature
  }, 500);
}

var re_initialize_notebook_v2 = function(){
  if (notebookListViewModel) {
    notebookListViewModel.notebooks.removeAll();
  }
}
var deserialize_notebook_v2 = function(inputData) {
  if (notebookListViewModel) {
    load_notebooks(notebookListViewModel, inputData);
  }
}
var load_chartPanel_v2 = function(inputData) {
  function ChartSetting() {
    var self = this;
    self.data = null;

    self.chartName = ko.observable("未命名");
    self.supportChartTypes = ko.observableArray(['bar', 'line', 'scatter', 'area']);
    self.chosenChartType = ko.observable(self.supportChartTypes()[0]);
    self.availableColumnNames = ko.observableArray();
    self.selectedColumn_x = ko.observable();
    self.selectedColumn_y = ko.observable();
  }

  $.each(inputData.chartPanel, function(idx, c) {
    var chartSetting = new ChartSetting();
    chartSetting.chartName(c.chartName);
    chartSetting.chosenChartType(c.chosenChartType);
    chartSetting.data = c.data;
    if (chartSetting.data.headers) {
      chartSetting.availableColumnNames(c.data.headers);
      if (chartSetting.data.headers.length > 0) {
          debugger
        chartSetting.selectedColumn_x(c.selectedColumn_x);
        chartSetting.selectedColumn_y(c.selectedColumn_y);
      }
    }
    charting_result_display_businessLogic(chartSetting);
  })
}

var deserialize_notebook = function(inputData) {
  var viewModel = new NotebookListViewModel();
  load_notebooks(viewModel, inputData);
  return viewModel;
}

var load_chartPanel = function(inputData) {
  function ChartSetting() {
    var self = this;
    self.data = null;

    self.chartName = ko.observable("未命名");
    self.supportChartTypes = ko.observableArray(['bar', 'line', 'scatter', 'area']);
    self.chosenChartType = ko.observable(self.supportChartTypes()[0]);
    self.availableColumnNames = ko.observableArray();
    self.selectedColumn_x = ko.observable();
    self.selectedColumn_y = ko.observable();
  }

  $.each(inputData.chartPanel, function(idx, c) {
    var chartSetting = new ChartSetting();

    chartSetting.data = c.data;
    if (chartSetting.data.headers) {
      chartSetting.availableColumnNames(c.data.headers);
      if (chartSetting.data.headers.length > 0) {
        chartSetting.selectedColumn_x(c.selectedColumn_x);
        chartSetting.selectedColumn_y(c.selectedColumn_y);
      }
    }
    charting_result_display_businessLogic(chartSetting);
  })
}
var load_notebooks = function(viewModel, inputData) {
  $.each(inputData.notebooks, function(idx, notebook) {
    console.log(notebook);
    var notebookViewModel = new NotebookViewModel(null, false, true);
    //load console
    notebookViewModel.console.inputContent(notebook.console.inputContent);
    notebookViewModel.console.isDisplay(notebook.console.isDisplay);
    notebookViewModel.console.isBlocking(notebook.console.isBlocking);
    notebookViewModel.console.currentBookmark(notebook.console.currentBookmark);
    //load StatusViewModel
    notebookViewModel.status.currentStatus(notebook.status.currentStatus);
    notebookViewModel.status.currentStatusClass(notebook.status.currentStatusClass);
    notebookViewModel.status.progress(notebook.status.progress);
    notebookViewModel.status.isDisplay(notebook.status.isDisplay);
    //load alert
    notebookViewModel.alerts.styleClass(notebook.alerts.styleClass);
    notebookViewModel.alerts.resultVisible(notebook.alerts.resultVisible);
    notebookViewModel.alerts.resultTitle(notebook.alerts.resultTitle);
    notebookViewModel.alerts.resultSubTitle(notebook.alerts.resultSubTitle);
    notebookViewModel.alerts.resultContent(notebook.alerts.resultContent);
    //load result
    notebookViewModel.result.isDisplay(notebook.result.isDisplay);
    notebookViewModel.result.isDisplay_hive(notebook.result.isDisplay_hive);
    notebookViewModel.result.isDisplay_sql(notebook.result.isDisplay_sql);
    notebookViewModel.result.isDisplay_pig(notebook.result.isDisplay_pig);
    notebookViewModel.result.isDisplay_spark(notebook.result.isDisplay_spark);
    notebookViewModel.result.isDisplay_impala(notebook.result.isDisplay_impala);
    notebookViewModel.result.isDisplay_markdown(notebook.result.isDisplay_markdown);

    console.log('#notebook' + idx + '_bookmark_' + notebook.console.currentBookmark)
    $('#notebook' + idx + '_bookmark_' + notebook.console.currentBookmark).click();
    if (notebook.console.currentBookmark == 'hive') {
      //fulfill hive
      notebookViewModel.result.result_hive.vm_server_has_result(notebook.result.result_hive.vm_server_has_result);
      if (notebook.result.result_hive.vm_server_has_result) {
        notebookViewModel.result.result_hive.vm_server.pageMaxSize(10);
        notebookViewModel.result.result_hive.vm_server.buildData(notebook.result.result_hive.vm_server.serverData);
        notebookViewModel.result.result_hive.vm_server.columnNames(notebook.result.result_hive.vm_server.columnNames);
        notebookViewModel.result.result_hive.vm_server.buildView();
      }

      notebookViewModel.result.result_hive.vm_analyze_has_result(notebook.result.result_hive.vm_analyze_has_result);
      if (notebook.result.result_hive.vm_analyze_has_result) {
        notebookViewModel.result.result_hive.vm_analyze.pageMaxSize(10);
        notebookViewModel.result.result_hive.vm_analyze.buildData(notebook.result.result_hive.vm_analyze.serverData);
        notebookViewModel.result.result_hive.vm_analyze.columnNames(notebook.result.result_hive.vm_analyze.columnNames);
        notebookViewModel.result.result_hive.vm_analyze.buildView();
      }

    } else if (notebook.console.currentBookmark == 'sql') {
      //fulfill sql
      notebookViewModel.result.result_sql.vm_server_has_result(notebook.result.result_sql.vm_server_has_result);
      if (notebook.result.result_sql.vm_server_has_result) {
        notebookViewModel.result.result_sql.vm_server.pageMaxSize(10);
        notebookViewModel.result.result_sql.vm_server.buildData(notebook.result.result_sql.vm_server.serverData);
        notebookViewModel.result.result_sql.vm_server.columnNames(notebook.result.result_sql.vm_server.columnNames);
        notebookViewModel.result.result_sql.data_offset(notebook.result.result_sql.data_offset);
        notebookViewModel.result.result_sql.result_size(notebook.result.result_sql.result_size);
        notebookViewModel.result.result_sql.vm_server.buildView();
      }

      notebookViewModel.result.result_sql.vm_analyze_has_result(notebook.result.result_sql.vm_analyze_has_result);
      if (notebook.result.result_sql.vm_analyze_has_result) {
        notebookViewModel.result.result_sql.vm_analyze.pageMaxSize(10);
        notebookViewModel.result.result_sql.vm_analyze.buildData(notebook.result.result_sql.vm_analyze.serverData);
        notebookViewModel.result.result_sql.vm_analyze.columnNames(notebook.result.result_sql.vm_analyze.columnNames);
        notebookViewModel.result.result_sql.vm_analyze.buildView();
      }
    } else if (notebook.console.currentBookmark == 'pig') {
      //fulfill pig
    } else if (notebook.console.currentBookmark == 'spark') {
      //fulfill spark
      notebookViewModel.result.result_spark.data(notebook.result.result_spark.data);
    } else if (notebook.console.currentBookmark == 'impala') {
      //fulfill impala
      notebookViewModel.result.result_impala.vm_server_has_result(notebook.result.result_impala.vm_server_has_result);
      if (notebook.result.result_impala.vm_server_has_result) {
        notebookViewModel.result.result_impala.vm_server.pageMaxSize(10);
        notebookViewModel.result.result_impala.vm_server.buildData(notebook.result.result_impala.vm_server.serverData);
        notebookViewModel.result.result_impala.vm_server.columnNames(notebook.result.result_impala.vm_server.columnNames);
        notebookViewModel.result.result_impala.vm_server.buildView();
      }

      notebookViewModel.result.result_impala.vm_analyze_has_result(notebook.result.result_impala.vm_analyze_has_result);
      if (notebook.result.result_impala.vm_analyze_has_result) {
        notebookViewModel.result.result_impala.vm_analyze.pageMaxSize(10);
        notebookViewModel.result.result_impala.vm_analyze.buildData(notebook.result.result_impala.vm_analyze.serverData);
        notebookViewModel.result.result_impala.vm_analyze.columnNames(notebook.result.result_impala.vm_analyze.columnNames);
        notebookViewModel.result.result_impala.vm_analyze.buildView();
      }
    } else if (notebook.console.currentBookmark == 'md') {
      //fulfill markdown
      notebookViewModel.result.result_markdown.data(notebook.result.result_markdown.data);
    } else if (notebook.console.currentBookmark == 7) {
      //fulfill machine learning
    }

    viewModel.notebooks.push(notebookViewModel);
  });
}
