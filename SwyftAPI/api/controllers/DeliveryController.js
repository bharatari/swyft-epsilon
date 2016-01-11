var moment = require('moment');

module.exports = {
    getOpenDeliveries: function(req,res){
        Delivery.find({closed: false}).exec(function(err, deliveries){
            res.json(deliveries);
        });
    },
    getAdminDeliveries: function(req, res) {
        Delivery.find({adminClosed: false}).exec(function(err, deliveries){
            res.json(deliveries);
        });
    },
    getDeliveryOrders: function(req, res) {
        Order.find({ deliveryId: req.params.delivery_id }).exec(function(err, items) {
            async.each(items, function(order, callback) {
                User.findOne({ id: order.userId }).exec(function(err, user) {
                    order.user = user;
                    callback();
                });
            }, function(err) {
                res.json(items);
            });
        });
    },
    createDelivery:function(req,res){
        var deliveryTime = new Date(req.body.deliveryTime);
        var orderCutoff = new Date(req.body.orderCutoff)
        Delivery.create({ deliverers:req.body.deliverers, deliveryDate:deliveryTime, comments:req.body.comments, restaurants:"All", autoDelivery:true , orderCutoff:orderCutoff }).exec(function(err, fulfillment){
            if(err) {
                res.badRequest();
            }
            else {
                res.ok();
            }
        });
    },
    completeDelivery: function(req,res){
        DeliveryNoteService.setOrdersToDelivered(req.body.deliveryId, req.user.id, function(err, result) {
            res.ok();
        });
    },
    closeDelivery:function(req,res){
        Delivery.update({ id: req.body.id }, { closed: true }).exec(function(err, delivery){
            if(err) {
                return res.badRequest();
            }
            else {
                res.ok();
            }
        });
    },
    /**
     * Sets offsets for estimated delivery and arrival times.
     *
     * @param {number} offset - Offset in minutes
     * @param {string} deliveryId
     *
     * @tag - timezone
     */
    setDeliveryOffset: function(req, res) {
        if(req.body) {
            if(req.body.offset && req.body.deliveryId) {
                DeliveryService.setDeliveryOffset(req.body.offset, req.body.deliveryId, function(err, result) {
                    if(err || !result) {
                        return res.badRequest();
                    } else {
                        return res.ok();
                    }
                });
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
    },
    setDeliveryStatus: function(req, res) {
        if(req.body) {
            if(req.body.status && req.body.deliveryId) {
                Delivery.update({ id: req.body.deliveryId }, { deliveryStatus: req.body.status }).exec(function(err, data) {
                    if(err) {
                        return res.badRequest();
                    }
                    else {
                        NotificationService.createDeliveryStatusNotification(data, req.body.status, function() {
                            return res.ok();
                        });
                    }
                });
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
    },
    setOperationalStatus: function(req, res) {
        if(req.body) {
            if(req.body.status && req.body.deliveryId) {
                Delivery.update({ id: req.body.deliveryId }, { operationalStatus: req.body.status }).exec(function(err, data) {
                    if(err) {
                        return res.badRequest();
                    }
                    else {
                        NotificationService.createOperationalStatusNotification(data, req.body.status, function() {
                            return res.ok();
                        });
                    }
                });
            }
            else {
                return res.badRequest();
            }
        }
        else {
            return res.badRequest();
        }
    },
    getDeliveryLiveStatus: function(req, res) {
        Delivery.find({ adminClosed: false }).exec(function(err, deliveries) {
            if(err || !deliveries) {
                return res.ok();
            }
            else if(deliveries.length > 0) {
                DeliveryService.findLatest(deliveries, function(delivery) {
                    if(delivery) {
                        return res.json(delivery);
                    }
                    else {
                        return es.ok();
                    }
                });
            }
            else {
                return res.ok();
            }
        });
    },
    getDeliveryMetadata: function(req, res) {
        MetaService.getDeliveryMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getDeliveryModel: function(req, res) {
        res.json(new ModelService.Delivery());
    }
}
