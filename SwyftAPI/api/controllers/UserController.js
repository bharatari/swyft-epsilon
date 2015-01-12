var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');

module.exports={
    create:function(req,res){
        req.body.phoneNumber=req.body.phoneNumber.replace(/\D/g,'');
        req.body.postOfficeBox=req.body.postOfficeBox.replace(/\D/g,'');
        if(req.body.email.toLowerCase().indexOf("@exeter.edu")===-1){
            return res.send(400);
        }
        var token=chance.guid();
        if(!(req.body.password.length>=6&&req.body.password.length<=20)){
            return res.send(400);
        }
        User.find().exec(function(err, users){
            for(var i = 0; i < users.length; i++){
                if(users[i].username.toLowerCase() === req.body.email.toLowerCase()){
                    return res.badRequest("EMAIL_IN_USE");
                }
            }
            process();
        });
        function process(){
            User.create({
                username:req.body.email.toLowerCase(),
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
                    EmailService.sendSignupEmail(req.body.firstName, req.body.lastName, req.body.email, token, function(){
                        res.send(200);
                    });
                    
                }
            });
            
        }
        
    },
    resend:function(req,res){
        User.findOne({id:req.body.id}).exec(function(err, user){
            EmailService.sendSignupEmail(user.firstName, user.lastName, user.username, function(){
                res.send(200);
            });
        });
    },
    verify:function(req,res){
        User.findOne({username: req.body.email}).exec(function(err, user){
            if(err) {
                res.serverError();
            }
            else if(user){
                if(user.token === req.body.token){
                    User.update({id:user.id}, {verified:true}).exec(function(err, user){
                        if(!err){
                            res.ok();
                        }
                        else {
                            res.serverError();
                        }
                    });
                }
            }
            else{
                res.badRequest();
            }
        });
    },
    getUser:function(req,res){
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
        User.findOne({username:req.body.email}).exec(function(err, user){
            if(err||!user){
                return res.send(500);
            }
            ForgotPasswordToken.find({id:user.id}).exec(function(err, tokens){
                if(err){
                    res.send(500);
                }
                else if(token){
                    ForgotPasswordToken.destroy({username:req.body.email}).exec(function(err){
                        if(err){
                            res.send(500);
                        }
                        else{
                            UserService.processForgotPasswordToken(user, date, function(response){
                                if(response) {
                                    res.ok();
                                }
                                else {
                                    res.serverError();
                                }
                            });
                        }
                    });
                }
                else {
                    UserService.processForgotPasswordToken(user, date, function(response){
                        if(response) {
                            res.ok();
                        }
                        else {
                            res.serverError();
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