/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var vm = Matrix_VM.page_vm;
function env_setup() {
    vm_env_setup();
    init_matrix_table_env();
    table_css();
}


// Setup the business model with view model
function vm_env_setup() {
//Clean Data Bind Node for dynamic table

//                // Apply data bind in view model and the whole dom

// Refrence the entire page view model to current view model as cache
    current_vm = vm;
    var businessPOJO = new GenericBusinessPOJO();
    businessPOJO.tableModel = ko.observable();
    businessPOJO.tableModel_css_with_pager = ko.observable();
    vm.businessPOJO(businessPOJO);
}
;
//使用数组建表
function mock_data_Array() {
    ko.cleanNode(document.getElementById('table_1'));
    ko.applyBindings(vm, document.getElementById('table_1'));
    $('#table_1').css('display', '');
    var column_names = ["key", "value"];
    var colunm_data = [["张国立", "56"], ["王刚", "55"], ["张铁林", "58"], ["张国立", "56"], ["王刚", "55"], ["张铁林", "58"], ["张国立", "56"], ["王刚", "55"], ["张铁林", "58"]];
    var tm = new MatrixTableVM();
    tm.build(column_names, colunm_data);
    vm.businessPOJO().tableModel(tm);
}

//使用JSON建表
function mock_data_json(json) {
    ko.cleanNode(document.getElementById('table_2'));
    ko.applyBindings(vm, document.getElementById('table_2'));
    $('#table_2').css('display', '');
    var tm = new MatrixTableVM();
    tm.buildJSON(json);
    vm.businessPOJO().tableModel(tm);
}

//通过ko注册建静态表
function mock_data_static_table(json) {
    $('#table_3').css('display', '');
    var result = Matrix_Util.json2table(json);
    var ds = {
        'type': 'static',
        'header': result.header,
        'result': result.result
    };
    var vm_table = new MatrixTableTemplate();
    setTimeout(function () {
        create_table_template('copy_table_parent_div', vm_table, ds);
    }, 600);
}

//通过ko注册建动态表
function mock_data_dynamic_table() {
    $('#table_4').css('display', '');
    var header_json =
            [{
                    "data": "id",
                    "index": 0,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "booleanalpha",
                    "index": 1,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "booleanbeta",
                    "index": 2,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "booleandelta",
                    "index": 3,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "booleangamma",
                    "index": 4,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "category",
                    "index": 5,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "createtime",
                    "index": 6,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "creator",
                    "index": 7,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "deleted",
                    "index": 8,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "description",
                    "index": 9,
                    "isChecked": true,
                    "isDisplay": true
                }, {
                    "data": "enabled",
                    "index": 10,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "lastmodifier",
                    "index": 11,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "lastupdatetime",
                    "index": 12,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "modifycount",
                    "index": 13,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "name",
                    "index": 14,
                    "isChecked": true,
                    "isDisplay": true
                }, {
                    "data": "numberalpha",
                    "index": 15,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberbeta",
                    "index": 16,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberdelta",
                    "index": 17,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberepsilon",
                    "index": 18,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numbereta",
                    "index": 19,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numbergamma",
                    "index": 20,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberkappa",
                    "index": 21,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberlambda",
                    "index": 22,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberlota",
                    "index": 23,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberomega",
                    "index": 24,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numbertheta",
                    "index": 25,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "numberzeta",
                    "index": 26,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "parentid",
                    "index": 27,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "priority",
                    "index": 28,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "status",
                    "index": 29,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringalpha",
                    "index": 30,
                    "isChecked": true,
                    "isDisplay": true
                }, {
                    "data": "stringbeta",
                    "index": 31,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringdelta",
                    "index": 32,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringepsilon",
                    "index": 33,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringeta",
                    "index": 34,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringgamma",
                    "index": 35,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringkappa",
                    "index": 36,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringlambda",
                    "index": 37,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringlota",
                    "index": 38,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringomega",
                    "index": 39,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringtheta",
                    "index": 40,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "stringzeta",
                    "index": 41,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "type",
                    "index": 42,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "valid",
                    "index": 43,
                    "isChecked": false,
                    "isDisplay": true
                }, {
                    "data": "children",
                    "index": 44,
                    "isChecked": false,
                    "isDisplay": true
                }];

    var queryJson = {
        "className": "Genericentity",
        "orderMap": {
            "id": false
        },
        "pageMaxSize": 100000,
        "currentPageNumber": 1,
        "likeORMap": {},
        "eqMap": {
            "deleted": false
        },
        "inMap": {}
    };
    var request_param = {
        "queryJson":$.toJSON(queryJson)
    };
    var ds = {
        "type": "dynamic",
        "url": Matrix_Util.get_server_path() + "/service_generic_query/api/query",
        "header_json": header_json,//"[{\"data\":\"id\",\"index\":0,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanalpha\",\"index\":1,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleanbeta\",\"index\":2,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleandelta\",\"index\":3,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"booleangamma\",\"index\":4,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"category\",\"index\":5,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"createtime\",\"index\":6,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"creator\",\"index\":7,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"deleted\",\"index\":8,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"description\",\"index\":9,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"enabled\",\"index\":10,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastmodifier\",\"index\":11,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"lastupdatetime\",\"index\":12,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"modifycount\",\"index\":13,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"name\",\"index\":14,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"numberalpha\",\"index\":15,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberbeta\",\"index\":16,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberdelta\",\"index\":17,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberepsilon\",\"index\":18,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbereta\",\"index\":19,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbergamma\",\"index\":20,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberkappa\",\"index\":21,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlambda\",\"index\":22,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberlota\",\"index\":23,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberomega\",\"index\":24,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numbertheta\",\"index\":25,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"numberzeta\",\"index\":26,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"parentid\",\"index\":27,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"priority\",\"index\":28,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"status\",\"index\":29,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringalpha\",\"index\":30,\"isChecked\":true,\"isDisplay\":true},{\"data\":\"stringbeta\",\"index\":31,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringdelta\",\"index\":32,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringepsilon\",\"index\":33,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringeta\",\"index\":34,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringgamma\",\"index\":35,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringkappa\",\"index\":36,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlambda\",\"index\":37,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringlota\",\"index\":38,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringomega\",\"index\":39,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringtheta\",\"index\":40,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"stringzeta\",\"index\":41,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"type\",\"index\":42,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"valid\",\"index\":43,\"isChecked\":false,\"isDisplay\":true},{\"data\":\"children\",\"index\":44,\"isChecked\":false,\"isDisplay\":true}]",
        "json_rule": "result",
        "rest_mode": "POST",
        "request_params": request_param//"{ \"queryJson\": \"{\\\"className\\\":\\\"Genericentity\\\",\\\"orderMap\\\":{\\\"id\\\":false},\\\"pageMaxSize\\\":100000,\\\"currentPageNumber\\\":1,\\\"likeORMap\\\":{},\\\"eqMap\\\":{\\\"deleted\\\":false},\\\"inMap\\\":{}}\" }"
    };
    var vm_table = new MatrixTableTemplate();
    setTimeout(function () {
        create_table_template('copy_table_parent_div_dynamic', vm_table, ds);
    }, 600);
}

//table样式
function table_css() {
//带翻页控件
    ko.cleanNode(document.getElementById('table_css_with_pager'));
    ko.applyBindings(vm.businessPOJO(), document.getElementById('table_css_with_pager'));
    var column_names = ["key", "value"];
    var colunm_data = [["张国立", "56"], ["王刚", "55"], ["张铁林", "58"], ["张国立", "56"], ["王刚", "55"], ["张铁林", "58"], ["张国立", "56"], ["王刚", "55"], ["张铁林", "58"]];
    var tm = new MatrixTableVM();
    tm.build(column_names, colunm_data);
    tm.isDisplayPager(true);
    vm.businessPOJO().tableModel_css_with_pager(tm);
}
