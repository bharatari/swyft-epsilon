var Chance = require('chance');
var chance = new Chance();

module.exports = {
    checkToken: function(req, res) {
        Token.findOne({ token: req.params.token }).exec(function(err, token) {
            if(!token) {
                return res.badRequest();
            }
            else if(token.hasBeenUsed) {
                return res.badRequest();
            }
            else {
                return res.ok();
            }
        });
    },
    checkCoupon: function(req, res) {
        Coupon.findOne({ code: req.params.coupon }).exec(function(err, coupon) {
            if(err || !coupon) {
                return res.badRequest();
            } else if(!coupon.isActive) {
                return res.badRequest();
            } else {
                return res.ok();
            }
        });
    },
    getOpenTokens: function(req, res) {
        Token.find({ hasBeenUsed: false }).exec(function(err, tokens) {
            res.json(tokens);
        });
    },
    createIndependentToken: function(req, res) {
        var data = {
            token: chance.guid(),
            discount: req.body.discount,
            comments: req.body.comments,
            hasBeenUsed: false
        }
        Token.create(data).exec(function(err, token) {
            if (err) {
                return res.badRequest();
            } else {
                res.json(token);
            }
        });
    },
    createCoupon: function(req, res) {
        var data = {
            name: req.body.name,
            discount: req.body.discount,
            comments: req.body.comments,
            code: req.body.code,
            isActive: true
        };
        CouponService.checkDuplicates(req.body.code, function(err, result) {
            if (err || !result) {
                res.badRequest("DUPLICATE");
            } else {
                Coupon.create(data).exec(function(err, coupon) {
                    if (err || !coupon) {
                        res.badRequest("DATABASE_ERR");
                    } else {
                        res.ok(coupon);
                    }
                });
            }
        });
    },
    getToken: function(req, res) {
        Token.findOne({ token: req.params.token }).exec(function(err, token) {
            if(err || !token) {
                res.badRequest();
            }
            else {
                res.json(token);
            }
        });
    },
    getCouponMetadata: function(req, res) {
        MetaService.getCouponMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getCouponModel: function(req, res) {
        res.json(new ModelService.Coupon());
    }
}
