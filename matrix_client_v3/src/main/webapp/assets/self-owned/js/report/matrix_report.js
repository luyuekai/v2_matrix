var ReportPOJO = ReportPOJO || {};
ReportPOJO = {

    cells_markdown_id:[],
    cells_edit_map:[], // save edit id & code mirror instance pair
    current_cell_id:null,

    new_report: function (div_id) {
      div_id = div_id || 'report_content_body_div'; // report_content_body_div as default div id
      $('#'+div_id).empty();
    },

    new_markdown_cell: function (destination_parent_div_id,div_id,clone_div_id) {
      destination_parent_div_id = destination_parent_div_id ||'report_content_body_div';
      div_id = div_id || 'copyDiv';
      var clone_div_id = clone_component(destination_parent_div_id,div_id,clone_div_id);

      if(clone_div_id){
        ReportPOJO.cells_markdown_id.push(clone_div_id);

        ReportPOJO.register_event_listener(clone_div_id);
      }
    },

    compile_markdown_cell: function(div_id){
      div_id = div_id || ReportPOJO.current_cell_id;
      if(div_id){
        cell_switch_edit2view(div_id);
      }
    },

    register_event_listener:function(cell_div_id){
      $("#"+cell_div_id).focusin(function() {
        // console.log(cell_div_id);
        ReportPOJO.current_cell_id = cell_div_id;
        ReportPOJO.inactive_cells();

        if (hasCodeMirror(cell_div_id)) {
          resetCssClass(cell_div_id, 'edit_mode_focus_in');
        } else {
          resetCssClass(cell_div_id, 'compile_mode_focus_in');
        }
      });
      $("#"+cell_div_id).focusout(function() {
        // $("#testDiv").css("background","white");
        if (hasCodeMirror(cell_div_id)) {
          resetCssClass(cell_div_id, 'edit_mode_focus_out');
        } else {
          resetCssClass(cell_div_id, 'compile_mode_focus_out');
        }
      });

      ReportPOJO.inactive_cells();
      resetCssClass(cell_div_id, 'compile_mode_focus_in');

      $("#"+cell_div_id).dblclick(function() {
        // alert( "Handler for .dblclick() called." );
        cell_switch_view2edit(cell_div_id);
      });

    },

    inactive_cells:function(){
      $.each(ReportPOJO.cells_markdown_id, function (index, value) {
          if (value) {
            $('#' + value).focusout();
          }
      });
    }
}


function hasCodeMirror(div_id) {
  var result = false;
  var regex = "#" + div_id + ":has(.CodeMirror)";

  var codeMirrorComponents = $(regex);
  if (codeMirrorComponents.length > 0) {
    result = true;
  }
  return result;
}

function cell_switch_view2edit(div_id) {

  //get view div inner html
  var view_div = $('#'+div_id).find('.cell_div_view')[0];
  if(view_div){
    var content = view_div.innerHTML;
    //set view div invisible
    $(view_div).css('display', 'none');
  }

  var edit_div = $('#'+div_id).find('.cell_div_edit')[0];
  var edit_div_id = $(edit_div).attr('id');
  if(!edit_div_id){
    edit_div_id = (new Date()).getTime() + "_edit_div";
    $(edit_div).attr('id',edit_div_id);
  }

  //render the code mirror style of edit div
  //like this: #testDiv:has(.CodeMirror)
  var regex = "#" + div_id + ":has(.CodeMirror)";

  var codeMirrorComponents = $(regex);
  if (codeMirrorComponents.length < 1) {
    var editor = CodeMirror.fromTextArea(document.getElementById(edit_div_id), {
      mode: 'markdown',
      lineNumbers: false,
      theme: "default",
      extraKeys: {
        "Enter": "newlineAndIndentContinueMarkdownList"
      }
    });


    var has_instance = false;
    $.each(ReportPOJO.cells_edit_map, function (index, value) {
        if (value) {
          var tmp_cell_id = value.cell_id;
          if(tmp_cell_id == div_id){
            value.instance = editor;
            has_instance = true;
          }
        }
    });

    if(!has_instance){
      var map_instance={
        'cell_id':div_id,
        'cell_edit_id':edit_div_id,
        'instance':editor
      };
      ReportPOJO.cells_edit_map.push(map_instance);
    }


  }

  //set div as edit focus style
  resetCssClass(div_id, 'edit_mode_focus_in');
}

function cell_switch_edit2view(div_id) {
  $.each(ReportPOJO.cells_edit_map, function (index, value) {
      if (value) {
        var tmp_cell_id = value.cell_id;
        if(tmp_cell_id == div_id){
          var edit_div_id = value.cell_edit_id;
          var code_mirror_edit = value.instance;
          var markdown_content = code_mirror_edit.getValue();
          var edit_div_element = document.getElementById(edit_div_id);
          edit_div_element.innerHTML = markdown_content;

          var view_div = $('#'+div_id).find('.cell_div_view')[0];
          if(view_div){
            view_div.innerHTML = markdown.toHTML(markdown_content);
            //set view div visible
            $(view_div).css('display', '');
          }
          //delete code mirror textarea
          $("#" + div_id).find(".CodeMirror").remove();
        }
      }
  });



}
