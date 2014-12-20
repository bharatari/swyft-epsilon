var Chance=require('chance');
var chance=new Chance();
var mandrill=require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('pTw4E8DYFKb696f5YzXmzg');
var moment=require('moment');
module.exports={
    create:function(req,res){
        req.body.phoneNumber=req.body.phoneNumber.replace(/\D/g,'');
        req.body.postOfficeBox=req.body.postOfficeBox.replace(/\D/g,'');
        if(req.body.email.indexOf("@exeter.edu")===-1){
            return res.send(500);
        }
        var token=chance.guid();
        if(!(req.body.password.length>=6&&req.body.password.length<=20)){
            return res.send(500);
        }
        User.find().exec(function(err, users){
            for(var i=0; i<users.length;i++){
                if(users[i].username.toLowerCase()===req.body.email.toLowerCase()){
                    return res.send(500, {message:'Email already exists'});
                }
            }
            process();
        });
        function process(){
            User.create({
                username:req.body.email,
                password:req.body.password,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                phoneNumber:req.body.phoneNumber,
                dormitory:req.body.dormitory,
                postOfficeBox:req.body.postOfficeBox,
                verified:false,
                token:token,
                balance:0,
                isDriver:false,
                isAdmin:false,
                isEmployee:false,
                isDeliverer:false
            }).exec(function(err){
                if(err){
                    res.send(500);
                }
                else{
                    EmailService.sendSignupEmail(req.body.firstName, req.body.lastName, req.body.email, function(){
                        res.send(200);
                    });
                    
                }
            });
            
        }
        
    },
    resend:function(req,res){
        var message={
            "html":"<h1>Welcome to Swyft!</h1><p>Enter the following token on your next login to your Swyft Account: <strong>"+token.toString()+"</strong></p><ol><li>Go to the Login page of the Swyft Online web app and enter your credentials</li> <li>Enter the above code in the page that appears. </li><li>If you enter your code correctly, your account verification will be complete and you will be redirected back to the Swyft Login page. </li></ol><p>Now that this one-time verification step is complete, you can login to your account and order from some of the most popular restaurants in Exeter.</p>",
            "subject":"Verify your email address",
            "from_email":"swyftdeveloper@outlook.com",
            "from_name":"Swyft",
            "to":[{
                "email":req.body.username,
                "name":req.body.firstName+" "+req.body.lastName,
                "type":"to"
            }]
        };
        mandrill_client.messages.send({"message":message}, function(result){

        });
        res.send(200);
    },
    verify:function(req,res){
        User.findOne({id:req.user.id}).exec(function(err, user){
            if(user.token===req.body.token){
                User.update({id:req.user.id}, {verified:true}).exec(function(err, user){
                    if(!err){
                        req.logout();
                        res.send("OK");
                    }
                });
            }
            else{
                res.send("Error");
            }
        });
    },
    profile:function(req,res){
        User.findOne({id:req.user.id}).exec(function(err, user){
            res.json(user);
        });
    },
    remove:function(req,res){
        //User.destroy
    },
    getUsers:function(req,res){
        User.find().exec(function(err, users){
            res.json(users);
        });
    },
    createForgotPasswordToken:function(req, res){
        var date=moment().add(1, 'days').toDate();
        //Check for other tokens from the same user, and delete them
        User.find({username:req.body.email}).exec(function(err, user){
            if(err||!user){
                return res.send(500);
            }
            ForgotPasswordToken.find({username:req.body.email}).exec(function(err, tokens){
                if(err){
                    res.send(500);
                }
                else if(tokens && tokens[0]){
                    ForgotPasswordToken.destroy({username:req.body.email}).exec(function(err){
                        if(err){
                            res.send(500);
                        }
                        else{
                            ForgotPasswordToken.create({userId:user[0].id, token:chance.hash({length:25}), expiryDate:date, username:req.body.email}).exec(function(err, token){
                                if(err){
                                    res.send(500);
                                }
                                else{
                                    var message={
                                        "html":"<h1>Forgot your password?</h1><p>No worries. Just copy the following link into your web browser to reset your password: http://www.orderswyft.com/forgotPassword/"+token.token+". For security purposes, this link will expire in 24 hours. If you believe this email was sent to you in error or as the result of a security breach, please let us know immediately.",
                                        "subject":"Forgot Password",
                                        "from_email":"swyftdeveloper@outlook.com",
                                        "from_name":"Swyft",
                                        "to":[{
                                            "email":req.body.email,
                                            "name":req.body.firstName+" "+req.body.lastName,
                                            "type":"to"
                                        }]
                                    };
                                    mandrill_client.messages.send({"message":message}, function(result){

                                    });
                                    res.send('Successfully created token');
                                }
                            });
                        }
                    });
                }
            });
            
        });
    },
    resetPassword:function(req,res){
        ForgotPasswordToken.find({token:req.body.token}).exec(function(err, token){
            if(new Date(token.expiryDate)<new Date()){
                ForgotPasswordToken.destroy({token:req.body.token}).exec(function(err){
                    res.send(500);
                });
            }
            else if(token[0].username != req.body.email){
                res.send(500);
            }
            else{
                User.update({id:token[0].userId},{password:req.body.password}).exec(function(err, user){
                    if(err){
                        res.send(500);
                    }
                    else{
                        ForgotPasswordToken.destroy({id:token[0].id}).exec(function(err){
                            res.send("OK");
                        });
                    }
                });
            }
        });
    }
}