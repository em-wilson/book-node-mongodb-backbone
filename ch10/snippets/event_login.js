var handleContactEvent = function(eventMessage) {
  socket.emit(eventName, eventMessage);
}

var subscribeToAccount = function(accountId) {
  var eventName = 'event:' + accountId;
  app.addEventListener(eventName, handleContactEvent);
  console.log('Subscribing to ' + eventName);
};

models.Account.findById(accountId, function subscribeToFriendFeeds(account) {
  var subscribedAccounts = {};
  sAccount = account;
  account.contacts.forEach(function(contact) {
    if ( !subscribedAccounts[contact.accountId]) {
      subscribeToAccount(contact.accountId);
      subscribedAccounts[contact.accountId] = true;
    }
  });

  if (!subscribedAccounts[accountId]) {
    // Subscribe to my own updates
    subscribeToAccount(accountId);
  }
});
