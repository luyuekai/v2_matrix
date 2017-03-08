
function ChartViewModel(parent) {
  var self = this;
  self.parent = parent;
  self.data = null;
  self.chart = null;
  self.option = new ChartOptionViewModel(self);

}

function ChartOptionViewModel(parent) {
  var self = this;
  self.parent = parent;
  self.title = new TitleViewModel(self);
}

// var title = {
//   show: true,
//   x: 'left',
//   padding: [0, 0, 0, 20],
//   textStyle: labelStyle,
//   text: chart_title || "Untitled",
// };
function TitleViewModel(parent) {
  var self = this;
  self.parent = parent;
  self.title_name = ko.observable("");
  self.title_display = ko.observable(true);
  self.title_link = ko.observable("");
  self.title_target = ko.observable("blank");
  self.title_align = ko.observable("left");
  self.title_baseline = ko.observable("top");

  self.sub_title_name = ko.observable("");
  self.sub_title_link = ko.observable("");
  self.sub_title_target = ko.observable("blank");

  self.title_gap = ko.observable(10);

  self.update = function(){
    if(parent && parent.parent && parent.parent.chart){
      var chart = parent.parent.chart;
      ChartPOJO.resetTitle(chart,self);
    }
  }
}
