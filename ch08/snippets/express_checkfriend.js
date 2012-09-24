app.get('/accounts/:id', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;
  models.Account.findById(accountId, function(account) {
    if ( accountId == 'me' || models.Account.hasContact(account, req.session.accountId) ) {
      account.isFriend = true;
    }
    res.send(account);
  });
});