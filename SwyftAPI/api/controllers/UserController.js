var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');
var bcrypt = require('bcrypt');


module.exports={
    create:function(req,res){
        req.body.phoneNumber = req.body.phoneNumber.replace(/\D/g,'');
        if(req.body.email.toLowerCase().indexOf("@exeter.edu") === -1){
            return res.send(400);
        }
        var token=chance.guid();
        if(!(req.body.password.length >= 6 && req.body.password.length <= 20)){
            return res.send(400);
        }
        User.find().exec(function(err, users) {
            for(var i = 0; i < users.length; i++){
                if(users[i].verified) {
                    if(users[i].username.toLowerCase() === req.body.email.toLowerCase()){
                        return res.badRequest('EMAIL_IN_USE');
                    }
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
                verified:false,
                token:token,
                balance:0,
                contactConsent: req.body.contactConsent,
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
        User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
            if (err) {
                return res.serverError(err);
            }
            if (!user) {
                return res.badRequest();
            }
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (!result) {
                    res.badRequest();
                }
                else if(err) {
                    res.serverError(err);
                }
                /*
                else if(user.verified) {
                    res.badRequest("ALREADY_VERIFIED");
                }
                */
                else {
                    EmailService.sendSignupEmail(user.firstName, user.lastName, user.username, user.token, function(){
                        res.ok();
                    });
                }
            });
        });
        
    },
    verify:function(req,res) {
        if(req.body.email) {
            User.findOne({ username: req.body.email.toLowerCase() }).exec(function(err, user){
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
        }
        else {
            res.badRequest();
        }
    },
    getUser:function(req,res){
        User.findOne({id:req.user.id}).exec(function(err, user){
            res.json(user);
        });
    },
    getUsers:function(req,res){
        User.find().exec(function(err, users){
            for(var i = 0; i < users.length; i++) {
                UserService.deleteSensitive(users[i]);
            }
            res.json(users);
        });
    },
    forgotPasswordToken:function(req, res){
        var date=moment().add(1, 'days').toDate();
        User.findOne({ username: req.body.email.toLowerCase() }).exec(function(err, user){
            if(err || !user) {
                return res.serverError();
            }
            else if(user.token !== req.body.token) {
                return res.badRequest();
            }
            ForgotPasswordToken.find({ userId: user.id }).exec(function(err, tokens){
                if(err){
                    res.send(500);
                }
                else if(tokens){
                    ForgotPasswordToken.destroy({ userId: user.id }).exec(function(err){
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
    resetPassword: function(req,res) {
        if(!(req.body.password.length >=6 && req.body.password.length <= 20)){
            return res.badRequest();
        }
        ForgotPasswordToken.findOne({ token: req.body.token }).exec(function(err, token){
            if(!token || err) {
                return res.badRequest();
            }
            else if(new Date(token.expiryDate) < new Date()){
                ForgotPasswordToken.destroy({token:req.body.token}).exec(function(err){
                    return res.badRequest();
                });
            }
            else if(token.username != req.body.username.toLowerCase() ){
                return res.badRequest();
            }
            else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) {
                            return res.serverError();
                        }
                        else {
                            User.update({ id: token.userId },{ password: hash }).exec(function(err, user) {
                                if(err) {
                                    return res.serverError();
                                }
                                else{
                                    ForgotPasswordToken.destroy({ id: token.id }).exec(function(err){
                                        return res.ok();
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    },
    preliminaryBalanceRequest: function(req, res) {
        User.findOne({id: req.body.userId}).exec(function(err, user){
            if(err) {
                return res.badRequest();
            }
            else {
                var transactionAmount = Math.round(parseFloat(req.body.amount*100))/100;
                var balance = user.balance;
                user.balance += transactionAmount;
                res.send({
                    userId: req.body.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    previousBalance: balance,
                    balance: user.balance,
                    amount: transactionAmount,
                    comments: req.body.comments
                });
            }
        });        
    },
    balanceRequest: function(req, res) {
        var transactionType;
        if(req.body.amount < 0) {
            transactionType = "deduction";
        }
        else {
            transactionType = "deposit";
        }
        User.update({id: req.body.userId}, {balance: req.body.balance}).exec(function(err, user){
            if(err) {
                return res.badRequest();
            }
            else {
                var transactionAmount = Math.round(parseFloat(req.body.amount*100))/100;
                var balance = user.balance;
                var final = user.balance + transactionAmount;
                var object = {
                    userId: req.body.userId, 
                    type:transactionType, 
                    amount: Math.abs(req.body.amount), 
                    comments: req.body.comments,
                    transactionCreator: req.user.id,
                    finalBalance: final
                }
                UserTransaction.create(object).exec(function(err){
                    if(err){
                        return res.badRequest();
                    }
                    else {
                        res.ok();
                    }
                });
            }
        });
    },
    validForgotPasswordToken: function(req, res) {
        ForgotPasswordToken.findOne({ token: req.params.token }).exec(function(err, token){
            if(err) {
                return res.badRequest();   
            }
            else if(!token) {
                return res.badRequest();
            }
            else {
                if(new Date(token.expiryDate) < new Date()){
                    ForgotPasswordToken.destroy({ token: req.params.token}).exec(function(err){
                        return res.badRequest();
                    });
                }
                else {
                    return res.ok();
                }
            }
        });
    },
    /*
    getUsersAdmin: function(req, res) {
        UserService.getUsers(req.query, function(result) {
            result = UserService.deleteSensitiveIterate(result);
            res.json(result);
        });
    },
    getUserAdmin: function(req, res) {
        User.findOne({ id: req.params.id }).exec(function(err, user) {
            if(!user && req.query.admin) {
                res.json(new ModelService.User());
            }
            else if(!user) {
                res.badRequest();
            }
            else {
                user = UserService.deleteSensitive(user);
                res.json(user);
            }
        });
    },
    updateUserAdmin: function(req, res) {
        User.update({ id: req.params.id }, req.body).exec(function(err, transaction) {
            res.ok();
        });
    },
    newUserAdmin: function(req, res) {
        User.create(req.body).exec(function(err, transaction) {
            res.ok();
        });
    },
    deleteUserAdmin: function(req, res) {
        User.destroy({ id: req.params.id }).exec(function(err) {
            res.ok();
        });
    },
    */
    getUserMetadata: function(req, res) {
        MetaService.getUserMetadata(req.query.recordsPerPage, function(result) {
            res.json(result);
        });
    }
}