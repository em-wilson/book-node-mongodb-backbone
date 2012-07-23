define(['SocialNetView', 'text!templates/login.html'], function(SocialNetView, loginTemplate) {
  var loginView = SocialNetView.extend({
    requireLogin: false,

	el: $('#content'),

    events: {
      "submit form": "login"
    },

    login: function() {
      $.post('/login', {
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val()
      }, function(data) {
        window.location.hash = 'index';
      }).error(function(){
        $("#error").text('Unable to login.');
        $("#error").slideDown();
      });
      return false;
    },

    render: function() {
      this.$el.html(loginTemplate);
      $("#error").hide();
      $("input[name=email]").focus();
    }
  });

  return loginView;
});
