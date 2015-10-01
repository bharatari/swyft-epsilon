var assert = require('chai').assert;
var expect = require('chai').expect;
var AuthService = require('../../../api/services/AuthService');
var moment = require('moment');
var Chance = require('chance');
var chance = new Chance();
var jwt = require('jwt-simple');

describe('AuthService', function() {
    describe('#authenticated()', function() {
        it('should authenticate for valid login', function(done) {
            var expires = moment().add(2, 'days').toDate();
            var userId = "54231d2716903854156ad062";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.authenticated(token.id, session, function(result) {
                        assert.ok(result);
                        done();
                    });
                }
            });
        });
        it('should not authenticate for expired login', function(done) {
            var expires = moment().toDate();
            var userId = "54231d2716903854156ad062";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.authenticated(token.id, session, function(result) {
                        assert.notOk(result);
                        done();
                    });
                }
            });
        });
        it('should not authenticate for invalid signature', function(done) {
            var expires = moment().toDate();
            var userId = "54231d2716903854156ad062";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, "oa2j39ds0k0");

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.authenticated(token.id, session, function(result) {
                        assert.notOk(result);
                        done();
                    });
                }
            });
        });
    });
    describe('#isAdmin()', function() {  
        it('should return true for admin', function(done) {
            var expires = moment().add(2, 'days').toDate();
            var userId = "54231d2716903854156ad062";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.isAdmin(token.id, session, function(result) {
                        assert.ok(result);
                        done();
                    });
                }
            });
        });
        it('should return false for delivery', function(done) {
            var expires = moment().add(2, 'days').toDate();
            var userId = "560ac60f1046eab045395afb";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.isAdmin(token.id, session, function(result) {
                        assert.notOk(result);
                        done();
                    });
                }
            });
        });
        it('should return false for no roles', function(done) {
            var expires = moment().add(2, 'days').toDate();
            var userId = "560af7ad48b05570474b35ce";
            var sessionToken = chance.guid();
            var session = {
                sessionToken: sessionToken
            };
            var authToken = jwt.encode({
                iss: userId,
                exp: expires,
                sessionToken: sessionToken
            }, AuthService.jwtTokenSecret);

            LoginToken.create({ token: authToken, expires: expires, userId: userId }).exec(function(err, token) {
                if(err) {
                    return res.serverError(err);
                }
                else {
                    AuthService.isAdmin(token.id, session, function(result) {
                        assert.notOk(result);
                        done();
                    });
                }
            });
        });
    });
});

