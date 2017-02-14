$.getBasePath = function() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
  return (prePath + postPath);
}

jQuery(document).ready(function() {

  /*
      Fullscreen background
  */
  $.backstretch($.getBasePath()+"/assets/self-owned/img/backgrounds/1.jpg");

  /*
      Form validation
  */
  $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    $(this).removeClass('input-error');
  });

  $('.login-form').on('submit', function(e) {

    $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
      if ($(this).val() == "") {
        e.preventDefault();
        $(this).addClass('input-error');
      } else {
        $(this).removeClass('input-error');
      }
    });

  });


});
