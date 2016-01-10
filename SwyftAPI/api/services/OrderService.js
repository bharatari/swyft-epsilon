var async = require('async');
var _ = require('lodash');
var Q = require('q');
var math = require('mathjs');
var moment = require('moment');

module.exports = {
    processAsync: function(menuItems, order, cb) {
        var self = this;
        async.each(order.items, function(orderItem, callback) {
            async.each(menuItems, function(item, callback2) {
                if(orderItem.id === item.id) {
                    self.processItem(item, orderItem, function(result) {
                        if(!result) {
                            return cb(false);
                        }
                        else {
                            orderItem = result;
                            callback2();
                        }
                    });
                }
                else {
                    callback2();
                }
            }, function(err) {
                callback();
            });
        }, function(err) {
            cb(order);
        });
    },
    processItem: function(menuItem, item, cb) {
        Array.prototype.where = function(props) {
            return this.filter(function(e) {
                for (var p in props)
                    if (e[p] !== props[p])
                        return false;
                return true;
            });
        }
        item.price = menuItem.baseprice;
        var allOptions = new Array();
        async.each(menuItem.itemOptions, function(itemOption, callback) {
            if(itemOption.name !== "Options") {
                async.each(itemOption.options, function(option, callback2) {
                    if(option.price) {
                        allOptions.push({ name: option.name, price: option.price, category: itemOption.name });
                    }
                    else {
                        allOptions.push({ name: option.name, category: itemOption.name });
                    }
                    callback2();
                }, function(err) {
                    callback();
                });
            }
            else {
                callback();
            }
        }, function(err) {
            options();
        });

        function options() {
            if(item.options) {
                async.each(item.options, function(option, callback) {
                    if(option.price) {
                        option.price = parseFloat(option.price);
                    }
                    /*
                    if(!allOptions.where(option)) {
                        return cb(false);
                    }
                    */
                    callback();
                }, function(err) {
                    async.each(item.options, function(option, callback2) {
                        if(option.price) {
                            item.price += option.price;
                        }
                        callback2();
                    }, function(err) {
                        extras();
                    });
                });
            }
            else {
                extras();
            }
        }

        function extras() {
            if(item.extras) {
                async.each(item.extras, function(extra, callback) {
                    extra.price = parseFloat(extra.price);
                    /*
                    if(!menuItem.extras.where(extra)) {
                        return cb(false);
                    }
                    */
                    callback();
                }, function(err) {
                    async.each(item.extras, function(extra, callback2) {
                        item.price += extra.price;
                        callback2();
                    }, function(err) {
                        attachedRequests();
                    });
                });
            }
            else {
                attachedRequests();
            }
        }

        function attachedRequests() {
            if(item.attachedRequests) {
                async.each(item.attachedRequests, function(attachedRequest, callback) {
                    if(attachedRequest.price) {
                        attachedRequest.price = parseFloat(attachedRequest.price);
                    }
                    callback();
                }, function(err) {
                    async.each(item.attachedRequests, function(attachedRequest, callback2) {
                        if(attachedRequest.price) {
                            item.price += attachedRequest.price;
                        }
                        callback2();
                    }, function(err) {
                        standardOptions();
                    });
                });
            }
            else {
                standardOptions();
            }
        }

        function standardOptions() {
            //I don't think we're accounting for "No " as in default: true
            // Test with Pad Thai Bubble Tea with No Ice option
            // Test with McDonalds item with No something option
            /*
            if(item.standardOptions) {
                var options;
                async.each(menuItem.itemOptions, function(option, callback) {
                    if(option.name === "Options") {
                        options = option.options.split(", ");
                    }
                    callback();
                }, function(err) {
                    processOptions();
                });
                function processOptions() {
                    async.each(item.standardOptions, function(option, callback) {
                        if(!_.contains(options, option.name)) {
                            return cb(false);
                        }
                        callback();
                    }, function(err) {
                        cb(item);
                    });
                }
            }
            else {
                cb(item);
            }*/
            cb(item);
        }
    },
    processOrder: function(order, cb) {
        order.totalAmount = 0;
        for (var f = 0; f < order.items.length; f++) {
            if(!order.items[f].quantity) {
                order.items[f].quantity = 1;
            }
            order.totalAmount += order.items[f].price * order.items[f].quantity;
        }
        if(order.deliveryId) {
            Delivery.findOne({ id: order.deliveryId }).exec(function(err, delivery){
                if(err) {
                    final(false);
                }
                else {
                    order.deliveryTime=delivery.deliveryDate;
                    final(order);
                }
            });
        }
        else {
            final(false);
        }
        function final(order) {
            if(!order) {
                return cb(false);
            }
            else {
                order = PriceService.processTax(order);
                order.actualAmount = order.totalAmount;
                CouponService.processToken(order, function(result) {
                    if(!result) {
                        return cb(false);
                    }
                    else {
                        CouponService.processCoupon(order, function(result) {
                            if (!result) {
                                return cb(false);
                            } else {
                                cb(order);
                            }
                        });
                    }
                });
            }
        }
    },
    submitCash: function(order, userId, cb) {
        order.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, null, null, null, null);
        // Why do we need to find the user here?
        User.findOne({ id: userId }).exec(function(err, user) {
            Order.create(order).exec(function(err, result) {
                if(!err) {
                    cb(result);
                }
                else {
                    cb(false);
                }
            });
        });
    },
    submitSwyftDebit: function(order, userId, cb) {
        order.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, null, null, null, null);
        User.findOne({ id: userId }).exec(function(err, user) {
            if(order.actualAmount <= user.balance){
                Order.create(order).exec(function(err, result) {
                    if(!err) {
                        UserTransaction.create({ userId: user.id, type: "deduction", amount: result.actualAmount, orderId: result.id, finalBalance: MathService.subtract(user.balance, result.actualAmount) }).exec(function(err) {
                            if(!err) {
                                var newBalance = MathService.subtract(user.balance, result.actualAmount);
                                User.update({ id: user.id }, { balance: newBalance }).exec(function(err) {
                                    if(err) {
                                        cb(false);
                                    }
                                    else {
                                        cb(result);
                                    }
                                });

                            }
                            else {
                                cb(false);
                            }
                        });
                    }
                    else {
                        cb(false);
                    }
                });
            }
            else {
                cb(false);
            }
        });
    },
    submitCashSwyftDebit: function(order, userId, cb) {
        var referenceOrder = _.cloneDeep(order);
        delete order.cashPayment;
        delete order.debitPayment;
        order.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, referenceOrder.cashPayment);
        if(referenceOrder.actualAmount < MathService.add(referenceOrder.cashPayment, referenceOrder.debitPayment)) {
            cb(false);
        }
        User.findOne({ id: userId }).exec(function(err, user) {
            if(referenceOrder.debitPayment <= user.balance) {
                Order.create(order).exec(function(err, result) {
                    if(!err) {
                        UserTransaction.create({ userId: user.id, type: "deduction", amount: referenceOrder.debitPayment, orderId: result.id, finalBalance: MathService.subtract(user.balance, referenceOrder.debitPayment) }).exec(function(err) {
                            if(!err) {
                                var newBalance = MathService.subtract(user.balance, referenceOrder.debitPayment);
                                User.update({ id: user.id }, { balance: newBalance }).exec(function(err) {
                                    if(err) {
                                        cb(false);
                                    }
                                    else {
                                        cb(result);
                                    }
                                });
                            }
                            else {
                                cb(false);
                            }
                        });
                    }
                    else {
                        cb(false);
                    }
                });
            }
            else {
                cb(false);
            }
        });
    },
    submitCreditCard: function(order, userId, stripeToken, cb) {
        var referenceOrder = _.cloneDeep(order);
        delete order.stripeToken;
        order.deliveryNote = new ModelService.DeliveryNote(null, null, null, null, null, null, null, false, null);
        Order.create(order).exec(function(err, result) {
            if(!err) {
                CreditCardService.chargeCreditCard(referenceOrder.stripeToken, referenceOrder.actualAmount, function(status, message) {
                    if(!status) {
                        Order.destroy({ id: result.id }).exec(function(err) {
                            if(err) {
                                DeliveryNoteService.setCreditCardToDeclined(result.id, message, function(response) {
                                    cb(false, message);
                                });
                            }
                            else {
                                cb(false, message);
                            }
                        });

                    }
                    else {
                        DeliveryNoteService.setCreditCardToProcessed(result.id, "CREDIT_CARD_SUCCESS", function(response) {
                            if(response) {
                                cb(result);
                            }
                        });
                    }
                });
            }
            else {
                cb(false, "DATABASE_ERROR+CREDIT_CARD_NOT_CHARGED");
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
    joinOrdersSameUser: function(items, callback) {
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
    },
    similarItem: function(item1, item2) {
        if(!item1 || !item2) {
            return false;
        }
        else if(item1 === item2) {
            return false;
        }
        else if((item1.id === item2.id) && _.isEqual(item1.standardOptions, item2.standardOptions) && _.isEqual(item1.options, item2.options) && _.isEqual(item1.extras, item2.extras) && _.isEqual(item1.attachedRequests, item2.attachedRequests)) {
            return true;
        }
        else {
            return false;
        }
    },
    combineItem: function(item1, item2) {
        if(!item1.quantity) {
            if(!item2.quantity) {
                item1.quantity = 2;
            }
            else {
                item1.quantity = 1 + item2.quantity;
            }
        }
        else {
            item1.quantity = item1.quantity + item2.quantity;
        }
        if(item1.additionalRequests && item2.additionalRequests) {
            item1.additionalRequests = "[ " + item1.additionalRequests + " ], " + "[ " + item2.additionalRequests + " ], ";
        }
        else if(item1.additionalRequests) {
            item1.additionalRequests = "[ " + item1.additionalRequests + " ]";
        }
        else if(item2.additionalRequests) {
            item1.additionalRequests = "[ " + item2.additionalRequests + " ]";
        }
        return item1;
    },
    getOrderItems: function(data, cb) {
        var items = [];
        UserService.joinUsers(data, function(orders) {
            for(var i = 0; i < orders.length; i++) {
                for(var e = 0; e < orders[i].items.length; e++) {
                    if(!orders[i].items[e].quantity) {
                        orders[i].items[e].quantity = 1;
                    }
                    orders[i].items[e].customerName = orders[i].user.firstName + " " + orders[i].user.lastName;
                    items.push(orders[i].items[e]);
                }
            }
            cb(items);
        });
    },
    getAllItems: function(orders, cb) {
        var self = this;
        var aggregate = [];
        var items = [];
        Restaurant.find({ unavailable: false }).exec(function(err, restaurants) {
            if(err | !restaurants) {
                return res.badRequest();
            }
            else {
                async.each(restaurants, function(restaurant, callback) {
                    var fullRender;
                    if(restaurant.aggregateStyle === "full") {
                        fullRender = true;
                    }
                    else {
                        fullRender = false;
                    }
                    aggregate.push({ name: restaurant.name, fullRender: fullRender, items: []});
                    callback();
                }, function(err) {
                    if(err) {
                        return false;
                    }
                    else {
                        OrderService.getOrderItems(orders, function(result) {
                            items = result;
                            sort();
                        });
                    }
                });
            }
        });
        function sort() {
            async.each(aggregate, function(aggregateItem, callback) {
                async.each(items, function(item, callback2) {
                    if(item.restaurant === aggregateItem.name) {
                        aggregateItem.items.push(item);
                    }
                    callback2();
                }, function(err) {
                    callback();
                });
            }, function(err) {
                join();
            });
        }
        function join() {
            async.each(aggregate, function(aggregateItem, callback) {
                async.each(aggregateItem.items, function(item1, callback1) {
                    async.each(aggregateItem.items, function(item2, callback2) {
                        if(self.similarItem(item1, item2) && !aggregateItem.fullRender) {
                            item1 = self.combineItem(item1, item2);
                            aggregateItem.items.splice(aggregateItem.items.indexOf(item2), 1);
                        }
                        callback2();
                    }, function(err) {
                        callback1();
                    });
                }, function(err) {
                    callback();
                });
            }, function(err) {
                async.each(aggregate, function(aggregateItem, callback) {
                    MenuItemService.processItemCommentsFull(aggregateItem, function(result) {
                        aggregateItem = result;
                        callback();
                    });
                }, function(err) {
                    cb(aggregate);
                });
            });
        }
    },
    getMasterList: function(orders, cb) {
        var self = this;
        if(orders.length < 1) {
            return cb({
                items: [],
                deliveryTotal: 0,
                deliveryDate: null
            });
        }
        else {
            var masterList = {
                items: [],
                deliveryTotal: 0,
                deliveryDate: orders[0].deliveryTime
            };
            UserService.joinUsers(orders, function(result) {
                orders = result;
                async.each(orders, function(order, callback) {
                    masterList.deliveryTotal += order.actualAmount;
                    if(!order.deliveryNote) {
                        order.deliveryNote = new ModelService.DeliveryNote(null, null, null, false, null);
                    }
                    var item = new ModelService.MasterListItem(order.user.firstName, order.user.lastName, order.items, order.deliveryLocation, order.actualAmount, order.contactPhone, order.paymentType, order.deliveryNote.chargeLater, order.deliveryNote);
                    processItems(item, function(result) {
                        processRegion(result, function(finalResult) {
                            masterList.items.push(finalResult);
                            callback();
                        });
                    });
                }, function(err) {
                    masterList.deliveryTotal = Math.round(masterList.deliveryTotal * 100) / 100;
                    cb(masterList);
                });
            });
        }
        function processItems(masterListItem, final) {
            async.each(masterListItem.items, function(item, callback) {
                MenuItemService.processItemComments(item, function(result) {
                    item = result;
                    callback();
                });
            }, function(err) {
                final(masterListItem);
            });
        }
        function processRegion(masterListItem, final) {
            DeliveryLocation.findOne({ name: masterListItem.deliveryLocation }).exec(function(err, location) {
                if(err || !location) {
                    masterListItem.region = "REGION_ERR";
                    final(masterListItem);
                }
                else {
                    DeliveryGroup.findOne({ name: location.group }).exec(function(err, group) {
                        masterListItem.region = group.codename;
                        final(masterListItem);
                    });
                }
            });
        }
    },
    checkDelivery: function(deliveryId, cb) {
        if(!deliveryId) {
            cb(false);
        }
        Delivery.findOne({ id: deliveryId }).exec(function(err, delivery) {
            if(delivery.closed) {
                cb(false);
            }
            else {
                cb(true);
            }
        });
    },
    getOrders: function(query, cb) {
        if(query.where && (Object.getOwnPropertyNames(JSON.parse(query.where)).length !== 0)) {
            Order.find().exec(function(err, items) {
                UserService.joinUsers(items, function(orders) {
                    var filter = UtilityService.convertFilterFromWaterline(query.where);
                    orders = UtilityService.filterData(orders, filter);
                    if(query.skip && query.sort) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        var data = UtilityService.sortData(orders, sort.sort, sort.sortType);
                        cb(UtilityService.paginationSkip(data, query.limit, query.skip));
                    }
                    else if(query.skip) {
                        cb(UtilityService.paginationSkip(orders, query.limit, query.skip));
                    }
                    else if(query.sort) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        cb(UtilityService.sortData(orders, sort.sort, sort.sortType));
                    }
                });
            });
        }
        else {
            if(query.skip && query.sort) {
                Order.find().exec(function(err, orders) {
                    UserService.joinUsers(orders, function(items) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        var data = UtilityService.sortData(items, sort.sort, sort.sortType);
                        cb(UtilityService.paginationSkip(data, query.limit, query.skip));
                    });
                });
            }
            else if(query.skip) {
                Order.find().paginate({page: query.skip, limit: query.limit }).exec(function(err, orders) {
                    UserService.joinUsers(orders, function(items) {
                        cb(items);
                    });
                });
            }
            else if(query.sort) {
                Order.find().exec(function(err, orders) {
                    UserService.joinUsers(orders, function(items) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        cb(UtilityService.sortData(items, sort.sort, sort.sortType));
                    });
                });
            }
        }
    }
}
