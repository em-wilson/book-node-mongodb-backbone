app.post('/login', function(req, res) {
  console.log('login request');
  var email = req.param('email', null);
  var password = req.param('password', null);

  if ( null == email || email.length < 1
      || null == password || password.length < 1 ) {
    res.send(400);
    return;
  }

  Account.login(email, password, function(success) {
          if ( !success ) {
            res.send(401);
            return;
          }
      console.log('login was successful');
          res.send(200);
  });
});
