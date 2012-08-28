define(['SocialNetView', 'models/Contact', 'views/Contact', 'text!templates/addcontact.html'],
function(SocialNetView, Contact, ContactView, addcontactTemplate)
{
  var addcontactView = SocialNetView.extend({
    el: $('#content'),

    events: {
      "submit form": "search"
    },

    search: function() {
      var view = this;
      $.post('/contacts/find',
        this.$('form').serialize(), function(data) {
        view.render(data);
      }).error(function(){
        $("#results").text('No contacts found.');
        $("#results").slideDown();
      });
      return false;
    },

    render: function(resultList) {
      var view = this;
      this.$el.html(_.template(addcontactTemplate));
      if ( null != resultList ) {
        _.each(resultList, function (contactJson) {
          var contactModel = new Contact(contactJson);
          var contactHtml = (new ContactView({ addButton: true, model: contactModel })).render().el;
          $('#results').append(contactHtml);
        });
      }
    }
  });

  return addcontactView;
});
