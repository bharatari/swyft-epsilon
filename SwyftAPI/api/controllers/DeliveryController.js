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
    /** BUG **/
    completeDelivery: function(req,res){
        DeliveryNoteService.setOrdersToDelivered(req.body.deliveryId, function() {
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
    getDeliveryMetadata: function(req, res) {
        MetaService.getDeliveryMetadata(req.query.limit, function(result) {
            res.json(result);
        });
    },
    getDeliveryModel: function(req, res) {
        res.json(new ModelService.Delivery());
    }
}