app.get('/account/authenticated', function(req, res) {
  // Never authenticated for now
  res.send(401);
  //res.send(200);
});
