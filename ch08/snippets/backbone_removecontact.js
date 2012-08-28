removeContact: function() {
  var $responseArea = this.$('.actionArea');
  $.ajax({
    url: '/accounts/me/contact',
    type: 'DELETE',
    data: {
      contactId: this.model.get('_id')
    }, function onSuccess() {
      $responseArea.text('Contact Removed');
    }, function onError() {
      $responseArea.text('Could not remove contact');
    }
  });
},