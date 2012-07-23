app.get('/accounts/:id', function(req, res) {
  var accountId = req.params.id == 'me'
                     ? req.session.accountId
                     : req.params.id;
  Account.findOne({_id:accountId}, function(account) {
    res.send(account);
  });
});
