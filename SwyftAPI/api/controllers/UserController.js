var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');
var bcrypt = require('bcrypt');


module.exports={
    create: function(req,res) {
        req.body.phoneNumber = req.body.phoneNumber.replace(/\D/g,'');
        if(req.body.username.toLowerCase().indexOf("@exeter.edu") === -1) {
            return res.badRequest();
        }
        var token = chance.guid();
        if(!(req.body.password.length >= 6 && req.body.password.length <= 20)) {
            return res.badRequest();
        }
        User.find().exec(function(err, users) {
            for(var i = 0; i < users.length; i++){
                if(users[i].verified) {
                    if(users[i].username.toLowerCase() === req.body.username.toLowerCase()){
                        return res.badRequest("EMAIL_IN_USE");
                    }
                }
            }
            process();
        });
        function process() {
            User.create({
                username: req.body.username.toLowerCase(),
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                dormitory: req.body.dormitory,
                verified: false,
                token: token,
                balance: 0,
                contactConsent: req.body.contactConsent
            }).exec(function(err) {
                if(err) {
                    res.serverError();
                }
                else {
                    EmailService.sendSignupEmail(req.body.firstName, req.body.lastName, req.body.username, token, function() {
                        res.ok();
                    });
                }
            });
        }
    },
    resend: function(req,res) {
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
    verify: function(req, res) {
        var email;
        if(req.body) {
            if(req.body.email) {
                if(typeof req.body.email === "string") {
                    email = req.body.email.trim().toLowerCase();
                }
                else {
                    return res.badRequest();
                }
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
        if(email) {
            //Check if verified users with the same email already exist
            //Ideally this shouldn't happen because all duplicates
            //should be deleted when an account is verified
            UserService.checkDuplicates(email, function(result) {
                if(result) {
                    UserService.verifyUser(email, req.body.token, function(user) {
                        if(!user) {
                            return res.badRequest();
                        }
                        else {
                            User.update({ id: user.id }, { verified: true }).exec(function(err) {
                                if(!err) {
                                    //Because this account has been successfully verified and we can confirm that this user
                                    //is the rightful "owner" of this email address, we can safely delete all *unverified*
                                    //users with the same email address
                                    //If there is a verified user with the same email address, we have much bigger problems
                                    //and we cannot delete either account
                                    UserService.deleteDuplicates(email, function(final) {
                                        res.ok();
                                    });
                                }
                                else {
                                    res.serverError();
                                }
                            });
                        }
                    });
                }
                else {
                    res.badRequest("DUPLICATE_USER");
                }
            });
        }
        else {
            res.badRequest();
        }
    },
    getUser: function(req,res) {
        User.findOne({ id:req.user.id }).exec(function(err, user){
            res.json(UserService.deleteSensitive(user));
        });
    },
    getUsers: function(req,res){
        User.find().exec(function(err, users){
            for(var i = 0; i < users.length; i++) {
                UserService.deleteSensitive(users[i]);
            }
            res.json(users);
        });
    },
    forgotPasswordToken: function(req, res){
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
                            EmailService.processForgotPasswordToken(user, date, function(response){
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
                    EmailService.processForgotPasswordToken(user, date, function(response){
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
                var transactionAmount = req.body.amount;
                var balance = user.balance;

                user.balance += parseFloat(transactionAmount);
                user.balance = Math.round(parseFloat(user.balance * 100))/100;

                res.send({
                    userId: req.body.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    previousBalance: balance,
                    balance: user.balance,
                    amount: parseFloat(transactionAmount),
                    comments: req.body.comments
                });
            }
        });
    },
    balanceRequest: function(req, res) {
        var transactionType;
        var transactionAmount = parseFloat(req.body.amount);
        var balance = parseFloat(req.body.previousBalance);
        balance += transactionAmount;
        balance = Math.round(parseFloat(balance * 100))/100;

        if(transactionAmount < 0) {
            transactionType = "deduction";
        }
        else {
            transactionType = "deposit";
        }

        var object = {
            userId: req.body.userId,
            type: transactionType,
            amount: Math.abs(transactionAmount),
            comments: req.body.comments,
            transactionCreator: req.user.id,
            finalBalance: balance
        }

        UserTransaction.create(object).exec(function(err, transaction) {
            if(err) {
                return res.badRequest();
            }
            else {
                User.update({ id: req.body.userId }, { balance: transaction.finalBalance }).exec(function(err, user){
                    if(err) {
                        return res.badRequest();
                    }
                    else {
                        return res.ok();
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
    setContactConsent: function(req, res) {
        User.update({ id: req.user.id }, { contactConsent: req.body.contactConsent }).exec(function(err, user) {
            if(err) {
                res.serverError();
            }
            else {
                res.ok();
            }
        });
    },
    find: function(req, res) {
        UserService.getUsers(req.query, function(result) {
            res.json(result);
        });
    },
    findOne: function(req, res) {
        if(req.params) {
            User.findOne({ id: req.params.id }).exec(function(err, user) {
                res.json(UserService.deleteSensitiveCRUD(user));
            });
        }
    },
    getUserMetadata: function(req, res) {
        MetaService.getUserMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getUserModel: function(req, res) {
        res.json(new ModelService.User());
    }
}
