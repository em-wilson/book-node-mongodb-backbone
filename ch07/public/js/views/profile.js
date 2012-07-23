define(['SocialNetView', 'text!templates/profile.html', 'models/Account'], function(SocialNetView, profileTemplate, Account) {
  var profileView = SocialNetView.extend({
    el: $('#content'),

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      this.$el.html(_.template(profileTemplate,this.model.toJSON()));
    }
  });

  return profileView;
});
