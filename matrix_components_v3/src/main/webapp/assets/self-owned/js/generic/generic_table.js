function DataModel(data, isChecked, isDisplay,parent) {
    // Data Model is a Row
    var self = this;
    self.parent = parent;
    // data is an array for store cell:[]
    self.data = data;
    self.isChecked = ko.observable(isChecked);
    self.isDisplay = ko.observable(isDisplay);

    self.isDisplay_cell = function (cell_index) {
      var flag = true;
      if(self.parent){
        var headerItemModel =self.parent.headerViewData()[cell_index];
        flag = headerItemModel.isChecked();
      }
      return flag;
    };
}


function HeaderItemModel(data,index,isChecked,isDisplay,parent){
  var self = this;
  self.parent = parent;
  self.data = ko.observable(data);

  self.data_id = ko.computed(function() {
        return 'id_'+this.data()+ (new Date()).getTime()
    }, this);
  self.index = ko.observable(index);
  self.name = ko.computed(function(){
    return self.index()+"_"+self.data();
  },this);
  self.isChecked = ko.observable(isChecked);
  self.isDisplay = ko.observable(isDisplay);


}



function ThinListViewModel() {
    var self = this;
    self.totalCounts = ko.observable();
    self.pageMaxSize = ko.observable(5);
    self.currentPageNumber = ko.observable();
    self.searchKeyword = ko.observable();
    self.originalData = ko.observableArray();//存放服务器的原始数据
    self.isDisplayPager = ko.observable(false);//是否显示翻页部件

    self.thinViewData = ko.observableArray();//存储显示的DataModel
    self.originViewData = ko.observableArray();//存储js原生数组
    self.columnNames = ko.observableArray();
    self.headerViewData = ko.observableArray();
    self.pagingSizeArray = ko.observableArray([5, 10, 20, 100]);
    self.selectedItems = ko.observableArray();//复选框选中的DataModel副本
    self.hasResult = ko.observable(false);
    self.searchField = ko.observable();

    self.totalPage = ko.pureComputed(function () {
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        return tp;
    }, this);

    self.toPage = function (pageNumber) {
        pageNumber = pageNumber || 1;
        self.currentPageNumber(pageNumber);
    };

    self.pageMaxSize.subscribe(function (newValue) {
        if (self.hasResult()) {
            self.currentPageNumber(1);
            self.calcuRowsToDisplay();
        }
    });

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
            thinTmp.push(new DataModel(element, false, true,self));
        }
        self.thinViewData(thinTmp);
        self.syncViewDataCheckbox();
        self.reset();
    }

    self.enableSubscribe = ko.observable(true);//内部变量，暂时禁用下面关于多选的subscribe

    self.isSelectCurrentPage = ko.observable();
    self.isSelectCurrentPage.subscribe(function (newValue) {
        if (self.enableSubscribe) {
            var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
            var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
            var type = newValue ? 'select' : 'unselect';
            self.switchPageView(self.thinViewData(), start, end, type);
        }
    });

    self.isSelectCurrentPageFile = ko.observable();
    self.isSelectCurrentPageFile.subscribe(function (newValue) {
        if (self.enableSubscribe()) {
            var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
            var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
            var type = newValue ? 'select' : 'unselect';
            self.switchPageViewFile(self.thinViewData(), start, end, type);
        }
    });

    self.isSelectAllPage = ko.observable();//全选是先清空，再全选，因此无法跨表格选择
    self.isSelectAllPage.subscribe(function (newValue) {
        if (self.enableSubscribe()) {
            self.selectedItems.removeAll();
            if (newValue) {
                $.each(self.originViewData(), function (idx, val) {
                    self.selectedItems.push(new DataModel(val, true, true,self));
                });
            }
            self.syncViewDataCheckbox();
        }
    });

    self.isSelectAllPageFile = ko.observable();
    self.isSelectAllPageFile.subscribe(function (newValue) {
        if (self.enableSubscribe()) {
            self.selectedItems.removeAll();
            if (newValue) {
                $.each(self.originViewData(), function (idx, val) {
                    if (val.type && val.type === 'FILE') {
                        self.selectedItems.push(new DataModel(val, true, true,self));
                    }
                });
            }
            self.syncViewDataCheckbox();
        }
    });



    //由于selectedItems中存储的是副本，不与thinViewData中的一样，需要一个检查两者是否等价的方式。在业务逻辑代码中自己编写
    //参数1为选中DataModel的序列，参数2为要匹配的DataModel，返回等价的*已选中*的DataModel
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
            var oldDataModel = self.checkItemSelectedBefore(self.selectedItems(), dataModel);
            self.selectedItems.remove(oldDataModel);
        } else {
            self.selectedItems.push(dataModel);
        }
        self.syncViewDataCheckbox();
    };

    self.getSelectedData = function () {
        var array = [];
        for (i in self.selectedItems()){
            array.push(self.selectedItems()[i].data);
        }
        return array;
//        return self.selectedItems();
    };

    self.clearSelectedData = function(){
        self.selectedItems.removeAll();
//        self.syncViewDataCheckbox();
    }

    self.totalSelected = ko.pureComputed(function () {
        return self.selectedItems().length;
    }, this);

    self.totalCounts = ko.pureComputed(function () {
        return self.originViewData().length;
    }, this);

    //这是啥
    self.checkListener = function (current) {
        current.isChecked(!current.isChecked());
    };

    //在翻页等操作时重置多选状态
    self.reset = function () {
        self.enableSubscribe(false);
        self.isSelectCurrentPage(false);
        self.isSelectAllPage(false);
        self.isSelectCurrentPageFile(false);
        self.isSelectAllPageFile(false);
        self.enableSubscribe(true);
    };

    self.buildData = function (serverData) {
        //build data from server
        console.log("enter buildData");
        self.originalData(serverData);
        self.hasResult(true);
    };

    self.buildView = function () {
        console.log("enter buildView");
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
          tmp_header.push(new HeaderItemModel(val,idx,true, true,self));
        });
        self.headerViewData(tmp_header);
    };

    self.uncheck_all = function(){
      $.each(self.headerViewData(), function (idx, val) {
        val.isChecked(false);
      });
    }
    self.check_all = function(){
      $.each(self.headerViewData(), function (idx, val) {
        val.isChecked(true);
      });
    }

    // 分页更新页面视图元素函数，逻辑如下：
    // data为表中所有数据，它包含的isDisplay属性控制是否在界面显示
    // 对data进行loop，将索引从first到last之间的元素设置为显示，其余设置为不显示
    // 注意type为(un)select时实际与data参数无关
    self.switchPageView = function (data, first, last, type) {
        thinTmp = self.thinViewData();
        $.each(thinTmp, function (idx, val) {
            if (type === 'unselect' && val.isChecked()) {
                var oldDataModel = self.checkItemSelectedBefore(self.selectedItems(), val);
                self.selectedItems.remove(oldDataModel);
            } else if (type === 'select' && !val.isChecked()) {
                self.selectedItems.push(val);
            }
        });
        self.thinViewData(thinTmp);
        self.syncViewDataCheckbox();
    };

    self.switchPageViewFile = function (data, first, last, type) {
        thinTmp = self.thinViewData();
        $.each(thinTmp, function (idx, val) {
            if (type === 'unselect' && val.isChecked()) {
                var oldDataModel = self.checkItemSelectedBefore(self.selectedItems(), val);
                self.selectedItems.remove(oldDataModel);
            } else if (type === 'select' && val.data.type === 'FILE' && !val.isChecked()) {
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

    self.header2json = function(){
      var header = self.headerViewData();
      var res = [];
      $.each(header, function (idx, val) {
        // var self = this;
        // self.parent = parent;
        // self.data = ko.observable(data);
        //
        // self.data_id = ko.computed(function() {
        //       return 'id_'+this.data()+ (new Date()).getTime()
        //   }, this);
        // self.index = ko.observable(index);
        // self.name = ko.computed(function(){
        //   return self.index()+"_"+self.data();
        // },this);
        // self.isChecked = ko.observable(isChecked);
        // self.isDisplay = ko.observable(isDisplay);
        var h = {
          data:val.data(),
          index:idx,
          isChecked: val.isChecked(),
          isDisplay: val.isDisplay()
        }
        res.push(h);
      });
      return JSON.stringify(res);
    };

    self.json2header = function(json){
      var obj = JSON.parse(json);
      var header = [];
      $.each(obj,function(idx,val){
        header.push(new HeaderItemModel(val.data,idx,val.isChecked,val.isDisplay,self));
      });
      return header;
    }
}

function ListViewModel() {
    var self = this;
    self.totalCounts = ko.observable();
    self.pageMaxSize = ko.observable(10);
    self.currentPageNumber = ko.observable();
    self.currentPageSize = ko.observable();
    self.searchKeyword = ko.observable();
    self.serverData = null;
    self.originalData = ko.observableArray();
    self.viewData = ko.observableArray();
    self.columnNames = ko.observableArray();
    self.pagingSizeArray = ko.observableArray([5,10, 20, 50, 100]);

    self.isSelectCurrentPage = ko.observable();
    self.isSelectAllPage = ko.observable();

    self.isSelectCurrentPageFile = ko.observable();
    self.isSelectAllPageFile = ko.observable();

    self.hasResult = ko.observable(false);

    self.searchField = ko.observable();


    self.pageMaxSize.subscribe(function (newValue) {
        self.buildView();
    });

    self.currentPageNumber.subscribe(function (newValue) {
        newValue = Number(newValue);
        self.toPage(newValue);
    });

    self.isSelectCurrentPage.subscribe(function (newValue) {
        var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
        var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageView(self.viewData(), start, end, type);
    });

    self.isSelectAllPage.subscribe(function (newValue) {
        var start = 0;
        var end = self.viewData().length;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageView(self.viewData(), start, end, type);
    });

    self.isSelectCurrentPageFile.subscribe(function (newValue) {
        var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
        var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageViewFile(self.viewData(), start, end, type);
    });

    self.isSelectAllPageFile.subscribe(function (newValue) {
        var start = 0;
        var end = self.viewData().length;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageViewFile(self.viewData(), start, end, type);
    });

    self.getSelectedData = function () {
        var result = [];
        for (var i = 0; i < self.viewData().length; i++) {
            if (self.viewData()[i].isChecked()) {
                result.push(self.viewData()[i].data);
            }
        }
        return result;
    };

    self.totalSelected = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.viewData().length; i++) {
            if (self.viewData()[i].isChecked()) {
                total++;
            }
        }
        return total;
    });

    self.checkListener = function (current) {
        current.isChecked(!current.isChecked());
    };
    self.reset = function(){
        self.isSelectCurrentPage(false);
        self.isSelectAllPage(false);
        self.isSelectCurrentPageFile(false);
        self.isSelectAllPageFile(false);
    };
    self.buildData = function (serverData) {
        //build data from server
        self.reset();
        var tmp = [];
        $.each(serverData, function (idx, val) {
            tmp.push(new DataModel(val, false, false,self));
        });
        self.originalData(tmp);
        self.serverData = serverData;
        self.hasResult(true);
    };

    self.buildView = function () {
        //build the view data
        var keyword = self.searchKeyword();
        var pageSize = self.pageMaxSize();
        var currentPageNumber = 1;

        var tmp = [];
        $.each(self.originalData(), function (idx, val) {
            var jsonData = val.data;
            if (keyword && keyword.length > 0) {
                if (self.searchField()){
                    $.each(self.searchField(), function (key,value){
                        if(jsonData[value]){
                          if(jsonData[value].toString().indexOf(keyword) >= 0){
                              tmp.push(new DataModel(jsonData, false, false,self));
                              return false;
                          }
                        }
                    })
                }else{
                    $.each(jsonData, function (key, value) {
                        if (value && value.toString().indexOf(keyword) >= 0) {
                            tmp.push(new DataModel(jsonData, false, false,self));
                            return false;
                        }
                    })
                }
            } else {
                tmp.push(new DataModel(jsonData, false, false,self));
            }

        });

        $.each(tmp, function (idx, val) {
            if (idx < pageSize) {
                val.isDisplay(true);
            } else {
                val.isDisplay(false);
            }
        });

        self.viewData(tmp);

        self.totalCounts(self.viewData().length);
        self.toPage(1);
    }

    self.totalPage = function () {
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        return tp;
    }

    self.toPage = function (pageNumber) {
        pageNumber = pageNumber || 1;
        var cp = pageNumber;
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        if (tp == 0 || cp < 1) {
            cp = 1;
        } else if (cp > tp) {
            cp = tp;
        }
        self.currentPageNumber(cp);
        self.switchPageView(self.viewData(), (cp - 1) * pm, cp * pm - 1 > tc ? tc : cp * pm - 1, 'display');
        console.log('navigate to the special page success...');
    };

    // 分页更新页面视图元素函数，逻辑如下：
    // data为表中所有数据，它包含的isDisplay属性控制是否在界面显示
    // 对data进行loop，将索引从first到last之间的元素设置为显示，其余设置为不显示
    self.switchPageView = function (data, first, last, type) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            if (i >= first && i <= last) {
                if (type == 'display') {
                    element.isDisplay(true);
                } else if (type == 'select') {
                    element.isChecked(true);
                } else if (type == 'unselect') {
                    element.isChecked(false);
                }
            } else {
                if (type == 'display') {
                    element.isDisplay(false);
                }
            }
        }
    };

    self.switchPageViewFile = function (data, first, last, type) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            if (i >= first && i <= last) {
                if (type == 'display') {
                    element.isDisplay(true);
                } else if (type == 'select' && data[i].data.type == 'FILE') {
                    element.isChecked(true);
                } else if (type == 'unselect') {
                    element.isChecked(false);
                }
            } else {
                if (type == 'display') {
                    element.isDisplay(false);
                }
            }
        }
    };

    self.clean = function(){
      self.buildData("");
      self.columnNames([]);
      self.buildView();
    }
}
