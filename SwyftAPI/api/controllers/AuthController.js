var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');

module.exports={
    login: function(req, res) {
        User.findOne({ username: req.body.username.toLowerCase() }, function(err, user) {
            if(err) {
                return res.serverError(err);
            }
            if(!user) {
                return res.badRequest();
            }
            if(user.disabled) {
                return res.forbidden();
            }
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(!result) {
                    return res.badRequest();
                }
                else if(err) {
                    return res.serverError(err);
                }
                else if(!user.verified) {
                    return res.badRequest("NOT_VERIFIED");
                }
                else {
                    var expires = moment().add(2, 'days').toDate();
                    var authToken = jwt.encode({
                        iss: user.id,
                        exp: expires
                    }, AuthService.jwtTokenSecret);

                    LoginToken.create({token:authToken, expires: expires, userId: user.id}).exec(function(err, token) {
                        if(err) {
                            return res.serverError(err);
                        }
                        else {
                            if(token) {
                                return res.ok({
                                    token : token,
                                    expires: expires,
                                    user: user.toJSON()
                                });                    
                            }
                            else {
                                return res.serverError();
                            }
                        }
                    });
                }
            });
        });
    },
    logout:function(req,res) {
        LoginToken.destroy({userId: req.body.userId}).exec(function(err){
            if(err) {
                res.serverError(err);
            }
            else {
                res.ok();
            }
        });
    },
    isAuthenticated:function(req,res) {
        AuthService.authenticated(req.query.tokenId, function(response) {
            if(response) {
                AuthService.getUser(response.token, function(user){
                    if(user) {
                        if(user.verified) {
                            res.ok();
                        }
                        else {
                            res.send("NOT_VERIFIED");
                        }
                    }
                    else {
                        return res.forbidden();
                    }
                });
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    },
    isAdmin:function(req, res) {
        AuthService.isAdmin(req.query.tokenId, function(response) {
            if(response) {
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    },
    isDelivery: function(req, res) {
        AuthService.isDelivery(req.query.tokenId, function(response) {
            if(response) {
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    },
    csrfToken: function(req, res) {
        res.json({
            _csrf: 'ghwf9ckwl75rjfng32owdf9s44'
        });
    }
}