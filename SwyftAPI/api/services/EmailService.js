var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('pTw4E8DYFKb696f5YzXmzg');

module.exports = {
    sendSignupEmail: function(firstName, lastName, email, token, cb){
        var message={
            "html":"<h1>Welcome to Swyft!</h1><p>Before you can login to your account and order from Exeter's best restaurants, you're going to need to verify your email address. Go to https://www.orderswyft.com/app/verify and enter the following token: <strong>"+token.toString()+"</strong>. This is only a one-time verification process. Once you're done, you are good to go! </p>",
            "subject":"Verify your email address",
            "from_email":"swyftdeveloper@outlook.com",
            "from_name":"Swyft",
            "to":[{
                "email":email,
                "name":firstName+" "+lastName,
                "type":"to"
            }]
        };
        mandrill_client.messages.send({"message":message}, function(result){            
            cb();
        });
    },
    sendChargeLaterEmail: function(firstName, lastName, email, chargeLaterOrders, cb) {
        var message = {
            "html":"<h1>You've got outstanding payments</h1><p></p>",
            "subject":"You've got outstanding payments",
            "from_email":"swyftdeveloper@outlook.com",
            "from_name":"Swyft",
            "to":[{
                "email": email,
                "name": firstName+" "+lastName,
                "type": "to"
            }]
        };
        mandrill_client.messages.send({"message":message}, function(result){            
            cb();
        });
    }
}