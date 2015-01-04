module.exports = {
    process: function(menuItems, order) {
        var menuItem={};
        for(var i = 0; i < order.items.length; i++){
            for(var e = 0; e < menuItems.length; e++){
                if(menuItems[e].id==order.items[i].id){
                    menuItem=menuItems[e];
                }
            }
            order.items[i].price=menuItem.baseprice;
            if(order.items[i].options){
                if(menuItem.itemOptions){
                    for(var e = 0; e< order.items[i].options.length; e++){
                        if(menuItem.itemOptions[e].hasOwnProperty(order.items[i].options[e].name)){ }
                        else {
                            return false;
                        }
                    }
                }
            }
            if(order.items[i].options){
                for (var property in order.items[i].options) {
                    if (order.items[i].options.hasOwnProperty(property)) {
                        if(order.items[i].options[property].price){
                            for(var z = 0; z < menuItem.itemOptions.length; z++){
                                if(menuItem.itemOptions[z].name === property){
                                    for(var c = 0; c < menuItem.itemOptions[z].options.length; c++){
                                        if(menuItem.itemOptions[z].options[c].name === order.items[i].options[property].name){
                                            order.items[i].price += menuItem.itemOptions[z].options[c].price;
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
                        for(var z = 0; z < menuItem.extras.length; z++){
                            if(menuItem.extras[z].name === property){
                                order.items[i].price += menuItem.extras[z].price;
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
        order.totalAmount = 0;
        for (var f = 0; f < order.items.length; f++) {
            order.totalAmount += order.items[f].price;
        }
        if(order.deliveryId) {
            Delivery.findOne({id:order.deliveryId}).exec(function(err, delivery){
                if(err) {
                    return false;
                }
                else {
                    order.deliveryTime=delivery.deliveryDate;
                }
            });
        }
        else {
            return false;
        }
        var tax=Math.round((order.totalAmount*0.09)*10)/10;
        order.totalAmount=order.totalAmount+tax;
        order.totalAmount=Math.round(order.totalAmount*10)/10;
        /*
        if(req.user.isDeliverer){
            Coupon.find({name:"LogisticsDiscount"}).exec(function(err, coupon){
                order.actualAmount=order.totalAmount*(1-coupon[0].discount).toFixed(1);
                order.couponId=coupon[0].id;
                return order;
            });
        }
        else if(req.user.isEmployee){
            Coupon.find({name:"MemberDiscount"}).exec(function(err, coupon){
                order.actualAmount=order.totalAmount*(1-coupon[0].discount).toFixed(1);
                order.couponId=coupon[0].id;
                return order;
            });
        }
        else{
            order.actualAmount = order.totalAmount;   
            return order;
        }            
        */
        order.actualAmount = order.totalAmount;
        return order;
    },
    submit: function(order) {
        User.find({id:req.user.id}).exec(function(err,user){
            Order.create(order).exec(function(err){
                if(!err){
                    if(order.paymentType=="swyftdebit"){
                        if(order.actualAmount<=user[0].balance){
                            UserTransaction.create({userId:req.user.id, type:"deduction", amount:order.actualAmount, orderId:order.id}).exec(function(err){
                                if(!err){
                                    User.update({id:req.user.id}, {balance:user[0].balance-order.actualAmount}).exec(function(err){
                                        if(err){
                                            return false;
                                        }
                                        else{
                                            return true;
                                        }
                                    });

                                }
                                else{
                                    return false;
                                }
                            });
                        }
                        else{
                            return false;
                        }
                    }
                    else{   
                        return true;
                    }
                }
                else{
                    return false;
                }
            });
        });
    }
}