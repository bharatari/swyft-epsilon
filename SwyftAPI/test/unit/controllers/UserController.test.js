var request = require('supertest');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('UserController', function () {
  describe('#verify()', function () {
    it('should verify a valid unverified user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: 'swyftcustomer@exeter.edu',
          token: '112233445566'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          User.find({
            username: 'swyftcustomer@exeter.edu'
          }).exec(function (err, users) {
            if (err || !users) {
              assert.ok(false);
              done();
            } else {
              assert.lengthOf(users, 1);
              done();
            }
          });
        });
    });
    it('should return 400 for invalid token', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: 'swyftcustomer@exeter.edu',
          token: '1234'
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          User.find({
            username: 'swyftcustomer@exeter.edu'
          }).exec(function (err, users) {
            if (err || !users) {
              assert.ok(false);
              done();
            } else {
              assert.lengthOf(users, 1);
              done();
            }
          });
        });
    });
    it('should return 400 for already verified user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: 'bharatari@exeter.edu',
          token: '1234'
        })
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
          User.find({
            username: 'bharatari@exeter.edu'
          }).exec(function (err, users) {
            if (err || !users) {
              assert.ok(false);
              done();
            } else {
              assert.lengthOf(users, 1);
              done();
            }
          });
        });
    });
    it('should delete duplicates and verify user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: 'swyftduplicate@exeter.edu',
          token: '1122334452111566'
        })
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          User.find({
            username: 'swyftduplicate@exeter.edu'
          }).exec(function (err, users) {
            if (err || !users) {
              assert.ok(false);
              done();
            } else {
              assert.lengthOf(users, 1);
              done();
            }
          });
        });
    });
    it('should return 400 for invalid user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: "thisuserdoesn'texistswyft@exeter.edu",
          token: '1122334452111566'
        })
        .expect(400, done);
    });
    it('should return 400 if there is a verified user with same email', function (done) {
      request(sails.hooks.http.app)
        .post('/api/user/verification/verify')
        .send({
          email: 'swyftduplicate2@exeter.edu',
          token: '4444'
        })
        .expect(400, done);
    });
  });
});
