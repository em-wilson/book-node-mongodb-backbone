app.post('/forgotpassword', function(req, res) {
  var email = req.param('email', null);
  if ( null == email || email.length < 1 ) {
    res.send(400);
    return;
  }

  Account.forgotPassword(email, req, res);
});
