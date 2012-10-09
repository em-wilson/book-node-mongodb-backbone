define(['Sockets', 'models/contactcollection', 'views/chat'], function(sio, ContactCollection, ChatView) {
  var SocialNetSockets = function(eventDispatcher) {
    var socket = null;

    var connectSocket = function() {
      socket = io.connect().socket;

      socket
        .on('connect_failed', function(reason) {
          console.error('unable to connect', reason);
        })
        .on('connect', function() {
          socket.on('chat', function(data) {
            eventDispatcher.trigger('socket:chat:' + data.to, data);
          });
	      var contactsCollection = new ContactCollection();
          contactsCollection.url = '/accounts/me/contacts';
          new ChatView({collection: contactsCollection, socketEvents: eventDispatcher}).render();
          contactsCollection.fetch();
        });
    };

    var sendChat = function(payload) {
      if ( null != socket ) {
        socket.emit('chat', payload);
      }
    };

    eventDispatcher.bind('app:loggedin', connectSocket);
    eventDispatcher.bind('socket:chat', sendChat);
  }

  return {
    initialize: function(eventDispatcher) {
      SocialNetSockets(eventDispatcher);
    }
  };
});
