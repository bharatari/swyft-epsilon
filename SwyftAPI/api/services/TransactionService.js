module.exports = {
    iterateJoinUsers: function(items, callback) {
        function loop(i) {
            if(i < items.length){
                function query(cb) {
                    User.find().where({ id: items[i].userId }).exec(function(err, user) {
                        if(user) {
                            user[0] = UserService.deleteSensitive(user[0]);
                            items[i].user = user[0];
                        }
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
    joinUser: function(item, cb) {
        User.findOne({ id: item.userId }).exec(function(err, user) {
            user = UserService.deleteSensitive(user);
            item.user = user;
            cb(item);
        });
    },
    getTransactions: function(query, cb) {
        if(query.where && (Object.getOwnPropertyNames(JSON.parse(query.where)).length !== 0)) {
            UserTransaction.find().exec(function(err, items) {
                TransactionService.iterateJoinUsers(items, function(transactions) {
                    var filter = UtilityService.convertFilterFromWaterline(query.where);
                    transactions = UtilityService.filterData(transactions, filter);
                    if(query.skip && query.sort) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        var data = UtilityService.sortData(transactions, sort.sort, sort.sortType);
                        cb(UtilityService.paginationSkip(data, query.limit, query.skip));
                    }
                    else if(query.skip) {
                        cb(UtilityService.paginationSkip(transactions, query.limit, query.skip));
                    }
                    else if(query.sort) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        cb(UtilityService.sortData(transactions, sort.sort, sort.sortType));
                    }
                });
            });
        }
        else {
            if(query.skip && query.sort) {
                UserTransaction.find().exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        var data = UtilityService.sortData(items, sort.sort, sort.sortType);
                        cb(UtilityService.paginationSkip(data, query.limit, query.skip));
                    }); 
                });
            }
            else if(query.skip) {
                UserTransaction.find().paginate({page: query.skip, limit: query.limit }).exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        cb(items);
                    });
                });
            }
            else if(query.sort) {
                UserTransaction.find().exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        var sort = UtilityService.splitSortAttrs(query.sort);
                        cb(UtilityService.sortData(items, sort.sort, sort.sortType));
                    });
                });
            }
        }
    }   
}