define(function(require) {
  var Status = Backbone.Model.extend({
    urlRoot: '/accounts/' + this.accountId + '/status'
  });

  return Status;
});
