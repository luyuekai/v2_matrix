var Matrix_UI ={
  isDashboardMode:false,
  isDarkTheme:false,
  add_loader: function(div_id) {
    if (!$('#' + div_id).hasClass('matrix-loading-v3')) {
      $('#' + div_id).addClass('matrix-loading-v3');
    }
  },
  remove_loader: function(div_id) {
    if ($('#' + div_id).hasClass('matrix-loading-v3')) {
      $('#' + div_id).removeClass('matrix-loading-v3');
    }
  },
  add_blocker: function(div_id,blocker_info) {
    if(div_id){
      $('#'+div_id).block({message: blocker_info||null});
    }
  },
  remove_blocker: function(div_id) {
    if(div_id){
      $('#'+div_id).unblock();
    }
  },

  message_success:function(content,title,subtitle){
    if(current_vm && current_vm.response_vm()){
      current_vm.response_vm().correctResponse(content,title,subtitle);
    }
  },
  message_info:function(content,title,subtitle){
    if(current_vm && current_vm.response_vm()){
      current_vm.response_vm().infoResponse(content,title,subtitle);
    }
  },
  message_warning:function(content,title,subtitle){
    if(current_vm && current_vm.response_vm()){
      current_vm.response_vm().warningResponse(content,title,subtitle);
    }
  },
  message_error:function(content,title,subtitle){
    if(current_vm && current_vm.response_vm()){
      current_vm.response_vm().errorResponse(content,title,subtitle);
    }
  }

};

function init_ui(isDashboardMode,isDarkTheme){
  Matrix_UI.isDarkTheme = isDarkTheme;
  if(isDashboardMode){
    dashboardMode();
  }else{
    normalMode();
  }
}
function switchMode(){
  if(Matrix_UI.isDashboardMode){
    normalMode();
  }else{
    dashboardMode();
  }
}

function dashboardMode() {
  if(Matrix_UI.isDashboardMode){
    return;
  }
  Matrix_UI.isDashboardMode = true;
  if(Matrix_UI.isDarkTheme){
    $('#main_content_div').css('background-color','#242324');
  }
  $('.grid-stack-item-header').css('display','none');
  $('#main_content_div').css('padding-left','0px');
  $('#sidebar').css('display', 'none');
  $('#navbar').css('display', 'none');
  $('#hidden_div').css('display', 'none');
  $('#menubar_div').css('display', 'none');
  $('.seperate_div_class').css('display', 'none');
  $('#footer_div').css('display', 'none');
  $('#help-actions').css('display', 'none');
}

function normalMode() {
  if(!Matrix_UI.isDashboardMode){
    return;
  }
  Matrix_UI.isDashboardMode = false;
  $('#main_content_div').css('background-color','#rgba(0, 0, 0, 0)');
  $('#main_content_div').css('padding-left','180px');
  $('#sidebar').css('display', '');
  $('#navbar').css('display', '');
  $('#hidden_div').css('display', '');
  $('#menubar_div').css('display', '');
  $('.seperate_div_class').css('display', '');
  $('#footer_div').css('display', '');
  $('#help-actions').css('display', '');
}

function init_matrix_tree_env(data_source_listener,click_event_listner){
  $('#matrix_tree').tree({
      dataSource: data_source_listener,
      multiSelect: false,
      folderSelect: true
  });
  $(function () {
      $('#matrix_tree').on('selected.fu.tree', click_event_listner);
  });
}
