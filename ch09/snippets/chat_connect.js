sio.sockets.on('connection', function(socket) {
  var session = socket.handshake.session;
  var accountId = session.accountId;
  socket.join(accountId);
});