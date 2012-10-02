module.exports = function(app) {
  var io = require('socket.io');
  var utils = require('connect').utils;
  var Session = require('connect').middleware.session.Session;

  var sio = io.listen(app.server);

  sio.configure(function() {
    sio.set('authorization', function( data, accept) {
      var cookies = utils.parseCookie(data.headers.cookie);
      data.sessionID = cookies['express.sid'];
      data.sessionStore = app.sessionStore;
      store.get(data.sessionID, function(err, session) {
        if ( err || !session ) {
          return accept('Invalid session', false);
        } else {
          data.session = new Session(Data, session);
          accept(null, true);
        }
      });
    })
  });
}