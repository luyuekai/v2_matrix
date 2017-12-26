var Matrix_UI ={
  isDashboardMode:false,
  isDarkTheme:false
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
//    $('#main_content_div').css('background','url(pic/bj2.jpeg)');
//    $('#main_content_div').css('background-size','cover');
//    $('#main_content_div').css('width','100%');
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
