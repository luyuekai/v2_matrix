function switch_div_display(div_id){
  var current_state = $('#'+div_id).css('display');
  if('none'==current_state){
    $('#'+div_id).css('display','');
  }else{
    $('#'+div_id).css('display','none');
  }
}
