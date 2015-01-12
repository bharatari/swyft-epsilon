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
        /*
        var orders=[];
        function process(callback){
            for(var i = 0; i < orders.length; i++) {
                User.findOne({id: orders[i].userId}).exec(function(err, user){
                    orders[i].user = user;
                });
            }
            callback();
        }        
        Order.find({deliveryId:req.params.delivery_id}).exec(function(err, items){
            orders = items;
            process(function() {
                res.json(orders);
            });
        });
        */
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
        Order.find({deliveryId:req.params.delivery_id}).exec(function(err, items){
            orders=items;
            process(function(){
                res.json(orders);
            });
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