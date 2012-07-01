app.post('/register', function(req, res) {
  var firstName = req.param('firstName', '');
  var lastName = req.param('lastName', '');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if ( null == email || null == password ) {
    res.send(400);
    return;
  }

  Account.register(email, password, firstName, lastName);
  res.send(200);
});

