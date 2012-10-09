define(['SocialNetView', 'text!templates/chatitem.html'], function(SocialNetView, chatItemTemplate) {
  var chatItemView = SocialNetView.extend({
    tagName: 'li',

    $el: $(this.el),

    events: {
      'click .name': 'showChat',
      'submit form': 'sendChat'
    },

    initialize: function(options) {
      this.socketEvents = options.socketEvents;
      this.socketEvents.on('socket:chat:' + this.model.get('_id'), this.receiveChat, this);
    },

    receiveChat: function(data) {
    },

    showChat: function() {
      this.$el.children('form').toggle();
    },

    sendChat: function() {
      var chatText = this.$el.find('input[name=chat]').val();
      if ( chatText && /[^\s]+/.test(chatText) ) {
        this.socketEvents.trigger('socket:chat', {
          to: this.model.get('_id'),
          text: chatText
        });
      }
      return false;
    },

    render: function() {
      this.$el.html(_.template(chatItemTemplate, {
        model: this.model.toJSON()
      }));
      this.$el.children('form').hide();
      return this;
    }
  });

  return chatItemView;
});