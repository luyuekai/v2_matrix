ko.bindingHandlers.datasource = {
  init : function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    var config = ko.unwrap(valueAccessor());
    if(!config) {
      return;
    }
    if(typeof config === 'string') {
      config = {url:config};
    }
    var response = ko.observable('');
    var childBindingContext = bindingContext.createChildContext(bindingContext.$rawData, null, function(context) {
      if(!context.datasourceInited) {
        var ext = {response : response, params: {}};
        if(config.params) {
          $.each(config.params, function(k, v) {
            with(context){
              with(ext){
                ext.params[k] = ko.pureComputed(function() {
                  return eval(v);
                });
              }
            }
          });
        }
        ko.utils.extend(context, ext);
        context.datasourceInited = true;
      }
    });
    ko.applyBindingsToDescendants(childBindingContext, element);
    var doRetrieve = function() {
      $.getJSON(config.url, function(result){
        response(result);
      });
    };
    if(config.interval && config.interval > 0) {
      setInterval(doRetrieve, config.interval * 1000);
    }
    doRetrieve();
    return {controlsDescendantBindings: true};
  }
};
