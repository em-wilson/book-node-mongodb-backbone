socket.on('chatclient', function(data) {
  sio.sockets.in(data.to).emit('chatserver', {
    from: accountId,
    text: data.text
  });
});