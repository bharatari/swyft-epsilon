var assert = require('chai').assert;
var expect = require('chai').expect;
var UserService = require('../../../api/services/UserService');

describe('UserService', function () {
  describe('#outstandingPayments()', function () {
    it('should return array when user balance is negative and no orders', function (done) {
      UserService.outstandingPayments('54231d2716903854156ad061', function (result, message) {
        assert.lengthOf(result, 1);
        assert.isArray(result);
        assert.notDeepEqual(result, []);
        done();
      });
    });
    it('should return array when user balance is negative with orders', function (done) {
      UserService.outstandingPayments('54231d2716903854156ad061', function (result, message) {
        assert.lengthOf(result, 1);
        assert.isArray(result);
        assert.notDeepEqual(result, []);
        done();
      });
    });
    it('should return array when user balance is negative and outstanding orders', function (done) {
      UserService.outstandingPayments('5534302641911f380a666667', function (result, message) {
        assert.isArray(result);
        assert.notDeepEqual(result, []);
        done();
      });
    });
    it('should return empty array when user balance is zero and no orders', function (done) {
      UserService.outstandingPayments('5557cfdc892d559412ad45ea', function (result, message) {
        assert.isArray(result);
        assert.deepEqual(result, []);
        done();
      });
    });
    it('should return array when user balance is zero with outstanding orders', function (done) {
      UserService.outstandingPayments('5534302641911f380a666666', function (result, message) {
        assert.isArray(result);
        assert.notDeepEqual(result, []);
        done();
      });
    });
    it('should return empty array when no outstanding payments and no orders', function (done) {
      UserService.outstandingPayments('5557cfdc892d559412ad45ea', function (result, message) {
        assert.isArray(result);
        assert.deepEqual(result, []);
        done();
      });
    });
    it('should return empty array when no outstanding payments', function (done) {
      UserService.outstandingPayments('5534302641911f380a666669', function (result, message) {
        assert.isArray(result);
        assert.deepEqual(result, []);
        done();
      });
    });
  });
});
