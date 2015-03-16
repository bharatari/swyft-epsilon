module.exports = {
    processToken: function(order, cb) {
        if(order.token) {
            Token.findOne({ token: order.token }).exec(function(err, token) {
                if(!token) {
                    return cb(false);
                }
                if(token.hasBeenUsed) {
                    return cb(false);
                }
                if(token.isCoupon) {
                    Coupon.find({ id: token.couponId }).exec(function(err, coupon) {
                        order.actualAmount *= coupon.discount;
                        Token.update({ id: token.id }, { hasBeenUsed: true }).exec(function(err) {
                            delete order.token;
                            order.tokenId = token.id;
                            cb(order);
                        }); 
                    });
                }
                else {
                    order.actualAmount *= token.discount;
                    Token.update({ id: token.id }, { hasBeenUsed: true }).exec(function(err) {
                        delete order.token;
                        order.tokenId = token.id;
                        cb(order);
                    }); 
                }
            });
        }
        else {
            delete order.token;
            cb(order);
        }
    }
}