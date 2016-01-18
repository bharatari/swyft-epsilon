var moment = require('moment');

module.exports = {
  findLatest: function (deliveries, cb) {
    if (deliveries.length > 0) {
      var latest = deliveries[0];
      for (var i = 0; i < deliveries.length; i++) {
        if (deliveries[i].deliveryDate > latest.deliveryDate) {
          latest = deliveries[i];
        }
      }
      cb(latest);
    } else {
      cb(false);
    }

  },
  processOffset: function (reqOffset) {
    var offset;
    if (reqOffset) {
      if (typeof offset !== 'number') {
        offset = parseInt(reqOffset);
        if (isNaN(offset)) {
          return 0;
        } else {
          return offset;
        }
      } else {
        return reqOffset;
      }
    } else {
      return 0;
    }
  },
  processDeliveryOffset: function (deliveryDate, offset) {
    return moment(deliveryDate).add(offset, 'minutes').toDate();
  },
  processArrivalOffset: function (scheduledArrival, offset) {
    return moment(scheduledArrival).add(offset, 'minutes').toDate();
  },
  setDeliveryOffset: function (reqOffset, deliveryId, cb) {
    var self = this;
    var offset = this.processOffset(reqOffset);
    Delivery.findOne({
      id: deliveryId
    }).exec(function (err, delivery) {

      if (!err || delivery) {
        Delivery.update({
          id: deliveryId
        }, {
          estimatedArrival: self.processArrivalOffset(new Date(delivery.scheduledArrival), offset),
          estimatedDelivery: self.processDeliveryOffset(new Date(delivery.deliveryDate), offset)
        }).exec(function (err, data) {
          if (err) {
            return cb(true);
          } else {
            NotificationService.createDeliveryNotification(data[0], offset, function () {
              return cb(null, data[0]);
            });
          }
        });
      } else {
        return cb(true);
      }
    });
  }
};
