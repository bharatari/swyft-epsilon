var jwt = require('jwt-simple');

module.exports = {
    jwtTokenSecret: 'm62i9ri75os974n3malodug52',
    authenticated: function(tokenId, cb) {
        if(tokenId) {
            LoginToken.findOne({id: tokenId}).exec(function(err, token){
                if(err) {
                    cb(false);
                }
                else if(!token) {
                    cb(false);
                }                
                else {
                    if(token.expires <= Date.now()){
                        try {
                            LoginToken.destroy({id:token.id}).exec(function(err){
                                cb(false);
                            });
                        }
                        catch (err) {
                            cb(false);
                        }
                    }
                    else {
                        cb(token);
                    }
                }
            });
        }
        else {
            cb(false);
        }
    },
    isAdmin: function(tokenId, cb) {
        if(tokenId) {
            LoginToken.findOne({id: tokenId}).exec(function(err, token){
                if(err) {
                    cb(false);
                }
                else if(!token) {
                    cb(false);
                }                
                else {
                    if(token){
                        if(token.expires <= Date.now()){
                            try {
                                LoginToken.destroy({id:token.id}).exec(function(err){
                                    cb(false);
                                });
                            }
                            catch (err) {
                                cb(false);
                            }
                        }
                        else {
                            User.findOne({id:token.userId}).exec(function(err, user){
                                if(err){
                                    cb(false);
                                }
                                else if(!user){
                                    cb(false);
                                }
                                else {
                                    if(user){
                                        if(user.isAdmin){
                                            cb(true);
                                        }
                                        else {
                                            cb(false);
                                        }
                                    }   
                                }
                            });
                        }
                    }
                    else {
                        cb(false);
                    }
                }
            });
        }
        else {
            cb(false);
        }
    },
    isDelivery: function(tokenId, cb) {
        if(tokenId) {
            LoginToken.findOne({id: tokenId}).exec(function(err, token){
                if(err) {
                    cb(false);
                }
                else if(!token) {
                    cb(false);
                }                
                else {
                    if(token){
                        if(token.expires <= Date.now()){
                            try {
                                LoginToken.destroy({id:token.id}).exec(function(err){
                                    cb(false);
                                });
                            }
                            catch (err) {
                                cb(false);
                            }
                        }
                        else {
                            User.findOne({id:token.userId}).exec(function(err, user){
                                if(err){
                                    cb(false);
                                }
                                else if(!user){
                                    cb(false);
                                }
                                else {
                                    if(user){
                                        if(user.isAdmin || user.isDeliverer){
                                            cb(true);
                                        }
                                        else {
                                            cb(false);
                                        }
                                    }   
                                }
                            });
                        }
                    }
                    else {
                        cb(false);
                    }
                }
            });
        }
        else {
            cb(false);
        }
    },
    getUser: function(token, cb) {
        if (token) {
            try {
                var decoded = jwt.decode(token, this.jwtTokenSecret);
                if(decoded.exp <= Date.now()){
                    cb(false);
                }
                else {
                    User.findOne({ id: decoded.iss }).exec(function(err, user) {
                        if(err) {
                            cb(false);
                        }
                        else {
                            cb(user);
                        }
                    });
                }
            } 
            catch (err) {
                cb(false);
            }
        } 
        else {
            cb(false);
        }
    }
}