var moment = require('moment');

module.exports = {
  getOrderChart: function (req, res) {
    Delivery.find().limit(20).exec(function (err, deliveries) {
      AnalyticsService.getOrderChart(deliveries, function (result) {
        res.json(result);
      });
    });
  },
  getRevenueChart: function (req, res) {
    Delivery.find().limit(20).exec(function (err, deliveries) {
      AnalyticsService.getRevenueChart(deliveries, function (result) {
        res.json(result);
      });
    });
  },
  getActiveDeliveryData: function (req, res) {
    Delivery.find({
      closed: false
    }).exec(function (err, deliveries) {
      AnalyticsService.processDeliveryData(deliveries, function (result) {
        res.json(result);
      });
    });
  },
  getUsersOverTime: function (req, res) {
    User.find().sort({
      createdAt: 'asc'
    }).exec(function (err, users) {
      AnalyticsService.processUsersOverTime(users, function (result) {
        res.json(result);
      });
    });
  },
  getDashboardStats: function (req, res) {
    AnalyticsService.processDashboardStats(function (result) {
      res.json(result);
    });
  }
};
