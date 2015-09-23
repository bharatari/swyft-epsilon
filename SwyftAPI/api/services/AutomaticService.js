var moment = require('moment');

module.exports = {
    /** Automatic Delivery Management **/
    getDeliveryPeriods: function(cb) {
        DeliveryPeriod.find({ enabled: true }).exec(function(err, deliveryPeriods) {
            cb(deliveryPeriods);
        });
    },
    deliveryInRange: function(period) {
        var today = moment();
        var delivery = moment().day(period.deliveryDay).set({ hour: period.deliveryHour, minute: period.deliveryMinute, second: period.deliverySecond });
        var cutoff = moment().day(period.cutoffDay).set({ hour: period.cutoffHour, minute: period.cutoffMinute, second: period.cutoffSecond });
        if(period.deliveryDay === "Sunday") {
            delivery = delivery.add(7, 'days');
        }
        var dayBefore = delivery.subtract(1, 'days');
        if(today.isAfter(dayBefore) && today.isBefore(cutoff)) {
            return true;
        }
        return false;
    },
    createNewDelivery: function(period, cb) {
        var delivery = moment().day(period.deliveryDay).set({ hour: period.deliveryHour, minute: period.deliveryMinute, second: period.deliverySecond });
        if(period.deliveryDay === "Sunday") {
            delivery = delivery.add(7, 'days');
        }
        var cutoff = moment().day(period.cutoffDay).set({ hour: period.cutoffHour, minute: period.cutoffMinute, second: period.cutoffSecond });
        var newDelivery = new ModelService.AutomaticDelivery(delivery.toDate(), period.id, "All", cutoff.toDate(), period.deliverers);
        console.log('Delivery Processor Running');
        console.log('Creating Delivery');
        Delivery.create(newDelivery).exec(function(err) {
            console.log('Created New Delivery');
            cb();
        });
    },
    processDeliveryPeriods: function(cb) {
        var self = this;
        var deliveryPeriods;
        this.getDeliveryPeriods(function(result) {
            deliveryPeriods = result;
            process();
        });
        function process() {
            async.each(deliveryPeriods, function(period, callback) {
                if(self.deliveryInRange(period)) {
                    Delivery.find({ closed: false,  deliveryPeriod: period.id }).exec(function(err, deliveries) {
                        if(deliveries.length < 1) {
                            self.createNewDelivery(period, function() {
                                callback();
                            });
                        }
                        else {
                            callback();
                        }
                    });
                }
                else {
                    callback();
                }
            }, function(err) {
                cb();
            });
        }
    },
    closeDeliveryPeriods: function(cb) {
        Delivery.find({ closed: false, autoDelivery: true }).exec(function(err, deliveries) {
            if(deliveries) {
                async.each(deliveries, function(delivery, callback) {
                    var today = moment();
                    var cutoff = moment(delivery.orderCutoff);
                    if(today.isAfter(cutoff)) {
                        console.log('Delivery Processor Running');
                        console.log('Closing Delivery');
                        Delivery.update({ id: delivery.id }, { closed: true }).exec(function(err) {
                            callback();
                        });
                    }
                    else {
                        callback();
                    }
                }, function(error) {
                    cb();
                });
            }
            else {
                cb();
            }
        });
    },
    /** Outstanding Payments Email System **/
    processOutstandingPayments: function(cb) {
        var self = this;
        var outstandingUsers = [];
        User.find().exec(function(err, users) {
            if(!err && users) {
                async.each(users, function(user, callback) {
                    if(user) {
                        UserService.outstandingPayments(user.id, function(result, message) {
                            if(result === false) {
                                if(message) {
                                    console.log("Automatic Email System Error: " + message);
                                    callback();
                                }
                                else {
                                    callback();
                                }
                            }
                            else {
                                if(result) {
                                    if(result.length > 0) {
                                        self.sendOutstandingPaymentsEmail({
                                            user: user,
                                            outstandingPayments: result
                                        }, function(result, message) {
                                            if(result === false) {
                                                if(message) {
                                                    console.log("Automatic Email System Error: " + message);
                                                }
                                            }
                                            callback();
                                        });
                                    }
                                    else {
                                        callback();
                                    }
                                }
                                else {
                                    callback();
                                }
                            }
                        });
                    }
                }, function(err) {
                    cb();
                });
            }
        });
    },
    sendOutstandingPaymentsEmail: function(object, cb) {
        if(object) {
            if(object.user) {
                EmailService.sendOutstandingPaymentsEmail(object.user.firstName, object.user.lastName, object.user.username, object.outstandingPayments, function(result, message) {
                    if(result === false) {
                        if(message) {
                            console.log("Automatic Email System Error: " + message.message);
                            cb(false, message);
                        }
                        else {
                            cb(false);
                        }
                    }
                    else {
                        cb(true);
                    }
                });
            }
            else {
                cb(false, "USER_UNDEFINED");
            }
        }
        else {
            cb(false, "OBJECT_UNDEFINED");
        }
    }
}