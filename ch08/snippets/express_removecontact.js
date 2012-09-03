app.delete('/accounts/:id/contact', function(req,res) {
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
    if ( !account ) return;
    models.Account.findById(contactId, function(contact,err) {
      if ( !contact ) return;

      models.Account.removeContact(account, contactId);
      // Kill the reverse link
      models.Account.removeContact(contact, accountId);
    });
  });

  // Note: Not in callback - this endpoint returns immediately and
  // processes in the background
  res.send(200);
});