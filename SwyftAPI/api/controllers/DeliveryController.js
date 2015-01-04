module.exports = {
    getOpenDeliveries: function(req,res){
        Delivery.find({closed: false, isDelivered: false}).exec(function(err, deliveries){
            res.json(deliveries);
        });
    },
    getAdminDeliveries: function(req, res) {
        Delivery.find({adminClosed: false}).exec(function(err, deliveries){
            res.json(deliveries);
        });
    },
    getDelivery: function(req, res) {
        Delivery.findOne({id: req.params.delivery_id}).exec(function(err, delivery){
            res.json(delivery);
        });
    },
    createDelivery:function(req,res){
        var deliveryTime=moment(req.body.deliveryTime, "dddd, MMMM Do YYYY, h:mm:ss a").toDate();
        Delivery.create({deliverer:req.body.deliverer, deliveryTime:deliveryTime,deliveryPeriod:req.body.deliveryPeriod}).exec(function(err, fulfillment){
            Order.update({deliveryPeriod:req.body.deliveryPeriod},{hasFulfillment:true, fulfillmentId:fulfillment.id}).exec(function(err){
                res.send(200);
            });
        });
    },
    completeDelivery: function(req,res){
        Delivery.update({id:req.body.fulfillmentId}, {isDelivered:true}).exec(function(err, fulfillment){
            Order.update({fulfillmentId:req.body.fulfillmentId},{isDelivered:true}).exec(function(err){
                res.send(200);
            });
        });
    },
    closeDeliveryPeriod:function(req,res){
        DeliveryPeriod.update({id:req.body.id}, {isActive:false}).exec(function(err, fulfillment){
            res.send(200);
        });
    }
}