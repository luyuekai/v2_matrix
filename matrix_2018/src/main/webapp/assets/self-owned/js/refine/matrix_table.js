

function MatrixTableVM() {
    var self = this;
    //数据总数量
    self.totalCounts = ko.observable();
    //每页分页数
    self.pageMaxSize = ko.observable(5);
    //当前页位置
    self.currentPageNumber = ko.observable();
    //搜索或过滤的关键词
    self.searchKeyword = ko.observable();
    //无论是从服务器还是从本地获取得到的原始数据
    self.originalData = ko.observableArray();
    //是否显示翻页组件
    self.isDisplayPager = ko.observable(false);
    ////存储显示的MatrixTableDataVM
    self.thinViewData = ko.observableArray();
    //存储js原生数组
    self.originViewData = ko.observableArray();
    //Table的列名称，是一个一维数组，比如['name','sex','age']
    self.columnNames = ko.observableArray();
    //通过column names构造的MatrixTableHeaderItemVM数组
    self.headerViewData = ko.observableArray();
    //DOM中可供选择的每页数据量
    self.pagingSizeArray = ko.observableArray([5, 10, 20, 100]);
    //复选框选中的MatrixTableDataVM副本
    self.selectedItems = ko.observableArray();
    //是否有结果集
    self.hasResult = ko.observable(false);
    //通过关键字要查询的域值(Column的名字)
    self.searchField = ko.observable();
    //总页数，通过数据总量和每页数据量计算得出
    self.totalPage = ko.pureComputed(function () {
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        return tp;
    }, this);
    //通用构造函数
    self.build = function(header_array,data_array){
      self.columnNames(header_array);
      self.buildData(data_array);
      self.buildView();
    };
    //通过REST端返回的JSON格式构造模型
    self.buildJSON = function(json){
      var result = Matrix_Util.json2table(json);
      self.build(result.header,result.result);
    }
    //跳到第几页
    self.toPage = function (pageNumber) {
        pageNumber = pageNumber || 1;
        self.currentPageNumber(pageNumber);
    };
    //每页数量的监听函数
    self.pageMaxSize.subscribe(function (newValue) {
        if (self.hasResult()) {
            self.currentPageNumber(1);
            self.calcuRowsToDisplay();
        }
    });
    //当前页变更的监听函数
    self.currentPageNumber.subscribe(function (newValue) {
        newValue = Number(newValue);
        newValue = newValue || 1;
        var cp = newValue;
        var tp = self.totalPage();
        if (tp === 0 || cp < 1) {
            self.currentPageNumber(1);//如何避免这种重复跳转？
        } else if (cp > tp) {
            self.currentPageNumber(tp);
        } else {
            self.currentPageNumber(newValue);
            self.calcuRowsToDisplay();
        }
    });
    //计算需要显示的行
    self.calcuRowsToDisplay = function () {
        var cp = self.currentPageNumber();
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var first = (cp - 1) * pm;
        var last = cp * pm - 1 > tc ? tc : cp * pm - 1;
        last = last + 1 < self.originViewData().length ? last + 1 : self.originViewData().length;
        var thinTmp = [];
        for (var i = first; i < last; i++) {
            var element = self.originViewData()[i];
            thinTmp.push(new MatrixTableDataVM(element, false, true,self));
        }
        self.thinViewData(thinTmp);
        self.syncViewDataCheckbox();
        self.reset();
    };
    //内部变量，暂时禁用下面关于多选的subscribe
    self.enableSubscribe = ko.observable(true);
    //扩展属性，用于特定场景
    self.isSelectCurrentPage = ko.observable();
    self.isSelectCurrentPage.subscribe(function (newValue) {
        if (self.enableSubscribe) {
            var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
            var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
            var type = newValue ? 'select' : 'unselect';
            self.switchPageView(self.thinViewData(), start, end, type);
        }
    });
    //扩展属性，用于特定场景
    self.isSelectAllPage = ko.observable();//全选是先清空，再全选，因此无法跨表格选择
    self.isSelectAllPage.subscribe(function (newValue) {
        if (self.enableSubscribe()) {
            self.selectedItems.removeAll();
            if (newValue) {
                $.each(self.originViewData(), function (idx, val) {
                    self.selectedItems.push(new MatrixTableDataVM(val, true, true,self));
                });
            }
            self.syncViewDataCheckbox();
        }
    });

    //由于selectedItems中存储的是副本，不与thinViewData中的一样，需要一个检查两者是否等价的方式。在业务逻辑代码中自己编写
    //参数1为选中MatrixTableDataVM的序列，参数2为要匹配的MatrixTableDataVM，返回等价的*已选中*的MatrixTableDataVM
    self.checkItemSelectedBefore = function (selectedItems, item) {
//        console.error("You should overwrite or hijack this function");
    };

    //由于selectedItems中存储的是副本，需要保证selectedItems与thinViewData已勾选内容一致。
    //统一为对selectedItems增删，然后通过下面的函数进行勾选框的状态同步
    self.syncViewDataCheckbox = function() {
        var thinTmp = self.thinViewData();
        $.each(thinTmp, function (idx, val) {
            if (self.checkItemSelectedBefore(self.selectedItems(), val)) {
                val.isChecked(true);
            } else {
                val.isChecked(false);
            }
        });
        self.thinViewData(thinTmp);
    };

    //判断selectedItems或thinViewData切换勾选状态
    self.switchItemSelection = function (dataModel) {
        if (dataModel.isChecked()) {
            var oldMatrixTableDataVM = self.checkItemSelectedBefore(self.selectedItems(), dataModel);
            self.selectedItems.remove(oldMatrixTableDataVM);
        } else {
            self.selectedItems.push(dataModel);
        }
        self.syncViewDataCheckbox();
    };

    self.getSelectedData = function () {
        var array = [];
        for (var i in self.selectedItems()){
            array.push(self.selectedItems()[i].data);
        }
        return array;
    };

    self.clearSelectedData = function(){
        self.selectedItems.removeAll();
    };

    self.totalSelected = ko.pureComputed(function () {
        return self.selectedItems().length;
    }, this);

    self.totalCounts = ko.pureComputed(function () {
        return self.originViewData().length;
    }, this);

    //在翻页等操作时重置多选状态
    self.reset = function () {
        self.enableSubscribe(false);
        self.isSelectCurrentPage(false);
        self.isSelectAllPage(false);
        self.enableSubscribe(true);
    };

    self.buildData = function (serverData) {
        //build data from server
        // console.log("enter buildData");
        self.originalData(serverData);
        self.hasResult(true);
    };

    self.buildView = function () {
        // console.log("enter buildView");
        //build the view data
        var keyword = self.searchKeyword();

        var tmp = [];
        $.each(self.originalData(), function (idx, val) {
            var jsonData = val;
            if (keyword && keyword.length > 0) {
                if (self.searchField()) {
                    $.each(self.searchField(), function (key, value) {
                        if (jsonData[value]) {
                            if (jsonData[value].toString().indexOf(keyword) >= 0) {
                                tmp.push(jsonData);
                                return false;
                            }
                        }
                    });
                } else {
                    $.each(jsonData, function (key, value) {
                        if (value && value.toString().indexOf(keyword) >= 0) {
                            tmp.push(jsonData);
                            return false;
                        }
                    });
                }
            } else {
                tmp.push(jsonData);
            }
        });
        self.originViewData(tmp);
        self.currentPageNumber(1);
        self.calcuRowsToDisplay();
        var tmp_header = [];
        $.each(self.columnNames(), function (idx, val) {
          tmp_header.push(new MatrixTableHeaderItemVM(val,idx,true, true,self));
        });
        self.headerViewData(tmp_header);
    };

    self.uncheck_all = function(){
      $.each(self.headerViewData(), function (idx, val) {
        val.isChecked(false);
      });
    };

    self.check_all = function(){
      $.each(self.headerViewData(), function (idx, val) {
        val.isChecked(true);
      });
    };

    // 分页更新页面视图元素函数，逻辑如下：
    // data为表中所有数据，它包含的isDisplay属性控制是否在界面显示
    // 对data进行loop，将索引从first到last之间的元素设置为显示，其余设置为不显示
    // 注意type为(un)select时实际与data参数无关
    self.switchPageView = function (data, first, last, type) {
        thinTmp = self.thinViewData();
        $.each(thinTmp, function (idx, val) {
            if (type === 'unselect' && val.isChecked()) {
                var oldMatrixTableDataVM = self.checkItemSelectedBefore(self.selectedItems(), val);
                self.selectedItems.remove(oldMatrixTableDataVM);
            } else if (type === 'select' && !val.isChecked()) {
                self.selectedItems.push(val);
            }
        });
        self.thinViewData(thinTmp);
        self.syncViewDataCheckbox();
    };


    self.clean = function () {
        self.buildData("");
        self.columnNames([]);
        self.buildView();
    };

    //将JSON格式的header信息转换成HeaderItemModel数据对象
    self.json2header = function(json){
      var obj = JSON.parse(json);
      var header = [];
      $.each(obj,function(idx,val){
        header.push(new HeaderItemModel(val.data,idx,val.isChecked,val.isDisplay,self));
      });
      return header;
    };
}


/**
 * 代表Table中数据的一行
 * @param       {[Array]}  data      [代表一行数据，格式是一维数据]
 *                                   举例: [1,2,3]
 * @param       {Boolean} isChecked [当前行是否被选中]
 * @param       {Boolean} isDisplay [当前行是否被显示]
 * @param       {[type]}  parent    [它对应的父元素，一般为MatrixTableVM]
 * @constructor
 */
function MatrixTableDataVM(data, isChecked, isDisplay,parent) {
    var self = this;
    self.parent = parent;
    // data is an array for store cell:[]
    self.data = data;
    self.isChecked = ko.observable(isChecked);
    self.isDisplay = ko.observable(isDisplay);
    /**
     * 通过它所属的Header控制其是否被显示
     * @param  {[type]} cell_index [description]
     * @return {[type]}            [description]
     */
    self.isDisplay_cell = function (cell_index) {
      var flag = true;
      if(self.parent){
        var headerItemModel =self.parent.headerViewData()[cell_index];
        flag = headerItemModel.isChecked();
      }
      return flag;
    };
}


/**
 * 代表Table中的Header行的具体一列属性，它只有一个值
 * @param       {[type]}  data      []
 * @param       {[type]}  index     [description]
 * @param       {Boolean} isChecked [description]
 * @param       {Boolean} isDisplay [description]
 * @param       {[type]}  parent    [description]
 * @constructor
 */
function MatrixTableHeaderItemVM(data,index,isChecked,isDisplay,parent){
  var self = this;
  self.parent = parent;
  self.data = ko.observable(data);
  self.data_id = ko.computed(function() {
        return 'id_'+this.data()+ (new Date()).getTime();
    }, this);
  self.index = ko.observable(index);
  self.name = ko.computed(function(){
    return self.index()+"_"+self.data();
  },this);
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);
}

function init_matrix_table_env(){
  ko.components.register('matrix_dynamic_table', {
      viewModel: function(params) {
          var self = this;
          self.ds = params.value;

          self.ds.subscribe(function(newValue) {
              self.update_table(newValue);

          });
          self.tableModel = ko.observable(new MatrixTableVM());

          self.update_table = function(newValue){
            if(newValue.type =='static'){
              if(newValue.header && newValue.result){
                var tableModel = new MatrixTableVM();
                tableModel.build(newValue.header,newValue.result);
                if(newValue.isDisplayPager){
                  tableModel.isDisplayPager(newValue.isDisplayPager);
                }
                if(newValue.pageMaxSize){
                  tableModel.pageMaxSize(newValue.pageMaxSize);
                }
                self.tableModel(tableModel);
              }
            }else if(newValue.type =='dynamic'){
              if(newValue.url){
                var url = newValue.url;
                var option_type = newValue.rest_mode;
                var option_param = newValue.request_params || null;
                if(option_param){
                  option_param = JSON.parse(option_param);
                }
                Matrix_Util.request_remote(newValue.url,matrix_table_remote_data_handler,option_param,option_type,true,self);
              }
            }



          };
      },
      template: { element: 'matrix_dynamic_table-template' }
  });
}

function matrix_table_remote_data_handler(json) {
  var server_data = json.response;
  var matrix_table_template = json.addtion;
  var ds = matrix_table_template.ds();
  if(ds){
    if(ds.json_rule){
      var tmp = 'server_data.'+ds.json_rule;
      server_data = eval(tmp);
    }
  }

  var tableModel = new MatrixTableVM();
  tableModel.buildJSON(server_data);
  if(ds.isDisplayPager){
    tableModel.isDisplayPager(ds.isDisplayPager);
  }
  if(ds.pageMaxSize){
    tableModel.pageMaxSize(ds.pageMaxSize);
  }
  if(ds.header_json){
    var header = tableModel.json2header(ds.header_json);

    tableModel.headerViewData(header);
  }

  matrix_table_template.tableModel(tableModel);
  return;
}

/**
 * Matrix Table封装了DOM后的Temaplte原型
 * @param       {[JSON]} input [数据源，格式如下]
 *                       {
 *                         // 'static' or 'dynamic'
 *                         'type':'static',
 *
 *                         // static setting
 *                         'header':['name','value'],
 *                         'result':[['zhangsan',25],['lisi',26],['wangwu',27]],
 *
 *                         // dynamic setting
 *                         "ds": "http://localhost:8080/service_generic_query/api/query",
 *                         "header_json":"",
 *                         "json_rule": "result",
 *                         "rest_mode": "POST",
 *                         "request_params": "{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }",
 *                         // table setting
 *                         'isDisplayPager':false,
 *                         'pageMaxSize':5
 *                       }
 * @constructor
 */
function MatrixTableTemplate(input) {
    this.table_data_source = ko.observable(input||null);
}

/**
 * 通过设置好的数据源属性，将Table View Model和指定的DOM绑定起来
 * @param  {[type]} destination_div_id [description]
 * @param  {[type]} vm                 [description]
 * @param  {[type]} ds                 [description]
 * @return {[type]}                    [description]
 */
function create_static_table_template(destination_div_id,vm_table,ds_table){
  if(destination_div_id && vm_table && ds_table){
    var dom = Matrix_DOM_Util.clone_dom(destination_div_id,'wrapped_matrix_dynamic_table_div');
    var dom_id = dom.id;
    ko.cleanNode($('#'+dom_id)[0]);
    ko.applyBindings(vm_table,document.getElementById(dom_id));
    setTimeout(function() {
      vm_table.table_data_source(ds_table);
    }, 500);
  }


}

//TODO
function create_dynamic_table_template(){
  var ds = {
    "ds": "http://localhost:8080/service_generic_query/api/query",
    "header_json": "[{\"data\":\"id\",\"index\":0,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanalpha\",\"index\":1,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanbeta\",\"index\":2,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleandelta\",\"index\":3,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleangamma\",\"index\":4,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"category\",\"index\":5,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"createtime\",\"index\":6,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"creator\",\"index\":7,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"deleted\",\"index\":8,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"description\",\"index\":9,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"enabled\",\"index\":10,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastmodifier\",\"index\":11,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastupdatetime\",\"index\":12,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"modifycount\",\"index\":13,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"name\",\"index\":14,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"numberalpha\",\"index\":15,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberbeta\",\"index\":16,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberdelta\",\"index\":17,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberepsilon\",\"index\":18,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbereta\",\"index\":19,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbergamma\",\"index\":20,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberkappa\",\"index\":21,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlambda\",\"index\":22,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlota\",\"index\":23,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberomega\",\"index\":24,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbertheta\",\"index\":25,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberzeta\",\"index\":26,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"parentid\",\"index\":27,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"priority\",\"index\":28,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"status\",\"index\":29,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringalpha\",\"index\":30,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"stringbeta\",\"index\":31,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringdelta\",\"index\":32,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringepsilon\",\"index\":33,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringeta\",\"index\":34,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringgamma\",\"index\":35,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringkappa\",\"index\":36,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlambda\",\"index\":37,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlota\",\"index\":38,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringomega\",\"index\":39,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringtheta\",\"index\":40,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringzeta\",\"index\":41,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"type\",\"index\":42,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"valid\",\"index\":43,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"children\",\"index\":44,\"isChecked\":false,\"isDisplay\":true}]",
    "json_rule": "result",
    "rest_mode": "POST",
    "request_params": "{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"type\\\":\\\"MATRIX_TEMPLATE_ADD\\\",\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }"
  }
}
