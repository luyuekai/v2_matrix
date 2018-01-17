/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var vm = new GenericPageViewModel();

function env_setup() {
    vm_env_setup();
    init_matrix_table_env();
}


// Setup the business model with view model
function vm_env_setup() {
    //Clean Data Bind Node for dynamic table

//                // Apply data bind in view model and the whole dom

    // Refrence the entire page view model to current view model as cache
    current_vm = vm;
    var businessPOJO = new GenericBusinessPOJO();
    businessPOJO.tableModel = ko.observable();
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
    $('#table_3').css('display','');
    var result = Matrix_Util.json2table(json);
    var ds = {
        'type': 'static',
        'header': result.header,
        'result': result.result
    };
    var vm_table = new MatrixTableTemplate();
    setTimeout(function () {
        create_static_table_template('copy_table_parent_div', vm_table, ds);
    }, 600);
}