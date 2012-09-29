define(['models/Status'], function(Status) {
  var StatusCollection = Backbone.Collection.extend({
    model: Status
  });

  return StatusCollection;
});
