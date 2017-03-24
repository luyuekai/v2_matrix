function initialize_chart() {
  var x_Axis_data = [2013, 2014, 2015, 2016, 2017];
  var series_name = 'GDP';
  var series_data = [20, 30, 30, 50, 80];
  chart = ChartPOJO.generateGridChart('main', 'bar', 'Descartes coordinates Demo', false, x_Axis_data, series_name, series_data);
  chart = ChartPOJO.addSeries(chart, "KPI", "bar", [60, 90, 10, 80, 70]);
  chart = ChartPOJO.addSeries(chart, "AI", "bar", [10, 20, 30, 40, 50]);
  chart = ChartPOJO.addSeries(chart, "BI", "bar", [10, 20, 30, 40, 50]);
  chart = ChartPOJO.addStack(chart, "Science", "BI");
  chart = ChartPOJO.addStack(chart, "Science", "AI");
  chart = ChartPOJO.addStack(chart, "Economy", "GDP");
  chart = ChartPOJO.addStack(chart, "Economy", "KPI");

  if (chartViewModel) {
    chartViewModel.chart = chart;
  }
}



var SharePOJO = SharePOJO || {};
SharePOJO = {
  environmentCheck: function() {
    console.log("SHARE FUNCTION ENVIRONMENT CHECK...");

    console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[BEGIN]");
    var tokenFlag = $.hasUrlParam('token');
    if (tokenFlag) {
      console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[FINISHED & RESULT:SUCCESSED]");
    } else {
      SharePOJO.redirect('NORMAL');
      console.log("ENVIRONMENT CHECK [STEP 1: Has token flag]...[FINISHED & RESULT:FAILED]");
      return;
    }
    console.log("ENVIRONMENT CHECK [STEP 2: Get token ]...[BEGIN]");
    var token = $.urlParamValue('token');
    if (token) {
      console.log("ENVIRONMENT CHECK [STEP 2: Get token]...[FINISHED & RESULT:SUCCESSED]");
    } else {
      SharePOJO.redirect('INVALID');
      console.log("ENVIRONMENT CHECK [STEP 2: Get token]...[FINISHED & RESULT:FAILED]");
    }

    console.log("ENVIRONMENT CHECK [STEP 3: validate token from SERVER side ... please invoke the correct URL and handle the response]...[BEGIN]");
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/share/fetch/' + token, null, "MATRIX_SHARE_SUCCESS", "MATRIX_SHARE_FAILED", "MATRIX_SHARE_SERVICE_FAILED");
  },

  redirect: function(type) {
    if (type == 'INVALID') {
      console.log("REDIRECT TO INVALID PAGE");
      window.location.href = "404.html";
    } else if (type == 'EXPIRED') {
      console.log("REDIRECT TO EXPIRED PAGE");
      window.location.href = "404.html";
    } else if (type == 'NORMAL') {
      console.log("REDIRECT TO EDIT PAGE");

      initialize_chart();
    }
  }
}
$.subscribe("MATRIX_SHARE_SUCCESS", successListener);
$.subscribe("MATRIX_SHARE_FAILED", failedListener);
$.subscribe("MATRIX_SHARE_SERVICE_FAILED", failedServiceListener);

function successListener() {
  if (arguments && arguments[1]) {
    var json = arguments[1].result[0];
    var json_chart = json.json;
    var option = ChartPOJO.deserialize_chart_option(json_chart);
    var chart_type = option.series[0].type;
    switch (chart_type) {

      case 'scatter':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_scatter.html');
        break;
      case 'boxplot':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_boxplot.html');
        break;
      case 'pie':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_pie.html');
        break;
      case 'radar':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_radar.html');
        break;
      case 'treemap':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_treemap.html');
        break;
      case 'heatmap':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_grid_heatmap.html');
        break;
      case 'parallel':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_parallel.html');
        break;
      case 'themeRiver':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_river.html');
        break;
      case 'sankey':
        $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_sankey.html');
        break;
      case 'graph':
        var layout = option.series[0].layout;
        if (layout == 'none') {
          $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_graph.html');
        } else if (layout == 'circular') {
          $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_circular.html');
        } else if (layout == 'force') {
          $('#sub_content_div').load($.getRootPath() + '/assets/self-owned/html/chart/content_force.html');
        }

        break;
      default:
    }
    setTimeout(function() {
      chart = ChartPOJO.renderChart('main', option);
      if (chartViewModel) {
        chartViewModel.chart = chart;
        chartViewModel.data = json;
      }
    }, 500);


  }
}

function failedListener() {
  console.log("Server Failed!");
}

function failedServiceListener() {
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    if (errorMessage == "Token Invalid!") {
      console.log('request action invoked[request_invalid]');
      SharePOJO.redirect('INVALID');
    } else if (errorMessage == "Token Expire!") {
      console.log('request action invoked[request_expired]');
      SharePOJO.redirect('EXPIRED');
    }
  }
}
