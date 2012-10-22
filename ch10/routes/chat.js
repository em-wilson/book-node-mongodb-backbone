module.exports = function(app, models) {
  var io = require('socket.io');
  var utils = require('connect').utils;
  var cookie = require('cookie');
  var Session = require('connect').middleware.session.Session;

  var sio = io.listen(app.server)

  sio.configure(function() {
    app.isAccountOnline = function(accountId) {
      var clients = sio.sockets.clients(accountId);
      return (clients.length > 0);
    };

    sio.set('authorization', function( data, accept) {
      var signedCookies = cookie.parse(data.headers.cookie);
      var cookies = utils.parseSignedCookies(signedCookies,app.sessionSecret);
      data.sessionID = cookies['express.sid'];
      data.sessionStore = app.sessionStore;
      data.sessionStore.get(data.sessionID, function(err, session) {
        if ( err || !session ) {
          return accept('Invalid session', false);
        } else {
          data.session = new Session(data, session);
          accept(null, true);
        }
      });
    });

    sio.sockets.on('connection', function(socket) {
      var session = socket.handshake.session;
      var accountId = session.accountId;
      var sAccount = null;
      socket.join(accountId);

      app.triggerEvent('event:' + accountId, {
        from: accountId,
        action: 'login'
      });

      var handleContactEvent = function(eventMessage) {
        socket.emit('contactEvent', eventMessage);
      };

      var subscribeToAccount = function(accountId) {
        var eventName = 'event:' + accountId;
        app.addEventListener(eventName, handleContactEvent);
        console.log('Subscribing to ' + eventName);
      };

      models.Account.findById(accountId, function subscribeToFriendFeeds(account) {
        var subscribedAccounts = {};
        sAccount = account;
        account.contacts.forEach(function(contact) {
          if ( !subscribedAccounts[contact.accountId]) {
            subscribeToAccount(contact.accountId);
            subscribedAccounts[contact.accountId] = true;
          }
        });

        if (!subscribedAccounts[accountId]) {
          // Subscribe to my own updates
          subscribeToAccount(accountId);
        }
      });

      socket.on('disconnect', function() {
        sAccount.contacts.forEach(function(contact) {
          var eventName = 'event:' + contact.accountId;
          app.removeEventListener(eventName, handleContactEvent);
          console.log('Unsubscribing from ' + eventName);
        });
        app.triggerEvent('event:' + accountId, {
          from: accountId,
          action: 'logout'
        });
      });

      socket.on('chatclient', function(data) {
        sio.sockets.in(data.to).emit('chatserver', {
          from: accountId,
          text: data.text
        });
      });
    });
  });
}