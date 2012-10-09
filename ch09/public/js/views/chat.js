define(['SocialNetView', 'views/chatitem', 'text!templates/chat.html'],
function(SocialNetView, ChatItemView, chatItemTemplate) {
  var chatView = SocialNetView.extend({
    el: $('#chat'),

    events: {
      
    },

    initialize: function(options) {
      this.socketEvents = options.socketEvents;
      this.collection.on('reset', this.renderCollection, this);
    },

    render: function() {
      this.$el.html(chatItemTemplate);
    },

    renderCollection: function(collection) {
      var socketEvents = this.socketEvents;
      $('.chat_list').empty();
      collection.each(function(contact) {
        var statusHtml = (new ChatItemView({ socketEvents: socketEvents, model: contact })).render().el;
        $(statusHtml).appendTo('.chat_list');
      });
    }
  });

  return chatView;
});
