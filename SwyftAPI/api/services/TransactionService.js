module.exports = {
  getTransactions: function (query, cb) {
    if (query.where && (Object.getOwnPropertyNames(JSON.parse(query.where)).length !== 0)) {
      UserTransaction.find().exec(function (err, items) {
        UserService.joinUsers(items, function (transactions) {
          var filter = UtilityService.convertFilterFromWaterline(query.where);
          transactions = UtilityService.filterData(transactions, filter);
          if (query.skip && query.sort) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            var data = UtilityService.sortData(transactions, sort.sort, sort.sortType);
            cb(UtilityService.paginationSkip(data, query.limit, query.skip));
          } else if (query.skip) {
            cb(UtilityService.paginationSkip(transactions, query.limit, query.skip));
          } else if (query.sort) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            cb(UtilityService.sortData(transactions, sort.sort, sort.sortType));
          }
        });
      });
    } else {
      if (query.skip && query.sort) {
        UserTransaction.find().exec(function (err, transactions) {
          UserService.joinUsers(transactions, function (items) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            var data = UtilityService.sortData(items, sort.sort, sort.sortType);
            cb(UtilityService.paginationSkip(data, query.limit, query.skip));
          });
        });
      } else if (query.skip) {
        UserTransaction.find().paginate({
          page: query.skip,
          limit: query.limit
        }).exec(function (err, transactions) {
          UserService.joinUsers(transactions, function (items) {
            cb(items);
          });
        });
      } else if (query.sort) {
        UserTransaction.find().exec(function (err, transactions) {
          UserService.joinUsers(transactions, function (items) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            cb(UtilityService.sortData(items, sort.sort, sort.sortType));
          });
        });
      }
    }
  }
}