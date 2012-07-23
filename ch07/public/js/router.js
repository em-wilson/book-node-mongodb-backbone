define(['views/index', 'views/register', 'views/login', 'views/forgotpassword', 'views/profile', 'models/Account', 'models/StatusCollection'], function(IndexView, RegisterView, LoginView, ForgotPasswordView, ProfileView, Account, StatusCollection) {
  var SocialRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      "index": "index",
      "login": "login",
      "register": "register",
      "forgotpassword": "forgotpassword",
      "profile/:id": "profile"
    },

    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    index: function() {
      this.changeView(new IndexView({
        collection: new StatusCollection()
      }));
    },

    login: function() {
      this.changeView(new LoginView());
    },

    forgotpassword: function() {
      this.changeView(new ForgotPasswordView());
    },

    register: function() {
      this.changeView(new RegisterView());
    },

    profile: function(id) {
      var model = new Account({id:id});
      this.changeView(new ProfileView({model:model}));
      model.fetch();
    }
  });

  return new SocialRouter();
});

