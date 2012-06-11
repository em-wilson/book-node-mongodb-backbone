module.exports = function(mongoose) {
  var AccountSchema = new mongoose.Schema({
    email:     { type: String, index: true },
    name: {
      first:   { type: String },
      last:    { type: String }
    },
    birthday: {
      day:     { type: Number, min: 1, max: 31, required: false },
      month:   { type: Number, min: 1, max: 12, required: false },
      year:    { type: Number }
    },
    photoUrl:  { type: String },
    biography: { type: String }
  });

  var Account = mongoose.model('Account', AccountSchema);

  var registerCallback = function(err) {
    console.log('hit callback');
    if (err) {
      return console.log(err);
    };
    return console.log("Account was created");
  };

  var register = function(email, password, firstName, lastName) {
    console.log("Registering " + email);
    var user = new Account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      }
    });
    user.save(registerCallback);
    console.log('Save command was sent');
  }

  return {
    register: register,
    Account: Account
  }
}
