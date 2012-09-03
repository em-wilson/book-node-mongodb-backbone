removeContact: function() {
  var $responseArea = this.$('.actionarea');
  $responseArea.text('Removing contact...');
  $.ajax({
    url: '/accounts/me/contact',
    type: 'DELETE',
    data: {
      contactId: this.model.get('accountId')
    }}).done(function onSuccess() {
      $responseArea.text('Contact Removed');
    }).fail(function onError() {
      $responseArea.text('Could not remove contact');
    });
}