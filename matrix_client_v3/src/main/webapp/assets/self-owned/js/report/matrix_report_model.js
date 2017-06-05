/**
 * View Model for the whole DOM, it holds the whole elements
 *
 */
function ReportViewModel() {
  var self = this;

  self.data = null;
  self.template = null;
  self.name = ko.observable();
  self.hasNewContent = ko.observable(false);
  self.template_name = ko.observable();
  self.active_cell = null;

  self.cut_cell = null;

  self.copy_cell = null;

  self.cells = ko.observableArray();

  self.download_type = null;

  self.getMarkdownContent = function() {
    var title = self.name() ? self.name() : 'Report';
    var seperate = '\n  \n\n';
    var result = '% ' + title + '\n';
    result += seperate;

    $.each(self.cells(), function(idx, cell) {
      var cellShareModel = cell.buildShareModel();
      result += cellShareModel.code_source + seperate;
      if (cellShareModel.isChartMode) {
        result += cellShareModel.chartBase64Encode + seperate;
      }
    });

    return result;
  }

  self.download = function(type) {
    type = type || 'PDF';
    self.download_type = type;
    var content = self.getMarkdownContent();
    //        console.log(UserPOJO.user)
    var data = {
      'content': content,
      'filename': self.name() ? self.name() : 'Report',
      'rootpath':$.getServerRoot(),
      'user': 'Liu_Yang'

    };
    $.serverRequest($.getServerRoot() + '/service_scripter_report/api/generic/download', data, "DOWNLOAD_SUCCESS", "DOWNLOAD_FAILED", "DOWNLOAD_SERVICE_GENERIC_QUERY_FAILED");
  }


  self.reset = function() {
    self.data = null;
    self.template = null;
    self.name("");
    self.active_cell = null;
    self.cut_cell = null;
    self.copy_cell = null;
    self.cells.removeAll();
    self.addCell();
    self.hasNewContent(true);
  };


  self.addCell = function() {
    var cell = new CellViewModel(self);
    var cell_id = (new Date()).getTime() + "_cell";
    cell.div_id(cell_id);
    // self.cells.push(cell);
    if (self.active_cell) {
      var index = self.cells.indexOf(self.active_cell);
      self.cells.splice(index + 1, 0, cell);
    } else {
      self.cells.push(cell);
    }

    cell.listener_focus_in();
    self.hasNewContent(true);
  };

  self.addCell_image = function(path) {
    var cell = new CellViewModel(self);
    var cell_id = (new Date()).getTime() + "_cell";
    cell.div_id(cell_id);
    // self.cells.push(cell);
    if (self.active_cell) {
      var index = self.cells.indexOf(self.active_cell);
      self.cells.splice(index + 1, 0, cell);
    } else {
      self.cells.push(cell);
    }

    cell.listener_focus_in();
    var code = "![" + cell_id + "_source](" + path + ")";
    cell.code_source(code);
    cell.listener_dbl_click();
    self.compileCell();
    self.hasNewContent(true);
  };

  self.addCell_table = function(code) {
    var cell = new CellViewModel(self);
    var cell_id = (new Date()).getTime() + "_cell";
    cell.div_id(cell_id);
    // self.cells.push(cell);
    if (self.active_cell) {
      var index = self.cells.indexOf(self.active_cell);
      self.cells.splice(index + 1, 0, cell);
    } else {
      self.cells.push(cell);
    }

    cell.listener_focus_in();
    cell.code_source(code);
    cell.listener_dbl_click();
    self.compileCell();
    self.hasNewContent(true);
  };

  self.addCell_chart = function(json) {
    var cell = new CellViewModel(self);
    var cell_id = (new Date()).getTime() + "_cell";
    cell.div_id(cell_id);
    // self.cells.push(cell);
    if (self.active_cell) {
      var index = self.cells.indexOf(self.active_cell);
      self.cells.splice(index + 1, 0, cell);
    } else {
      self.cells.push(cell);
    }
    cell.listener_focus_in();
    var chart_div_id = cell.chart_div_id();
    cell.isChartMode(true);
    cell.code_compiled("");
    cell.code_source("");
    if (json) {
      var option = ChartPOJO.deserialize_chart_option(json);
      cell.chart = ChartPOJO.renderChart(chart_div_id, option);
    }
    self.hasNewContent(true);
  };

  self.generateTableCode = function(num_row, num_col, align_type) {
    num_row = num_row || 3;
    num_col = num_col || 3;
    align_type = align_type || 'DEFAULT'; // DEFAULT,LEFT,RIGHT,CENTER
    var _sep = "|";
    var _sep_align = "---";
    if (align_type == "RIGHT") {
      _sep_align = "---:";
    } else if (align_type == "CENTER") {
      _sep_align = ":---:";
    }
    var result = "";
    // add header
    var header = "";
    for (var i = 1; i <= num_col; i++) {
      header += _sep + "header_" + i;
    }
    header += _sep + "\n";
    // add seperate
    var seperate = "";
    for (var i = 1; i <= num_col; i++) {
      seperate += _sep + _sep_align;
    }
    seperate += _sep + "\n";
    // add content
    var content = "";
    for (num_row; num_row > 0; num_row--) {
      for (var i = 1; i <= num_col; i++) {
        content += _sep + "content_" + i;
      }
      content += _sep + "\n";
    }
    result = header + seperate + content;
    return result;
  }

  self.compileCell = function() {
    if (self.active_cell) {
      self.active_cell.compile();
    }
    self.hasNewContent(true);
  }

  self.inactive_cells = function() {
    $.each(self.cells(), function(index, cell) {
      if (cell) {
        cell.isActive(false);
      }
    });
    self.active_cell = null;
  }

  //cut current cell, remove it from the cells and put it in the cut cell attribute
  //focus the cell to the nearest cell
  self.cutCell = function() {
    if (!self.active_cell) {
      return;
    }
    var index = self.cells.indexOf(self.active_cell);

    var nearest_cell = self.cells().length == index + 1 ? (index == 0 ? null : self.cells()[index - 1]) : self.cells()[index + 1];

    self.cut_cell = self.active_cell;
    self.copy_cell = self.cut_cell.copy();
    self.cells.remove(self.cut_cell);

    if (nearest_cell) {
      nearest_cell.listener_focus_in();
    }
    self.hasNewContent(true);
  }

  self.copyCell = function() {
    if (!self.active_cell) {
      return;
    }
    self.copy_cell = self.active_cell;
  }

  self.pasteCell = function() {
    if (!self.copy_cell) {
      return;
    }
    var new_cell = self.copy_cell.copy();
    var index = self.active_cell ? self.cells.indexOf(self.active_cell) : 0;
    self.cells.splice(index + 1, 0, new_cell);

    new_cell.listener_focus_in();

    if (!new_cell.isViewMode()) {
      new_cell.listener_dbl_click();
    }
    self.hasNewContent(true);
  }

  self.upCell = function() {
    if (!self.active_cell) {
      return;
    }
    var index = self.cells.indexOf(self.active_cell);
    if (index == 0) {
      return;
    }
    var splice_index = index - 1;
    var new_cell = self.active_cell.copy();
    self.cells.remove(self.active_cell);
    self.cells.splice(splice_index, 0, new_cell);
    new_cell.listener_focus_in();

    if (!new_cell.isViewMode()) {
      new_cell.listener_dbl_click();
    }
    self.hasNewContent(true);
  }

  self.downCell = function() {
    if (!self.active_cell) {
      return;
    }
    var index = self.cells.indexOf(self.active_cell);
    if (index == self.cells().length - 1) {
      return;
    }
    var splice_index = index + 1;
    var new_cell = self.active_cell.copy();
    self.cells.remove(self.active_cell);
    self.cells.splice(splice_index, 0, new_cell);
    new_cell.listener_focus_in();

    if (!new_cell.isViewMode()) {
      new_cell.listener_dbl_click();
    }
    self.hasNewContent(true);
  }

  self.serialize_report = function() {
    var report = {
      cells: []
    };
    $.each(self.cells(), function(idx, cell) {
      var cellShareModel = cell.buildShareModel();
      report.cells.push(cellShareModel);
    });

    return ko.toJSON(report);
  }


  self.deserialize_json = function(json) {
    var report = $.parseJSON(json);
    self.cells.removeAll();
    $.each(report.cells, function(idx, cellShareModel) {
      var cell = self.buildCell(cellShareModel);
      self.cells.push(cell);
    });
    self.refreshCellsStatus();
  }

  self.deserialize_report = function(inputData) {
    var json = inputData.json;
    self.data = inputData;
    self.name(inputData.stringalpha);
    var report = $.parseJSON(json);

    self.cells.removeAll();
    $.each(report.cells, function(idx, cellShareModel) {
      var cell = self.buildCell(cellShareModel);
      self.cells.push(cell);
    });

    self.refreshCellsStatus();
    self.inactive_cells();
  }

  self.deserialize_template = function(inputData) {
    var json = inputData.json;
    self.template == inputData;
    self.template_name(inputData.stringalpha);
    var report = $.parseJSON(json);

    self.cells.removeAll();
    $.each(report.cells, function(idx, cellShareModel) {
      var cell = self.buildCell(cellShareModel);
      self.cells.push(cell);
    });

    self.refreshCellsStatus();
  }

  self.buildCell = function(model) {

    var cell = new CellViewModel(self);
    cell.div_id(model.div_id);

    cell.code_source(model.code_source);

    cell.code_compiled(model.code_compiled);

    cell.isActive(model.isActive);

    cell.isViewMode(model.isViewMode);

    cell.isChartMode(model.isChartMode);

    if (cell.isChartMode) {
      cell.chartJson = model.chartJson;
    }




    return cell;
  }

  self.refreshCellsStatus = function() {

    $.each(self.cells(), function(idx, cell) {
      if (!cell.isViewMode()) {
        cell.listener_dbl_click();
      }
      if (cell.isChartMode() && cell.chartJson) {
        var chart_div_id = cell.chart_div_id();
        var option = ChartPOJO.deserialize_chart_option(cell.chartJson);
        var chart = ChartPOJO.renderChart(chart_div_id, option);
        cell.chart = chart;
      }
    });
  }

  self.persist2server = function() {
    //'type': 'MATRIX_REPORT_DRAFT','MATRIX_REPORT_TEMPLATE','MATRIX_REPORT_FINISHED'
    //'tag': SAVE,SHARE
    var shareJson = {
      'type': 'MATRIX_REPORT_DRAFT',
      'tag': 'SAVE',
      'json': self.serialize_report(),
      'stringalpha': 'report draft demo',
      'username': 'Liu Yang'
    }
    var data = {
      'shareJson': $.toJSON(shareJson)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/share/generate/' + 10000, data, "TOKEN_SUCCESS", "TOKEN_FAILED", "TOKEN_SERVICE_FAILED");
  }



}

function CellViewModel(parent) {
  var self = this;

  self.parent = parent;

  self.div_id = ko.observable();

  self.edit_div_id = ko.pureComputed(function() {
    if (self.div_id()) {
      return self.div_id() + "_edit";
    }
  }, self);

  self.chart_div_id = ko.pureComputed(function() {
    if (self.div_id()) {
      return self.div_id() + "_chart";
    }
  }, self);

  self.code_source = ko.observable("Please double click the cell to edit the content...");

  self.code_compiled = ko.observable("Please double click the cell to edit the content...");

  self.editor_CodeMirror = null;

  self.isActive = ko.observable(true);

  self.isViewMode = ko.observable(true);

  self.chart = null;
  self.chartJson = null;
  self.chartBase64Encode = null;
  self.isChartMode = ko.observable(false);


  self.currentStyle = ko.pureComputed(function() {

    var result = "compile_mode_focus_out";

    if (self.isViewMode()) {
      if (self.isActive()) {
        result = "compile_mode_focus_in";
      } else {
        result = "compile_mode_focus_out";
      }
    } else {
      if (self.isActive()) {
        result = "edit_mode_focus_in";
      } else {
        result = "edit_mode_focus_out";
      }
    }
    return result;
  }, self);

  self.listener_focus_in = function() {
    parent.inactive_cells();
    parent.active_cell = self;
    self.isActive(true);
  }
  self.listener_focus_out = function() {}

  self.listener_dbl_click = function() {
    // if the cell is in view mode, switch to edit mode
    if (self.isViewMode()) {
      self.isViewMode(false);
    }
    // if the code mirror edit is not initialized, initialize it
    if (!self.editor_CodeMirror) {
      self.create_codeMirror_component();
    }
    self.parent.hasNewContent(true);
  }

  self.compile = function() {
    if (self.isViewMode()) {
      return;
    }

    if (self.editor_CodeMirror) {
      var markdown_content = self.editor_CodeMirror.getValue();
      // var compile_code = markdown.toHTML(markdown_content);
      var compile_code = converter.makeHtml(markdown_content);
      self.code_compiled(compile_code);
      self.code_source(markdown_content);

      //delete code mirror textarea
      self.editor_CodeMirror = null;
      $("#" + self.div_id()).find(".CodeMirror").remove();
      self.isViewMode(true);
    }
  }

  self.copy = function() {

    var cell = new CellViewModel(self.parent);
    var cell_id = (new Date()).getTime() + "_cell";
    cell.div_id(cell_id);

    cell.code_source(self.code_source());

    cell.code_compiled(self.code_compiled());

    cell.isActive(false);

    cell.isViewMode(self.isViewMode());

    if (self.editor_CodeMirror) {
      var markdown_content = self.editor_CodeMirror.getValue();
      cell.code_source(markdown_content);
    }

    return cell;
  }

  self.create_codeMirror_component = function() {
    if (!self.div_id()) {
      return;
    }
    var editor = CodeMirror.fromTextArea(document.getElementById(self.edit_div_id()), {
      mode: 'markdown',
      lineNumbers: false,
      theme: "default",
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList"
      }
    });
    editor.on('focus', function() {
      self.listener_focus_in();
    })
    self.editor_CodeMirror = editor;
  }

  self.buildShareModel = function() {
    var model = new CellShareModel();
    model.div_id = self.div_id();
    model.edit_div_id = self.edit_div_id();

    if (self.editor_CodeMirror) {
      var markdown_content = self.editor_CodeMirror.getValue();
      self.code_source(markdown_content);
    }

    model.code_source = self.code_source();
    model.code_compiled = self.code_compiled();
    model.isActive = self.isActive();
    model.isViewMode = self.isViewMode();
    model.currentStyle = self.currentStyle();
    model.isChartMode = self.isChartMode();

    if (self.isChartMode() && self.chart) {
      var json = ChartPOJO.serialize_chart_option(self.chart);
      self.chartJson = json;
      model.chartJson = json;

      var chartBase64Encode = self.chart.getDataURL();
      self.chartBase64Encode = chartBase64Encode;
      model.chartBase64Encode = chartBase64Encode;
    }
    return model;
  }

}


function CellShareModel() {
  var self = this;
  self.div_id = null;
  self.edit_div_id = null;
  self.code_source = null;
  self.code_compiled = null;
  self.isActive = false;
  self.isViewMode = false;
  self.isChartMode = false;
  self.chartJson = null;
  self.chartBase64Encode = null;
  self.currentStyle = null;
}

function DownloadModel(parent) {
  var self = this;
  self.parent = parent;
  var download_file_href;
  var download_name;
  var filename = parent.name() ? parent.name() : "report";
  if (parent.download_type === 'PDF') {
    download_file_href = $.getRootPath() + "/matrix/report/" + 'Liu_Yang' + "/" + filename + ".pdf";
    download_name = parent.name() ? parent.name() : 'report' + ".pdf";
  } else if (parent.download_type === 'HTML') {
    download_file_href = $.getRootPath() + "/matrix/report/" + 'Liu_Yang' + "/" + filename + ".html";
    download_name = parent.name() ? parent.name() : 'report' + ".html";
  } else if (parent.download_type === 'MD') {
    download_file_href = $.getRootPath() + "/matrix/report/" + 'Liu_Yang' + "/" + filename + ".md";
    download_name = parent.name() ? parent.name() : 'report' + ".md";
  }
  self.getLinkElement_v2 = function(linkText) {

    return self.linkElement = self.linkElement || $('<a>' + (linkText || '') + '</a>', {
      href: download_file_href,
      download: download_name
    });
  };
  // call with removeAfterDownload = true if you want the link to be removed after downloading
  this.download = function(removeAfterDownload) {
    self.getLinkElement_v2().css('display', 'none').appendTo('body');
    self.getLinkElement_v2()[0].click();
    if (removeAfterDownload) {
      self.getLinkElement_v2().remove();
    }
  };
}


$.subscribe("TOKEN_SUCCESS", successListener);
$.subscribe("TOKEN_FAILED", failedListener);
$.subscribe("TOKEN_SERVICE_FAILED", failedServiceListener);

function successListener() {
  if (arguments && arguments[1]) {
    console.log("Save operation successed");
    // console.log(arguments);
    // genericModalViewModel.response(true, "保存操作", "[成功]", "");
  }
}

function failedListener() {
  if (arguments && arguments[1]) {
    console.log("Save operation failed");
    // var errorMessage = arguments[1].errorMessage;
    // genericModalViewModel.response(false, "保存操作", "[失败]", errorMessage);
  }
}

function failedServiceListener() {
  // genericModalViewModel.response(false, "保存操作", "[失败]", "服务器异常！请联系管理员解决。");
  console.log("Save operation service failed");
}


$.subscribe("DOWNLOAD_SUCCESS", download_success);
$.subscribe("DOWNLOAD_FAILED", download_failed);
$.subscribe("DOWNLOAD_SERVICE_GENERIC_QUERY_FAILED", download_service_failed);

function download_failed() {
  // self.will_block(false);
  // self.blockCheck();

  console.log('download failed')
}

function download_service_failed() {
  // self.will_block(false);
  // self.blockCheck();
  console.log('download service failed')
}

function download_success() {
  // self.will_block(false);
  // self.blockCheck();
  if (arguments && arguments[1]) {
    //            console.log(arguments[1]);
    if (arguments[1].hasError) {
      alert('Pandoc did not setup correct, please contact administrator.');
    }
    if (arguments[1].result[0]) {
      alert(arguments[1].result[0]);
    }
    if (reportViewModel) {
      var download_model = new DownloadModel(reportViewModel);
      download_model.download(true);
    }

  }
}
