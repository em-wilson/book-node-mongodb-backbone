app.post('/accounts/:id/contact', function(req,res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;
  var contactId = req.param('contactId', null);

  // Missing contactId, don't bother going any further
  if ( null == contactId ) {
    res.send(400);
    return;
  }

  models.Account.findById(accountId, function(account) {
    if ( account ) {
      models.Account.findById(contactId, function(contact) {
        models.Account.addContact(account, contact);

        // Make the reverse link
        models.Account.addContact(contact, account);
        account.save();
      });
    }
  });

  // Note: Not in callback - this endpoint returns immediately and
  // processes in the background
  res.send(200);
});
