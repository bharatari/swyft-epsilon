module.exports = {
    sendSignupEmail: function(firstName, lastName, email, cb){
        var message={
            "html":"<h1>Welcome to Swyft!</h1><p>Enter the following token on your next login to your Swyft Account: <strong>"+token.toString()+"</strong></p><ol><li>Go to the Login page of the Swyft Online web app and enter your credentials</li> <li>Enter the above code in the page that appears. </li><li>If you enter your code correctly, your account verification will be complete and you will be redirected back to the Swyft Login page. </li></ol><p>Now that this one-time verification step is complete, you can login to your account and order from some of the most popular restaurants in Exeter.</p>",
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
    }
}