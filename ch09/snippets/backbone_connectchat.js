define(['Sockets'], function(sio) {
  var socket = null;

  var initialize = function(eventDispatcher) {
    eventDispatcher.bind('app:loggedin', connectSocket);
  };

  var connectSocket = function() {
    socket = io.connect().socket;

    socket
      .on('connect_failed', function(reason) {
        console.error('unable to connect', reason);
      })
      .on('connect', function() {
        console.info('successfully established a connection');
      });
  };

  return {
    initialize: initialize
  };
});
