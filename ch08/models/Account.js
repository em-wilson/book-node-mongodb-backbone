module.exports = function(mongoose) {
  var crypto = require('crypto');

  var AccountSchema = new mongoose.Schema({
    email:     { type: String, unique: true },
    password:  { type: String },
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

  var forgotPassword = function(email, req, res) {
    var user = Account.findOne({email: email}, function(err, docs){
      if (err) {
        // Email address is not a valid user
        res.send(404);
      } else {
        var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
        smtpTransport.sendMail({
          from: "thisapp@example.com",
          to: doc.email,
          subject: "SocialNet Password Request",
          text: "Forgot password request"
        }, function(err) {
          if (err) {
            res.send(err);
          } else {
            res.send(200);
          }
        });
      }
    });
  };

  var register = function(email, password, firstName, lastName) {
    var shaSum = crypto.createHash('sha256');
    shaSum.update(password);

    console.log("Registering " + email);
    var user = new Account({
      email: email,
      name: {
        first: firstName,
        last: lastName
      },
      password: shaSum.digest('hex')
    });
    user.save(registerCallback);
    console.log('Save command was sent');
  }

  return {
    register: register,
    forgotPassword: forgotPassword,
    Account: Account
  }
}
