define(['SocialNetView', 'text!templates/contact.html'], function(SocialNetView, contactTemplate) {
  var contactView = SocialNetView.extend({
    tagName: 'li',

    render: function() {
      $(this.el).html(_.template(contactTemplate,this.model.toJSON()));
      return this;
    }
  });

  return contactView;
});
