define(['text!templates/login.html'], function(loginTemplate) {
  var loginView = Backbone.View.extend({
    el: $('#content'),

    events: {
      "submit form": "login"
    },

    login: function() {
      $.post('/login', {
        email: $('input[name=email]').val(),
        password: $('input[name=password]').val()
      }, function(data) {
        console.log(data);
      }).error(function(){
        $("#error").text('Unable to login.');
        $("#error").slideDown();
      });
      return false;
    },

    render: function() {
      this.$el.html(loginTemplate);
      $("#error").hide();
    }
  });

  return loginView;
});
