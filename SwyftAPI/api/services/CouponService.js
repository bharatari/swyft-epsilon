var Q = require('q');

module.exports = {
  getToken: function (code) {
    return Q.promise(function (resolve, reject) {
      Token.findOne({
        token: code
      }).exec(function (err, token) {
        if (!token) {
          reject(err);
        } else if (token.hasBeenUsed) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },
  getCoupon: function (code) {
    return Q.promise(function (resolve, reject) {
      Coupon.findOne({
        code: code
      }).exec(function (err, coupon) {
        if (err || !coupon) {
          reject(err);
        } else if (!coupon.isActive) {
          reject(err);
        } else {
          resolve(coupon);
        }
      });
    });
  },
  getDiscount: function (code, cb) {
    Q.allSettled([this.getToken(code), this.getCoupon(code)]).spread(function (token, coupon) {
      if (token.state === 'fulfilled') {
        cb(null, token.value);
      } else if (coupon.state === 'fulfilled') {
        cb(null, coupon.value);
      } else {
        cb(true);
      }
    });
  },
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
        if (err || !coupon) {
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
};
