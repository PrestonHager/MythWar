function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  new_profile = {"id": profile.getId(), "name": profile.getName(), "image": profile.getImageUrl(), "email": profile.getEmail()};
  window.localStorage.setItem("profile", JSON.stringify(new_profile));
  // now redirect the user with a post so the server knows the user id.
  var form = $('<form action="/dashboard" method="post"><input type="text" name="id" value="'+googleUser.getAuthResponse().id_token+'"></form>');
  $(document.body).append(form);
  form.submit();
};
function onFailure(error) {
  console.log(error);
};
$(document).ready(function(){
  if (!window.localStorage.getItem("profile")) {
    window.localStorage.setItem("profile", "{}");
    $("div.player-login-parent").show();
  } else if (window.localStorage.getItem("profile") == "{}") {
    $("div.player-login-parent").show();
  }
});
