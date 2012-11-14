define(['SocialNetView', 'text!templates/chatsession.html'],
function(SocialNetView, chatItemTemplate) {
  var chatItemView = SocialNetView.extend({
    tagName: 'div',

    className: 'chat_session',

    $el: $(this.el),

    events: {
      'submit form': 'sendChat'
    },

    initialize: function(options) {
      this.socketEvents = options.socketEvents;
      this.socketEvents.on(
        'socket:chat:in:' + this.model.get('accountId'),
        this.receiveChat,
        this
      );
    },

    receiveChat: function(data) {
      var chatLine = this.model.get('name').first + ': ' + data.text;
      this.$el.find('.chat_log').append($('<li>' + chatLine + '</li>'));
    },

    sendChat: function() {
      var chatText = this.$el.find('input[name=chat]').val();
      if ( chatText && /[^\s]+/.test(chatText) ) {
        var chatLine = 'Me: ' + chatText;
        this.$el.find('.chat_log').append($('<li>' + chatLine + '</li>'));
        this.socketEvents.trigger('socket:chat', {
          to: this.model.get('accountId'),
          text: chatText
        });
      }
      return false;
    },

    render: function() {
      this.$el.html(_.template(chatItemTemplate, {
        model: this.model.toJSON()
      }));
      return this;
    }
  });

  return chatItemView;
});