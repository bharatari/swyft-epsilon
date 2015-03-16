module.exports = {
    setOrdersToDelivered: function(deliveryId, cb) {
        Order.find({ deliveryId: deliveryId }).exec(function(err, orders) {
            async.each(orders, function(order, callback) {
                if(order.deliveryNote) {
                    order.deliveryNote.isDelivered = true;
                    order.deliveryNote.deliveredAt = new Date();
                }
                else {
                    order.deliveryNote = new ModelService.DeliveryNote(null, null, null, true, new Date());
                }
                Order.update({ id: order.id }, order).exec(function(err) {
                    callback();
                });
            }, function(err) {
                cb();
            });
        });
    },
    getPendingOrders: function(userId, cb) {
        Order.find({ userId: userId.toString() }).exec(function(err, items) {
            var orders = [];
            async.each(items, function(order, callback) {
                if(order.deliveryNote) {
                    if(!order.deliveryNote.isDelivered) {
                        orders.push(order);
                    }
                }
                else if(order.isDelivered) { }
                else {
                    orders.push(order);
                }
                callback();
            }, function(err) {
                cb(orders);
            });
        });
    },
    getRecentOrders: function(userId, cb) {
        Order.find({ userId: userId.toString() }).limit(10).exec(function(err, items) {
            var orders = [];
            async.each(items, function(order, callback) {
                if(order.deliveryNote) {
                    if(order.deliveryNote.isDelivered) {
                        orders.push(order);
                    }
                }
                else if(order.isDelivered) {
                    orders.push(order);
                }
                callback();
            }, function(err) {
                cb(orders);
            });
        });
    }
}