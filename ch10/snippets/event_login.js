var handleContactEvent = function(eventMessage) {
  socket.emit(eventName, eventMessage);
}

models.Account.findById(accountId, function subscribeToFriendFeeds(account) {
  sAccount = account;
  account.contacts.forEach(function(contact) {
    var eventName = 'event:' + contact.accountId;
    app.addEventListener(eventName, handleContactEvent);
    console.log('Subscribing to ' + eventName);
  });
});