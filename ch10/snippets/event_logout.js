socket.on('disconnect', function() {
  sAccount.contacts.forEach(function(contact) {
    var eventName = 'event:' + contact.accountId;
    app.removeEventListener(eventName, handleContactEvent);
    console.log('Unsubscribing from ' + eventName);
  });
});