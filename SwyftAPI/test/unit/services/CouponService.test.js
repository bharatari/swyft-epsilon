var assert = require('chai').assert;
var expect = require('chai').expect;

describe('CouponService', function() {
    describe('#processCoupon()', function() {
        it('should process valid coupon', function(done) {
            var order = {
                "items": [
                    {
                        "name": "McCafé Coffee",
                        "id": "549a7c80f2ede1f4234eecf9",
                        "quantity": 1,
                        "restaurant": "mcdonalds",
                        "standardOptions": [],
                        "options": [
                            { "price":0.5, "name":"Medium", "category":"Size" }
                        ],
                        "extras": [],
                        "attachedRequests": [],
                        "price": 1.7,
                        "itemOptions": "Medium"
                    }
                ],
                "paymentType": "cash",
                "deliveryLocation": "Main Street Hall",
                "contactPhone": "6037937340",
                "userId": "54231d2716903854156ad062",
                "token": "",
                "deliveryId": "56798eb1ef2b22f44f738535",
                "user": {},
                "coupon": "TEST_COUPON"
            };

            CouponService.processCoupon(order, function(result) {
                assert.ok(result);
                done();
            });
        });
        it('should return error for invalid coupon', function(done) {
            var order = {
                "items": [
                    {
                        "name": "McCafé Coffee",
                        "id": "549a7c80f2ede1f4234eecf9",
                        "quantity": 1,
                        "restaurant": "mcdonalds",
                        "standardOptions": [],
                        "options": [
                            { "price":0.5, "name":"Medium", "category":"Size" }
                        ],
                        "extras": [],
                        "attachedRequests": [],
                        "price": 1.7,
                        "itemOptions": "Medium"
                    }
                ],
                "paymentType": "cash",
                "deliveryLocation": "Main Street Hall",
                "contactPhone": "6037937340",
                "userId": "54231d2716903854156ad062",
                "token": "",
                "deliveryId": "56798eb1ef2b22f44f738535",
                "user": {},
                "coupon": "FAKE_COUPON"
            };

            CouponService.processCoupon(order, function(result) {
                assert.notOk(result);
                done();
            });
        });
    });
});
