socket.on('disconnect', function() {
  app.triggerEvent('event:' + accountId, {
    from: accountId,
    action: 'logout'
  });
});