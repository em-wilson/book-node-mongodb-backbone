var Stooge = Backbone.Model.extend({
  defaults: {
    'name': '',
    'power': ''
  }
});

var Team = BackBone.Collection.extend({
  model: Stooge
});

var larry = new Stooge({ name: 'Larry', power: 'Baldness' });
var moe = new Stooge({ name: 'Moe', power: 'All Powers' });
var curly = new Stooge({ name: 'Curly', power: 'Hair' });

var threeStooges = new Team([ larry, curly, moe ]);