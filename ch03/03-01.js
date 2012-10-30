Stooge = Backbone.Model.extend({
    defaults: {
        'name': 'Guy Incognito',
        'power': 'Classified',

        'friends': [],
    },

    initialize: function() {
        // Do initialization 
    }
});

var account = new Stooge({ name: 'Larry', power: 'Baldness', friends: ['Curly', 'Moe']});
