define(['SocialNetView', 'views/contact', 'text!templates/contacts.html'],
function(SocialNetView, ContactView, contactsTemplate) {
  var contactsView = SocialNetView.extend({
    el: $('#content'),

    initialize: function() {
      this.collection.on('reset', this.renderCollection, this);
    },

    render: function() {
      this.$el.html(contactsTemplate);
    },

    renderCollection: function(collection) {
      collection.each(function(contact) {
        var statusHtml = (new ContactView({ removeButton: true, model: contact })).render().el;
        console.log(statusHtml);
        $(statusHtml).appendTo('.contacts_list');
      });
    }
  });

  return contactsView;
});
