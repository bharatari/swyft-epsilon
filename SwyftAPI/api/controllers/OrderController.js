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
       //I sloppily recreated a for loop to circumvent the issues with async code
        var orders=[];
        function process(callback){
            function loop(i){
                if(i<orders.length){
                    function query(callback){
                        User.find().where({id:orders[i].userId}).exec(function(err, user){
                            orders[i].user=user[0];
                            callback();
                        });
                    }
                    query(function(){
                        loop(i+1);
                    });
                }
                else{
                    callback();
                }
            }
            loop(0);
        }
        Order.find().where({deliveryPeriod:req.body.deliveryPeriod, isDeleted:false, hasFulfillment:false}).exec(function(err, items){
            orders=items;
            process(function(){
                res.json(orders);
            });
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
        var orders=[];
        function process(callback){
            function loop(i){
                if(i<orders.length){
                    function query(callback){
                        User.find().where({id:orders[i].userId}).exec(function(err, user){  
                            var userObj = UserService.deleteSensitive(user[0]);
                            orders[i].user=userObj;
                            callback();
                        });
                    }
                    query(function(){
                        loop(i+1);
                    });
                }
                else{
                    callback();
                }
            }
            loop(0);
        }
        Delivery.findOne({ closed: true, adminClosed: false }).exec(function(err, delivery){
            Order.find({ deliveryId: delivery.id }).exec(function(err, items){
                orders=items;
                process(function(){
                    res.json(orders);
                });
            });
        });
    }
}