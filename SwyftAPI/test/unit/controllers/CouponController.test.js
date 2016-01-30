var request = require('supertest');
var superagent = require('superagent');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe.only('CouponController', function() {
    describe('#createCoupon()', function() {
        it('should create coupon', function(done) {
            var sampleCoupon = {
                code: 'CREATE_TEST_COUPON',
                comments: 'Cool test coupon',
                discount: 0.9,
                name: 'TestCoupon2',
                user: {}
            };

            var agent = superagent.agent();

            request(sails.hooks.http.app)
                .post('/api/login')
                .send({ username: "bharatari@exeter.edu", password: 'password' })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var token = res.body.token;
                    sampleCoupon.user.token = token;

                    agent.saveCookies(res.res);
                    var req = request(sails.hooks.http.app).post('/api/coupon/coupon');
                    agent.attachCookies(req);

                    req
                        .send(sampleCoupon)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);
                            assert.ok(true);
                            done();
                        });
                });
        });
        it('should return error for duplicate', function(done) {
            var sampleCoupon = {
                code: 'TEST_COUPON',
                comments: 'Cool test coupon',
                discount: 0.9,
                name: 'TestCoupon',
                user: {}
            };

            var agent = superagent.agent();

            request(sails.hooks.http.app)
                .post('/api/login')
                .send({ username: "bharatari@exeter.edu", password: 'password' })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var token = res.body.token;
                    sampleCoupon.user.token = token;

                    agent.saveCookies(res.res);
                    var req = request(sails.hooks.http.app).post('/api/coupon/coupon');
                    agent.attachCookies(req);

                    req
                        .send(sampleCoupon)
                        .expect(400)
                        .end(function(err, res) {
                            if (err) return done(err);
                            assert.ok(true);
                            done();
                        });
                });
        });
    });
});
