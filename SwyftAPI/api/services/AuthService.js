var jwt = require('jwt-simple');
var Q = require('q');

module.exports = {
    /*** @section - Exeternal Authentication Services */
    jwtTokenSecret: 'm62i9ri75os974n3malodug52',
    authenticated: function(tokenId, session, cb) {
        var self = this;
        if(tokenId) {
            LoginToken.findOne({ id: tokenId }).exec(function(err, token) {
                if(err || !token) {
                    cb(false);
                }              
                else {
                    self.verifyToken(token, session, function(result) {
                        if(result) {
                            cb(result);
                        }
                        else {
                            cb(false);
                        }
                    });
                }
            });
        }
        else {
            cb(false);
        }
    },
    isAdmin: function(tokenId, session, cb) {
        var self = this;
        if(tokenId) {
            LoginToken.findOne({ id: tokenId }).exec(function(err, token) {
                if(err || !token) {
                    cb(false);
                }             
                else {
                    self.verifyToken(token, session, function(result) {
                        if(result) {
                            self.tokenUser(token, function(user) {
                                if(user) {
                                    self.checkAdmin(user, function(admin) {
                                        if(admin) {
                                            cb(true);
                                        }
                                        else {
                                            cb(false);
                                        }
                                    });
                                }
                                else {
                                    cb(false);
                                }
                            });
                        }
                        else {
                            cb(false);
                        }
                    });
                }
            });
        }
        else {
            cb(false);
        }
    },
    isDelivery: function(tokenId, session, cb) {
        var self = this;
        if(tokenId) {
            LoginToken.findOne({ id: tokenId }).exec(function(err, token) {
                if(err) {
                    cb(false);
                }
                else if(!token) {
                    cb(false);
                }                
                else {
                    self.verifyToken(token, session, function(result) {
                        if(result) {
                            self.tokenUser(token, function(user) {
                                self.checkDelivery(user, function(delivery) {
                                    if(delivery) {
                                        cb(true);
                                    }
                                    else {
                                        cb(false);
                                    }
                                });
                            });
                        }
                        else {
                            cb(false);
                        }
                    });
                }
            });
        }
        else {
            cb(false);
        }
    },
    /*** @section - Internal Authentication Services */
    tokenUser: function(loginToken, cb) {
        if(loginToken) {
            User.findOne({ id: loginToken.userId }).exec(function(err, user) {
                if(err || !user) {
                    cb(false);
                }
                else {
                    cb(user);
                }
            });     
        } 
        else {
            cb(false);
        }
    },
    verifyToken: function(loginToken, session, cb) {
        var self = this;
        if(loginToken) {
            if(loginToken.expires <= Date.now()) {
                self.deleteLoginToken(loginToken, function(result) {
                    cb(false);
                });
            }
            else {
                var decoded;
                try {
                    decoded = jwt.decode(loginToken.token, this.jwtTokenSecret);
                }
                catch(err) {
                    return cb(false);
                }
                if(decoded) {
                    if(decoded.sessionToken) {
                        if(session) {
                            if(session.sessionToken) {
                                if(decoded.sessionToken === session.sessionToken) {
                                    cb(loginToken);
                                }
                                else {
                                    cb(false);
                                }
                            }
                            else {
                                cb(false);
                            }
                        }
                        else {
                            cb(false);
                        }
                    }  
                    else {
                        cb(false);
                    }
                }
                else {
                    cb(false);
                }
            }
        }
        else {
            cb(false);
        }
    },
    checkAdmin: function(user, cb) {
        if(user) {
            if(user.roles) {
                if(UtilityService.CSVContains(user.roles, 'admin')){
                    cb(true);
                }
                else {
                    cb(false);
                }
            }
            else {
                cb(false);
            }
        }      
    },
    checkDelivery: function(user, cb) {
        if(user) {
            if(user.roles) {
                if(UtilityService.CSVContains(user.roles, 'admin') || UtilityService.CSVContains(user.roles, 'delivery')){
                    cb(true);
                }
                else {
                    cb(false);
                }
            }
            else {
                cb(false);
            }
        }    
    },
    deleteLoginToken: function(loginToken, cb) {
        Q.fcall(function() {
            if(loginToken) {
                LoginToken.destroy({ id: loginToken.id }).exec(function(err) {
                    cb(true);
                });    
            }
            else {
                cb(false);
            }
        
        }).catch(function(err) {
            cb(false);
        }).done();
    },
    /*** @section - External Authentication Helper Services */
    getUser: function(token, cb) {
        if(token) {
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