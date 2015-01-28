var moment=require('moment');

module.exports={
    processOrder:function(req,res){
        var order=req.body;
        delete order._csrf;
        delete order.user;
        order.contactPhone=order.contactPhone.replace(/\D/g,'');
        if(order.items.length < 1){
            return res.serverError();
        }
        if(req.user.testUser){
            return res.send(200);
        }
        MenuItem.find().exec(function(err, items){
            items = PriceService.processPricing(items);
            var processedOrder = OrderService.process(items, order);
            if(processedOrder) {
                processedOrder.type = "scheduled";
                if(processedOrder.paymentType === "cash") {
                    OrderService.submitCash(processedOrder, req.user.id, function(response){
                        if(response) {
                            res.ok();
                        }
                        else {
                            res.serverError();
                        }
                    });
                }
                else if(processedOrder.paymentType === "swyftdebit") {
                    OrderService.submitSwyftDebit(processedOrder, req.user.id, function(response){
                        if(response) {
                            res.ok();
                        }
                        else {
                            res.serverError();
                        }
                    });
                }
            }
            else {
                res.serverError();
            }
        });    
    },
   getOrders:function(req,res){
        Order.find().where({deliveryPeriod:req.body.deliveryPeriod, isDeleted:false, hasFulfillment:false}).exec(function(err, items){
            OrderService.iterateJoinUsers(items, function(orders) {
                return res.json(orders);
            })
        });        
    },
    getOrder: function(req, res) {
        Order.findOne({id: req.query.orderId}).exec(function(err, order) {
            res.json(order);
        });
    },
    deleteOrder:function(req,res){
        Order.update({id:req.body.id}, {isDeleted:true}).exec(function(err, order){
            if(!err){
                res.send(200);
            }
        });
    },
    pendingOrders:function(req,res){
        Order.find({userId:req.user.id.toString(), isDelivered:false}).exec(function(err, orders){
            res.json(orders);
        });
    },
    recentOrders:function(req,res){
        Order.find({userId:req.user.id.toString(), isDelivered:true}).limit(10).exec(function(err, orders){
            res.json(orders);
        });
    },
    getDeliveryOrders:function(req,res){
        Delivery.findOne({ adminClosed: false }).exec(function(err, delivery){
            Order.find({ deliveryId: delivery.id }).exec(function(err, items){
                /*
                OrderService.joinOrders(items, function(results) {
                    OrderService.iterateJoinUsers(results, function(orders) {
                        res.json(orders);
                    });
                });
                */
                OrderService.iterateJoinUsers(items, function(orders) {
                    res.json(orders);
                });
            });
        });
    }
}