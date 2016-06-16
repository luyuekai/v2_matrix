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
    add: function (queryPOJO, successListener) {
        var Request = ClonePOJO.shallowClone(ServerCUDPOJO.requestPOJO);
        $(Request).attr("data", {
            'queryJson': $.toJSON(queryPOJO)
        });
        Request.successListener = successListener;
        var successListener = Request.successListener;
        $.ajax({
            url: Request.url,
            data: Request.data,
            type: Request.method,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json',
            success: function (json) {
                // console.log(json);
                if (json.hasError) {
                    console.log("Request get error: " + json.errorMessage);
                    $.publish("CUD_ACTION_FAILED",json);
                } else {
                    $.publish(successListener, json);
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on CUD Action process!');
            },
            complete: function (xhr, status) {
            }
        });
    },
    update: function (queryPOJO, successListener) {
        var Request= {
            url: $.getServerRoot() + '/service_generic_query/api/cud/update',
            data: {
                'queryJson': $.toJSON(queryPOJO)
            },
            method: 'POST',
            successListener: "CUD_ACTION_SUCCESS"
        };
        Request.successListener = successListener;
        var successListener = Request.successListener;
        $.ajax({
            url: Request.url,
            data: Request.data,
            type: Request.method,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json',
            success: function (json) {
                // console.log(json);
                if (json.hasError) {
                    console.log("Request get error: " + json.errorMessage);
                    $.publish("CUD_ACTION_FAILED",json);
                } else {
                    $.publish(successListener, json);
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on CUD Action process!');
            },
            complete: function (xhr, status) {
            }
        });
    },
    remove: function (queryPOJO, successListener) {
        var Request= {
            url: $.getServerRoot() + '/service_generic_query/api/cud/remove',
            data: {
                'queryJson': $.toJSON(queryPOJO)
            },
            method: 'POST',
            successListener: "CUD_ACTION_SUCCESS"
        };
        Request.successListener = successListener;
        var successListener = Request.successListener;
        $.ajax({
            url: Request.url,
            data: Request.data,
            type: Request.method,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json',
            success: function (json) {
                // console.log(json);
                if (json.hasError) {
                    console.log("Request get error: " + json.errorMessage);
                    $.publish("CUD_ACTION_FAILED",json);
                } else {
                    $.publish(successListener, json);
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on CUD Action process!');
            },
            complete: function (xhr, status) {
            }
        });
    }
}
