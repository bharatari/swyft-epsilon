var sendgrid = require('sendgrid')(sails.config.sendgridKey);

module.exports = {
  sendSignupEmail(firstName, lastName, email, token, cb) {
    var sendEmail = new sendgrid.Email();

    sendEmail.addTo(email);
    sendEmail.subject = "Verify your email address";
    sendEmail.from = 'development@orderswyft.com';
    sendEmail.text = token;
    sendEmail.html = token;

    sendEmail.addFilter('templates', 'enable', 1);
    sendEmail.addFilter('templates', 'template_id', '9ad9925b-4450-43f3-994b-1ffd55f09d7e');

    sendgrid.send(sendEmail, function (err, json) {
      cb();
    });
  },
  sendOutstandingPaymentsEmail(firstName, lastName, email, outstandingPayments, cb) {
    if (outstandingPayments) {
      if (outstandingPayments.length > 0) {
        var html = "<div>";

        for (var i = 0; i < outstandingPayments.length; i++) {
          html += "<div>";
          html += "<p>" + outstandingPayments[i].type + "</p>";
          html += "<p>" + "Date: " + outstandingPayments[i].date + "</p>";
          html += "<p>" + "Amount: $" + outstandingPayments[i].amount.toFixed(2) + "</p>";
          html += "</div>";
          html += "<hr>";
        }

        html += "</div>";

        var sendEmail = new sendgrid.Email();
        sendEmail.addTo(email);
        sendEmail.subject = "You've got outstanding payments";
        sendEmail.from = 'development@orderswyft.com';
        sendEmail.html = html;

        sendEmail.addFilter('templates', 'enable', 1);
        sendEmail.addFilter('templates', 'template_id', '433d0738-ad35-4299-8db5-305b0b182acb');

        sendgrid.send(sendEmail, function (err, json) {
          if (err) {
            cb(false, err);
          } else {
            cb(true);
          }
        });
      } else {
        cb(false, "NO_OUTSTANDING_PAYMENTS");
      }
    } else {
      cb(false, "OUTSTANDING_PAYMENTS_UNDEFINED");
    }
  },
  sendJoinUsEmail(email, firstName, lastName, phoneNumber, type, year, interests, cb) {
    var sendEmail = new sendgrid.Email();
    sendEmail.addTo("sburleigh@exeter.edu");
    sendEmail.subject = "Join our Team email";
    sendEmail.from = 'development@orderswyft.com';
    sendEmail.html = "Email: " + email + "<br>" + "First Name: " + firstName + "<br>" + "Last Name: " + lastName + "<br>" + "Phone Number: " + phoneNumber + "<br>" + "Type: " + type + "<br>" + "Year: " + year + "<br>" + "Interests: " + interests + "<br>";

    sendgrid.send(sendEmail, function (err, json) {
      if (err) {
        cb(false);
      } else {
        cb(true);
      }
    });
  },
  processForgotPasswordToken(user, date, cb) {
    ForgotPasswordToken.create({ userId: user.id, token: chance.hash({ length:25 }), expiryDate: date, username: user.username.toLowerCase() }).exec(function (err, token) {
        if (err) {
          cb(false);
        } else {
          var email = new sendgrid.Email();
          email.addTo(user.username);
          email.subject = "Forgot Password",
          email.from = 'development@orderswyft.com';
          email.html = "<h1>Forgot your password?</h1><p>No worries. Just copy the following link into your web browser to reset your password: https://www.orderswyft.com/app/reset-password/" + token.token + ". For security purposes, this link will expire in 24 hours. If you believe this email was sent to you in error, please let us know immediately.";

          sendgrid.send(email, function (err, json) {
            cb(true);
          });
        }
    });
  },
}
