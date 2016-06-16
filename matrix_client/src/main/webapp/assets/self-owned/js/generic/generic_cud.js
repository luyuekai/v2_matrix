var ServerCUDPOJO = ServerCUDPOJO || {};
ServerCUDPOJO = {
    CUDPOJO: {
        "className": "v2.service.generic.query.entity.ZEntity",
        "attributes":{
          "name":"DEMO_TEST_NAME",
          "category":"DEMO_CATEGORY",
          "description":"DEMO_DESCRIPTION"
        }
    },
    requestPOJO: {
        url: $.getServerRoot() + '/service_generic_query/api/cud/add',
        data: {
            'queryJson': ''
        },
        method: 'POST',
        successListener: "CUD_ACTION_SUCCESS"
    },
    serverRequest:function(request_url,request_data,listener_response_success,listener_response_error,listener_service_error){
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
}
