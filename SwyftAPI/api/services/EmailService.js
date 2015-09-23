var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('pTw4E8DYFKb696f5YzXmzg');

module.exports = {
    sendSignupEmail: function(firstName, lastName, email, token, cb) {
        var templateContent = [{
            "name": "FIRST_NAME",
            "content": firstName
        }, {
            "name": "TOKEN",
            "content": token.toString()
        }, {
            "name": "CURRENT_YEAR",
            "content": new Date().getFullYear()
        }];
        var message = {
            "merge": true, 
            "merge_language": "mailchimp", 
            "merge_vars": [{
                "rcpt": email,
                "vars": [{
                    "name": "FIRST_NAME",
                    "content": firstName
                }, {
                    "name": "TOKEN",
                    "content": token.toString()
                }, {
                    "name": "CURRENT_YEAR",
                    "content": new Date().getFullYear()
                }]
            }],
            "subject": "Verify your email address",
            "from_email": "swyftdeveloper@outlook.com",
            "from_name": "Swyft",
            "to":[{
                "email": email,
                "name": firstName+" "+lastName,
                "type": "to"
            }]
        };
        mandrill_client.messages.sendTemplate({ "template_name": "swyft-email-verification", message: message, "template_content": templateContent }, function(result) {
            cb();
        }, function(err) {
            cb();
        });
    },
    sendOutstandingPaymentsEmail: function(firstName, lastName, email, outstandingPayments, cb) {
        if(outstandingPayments) {
            if(outstandingPayments.length > 0) {
                var html = "<div>";
                for(var i = 0; i < outstandingPayments.length; i++) {
                    html += "<div>";
                    html += "<p>" + outstandingPayments[i].type + "</p>";
                    html += "<p>" + "Date: " + outstandingPayments[i].date + "</p>";
                    html += "<p>" + "Amount: $" + outstandingPayments[i].amount.toFixed(2) + "</p>";
                    html += "</div>";
                    html += "<hr>";
                }
                html += "</div>";
                var templateContent = [{
                    "name": "FIRST_NAME",
                    "content": firstName
                }, {
                    "name": "PAYMENTS_LIST",
                    "content": html
                }, {
                    "name": "CURRENT_YEAR",
                    "content": new Date().getFullYear()
                }];
                var message = {
                    "merge": true, 
                    "merge_language": "mailchimp", 
                    "merge_vars": [{
                        "rcpt": email,
                        "vars": [{
                            "name": "FIRST_NAME",
                            "content": firstName
                        }, {
                            "name": "PAYMENTS_LIST",
                            "content": html
                        }, {
                            "name": "CURRENT_YEAR",
                            "content": new Date().getFullYear()
                        }]
                    }],
                    "subject": firstName + ", " + "you've got outstanding payments",
                    "from_email": "swyftdeveloper@outlook.com",
                    "from_name": "Swyft",
                    "to":[{
                        "email": email,
                        "name": firstName+" "+lastName,
                        "type": "to"
                    }]
                };
                mandrill_client.messages.sendTemplate({ "template_name": "swyft-outstanding-payments", "template_content": templateContent, message: message }, function(result) {
                    cb(true);
                }, function(err) {
                    cb(false, err);
                });
            }
            else {
                cb(false, "NO_OUTSTANDING_PAYMENTS");
            }
        }
        else {
            cb(false, "OUTSTANDING_PAYMENTS_UNDEFINED");
        }
        
    }
}