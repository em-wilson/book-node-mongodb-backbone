define(['SocialNetView', 'text!templates/profile.html',
        'text!templates/status.html', 'models/Status',
        'views/Status'],
function(SocialNetView,  profileTemplate,
         statusTemplate, Status, StatusView)
{
  var profileView = SocialNetView.extend({
    el: $('#content'),

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    render: function() {
      this.$el.html(
        _.template(profileTemplate,this.model.toJSON())
      );

      var statusCollection = this.model.get('status');
      if ( null != statusCollection ) {
        _.each(statusCollection, function (statusJson) {
          var statusModel = new Status(statusJson);
          var statusHtml = (new StatusView({ model: statusModel })).render().el;
          $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
        });
      }
    }
  });

  return profileView;
});
