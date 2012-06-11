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

