$(document).ready(function(){
  var profile = window.localStorage.getItem("profile");
  if (!profile) {
    window.localStorage.setItem("profile", "{}");
    $("div.player-signup-parent").show();
  } else if (profile == "{}") {
    $("div.player-signup-parent").show();
  } else {
    var form = $('<form action="/dashboard" method="post" />').append($('<input style="display:none" type="text" name="profile" />').val(JSON.stringify(profile)));
    $(document.body).append(form);
    form.submit();
  }
});
