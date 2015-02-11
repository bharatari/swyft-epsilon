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
        var deliveryTime = new Date(req.body.deliveryTime);
        var orderCutoff = new Date(req.body.orderCutoff)
        Delivery.create({deliverers:req.body.deliverers, deliveryDate:deliveryTime, comments:req.body.comments, restaurants:"All", mainDelivery:true, orderCutoff:orderCutoff}).exec(function(err, fulfillment){
            if(err) {
                res.badRequest();
            }
            else {
                res.ok();
            }
        });
    },
    completeDelivery: function(req,res){
        Order.update({deliveryId: req.body.deliveryId},{isDelivered:true, deliveredAt: new Date()}).exec(function(err){
            res.send(200);
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
    }
}