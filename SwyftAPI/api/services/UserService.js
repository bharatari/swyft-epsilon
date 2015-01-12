var Chance = require('chance');
var chance = new Chance();

module.exports = {
    processForgotPasswordToken: function(user, date, cb) {
        ForgotPasswordToken.create({userId:user.id, token:chance.hash({length:25}), expiryDate:date, username:user.username}).exec(function(err, token){
            if(err){
                cb(false);
            }
            else{
                var message={
                    "html":"<h1>Forgot your password?</h1><p>No worries. Just copy the following link into your web browser to reset your password: http://www.orderswyft.com/forgotPassword/"+token.token+". For security purposes, this link will expire in 24 hours. If you believe this email was sent to you in error or as the result of a security breach, please let us know immediately.",
                    "subject":"Forgot Password",
                    "from_email":"swyftdeveloper@outlook.com",
                    "from_name":"Swyft",
                    "to":[{
                        "email":user.email,
                        "name":user.firstName+" "+user.lastName,
                        "type":"to"
                    }]
                };
                mandrill_client.messages.send({"message":message}, function(result){ });
                cb(true);
            }
        });
    },
    deleteSensitive: function(user) {
        delete user.password;
        delete user.token;
        return user;
    }
}