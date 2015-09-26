var moment=require('moment');

module.exports={
    processOrder: function(req,res) {
        var order = req.body;
        delete order.user;
        order.contactPhone = order.contactPhone.replace(/\D/g,'');
        if(order.items.length < 1) {
            return res.badRequest();
        }
        if(req.user.testUser) {
            return res.ok();
        }
        OrderService.checkDelivery(order.deliveryId, function(response) {
            if(response) {
                MenuItem.find().exec(function(err, items) {
                    items = PriceService.processPricing(items);
                    OrderService.processAsync(items, order, function(result) {
                        if(!result) {
                            return res.badRequest(); 
                        }
                        else {
                            order = result;
                            OrderService.processOrder(order, function(result2) {
                                if(!result2) {
                                    return res.badRequest();
                                }
                                else {
                                    order = result2;
                                    order.type = "scheduled";
                                    if(order.paymentType === "cash") {
                                        OrderService.submitCash(order, req.user.id, function(response){
                                            if(response) {
                                                User.publishCreate(response.toJSON());               
                                                res.json(response);
                                            }
                                            else {
                                                res.serverError();
                                            }
                                        });
                                    }
                                    else if(order.paymentType === "swyftdebit") {
                                        OrderService.submitSwyftDebit(order, req.user.id, function(response){
                                            if(response) {
                                                User.publishCreate(response.toJSON()); 
                                                res.json(response);
                                            }
                                            else {
                                                res.serverError();
                                            }
                                        });
                                    }
                                    else if(order.paymentType === "cash+swyftdebit") {
                                        OrderService.submitCashSwyftDebit(order, req.user.id, function(response){
                                            if(response) {
                                                User.publishCreate(response.toJSON()); 
                                                res.json(response);
                                            }
                                            else {
                                                res.serverError();
                                            }
                                        });
                                    }
                                    else if(order.paymentType === "creditcard") {
                                        OrderService.submitCreditCard(order, req.user.id, req.body.stripeToken, function(response, message){
                                            if(response) {
                                                User.publishCreate(response.toJSON()); 
                                                res.json(response);
                                            }
                                            else {
                                                res.badRequest(message);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });    
            }
            else {
                return res.badRequest("INVALID_DELIVERY");
            }
        });
    },
    getOrders:function(req,res){
        Order.find().where({deliveryPeriod:req.body.deliveryPeriod, isDeleted:false, hasFulfillment:false}).exec(function(err, items){
            UserService.joinUsers(items, function(orders) {
                return res.json(orders);
            });
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
        DeliveryNoteService.getPendingOrders(req.user.id, function(orders) {
            res.json(orders);
        });
    },
    recentOrders:function(req,res){
        DeliveryNoteService.getRecentOrders(req.user.id, function(orders) {
            res.json(orders);
        });
    },
    getDeliveryOrders:function(req,res){
        Delivery.find({ adminClosed: false }).exec(function(err, deliveries){
            DeliveryService.findLatest(deliveries, function(delivery) {
                Order.find({ deliveryId: delivery.id }).exec(function(err, items){
                    /*
                OrderService.joinOrdersSameUser(items, function(results) {
                    UserService.joinUsers(results, function(orders) {
                        res.json(orders);
                    });
                });
                */
                    UserService.joinUsers(items, function(orders) {
                        res.json(orders);
                    });
                });
            });
        });
    },
    getAggregateOrders:function(req,res){
        Order.find({ deliveryId: req.params.delivery_id }).exec(function(err, orders){
            OrderService.getAllItems(orders, function(aggregate) {
                res.json(aggregate);
            });
        });
    },
    getMasterList:function(req,res){
        Order.find({ deliveryId: req.params.delivery_id }).exec(function(err, items){
            if(err || !items) {
                res.serverError();
            }
            OrderService.getMasterList(items, function(result) {
                res.json(result);
            });
        });
    },
    getAllOrders: function(req, res) {
        Order.find({ isDeleted: false }).exec(function(err, orders) {
            UserService.joinUsers(orders, function(result) {
                res.json(result);
            });
        });
    },
    getChartData: function(req, res) {
        Delivery.find().sort({ createdAt: 'desc' }).limit(10).exec(function(err, deliveries) {
            OrderService.getChartData(deliveries, function(result) {
                res.json(result);
            });
        });
    },
    find: function(req, res) {
        OrderService.getOrders(req.query, function(result) {
            res.json(result);
        });
    },
    findOne: function(req, res) {
        Order.findOne({ id: req.params.id }).exec(function(err, order) {
            UserService.joinUser(order, function(result) {
                if(!order.deliveryNote) {
                    order.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, null, null, null, null);
                }
                res.json(result);
            });
        });
    },
    liveOrders: function(req, res) {
        if(req.isSocket == true) {
            Order.watch(req);
            res.send('Connected');
        }
        else {
            res.badRequest('You must be using WebSockets for this request.');
        }
    },
    getAdminRecentOrders: function(req, res) {
        Order.find().limit(10).sort({ createdAt: "desc" }).exec(function(err, orders) {
            res.json(orders);
        });
    },
    getOrderMetadata: function(req, res) {
        MetaService.getOrderMetadata(req.query.limit, req.query.where, function(result) {
            res.json(result);
        });
    },
    getOrderModel: function(req, res) {
        res.json(new ModelService.Order());
    }
}