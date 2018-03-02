var vm = Matrix_VM.page_vm;

function env_setup() {
  vm_env_setup();
  init_matrix_table_env();
  init_matrix_tree_env(tree_data_source_listener,tree_click_event_listner);
}

// Setup the business model with view model
function vm_env_setup() {
  //Clean Data Bind Node for dynamic table
  ko.cleanNode($('#template-matrix-main-div')[0]);
  // Apply data bind in view model and the whole dom
  ko.applyBindings(vm, document.getElementById('template-matrix-main-div'));
  // Refrence the entire page view model to current view model as cache
  current_vm = vm;

  function BusinessPOJO() {
    var self = this;
  }
  var businessPOJO = new BusinessPOJO();
  vm.businessPOJO(businessPOJO);
}


/**
 * 获取Tree组件数据源监听函数
 * @param  {[type]}   openedParentData 出发事件的数据：文件夹或文件对象
 * @param  {Function} callback         回调函数
 * @return {[type]}                    无返回值
 */
function tree_data_source_listener(openedParentData, callback) {

  var childObjectsArray = retrieve_data_mock(openedParentData);
  callback({
    data: childObjectsArray
  });
}

function tree_click_event_listner(){
  var tree_element = $('#matrix_tree').tree('selectedItems')[0];
  console.log("Current tree element is:");
  console.log(tree_element);
}

function retrieve_data_mock(openedParentData) {
  var parent_path = openedParentData.path || "";
  var result = [];
  if (ds) {
    result = Matrix_Util.deepClone(ds);
    if (parent_path) {
      $.each(result, function(index, value) {
        value.path = parent_path + "/" + value.path;
      });
    }
  }
  return result;
}

var ds = [{
  "name": "data",
  "type": "folder",
  "path": "data",
  "attr": {
    "id": "data"
  }
}, {
  "name": "system",
  "type": "folder",
  "path": "system",
  "attr": {
    "id": "system"
  }
}, {
  "name": "install.pdf",
  "type": "item",
  "path": "install.pdf",
  "attr": {
    "data-icon": "glyphicon glyphicon-cloud",
    "id": "install.pdf",
    "style": "color: rebeccapurple;"
  }
}, {
  "name": "readme.txt",
  "type": "item",
  "path": "readme.txt",
  "attr": {
    "data-icon": "glyphicon glyphicon-file",
    "id": "readme.txt"
  }
}];
