$.hasUrlParam = function (name) {
    var results = new RegExp('[\?&]' + name).exec(window.location.href);
    if (results == null) {
        return false;
    } else {
        return true;
    }
}
$.urlParamValue = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}
$.getRootPath = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
}
$.getServerRoot = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    return prePath;
}
$.loadContext = function (parentDivID, childPath) {
    $('#' + parentDivID).load($.getRootPath() + childPath);
}

function formatTimeSize(time) {
    var s = 1000;
    var min = 60 * 1000;
    var h = 60 * 60 * 1000;
    var d = 24 * 60 * 60 * 1000;
    if (time > s && time < min) {
        return (time / s).toFixed(1) + " s";
    }
    else if (time > min && time < h) {
        return (time / min).toFixed(1) + " min";
    }
    else if (time > h && time < d) {
        return (time / h).toFixed(1) + " h";
    }
    else if (time > d) {
        return (time / d).toFixed(1) + " d";
    }
    else {
        return time + " ms"
    }
}

$(document).ready(function () {
    $('#navDIV').load($.getRootPath() + '/assets/self-owned/html/header.html');
    $('#navAuthDIV').load($.getRootPath() + '/assets/self-owned/html/authHeader.html');
    $('#footerDIV').load($.getRootPath() + '/assets/self-owned/html/footer.html');
    $('#carouseContentDIV').load($.getRootPath() + '/assets/self-owned/html/carouse.html');
    $('#commentsDIV').load($.getRootPath() + '/assets/self-owned/html/comments.html');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});

var ClonePOJO = ClonePOJO || {};
ClonePOJO = {
    shallowClone: function (oldObject) {
        return jQuery.extend({}, oldObject);
    },
    deepClone: function (oldObject) {
        return jQuery.extend(true, {}, oldObject);
    }
};

var ModalUtil = ModalUtil || {};
ModalUtil = {
  businessPOJO:{},
  modal_close : function(modalName) {
    if(!modalName){
      modalName = "popupModal";
    }
    $('#'+modalName).modal('hide');
  },

  responseData:{
    modalTitle:"",
    hasError:false,
    resultTitle:"",
    resultSubTitle:"",
    resultContent:""
  },

  popup_response_modal:function(){
    if(ModalUtil.responseData){
      ModalUtil.popup_modal(ModalUtil.responseData.modalTitle, '/assets/self-owned/html/generic_modal_response_content.html');
    }
  },

  popup_modal:function(componentTitle,componentLocation,popupModalId,popupModalLabel,modalContentDIV,contentTitle,businessType) {
    popupModalId = popupModalId || "popupModalPro";
    popupModalLabel = popupModalLabel || "popupModalLabelPro";
    modalContentDIV = modalContentDIV || "modalContentDIVPro";
    $('#'+popupModalId).modal({
      backdrop: 'static',
      keyboard: false
    });
    $('#'+popupModalLabel).html(componentTitle);
    $('#'+modalContentDIV).load($.getRootPath() + componentLocation);
    contentTitle = contentTitle || "Content Title";
    ModalUtil.businessPOJO.contentTitle=contentTitle;
    if(businessType){
      ModalUtil.businessPOJO.businessType=businessType;
    }

  }
};

var UtilPOJO = UtilPOJO || {};
UtilPOJO = {

  arrEmpty:function(file) {
      if (file == null || file.length == 0) {
          return true;
      }
      return false;
  },
  cutString:function(str, length) {
      if (str == null || str.length == null) {
          return "";
      }
      if (str.length > length) {
          str = str.substr(0, length) + "...";
      }
      return str;
  },
  //Util function for remove the empty chart from array
  //Example: [1,2,'',3,4,'5','',7,8].filter(UtilPOJO.removeEmptyChars)
  removeEmptyChars: function(element, index, array) {
    return (element !== "");
  },

  replaceNullToEmpty:function(arr){
    var result = [];
    $.each(arr,function(index,value){
      if(!value || value =="null"){
        value="";
      }
      result.push(value);
    });
    return result;
    // var result = JSON.stringify(data).replace(/null/gi, "");
    // return result;
  },

  //Util function for transfer undefined object as empty string for fetch value
  //Example: var a; UtilPOJO.getValue(a);
  getValue: function(input) {
    if (typeof(input) === 'undefined') {
      return '';
    } else {
      return input;
    }
  },
  encode: function(obj) {
    // return obj.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
    return escape(obj);
  },
  decode: function(obj) {
    // return unescape(obj.replace(/&#x/g, '%u').replace(/;/g, ''));
    return unescape(obj);
  },

  //Util for format time
  //Example:
  // 1: UtilPOJO.formatTime(1458185053699) result: "2016-03-17 11:24:13 699"
  // 2: UtilPOJO.formatTime(1458185053699,'yyyy-MM-dd') result: "2016-03-17"
  formatTime: function(input, format) {
    
    var date = new Date();
    date.setTime(input);
    format = format ? format : "yyyy-MM-dd hh:mm:ss S";
    return date.Format(format);
  }
}

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}






var UserPOJO = UserPOJO || {};
UserPOJO = {
    user: undefined,
    getCurrentUser: function (successListener) {

        $.ajax({
            url: $.getRootPath() + '/api/account/current_user',
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                if (json.name === "EXCEPTION") {
//                    console.log(json.description);
                    $.publish("GET_USER_DETAIL_FAILED");
                    return;
                } else {
                    //JSON result should be like this:
                    // {"groups":["ROLE_SCRIPTER_PIG","ROLE_SCRIPTER_RDMS","ROLE_SCRIPTER_CLUSTER","ROLE_SCRIPTER_HDFS","ROLE_SCRIPTER_FILE","ROLE_SCRIPTER_CONFIG","ROLE_SCRIPTER_HIVE"],"lastTime":0,"logined":true,"userName":"ops"}
                    UserPOJO.user = json;
//                    console.log("Get response from server side for function[get user detail]:")
//                    console.log(UserPOJO.user);
                    if (typeof (successListener) != 'undefind' && successListener != null) {
                        $.publish(successListener, json);
                    } else {
                        $.publish("GET_USER_DETAIL_SUCCESS");
                    }
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on page check status!');
                location.href = $.getRootPath() + "/login.html";
            },
            complete: function (xhr, status) {
            }
        });
    },
}









function DataModel(data, isChecked, isDisplay) {
    var self = this;
    self.data = data;
    self.isChecked = ko.observable(isChecked);
    self.isDisplay = ko.observable(isDisplay);
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
    self.pagingSizeArray = ko.observableArray([10, 20, 50, 100]);

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
            tmp.push(new DataModel(val, false, false));
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
                        if(jsonData[value].toString().indexOf(keyword) >= 0){
                            tmp.push(new DataModel(jsonData, false, false));
                            return false;
                        }
                    })
                }else{
                    $.each(jsonData, function (key, value) {
                        if (value.toString().indexOf(keyword) >= 0) {
                            tmp.push(new DataModel(jsonData, false, false));
                            return false;
                        }
                    })
                }
            } else {
                tmp.push(new DataModel(jsonData, false, false));
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
}

var ValidationPOJO = ValidationPOJO || {};
ValidationPOJO = {
    validateNotNull: function (input) {
        if (ValidationPOJO.validateMustNumber(input)) {
            return true;
        } else {
            var result = false;
            if (input && input.length > 0) {
                result = true;
            } else {
                result = false;
            }
            return result;
        }
    },
    validateNotMax: function (input) {
        var result = false;
        if (input && input.length <= 255) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    validateNoMoreThan5000: function (input) {
        var result = false;
        if (input && input.length < 5000) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    validateMustNumber: function (input) {
        try {
            input = parseFloat(input);
            if (typeof input == 'number') {
                return true;
            } else {
                return false;
            }
        } catch (ex) {
            return false;
        }
    },
    validateNOTNegative: function (input) {
        if (ValidationPOJO.validateMustNumber(input) && input >= 0) {
            return true;
        } else {
            return false;
        }
    },
    validateSpecialChars: function (input) {
        // console.log("The validate input special chars operation has been invoked!");
        var regEx = new RegExp(/^(([^\^\.<>%&',;=?$"':#@!~\]\[{}\\/`\|])*)$/);
        var result = input.match(regEx);
        if (result == null) {
            // console.log("The validate input operation result: false---"+input);
            return false;
        } else {
            // console.log("The validate input operation result: true---"+input);
            return true;
        }
    },
    validateInputLength: function (input) {
//        console.log("The validate input length operation has been invoked!");
        var result = false;
        if (input && input.length >= 6 && input.length <= 20) {
            result = true;
        } else {
            result = false;
        }
//        console.log("The validate input length operation result:[" + input + "] is " + result);
        return result;
    },
    validateEmailPattern: function (input) {
        // console.log("The validate input email pattern operation has been invoked!");
        var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
        var regEx = new RegExp(reMail);
        var result = false;
        if (regEx.test(input)) {
            result = true;
        }
        // console.log("The validate input email pattern operation result:["+input+"] is "+result);
        return result;
    },
    validatePhonePattern: function (input) {
        var tel = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(13\d{9}$)|(15[0135-9]\d{8}$)|(18[267]\d{8}$)/;
        var regEx = new RegExp(tel);
        var result = false;
        if (regEx.test(input)) {
            result = true;
        }
        return result;
    },
    KEY_NOT_NULL: 'KEY_NOT_NULL',
    KEY_ARRAY_NOT_NULL: 'KEY_ARRAY_NOT_NULL',
    KEY_NOT_MAX: 'KEY_NOT_MAX',
    KEY_TOO_LONG: 'KEY_TOO_LONG',
    KEY_SPECIAL: 'KEY_SPECIAL',
    KEY_EMAIL: 'KEY_EMAIL',
    KEY_LENGTH_SCOPE: 'KEY_LENGTH_SCOPE',
    KEY_NOT_NEGATIVE: 'KEY_NOT_NEGATIVE',
    KEY_MUST_NUMBER: 'KEY_MUST_NUMBER',
    KEY_MUST_PHONE_NUMBER: 'KEY_MUST_PHONE_NUMBER',
    validate: function (inputName, inputValue, errorMessageRef, validateFunctions) {
        if (!inputValue) {
            errorMessageRef.push(inputName + " 不能为空");
            return;
        }
        ;
        if (inputName && inputValue && errorMessageRef && validateFunctions) {
            for (i = 0; i < validateFunctions.length; i++) {
                var key = validateFunctions[i];
                if (ValidationPOJO.KEY_NOT_NULL == key) {
                    if (!ValidationPOJO.validateNotNull(inputValue)) {
                        errorMessageRef.push(inputName + " 不能为空");
                    }
                }
                ;
                if (ValidationPOJO.KEY_ARRAY_NOT_NULL == key) {
                    if (!ValidationPOJO.validateNotNull(inputValue)) {
                        errorMessageRef.push(inputName + " 不能为空数组");
                    }
                }
                ;
                if (ValidationPOJO.KEY_TOO_LONG == key) {
                    if (!ValidationPOJO.validateNoMoreThan5000(inputValue)) {
                        errorMessageRef.push(inputName + " 超过输入最大限制[5000字符]");
                    }
                }
                ;
                if (ValidationPOJO.KEY_NOT_MAX == key) {
                    if (!ValidationPOJO.validateNotMax(inputValue)) {
                        errorMessageRef.push(inputName + " 超过输入最大限制");
                    }
                }
                ;
                if (ValidationPOJO.KEY_SPECIAL == key) {
                    if (!ValidationPOJO.validateSpecialChars(inputValue)) {
                        errorMessageRef.push(inputName + " 含有特殊字符");
                    }
                }
                ;
                if (ValidationPOJO.KEY_EMAIL == key) {
                    if (!ValidationPOJO.validateEmailPattern(inputValue)) {
                        errorMessageRef.push(inputName + " 不符合正确的邮箱格式");
                    }
                }
                ;
                if (ValidationPOJO.KEY_LENGTH_SCOPE == key) {
                    if (!ValidationPOJO.validateInputLength(inputValue)) {
                        errorMessageRef.push(inputName + " 长度不满足格式要求");
                    }
                }
                ;
                if (ValidationPOJO.KEY_NOT_NEGATIVE == key) {
                    if (!ValidationPOJO.validateNOTNegative(inputValue)) {
                        errorMessageRef.push(inputName + " 必须为非负数");
                    }
                }
                ;
                if (ValidationPOJO.KEY_MUST_NUMBER == key) {
                    if (!ValidationPOJO.validateMustNumber(inputValue)) {
                        errorMessageRef.push(inputName + " 必须是数字");
                    }
                }
                ;
                if (ValidationPOJO.KEY_MUST_PHONE_NUMBER == key) {
                    if (!ValidationPOJO.validatePhonePattern(inputValue)) {
                        errorMessageRef.push(inputName + " 必须是合法的电话号码");
                    }
                }
                ;
            }
        } else {
            return;
        }
    }
}



var LoaderUtil = LoaderUtil || {};
LoaderUtil = {
    loaderComponent: '<div class="loader-container text-center color-white"><div><i class="fa fa-spinner fa-pulse fa-3x"></i></div><div>Loading</div></div>',
    addMask: function (div_id) {
        if (!$('#' + div_id).hasClass('loader')) {
            $('#' + div_id).addClass('loader');
        }
    },
    removeMask: function (div_id) {
        if ($('#' + div_id).hasClass('loader')) {
            $('#' + div_id).removeClass('loader');
        }
    },
    addLoader: function (div_id) {
        if (!$('#' + div_id).find('.loader-container').length) {
            var $loader = $(LoaderUtil.loaderComponent);
            $loader.appendTo('#' + div_id);
        }
        LoaderUtil.addMask(div_id);
    },
    removeLoader: function (div_id) {
        var $loaderComponents = $('#' + div_id).find('.loader-container');
        $loaderComponents.remove();
    },
    add: function (div_id) {
        LoaderUtil.addLoader(div_id);
    },
    remove: function (div_id) {
        LoaderUtil.removeMask(div_id);
    }

}
