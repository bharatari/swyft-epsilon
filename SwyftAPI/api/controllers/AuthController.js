var bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');

module.exports={
    login: function(req, res) {
        User.findOne({ username: req.body.username }, function(err, user) {
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
                else if(!user.verified) {
                    res.badRequest("Account not verified");
                }
                else {
                    var expires = moment().add(2, 'days').toDate();
                    var authToken = jwt.encode({
                        iss: user.id,
                        exp: expires
                    }, AuthService.jwtTokenSecret);

                    LoginToken.create({token:authToken, expires: expires, userId: user.id}).exec(function(err, token){
                        if(err){
                            res.serverError(err);
                        }
                        else {
                            if(token){
                                return res.ok({
                                    token : token,
                                    expires: expires,
                                    user: user.toJSON()
                                });                    
                            }
                            else {
                                res.serverError();
                            }
                        }
                    });
                }
            });
        });
    },
    logout:function(req,res){
        LoginToken.destroy({userId: req.body.user.user.id}).exec(function(err){
            if(err) {
                res.serverError(err);
            }
            else {
                res.ok();
            }
        });
    },
    isAuthenticated:function(req,res){
        AuthService.authenticated(req.query.tokenId, function(response) {
            if(response) {
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    },
    isAdmin:function(req, res) {
        AuthService.isAdmin(req.query.tokenId, function(response){
            if(response) {
                return res.ok();
            }
            else {
                return res.forbidden();
            }
        });
    }
}