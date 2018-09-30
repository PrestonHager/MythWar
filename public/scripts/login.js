function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id = googleUser.getAuthResponse().id_token;
  var new_profile = {"id": id, "client_id": profile.getId(), "name": profile.getName(), "image": profile.getImageUrl(), "email": profile.getEmail()};
  window.localStorage.setItem("profile", JSON.stringify(new_profile));
  // sign out the user so that it doesn't auto sign-in again.
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.disconnect();
  // now redirect the user with a post so the server knows the user id.
  var form = $('<form action="/dashboard" method="post" />').append($('<input style="display:none" type="text" name="profile" />').val(JSON.stringify(new_profile)));
  $(document.body).append(form);
  form.submit();
};
function onFailure(error) {
  console.log(error);
};
$(document).ready(function(){
  var profile = window.localStorage.getItem("profile");
  if (!profile) {
    window.localStorage.setItem("profile", "{}");
    $("div.player-login-parent").show();
  } else if (profile == "{}") {
    $("div.player-login-parent").show();
  } else {
    var form = $('<form action="/dashboard" method="post" />').append($('<input style="display:none" type="text" name="profile" />').val(JSON.stringify(profile)));
    $(document.body).append(form);
    form.submit();
  }
});
