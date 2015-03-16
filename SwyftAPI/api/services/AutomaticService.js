var moment = require('moment');

module.exports = {
    getDeliveryPeriods: function(cb) {
        DeliveryPeriod.find().exec(function(err, deliveryPeriods) {
            cb(deliveryPeriods);
        });
    },
    deliveryInRange: function(period) {
        var today = moment();
        var delivery = moment().day(period.deliveryDay).set({ hour: period.deliveryHour, minute: period.deliveryMinute, second: period.deliverySecond });
        var dayBefore = delivery.subtract(1, 'days');
        if(today.isAfter(dayBefore)) {
            return true;
        }
        return false;
    },
    createNewDelivery: function(period, cb) {
        var delivery = moment().day(period.deliveryDay).set({ hour: period.deliveryHour, minute: period.deliveryMinute, second: period.deliverySecond });
        var cutoff = moment().day(period.cutoffDay).set({ hour: period.cutoffHour, minute: period.cutoffMinute, second: period.cutoffSecond });
        var newDelivery = new ModelService.Delivery(delivery.toDate(), period.id, "All", cutoff.toDate(), period.deliverers);
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
            async.each(deliveries, function(delivery, callback) {
                var today = moment();
                var cutoff = moment(delivery.orderCutoff);
                if(today.isAfter(cutoff)) {
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
        });
    }
}