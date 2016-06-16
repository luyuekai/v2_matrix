$.serverRequest = function(request_url,request_data,listener_response_success,listener_response_error,listener_service_error){
  listener_response_success = listener_response_success||"SERVER_RESPONSE_SUCCESS";
  listener_response_error = listener_response_error||"SERVER_RESPONSE_ERROR";
  listener_service_error = listener_service_error||"SERVER_SERVICE_ERROR";
  $.ajax({
      url: request_url,
      data: request_data,
      type: 'POST',
      contentType: "application/x-www-form-urlencoded;charset=UTF-8",
      dataType: 'json',
      success: function (json) {
          if (json.hasError) {
              console.log("SERVER_REQUEST_ACTION get error: " + json.errorMessage);
              $.publish(listener_response_error,json);
          } else {
              $.publish(listener_response_success, json);
          }
      },
      error: function (xhr, status) {
          console.log('Sorry, there was a problem on SERVER_REQUEST_ACTION process!');
          $.publish(listener_service_error);
      },
      complete: function (xhr, status) {
      }
  });
}



function switch_div_display(div_id){
  var current_state = $('#'+div_id).css('display');
  if('none'==current_state){
    $('#'+div_id).css('display','');
  }else{
    $('#'+div_id).css('display','none');
  }
}
