module.exports = {
  processToken: function (order, cb) {
    if (order.token) {
      Token.findOne({
        token: order.token
      }).exec(function (err, token) {
        if (!token) {
          return cb(false);
        }
        if (token.hasBeenUsed) {
          return cb(false);
        } else {
          order.actualAmount *= token.discount;
          order.actualAmount = Math.round(order.actualAmount * 100) / 100;
          Token.update({
            id: token.id
          }, {
            hasBeenUsed: true,
            orderId: order.id,
            usedBy: order.userId
          }).exec(function (err) {
            delete order.token;
            order.tokenId = token.id;
            cb(order);
          });
        }
      });
    } else {
      delete order.token;
      cb(order);
    }
  },
  processCoupon: function (order, cb) {
    if (order.coupon) {
      Coupon.findOne({
        code: order.coupon
      }).exec(function (err, coupon) {
        if (err || !token) {
          return cb(false);
        } else if (!coupon.isActive) {
          return cb(false);
        } else {
          order.actualAmount *= coupon.discount;
          order.actualAmount = Math.round(order.actualAmount * 100) / 100;
          delete order.coupon;
          order.couponId = coupon.id;
          cb(order);
        }
      });
    } else {
      delete order.coupon;
      cb(order);
    }
  },
  checkDuplicates: function (code, cb) {
    Coupon.find({
      isActive: true
    }).exec(function (err, coupons) {
      if (err || !coupons) {
        cb(null, true);
      } else {
        async.each(coupons, function (coupon, callback) {
          if (coupon) {
            if (coupon.code === code) {
              return cb(true);
            }
          }
          callback();
        }, function (err) {
          cb(null, true);
        });
      }
    });
  }
}