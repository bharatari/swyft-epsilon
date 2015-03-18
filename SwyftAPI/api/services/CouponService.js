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
                else {
                    order.actualAmount *= token.discount;
                    order.actualAmount = Math.round(order.actualAmount * 100) / 100;
                    Token.update({ id: token.id }, { hasBeenUsed: true, orderId: order.id, usedBy: order.userId }).exec(function(err) {
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