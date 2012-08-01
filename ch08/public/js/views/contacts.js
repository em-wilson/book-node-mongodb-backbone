define(['SocialNetView', 'views/contact', 'text!templates/contacts.html'],
function(SocialNetView, ContactView, contactsTemplate) {
  var contactsView = SocialNetView.extend({
    el: $('#content'),

    initialize: function() {
      this.collection.on('reset', this.render, this);
    },

    render: function() {
      this.$el.html(contactsTemplate);
      this.collection.each(function(contact) {
        var statusHtml = (new ContactView({ model: contact })).render().el;
        $(statusHtml).prependTo('.contacts_list');
      });
    }
  });

  return contactsView;
});
