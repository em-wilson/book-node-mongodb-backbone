define(['Sockets', 'models/contactcollection', 'views/chat'], function(sio, ContactCollection, ChatView) {
  var SocialNetSockets = function(eventDispatcher) {
    var socket = null;

    var connectSocket = function() {
      socket = io.connect();

      socket
        .on('connect_failed', function(reason) {
          console.error('unable to connect', reason);
        })
        .on('connect', function() {
          eventDispatcher.bind('socket:chat', sendChat);
          socket.on('chatserver', function(data) {
            eventDispatcher.trigger('socket:chat:start:' + data.from );
            eventDispatcher.trigger('socket:chat:in:' + data.from, data);
          });
          var contactsCollection = new ContactCollection();
          contactsCollection.url = '/accounts/me/contacts';
          new ChatView({collection: contactsCollection, socketEvents: eventDispatcher}).render();
          contactsCollection.fetch();
        });
    };

    var sendChat = function(payload) {
      if ( null != socket ) {
        socket.emit('chatclient', payload);
      }
    };

    eventDispatcher.bind('app:loggedin', connectSocket);
  }

  return {
    initialize: function(eventDispatcher) {
      SocialNetSockets(eventDispatcher);
    }
  };
});
