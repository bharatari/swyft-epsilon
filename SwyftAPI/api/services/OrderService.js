var async = require('async');

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
    similarOrders: function(order1, order2) {
        if(order1.deliveryLocation !== order2.deliveryLocation) {
            return false;
        }
        else if(order1.contactPhone !== order2.contactPhone) {
            return false;
        }
        else if(order1.paymentType !== order2.paymentType) {
            return false;
        }
        else {
            return true;
        }
    },
    combineOrders: function(order1, order2) {
        var order = {};
        order.id = order1.id;
        order.paymentType = order1.paymentType;
        //order.deliveryLocation = order1.deliveryLocation;
        order.deliveryLocation = "HELLO";
        order.contactPhone = order1.contactPhone;
        order.actualAmount = order1.actualAmount;
        order.actualAmountAmount += order2.actualAmount;
        order.userId = order1.userId;
        if(order1.userComments) {
            order.userComments += order1.userComments;
        }
        if(order2.userComments) {
            order.userComments += " " + order2.userComments;
        }   
        order.items = [];
        for(var i = 0; i < order1.items.length; i++) {
            order.items.push(order1.items[i]);
        }
        for(var i = 0; i < order2.items.length; i++) {
            order.items.push(order2.items[i]);
        } 
        return order;
    },
    joinUser: function(order) {
        User.findOne({ id:order.userId }).exec(function(err, user){  
            order.user = UserService.deleteSensitive(user);
            return order;
        });
    },
    iterateJoinUsers: function(items, callback) {
        //Transition to UtilityService.forLoop
        function loop(i){
            if(i<items.length){
                function query(cb){
                    User.find().where({id:items[i].userId}).exec(function(err, user){
                        items[i].user=user[0];
                        cb();
                    });
                }
                query(function(){
                    loop(i+1);
                });
            }
            else{
                callback(items);
            }
        }
        loop(0);
    },
    joinOrders: function(items, callback) {
        function process(final) {
            async.each(items, function(item, cb) {
                /*
            async.each(items, function(_item, _callback) {
                if(_item.userId) {
                    if(item.userId === _item.userId) {
                        if(this.similarOrders(item, _item)) {
                            console.log('items same');
                            item = this.combineOrders(item, _item);
                            console.log(item);
                            _item = null;
                        }
                    }
                }
                _callback();
            });
            */
                for(var e = 0; e < items.length; e++) {
                    if(items[e].userId) {
                        if(item.userId === items[e].userId) {
                            if(this.similarOrders(item, items[e])) {
                                item = this.combineOrders(item, items[e]);
                                items[e] = null;
                            }
                        }
                    }
                }   
                cb();
            });
            final();
        }
        process(function() {
            callback(items);
        });
    }
}