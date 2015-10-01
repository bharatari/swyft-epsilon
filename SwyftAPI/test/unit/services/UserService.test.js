var assert = require('chai').assert;
var expect = require('chai').expect;
var UserService = require('../../../api/services/UserService');

describe.only('UserService', function() {
    describe('#outstandingPayments()', function() {
        /*** @todo - This test isn't complete because it assumes my balance is negative */
        it('should return array when user balance is negative', function(done) {
            UserService.outstandingPayments("54231d2716903854156ad062", function(result, message) {
                assert(result);
            });
        });
    });
});

