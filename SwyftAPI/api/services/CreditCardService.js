var stripe = require("stripe")("sk_test_YJbrXH1QiIxhNSXSRpcGlj8P");
var Chance = require('chance');
var chance = new Chance();

module.exports = {
    chargeCreditCard: function(token, amount, cb) {
        var charge = stripe.charges.create({
            amount: amount * 100, 
            currency: "usd",
            source: token,
            description: "Swyft Order Charge"
        }, {
            idempotency_key: chance.guid() + "+" + chance.hash()
        }, function(err, charge) {
            if(err && err.type === 'StripeCardError') {
                return cb(false, err);
            }
            cb(true);
        });
    }
}