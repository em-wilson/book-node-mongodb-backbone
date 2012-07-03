define(['SocialNetView', 'text!templates/index.html'], function(SocialNetView, indexTemplate) {
  var indexView = SocialNetView.extend({
    el: $('#content'),

    render: function() {
      this.$el.html(indexTemplate);
    }
  });

  return indexView;
});
