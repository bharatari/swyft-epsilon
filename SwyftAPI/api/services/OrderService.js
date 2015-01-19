module.exports = {
    process: function(menuItems, order) {
        var menuItem={};
        Array.prototype.where = function(props) {
            return this.filter(function(e) {
                for (var p in props)
                    if (e[p] !== props[p])
                        return false;
                return true;
            });
        }
        for(var i = 0; i < order.items.length; i++){
            for(var e = 0; e < menuItems.length; e++){
                if(menuItems[e].id==order.items[i].id){
                    menuItem=menuItems[e];
                }
            }
            order.items[i].price=menuItem.baseprice;
            var allOptions = new Array();
            for(var e = 0; e < menuItem.itemOptions.length; e++) {
                if(menuItem.itemOptions[e].name !== "Options") {
                    for(var a = 0; a < menuItem.itemOptions[e].options.length; a++) {
                        if(menuItem.itemOptions[e].options[a].price) {
                            allOptions.push({name: menuItem.itemOptions[e].options[a].name, price: menuItem.itemOptions[e].options[a].price, category: menuItem.itemOptions[e].name});
                        }
                        else {
                            allOptions.push({name: menuItem.itemOptions[e].options[a].name, category:menuItem.itemOptions[e].name});
                        }
                    }
                }
                
            }
            if(order.items[i].options) {
                for(var e = 0; e < order.items[i].options.length; e++) {
                    if(order.items[i].options[e].price) {
                        order.items[i].options[e].price = parseFloat(order.items[i].options[e].price);
                    }
                    if(!allOptions.where(order.items[i].options[e])) {
                        return false;   
                    }
                }
                for(var e = 0; e < order.items[i].options.length; e++) {
                    if(order.items[i].options[e].price) {
                        order.items[i].price += order.items[i].options[e].price;
                    }
                }
            }
            if(order.items[i].extras){
                for(var e = 0; e < order.items[i].extras.length; e++) {
                    order.items[i].extras[e].price = parseFloat(order.items[i].extras[e].price);
                    if(!menuItem.extras.where(order.items[i].extras[e])) {
                        return false;
                    }
                }
                for(var e = 0; e < order.items[i].extras.length; e++) {
                    order.items[i].price += order.items[i].extras[e].price;
                }
            }
            /*
            if(order.items[i].standardOptions){
                var array=[];
                for(var y = 0; y < order.items[i].standardOptions.length; y++){
                    if(order.items[i].standardOptions[y].isSelected===true){
                        array.push(order.items[i].standardOptions[y]);
                    }
                }
                order.items[i].standardOptions=array;
            }
            */
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
        order = PriceService.processTax(order);
        order.actualAmount = order.totalAmount;
        return order;
    },
    submitCash: function(order, userId, cb) {
        User.findOne({id: userId}).exec(function(err, user){
            Order.create(order).exec(function(err, result){
                if(!err){  
                    cb(true);
                }
                else{
                    cb(false);
                }
            });
        });
    },
    submitSwyftDebit: function(order, userId, cb) {
        User.findOne({id: userId}).exec(function(err, user){
            if(order.actualAmount <= user.balance){
                Order.create(order).exec(function(err, result){
                    if(!err){                        
                        UserTransaction.create({userId: user.id, type: "deduction", amount: result.actualAmount, orderId: result.id}).exec(function(err){
                            if(!err){
                                var newBalance = user.balance - result.actualAmount;
                                User.update({id: user.id}, {balance: newBalance}).exec(function(err){
                                    if(err){
                                        cb(false);
                                    }
                                    else{
                                        cb(true);
                                    }
                                });

                            }
                            else{
                                cb(false);
                            }
                        });                        
                    }
                    else{
                        cb(false);
                    }
                });
            }
            else {
                cb(false);
            }
        });
    },
}