var async = require('async');
var moment = require('moment');

module.exports = {
    getOrderChart: function(deliveries, cb) {
        var data = [];
        async.eachSeries(deliveries, function(delivery, callback) {
            Order.find({ deliveryId: delivery.id }).exec(function(err, orders) {
                data.push({
                    label: moment(delivery.deliveryDate).format("MM/DD"),
                    data: orders.length
                });
                callback();
            });
        }, function(err) {
            cb(data);
        });
    },
    getRevenueChart: function(deliveries, cb) {
        var data = [];
        async.eachSeries(deliveries, function(delivery, callback) {
            Order.find({ deliveryId: delivery.id }).exec(function(err, orders) {
                var total = 0;
                for(var i = 0; i < orders.length; i++) {
                    total += orders[i].actualAmount;
                }
                data.push({
                    label: moment(delivery.deliveryDate).format("MM/DD"),
                    data: total
                });
                callback();
            });
        }, function(err) {
            cb(data);
        });
    },
    processDeliveryData: function(deliveries, cb) {
        async.each(deliveries, function(delivery, callback) {
            Order.find({ deliveryId: delivery.id }).exec(function(err, orders) {
                delivery.orderCount = orders.length;
                callback();
            });
        }, function(err) {
            cb(deliveries);
        });
    },
    processUsersOverTime: function(orders, cb) {
        var days = [];
        async.each(orders, function(order, callback) {
            
        }, function(err) {
        
        });
    },
    processDashboardStats: function(cb) {
        var data = {
            orderCount: 0,
            userCount: 0,
            deliveryCount: 0
        }
        Order.find().exec(function(err, orders) {
            data.orderCount = orders.length;
            User.find().exec(function(err, users) {
                data.userCount = users.length;
                Delivery.find().exec(function(err, deliveries) {
                    data.deliveryCount = deliveries.length;
                    cb(data);
                });
            });
        });
    }
}