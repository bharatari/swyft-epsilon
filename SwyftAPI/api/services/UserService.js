var Chance = require('chance');
var chance = new Chance();
var moment = require('moment');

module.exports = {
  deleteSensitiveIterate: function (users) {
    if (users) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]) {
          delete users[i].password;
          delete users[i].token;
        }
      }
    }
    return users;
  },
  deleteSensitive: function (user) {
    if (user) {
      delete user.password;
      delete user.token;
    }
    return user;
  },
  deleteSensitiveCRUD: function (user) {
    if (user) {
      delete user.password;
    }
    return user;
  },
  deleteSensitiveCRUDIterate: function (users, cb) {
    if (users) {
      for (var i = 0; i < users.length; i++) {
        if (users[i]) {
          delete users[i].password;
        }
      }
    }
    cb(users);
  },
  getUsers: function (query, cb) {
    if (query.where && (Object.getOwnPropertyNames(JSON.parse(query.where)).length !== 0)) {
      User.find().exec(function (err, items) {
        UserService.deleteSensitiveCRUDIterate(items, function (users) {
          var filter = UtilityService.convertFilterFromWaterline(query.where);
          users = UtilityService.filterData(users, filter);
          if (query.skip && query.sort) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            var data = UtilityService.sortData(users, sort.sort, sort.sortType);
            cb(UtilityService.paginationSkip(data, query.limit, query.skip));
          } else if (query.skip) {
            cb(UtilityService.paginationSkip(users, query.limit, query.skip));
          } else if (query.sort) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            cb(UtilityService.sortData(users, sort.sort, sort.sortType));
          }
        });
      });
    } else {
      if (query.skip && query.sort) {
        User.find().exec(function (err, users) {
          UserService.deleteSensitiveCRUDIterate(users, function (items) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            var data = UtilityService.sortData(items, sort.sort, sort.sortType);
            cb(UtilityService.paginationSkip(data, query.limit, query.skip));
          });
        });
      } else if (query.skip) {
        User.find().paginate({
          page: query.skip,
          limit: query.limit
        }).exec(function (err, users) {
          UserService.deleteSensitiveCRUDIterate(users, function (items) {
            cb(items);
          });
        });
      } else if (query.sort) {
        User.find().exec(function (err, users) {
          UserService.deleteSensitiveCRUDIterate(users, function (items) {
            var sort = UtilityService.splitSortAttrs(query.sort);
            cb(UtilityService.sortData(items, sort.sort, sort.sortType));
          });
        });
      }
    }
  },
  joinUser: function (object, cb) {
    if (object) {
      if (object.userId) {
        User.findOne({
          id: object.userId
        }).exec(function (err, user) {
          if (err || !user) {
            object.user = {};
            cb(object);
          } else {
            user = UserService.deleteSensitive(user);
            object.user = user;
            cb(object);
          }
        });
      } else {
        object.user = {};
        cb(object);
      }
    } else {
      return object;
    }
  },
  joinUsers: function (objects, cb) {
    var self = this;
    if (objects) {
      async.each(objects, function (object, callback) {
        self.joinUser(object, function (result) {
          object = result;
          callback();
        });
      }, function (err) {
        cb(objects);
      });
    } else {
      cb(objects);
    }
  },
  /*** @todo - Should take into account orders and account balances */
  outstandingPayments: function (userId, cb) {
    var self = this;
    var outstanding = [];
    if (userId) {
      self.outstandingOrders(outstanding, userId, function (result, message) {
        if (result) {
          outstanding = result;
        }
        self.outstandingBalance(outstanding, userId, function (result, message) {
          if (result) {
            cb(result);
          } else {
            cb(outstanding);
          }
        });
      });
    } else {
      cb(false, 'INVALID_USER_ID');
    }
  },
  outstandingOrders: function (outstanding, userId, cb) {
    if (userId) {
      Order.find({
        userId: userId
      }).exec(function (err, orders) {
        if (err) {
          cb(false, 'DATABASE_ERR');
        } else if (orders.length < 1) {
          cb(outstanding);
        } else {
          async.each(orders, function (order, callback) {
            if (order) {
              if (order.deliveryNote) {
                if (order.deliveryNote.chargeLater === true) {
                  outstanding.push({
                    type: 'Order',
                    date: moment(order.deliveryTime).tz('America/New_York').format('MM-DD-YYYY hh:mm a'),
                    amount: order.actualAmount
                  });
                }
              }
            }
            callback();
          }, function (err) {
            cb(outstanding);
          });
        }
      });
    } else {
      cb(false, 'INVALID_USER_ID');
    }
  },
  outstandingBalance: function (outstanding, userId, cb) {
    if (userId) {
      User.findOne({
        id: userId
      }).exec(function (err, user) {
        if (err || !user) {
          cb(false, 'DATABASE_ERR');
        } else {
          if (user.balance != null) {
            if (user.balance < 0) {
              outstanding.push({
                type: 'Swyft Debit',
                date: moment().tz('America/New_York').format('MM-DD-YYYY hh:mm a'),
                amount: Math.abs(user.balance)
              });
            }
          }
          cb(outstanding);
        }
      });
    } else {
      cb(false, 'INVALID_USER_ID');
    }
  },
  checkDuplicates: function (username, cb) {
    if (username) {
      User.find({
        username: username,
        verified: true
      }).exec(function (err, users) {
        if (err) {
          cb(false);
        } else if (users.length > 0) {
          cb(false);
        } else {
          cb(true);
        }
      });
    } else {
      cb(false);
    }
  },
  deleteDuplicates: function (username, cb) {
    if (username) {
      User.destroy({
        username: username,
        verified: false
      }).exec(function (err, users) {
        if (err) {
          cb(false);
        } else {
          cb(true);
        }
      });
    } else {
      cb(false);
    }
  },
  verifyUser: function (username, token, cb) {
    var verifiedUser;
    if (username && token) {
      User.find({
        username: username,
        verified: false
      }).exec(function (err, users) {
        if (err || !users) {
          cb(false);
        } else if (users.length > 0) {
          async.each(users, function (user, callback) {
            if (user.token === token) {
              verifiedUser = user;
            }
            callback();
          }, function (err) {
            if (verifiedUser) {
              cb(verifiedUser);
            } else {
              cb(false);
            }
          });
        } else {
          cb(false);
        }
      });
    }
  }
};
