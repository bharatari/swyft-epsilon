module.exports = {
    iterateJoinUsers: function(items, callback) {
        function loop(i){
            if(i<items.length){
                function query(cb){
                    User.find().where({id:items[i].userId}).exec(function(err, user){
                        user[0] = UserService.deleteSensitive(user[0]);
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
    /*
    getTransactions: function(query, cb) {
        if(query.filters) {
            UserTransaction.find().exec(function(err, items) {
                TransactionService.iterateJoinUsers(items, function(transactions) {
                    transactions = UtilityService.filterData(transactions, query.filters);
                    if(query.page && query.sort && query.sortType) {
                        TransactionService.iterateJoinUsers(transactions, function(items) {
                            var data = UtilityService.sortData(items, query.sort, query.sortType);
                            cb(UtilityService.pagination(data, query.recordsPerPage, 1));
                        });
                    }
                    else if(query.page) {
                        TransactionService.iterateJoinUsers(transactions, function(items) {
                            cb(UtilityService.pagination(items, query.recordsPerPage, 1));
                        });
                    }
                    else if(query.sort) {
                        TransactionService.iterateJoinUsers(transactions, function(items) {
                            cb(UtilityService.sortData(items, query.sort, query.sortType));
                        });
                    }
                });
            });
        }
        else {
            if(query.page && query.sort && query.sortType) {
                UserTransaction.find().exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        var data = UtilityService.sortData(items, query.sort, query.sortType);
                        cb(UtilityService.pagination(data, query.recordsPerPage, 1));
                    });
                    
                });
            }
            else if(query.page) {
                UserTransaction.find().paginate({page: query.page, limit: query.recordsPerPage}).exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        cb(items);
                    });
                });
            }
            else if(query.sort) {
                UserTransaction.find().exec(function(err, transactions) {
                    TransactionService.iterateJoinUsers(transactions, function(items) {
                        cb(UtilityService.sortData(items, query.sort, query.sortType));
                    });
                });
            }
        }
    }   
    */
}