var moment = require('moment-timezone');

module.exports = {
  /***
   *
   * @section - Automatic Delivery Management 
   *
   */
  getDeliveryPeriods: function (cb) {
    DeliveryPeriod.find({
      enabled: true
    }).exec(function (err, deliveryPeriods) {
      cb(deliveryPeriods);
    });
  },
  deliveryInRange: function (period, today) {
    var delivery = this.processMoment(period.deliveryDay, period.deliveryHour, period.deliveryMinute, period.deliverySecond);
    var cutoff = this.processMoment(period.cutoffDay, period.cutoffHour, period.cutoffMinute, period.cutoffSecond);
    var open = this.processMoment(period.openDay, period.openHour, period.openMinute, period.openSecond);
    if (today.isAfter(open) && today.isBefore(cutoff)) {
      return true;
    }
    return false;
  },
  createNewDelivery: function (period, cb) {
    var delivery = this.processMoment(period.deliveryDay, period.deliveryHour, period.deliveryMinute, period.deliverySecond);
    var cutoff = this.processMoment(period.cutoffDay, period.cutoffHour, period.cutoffMinute, period.cutoffSecond);
    var arrival = this.processMoment(period.arrivalDay, period.arrivalHour, period.arrivalMinute, period.arrivalSecond);
    var newDelivery = new ModelService.AutomaticDelivery(delivery.toDate(), period.id, "All", cutoff.toDate(), period.deliverers, arrival.toDate());
    console.log('Delivery Processor Running');
    console.log('Creating Delivery');
    Delivery.create(newDelivery).exec(function (err) {
      console.log('Created New Delivery');
      cb();
    });
  },
  /** 
   * Creates a moment from day, hour, minute and second parameters.
   * Adds seven days to the moment if the day is Sunday, because moment 
   * treats Sundays as part of the previous week.
   *
   * @param {string} day - String representation of day of week.
   * @param {number} hour - 24-hour representation of hour.
   * @param {number} minute - 0-59 representation of minute.
   * @param {number} second - 0-59 representation of second.
   * @returns {Moment|Date} - Returns date if params are null or undefined.
   */
  processMoment: function (day, hour, minute, second) {
    if ((day != null) && (hour != null) && (minute != null) && (second != null)) {
      var date = moment().day(day).set({
        hour: hour,
        minute: minute,
        second: second
      });
      if (day === "Sunday") {
        date = date.add(7, 'days');
      }
      if (TimeZoneService.isDST()) {
        date = date.add(1, 'hours');
      }
      return date;
    } else {
      return new Date();
    }
  },
  processDeliveryPeriods: function (cb) {
    var self = this;
    var deliveryPeriods;
    this.getDeliveryPeriods(function (result) {
      deliveryPeriods = result;
      process();
    });

    function process() {
      async.each(deliveryPeriods, function (period, callback) {
        if (self.deliveryInRange(period, moment())) {
          Delivery.find({
            closed: false,
            deliveryPeriod: period.id
          }).exec(function (err, deliveries) {
            if (deliveries.length < 1) {
              self.createNewDelivery(period, function () {
                callback();
              });
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      }, function (err) {
        cb();
      });
    }
  },
  closeDeliveryPeriods: function (cb) {
    Delivery.find({
      closed: false,
      autoDelivery: true
    }).exec(function (err, deliveries) {
      if (deliveries) {
        async.each(deliveries, function (delivery, callback) {
          var today = moment();
          var cutoff = moment(delivery.orderCutoff);
          if (today.isAfter(cutoff)) {
            console.log('Delivery Processor Running');
            console.log('Closing Delivery');
            Delivery.update({
              id: delivery.id
            }, {
              closed: true
            }).exec(function (err) {
              callback();
            });
          } else {
            callback();
          }
        }, function (error) {
          cb();
        });
      } else {
        cb();
      }
    });
  },

  /***
   *
   * @section - Automatic Email Service
   *
   */

  /** 
   * Finds users with outstanding payments and calls sendOutstandingPaymentsEmail
   *
   * @param {AutomaticService~outstandingPaymentsCallback} cb - Called when function finishes.
   */
  processOutstandingPayments: function (cb) {
    var self = this;
    var outstandingUsers = [];
    User.find().exec(function (err, users) {
      if (!err && users) {
        async.each(users, function (user, callback) {
          if (user) {
            UserService.outstandingPayments(user.id, function (result, message) {
              if (result === false) {
                if (message) {
                  console.log("Automatic Email System Error: " + message);
                  callback();
                } else {
                  callback();
                }
              } else {
                if (result) {
                  if (result.length > 0) {
                    self.sendOutstandingPaymentsEmail({
                      user: user,
                      outstandingPayments: result
                    }, function (result, message) {
                      if (result === false) {
                        if (message) {
                          console.log("Automatic Email System Error: " + message);
                        }
                      }
                      callback();
                    });
                  } else {
                    callback();
                  }
                } else {
                  callback();
                }
              }
            });
          } else {
            callback();
          }
        }, function (err) {
          cb();
        });
      }
    });
  },
  /**
   * @callback AutomaticService~outstandingPaymentsCallback
   */

  /** 
   * Sends emails to users with outstanding payments.
   *
   * @param {Object} object
   * @param {User} object.user
   * @param {Array} object.outstandingPayments
   * @param {string} object.outstandingPayments[].type
   * @param {string} object.outstandingPayments[].date - A Date formatted as a string.
   * @param {number} object.outstandingPayments[].amount
   * @param {AutomaticService~outstandingPaymentsEmailCallback} cb - Called when function finishes.
   */
  sendOutstandingPaymentsEmail: function (object, cb) {
      if (object) {
        if (object.user) {
          EmailService.sendOutstandingPaymentsEmail(object.user.firstName, object.user.lastName, object.user.username, object.outstandingPayments, function (result, message) {
            if (result === false) {
              if (message) {
                console.log("Automatic Email System Error: " + message.message);
                cb(false, message);
              } else {
                cb(false);
              }
            } else {
              cb(true);
            }
          });
        } else {
          cb(false, "USER_UNDEFINED");
        }
      } else {
        cb(false, "OBJECT_UNDEFINED");
      }
    }
    /**
     * @callback AutomaticService~outstandingPaymentsEmailCallback
     * @param {boolean} result
     * @param {string} message
     */
}