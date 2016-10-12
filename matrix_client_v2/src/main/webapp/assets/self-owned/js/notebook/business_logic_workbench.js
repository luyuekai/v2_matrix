var addWidget_clientTable_businessLogic = function(header, data) {
  if (header && data) {
    //call generic workbench util
    addWidget_clientTable(header,data);
    //show workbench
    show_div('workbenchDIV');
  }
}

var addWidget_markdown_businessLogic = function(data){
  console.log(data);

  add_content_div(data,0,0,6,6);
  //show workbench
  show_div('workbenchDIV');
}


var addWidget_chart_businessLogic = function(option){

  //show workbench
  show_div('workbenchDIV');
  
  addWidget_chart(option);

}
