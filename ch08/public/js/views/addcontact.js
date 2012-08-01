define(['SocialNetView', 'text!templates/addcontact.html'],
function(SocialNetView,  addcontactTemplate)
{
  var addcontactView = SocialNetView.extend({
    el: $('#content'),

    render: function() {
      this.$el.html(_.template(addcontactTemplate));
    }
  });

  return addcontactView;
});
