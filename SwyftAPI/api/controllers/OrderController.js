var moment=require('moment');

module.exports={
    deliveryPeriods:function(req,res){
        DeliveryPeriod.find({isActive:true}).exec(function(err, items){
            res.json(items);
        });                                   
    },
    adminDeliveryPeriods:function(req,res){
        DeliveryPeriod.find({isAdminActive:true}).exec(function(err, items){
            res.json(items);
        }); 
    },
    processOrder:function(req,res){
        var order=req.body;
        delete order._csrf
        order.contactPhone=order.contactPhone.replace(/\D/g,'');
        var menuItems=[];
        if(order.items.length<1){
            return res.send(500);
        }
        if(req.user.testUser){
            return res.send(200);
        }
        MenuItem.find().exec(function(err, items){
            for(var i=0;i<items.length;i++){
                if(items[i].restaurant==="mcdonalds"){
                    items[i].baseprice = items[i].baseprice*1.2;
                    items[i].baseprice=Math.round(10*items[i].baseprice)/10;
                    if(items[i].small){
                        items[i].small=Math.round(10*items[i].small)/10;
                    }
                    if(items[i].medium){
                        items[i].medium=Math.round(10*items[i].medium)/10;
                    }
                    if(items[i].large){
                        items[i].large=Math.round(10*items[i].large)/10;
                    }
                }
                else{
                    items[i].baseprice = items[i].baseprice*1.2;
                }
            }
            menuItems=items;
            process();
        }); 
        function process(){
            var result={};
            for(var i = 0; i < order.items.length; i++){
                for(var e=0;e<menuItems.length;e++){
                    if(menuItems[e].id==order.items[i].id){
                        result=menuItems[e];
                    }
                }
                order.items[i].price=result.baseprice;
                if(order.items[i].restaurant==="mcdonalds"){
                    if(order.items[i].meal){
                        if(order.items[i].meal=="medium"){
                           order.items[i].price+=result.medium;
                        }   
                        else if(order.items[i].meal=="large"){
                            order.items[i].price+=result.large;
                        }
                        else if(order.items[i].meal=="small"){
                            order.items[i].price+=result.small;
                        }
                        else{
                            //return
                        }
                    }
                    else if(order.items[i].size){
                        if(order.items[i].size=="medium"){
                            order.items[i].price+=result.medium;
                        }
                        else if(order.items[i].size=="large"){
                            order.items[i].price+=result.large;
                        }
                        else if(order.items[i].size=="small"){
                            order.items[i].price+=result.small;
                        }
                        else{
                            //return
                        }
                    }
                }
                else if(order.items[i].restaurant==="lasolas"){
                    if(order.items[i].options){
                        if(result.itemoptions){
                            for(var e = 0; e<result.itemoptions.length;e++){
                                if(order.items[i].options.hasOwnProperty(result.itemoptions[e].name)){

                                }
                                else if(result.itemoptions[e].name==="Options"){

                                }
                                else{
                                    return res.send(500);
                                }
                            }
                        }
                    }
                    if(order.items[i].options){
                        for (var property in order.items[i].options) {
                            if (order.items[i].options.hasOwnProperty(property)) {
                                if(property==="Meat"){
                                    for(var z=0;z<result.itemoptions.length;z++){
                                        if(result.itemoptions[z].name==property){
                                            for(var c=0; c<result.itemoptions[z].options.length;c++){
                                                if(result.itemoptions[z].options[c].name==order.items[i].options[property].name){
                                                    order.items[i].price+=result.itemoptions[z].options[c].price;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(order.items[i].extras){
                        for (var property in order.items[i].extras) {
                            if (order.items[i].extras.hasOwnProperty(property)) {
                                for(var z=0;z<result.extras.length;z++){
                                    if(result.extras[z].name===property){
                                        order.items[i].price+=result.extras[z].price;
                                    }
                                }
                            }
                        }
                    }
                    if(order.items[i].standardOptions){
                        var array=[];
                        for(var y=0;y<order.items[i].standardOptions.length;y++){
                            if(order.items[i].standardOptions[y].isSelected===true){
                                array.push(order.items[i].standardOptions[y]);
                            }
                        }
                        order.items[i].standardOptions=array;
                    }
                }
            }
            order.totalAmount = 0;
            for (var f = 0; f < order.items.length; f++) {
                order.totalAmount += order.items[f].price;
            }
            if(order.deliveryDate){
                order.deliveryDate=moment(order.deliveryTime, "dddd, MMMM Do YYYY, h:mm:ss a").toDate();
            }
            else{
                res.send(500);
            }
            var tax=Math.round((order.totalAmount*0.09)*10)/10;
            order.totalAmount=order.totalAmount+tax;
            order.totalAmount=Math.round(order.totalAmount*10)/10;
            if(req.user.isDeliverer){
                Coupon.find({name:"LogisticsDiscount"}).exec(function(err, coupon){
                    order.actualAmount=order.totalAmount*(1-coupon[0].discount).toFixed(1);
                    order.couponId=coupon[0].id;
                    submit();
                });
            }
            else if(req.user.isEmployee){
                Coupon.find({name:"MemberDiscount"}).exec(function(err, coupon){
                    order.actualAmount=order.totalAmount*(1-coupon[0].discount).toFixed(1);
                    order.couponId=coupon[0].id;
                    submit();
                });
            }
            else{
                order.actualAmount = order.totalAmount;   
                submit();
            }            
        }
        function submit(){
            User.find({id:req.user.id}).exec(function(err,user){
                Order.create(order).exec(function(err){
                    if(!err){
                        if(order.paymentType=="swyftdebit"){
                            if(order.actualAmount<=user[0].balance){
                                UserTransaction.create({userId:req.user.id, type:"deduction", amount:order.actualAmount, orderId:order.id}).exec(function(err){
                                    if(!err){
                                        User.update({id:req.user.id}, {balance:user[0].balance-order.actualAmount}).exec(function(err){
                                            if(err){
                                                res.send(500);
                                            }
                                            else{
                                                res.send(200);
                                            }
                                        });
                                        
                                    }
                                    else{
                                        res.send(500);
                                    }
                                });
                            }
                            else{
                                res.send("Not enough balance");
                            }
                        }
                        else{   
                            res.send(200);
                        }
                    }
                    else{
                        console.log(err);
                        res.send(500);
                    }
                });
            });
        }
    },
    retrieveOrders:function(req,res){
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
    addDeliveryPeriod:function(req,res){
        DeliveryPeriod.create({datetime:req.body.datetime}).exec(function(err){
            if(err){
                res.send(500);
            }
            else{
                res.send(200);
            }
        });
    },
    createFulFillment:function(req,res){
        var deliveryTime=moment(req.body.deliveryTime, "dddd, MMMM Do YYYY, h:mm:ss a").toDate();
        Fulfillment.create({deliverer:req.body.deliverer, deliveryTime:deliveryTime,deliveryPeriod:req.body.deliveryPeriod}).exec(function(err, fulfillment){
            Order.update({deliveryPeriod:req.body.deliveryPeriod},{hasFulfillment:true, fulfillmentId:fulfillment.id}).exec(function(err){
                res.send(200);
            });
        });
    },
    getFulfillments:function(req,res){
        Fulfillment.find({isDelivered:false}).exec(function(err, fulfillment){
            res.json(fulfillment);
        });
    },
    completeFulfillment:function(req,res){
        Fulfillment.update({id:req.body.fulfillmentId}, {isDelivered:true}).exec(function(err, fulfillment){
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