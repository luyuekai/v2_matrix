

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
    self.isDisplayPager = ko.observable(true);
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