define(['models/Contact'], function(Contact) {
  var ContactCollection = Backbone.Collection.extend({
    model: Contact
  });

  return ContactCollection;
});