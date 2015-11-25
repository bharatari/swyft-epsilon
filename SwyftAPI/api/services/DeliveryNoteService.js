module.exports = {
    setOrdersToDelivered: function(deliveryId, userId, cb) {
        Delivery.findOne({ id: deliveryId }).exec(function(err, delivery) {
            if (err || !delivery) {
                cb("NO_DELIVERY");
            } else {
                Order.find({ deliveryId: deliveryId }).exec(function(err, orders) {
                    async.each(orders, function(order, callback) {
                        if(order.deliveryNote) {
                            order.deliveryNote.isDelivered = true;
                            order.deliveryNote.deliveredAt = delivery.deliveryDate;
                            order.deliveryNote.deliveredBy = userId;
                        }
                        else {
                            order.deliveryNote = new ModelService.DeliveryNote(null, userId, null, true, new Date());
                        }
                        Order.update({ id: order.id }, order).exec(function(err) {
                            callback();
                        });
                    }, function(err) {
                        cb(null, true);
                    });
                });
            }
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
        Order.find({ userId: userId.toString() }).limit(10).sort({ createdAt: "desc" }).exec(function(err, items) {
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
    },
    setCreditCardToProcessed: function(orderId, message, cb) {
        Order.findOne({ id: orderId }).exec(function(err, order) {
            order.deliveryNote.creditCardCharged = true;
            order.deliveryNote.creditCardMessage = message;
            Order.update({ id: orderId }, order).exec(function(err, result) {
                cb(true);
            });
        });
    },
    setCreditCardToDeclined: function(orderId, message, cb) {
        Order.findOne({ id: orderId }).exec(function(err, order) {
            order.deliveryNote.creditCardCharged = false;
            order.deliveryNote.creditCardMessage = message;
            Order.update({ id: orderId }, order).exec(function(err, result) {
                cb(true);
            });
        });
    }
}