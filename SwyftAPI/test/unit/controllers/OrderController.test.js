var request = require('supertest');
var superagent = require('superagent');
var assert = require('chai').assert;
var expect = require('chai').expect;

var sampleOrder = {"items":[{"name":"McCafé Coffee","id":"549a7c80f2ede1f4234eecf9","quantity":1,"restaurant":"mcdonalds","standardOptions":[],"options":[{"price":0.5,"name":"Medium","category":"Size"}],"extras":[],"attachedRequests":[],"price":1.7,"itemOptions":"Medium"}],"paymentType":"cash","deliveryLocation":"Main Street Hall","contactPhone":"6037937340","userId":"54231d2716903854156ad062","token":"","deliveryId":"56798eb1ef2b22f44f738535","user":{}};

describe('OrderController', function() {
    describe('#processOrder()', function() {
        it('should process a valid order', function(done) {
            var agent = superagent.agent();
            request(sails.hooks.http.app)
                .post('/api/login')
                .send({ username: "swyfttestmocha@exeter.edu", password: 'testing' })
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    var token = res.body.token;
                    sampleOrder.user.token = token;

                    agent.saveCookies(res.res);

                    var req = request(sails.hooks.http.app)
                                  .post('/api/order');

                    agent.attachCookies(req);

                    req
                        .send(sampleOrder)
                        .expect(200)
                        .end(function(err, res) {
                            if (err) return done(err);
                            assert.ok(true);
                            done();
                        });
                });
        });
    });
});
