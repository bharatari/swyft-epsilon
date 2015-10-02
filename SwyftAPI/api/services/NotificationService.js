var moment = require('moment');

module.exports = {
    /*** 
     * Creates a notification for a new order.
     *
     * @param {Order} order
     * @param {User} order.user
     * @param {NotificationService~callback} cb - Called when database request finishes.
     *
     */
    createOrderNotification: function(order, cb) {
        UtilityService.protect(function() {
            if(order) {
                if(order.user) {
                    var body = "Name: " + order.user.firstName + " " + order.user.lastName + "<br>" + "Amount: " + order.actualAmount;
                    Notification.create({ title: "New Order", body: body, type:"new" }).exec(function(err, data) {
                        if(err) {
                            cb();
                        }
                        else {
                            sails.sockets.broadcast('notifications', 'new notification', data);
                            cb();
                        }
                    });
                }
                else {
                    cb()
                }
            }
            else {
                cb();
            }
        }, function(err) {
            cb();
        });   
    },
    /***
     * @callback NotificationService~callback
     */
    
    /*** 
     * Creates a notification for a changed delivery offest.
     *
     * @param {Delivery} delivery
     * @param {number} offset
     * @param {NotificationService~orderCallback} cb - Called when database request finishes.
     *
     * @tag - timezone
     *
     */
    createDeliveryNotification: function(delivery, offset, cb) {
        UtilityService.protect(function() {
            if(delivery) {
                var body = "Delivery: " + moment(delivery.deliveryDate).format("MM-DD-YYYY hh:mm a Z") + "<br>" + "Offset: " + offset + " minutes";
                Notification.create({ title: "Delivery Offset Changed", body: body, type:"update" }).exec(function(err, data) {
                    if(err) {
                        cb();
                    }
                    else {
                        sails.sockets.broadcast('notifications', 'new notification', data);
                        cb();
                    }
                });
            }
            else {
                cb();
            }
        }, function(err) {
            cb();
        });   
    },
    
    /*** 
     * Creates a notification for a changed delivery status.
     *
     * @param {Delivery} delivery
     * @param {string} status
     * @param {NotificationService~orderCallback} cb - Called when database request finishes.
     *
     * @tag - timezone
     *
     */
    createDeliveryStatusNotification: function(delivery, status, cb) {
        UtilityService.protect(function() {
            if(delivery) {
                var body = "Delivery: " + moment(delivery.deliveryDate).format("MM-DD-YYYY hh:mm a Z") + "<br>" + "Delivery Status: " + status;
                Notification.create({ title: "Delivery Status Changed", body: body, type:"update" }).exec(function(err, data) {
                    if(err) {
                        cb();
                    }
                    else {
                        sails.sockets.broadcast('notifications', 'new notification', data);
                        cb();
                    }
                });
            }
            else {
                cb();
            }
        }, function(err) {
            cb();
        });   
    },
    /*** 
     * Creates a notification for a changed delivery status.
     *
     * @param {Delivery} delivery
     * @param {string} status
     * @param {NotificationService~orderCallback} cb - Called when database request finishes.
     *
     * @tag - timezone
     *
     */
    createOperationalStatusNotification: function(delivery, status, cb) {
        UtilityService.protect(function() {
            if(delivery) {
                var body = "Delivery: " + moment(delivery.deliveryDate).format("MM-DD-YYYY hh:mm a Z") + "<br>" + "Operational Status: " + status;
                Notification.create({ title: "Operational Status Changed", body: body, type:"update" }).exec(function(err, data) {
                    if(err) {
                        cb();
                    }
                    else {
                        sails.sockets.broadcast('notifications', 'new notification', data);
                        cb();
                    }
                });
            }
            else {
                cb();
            }
        }, function(err) {
            cb();
        });   
    },
}