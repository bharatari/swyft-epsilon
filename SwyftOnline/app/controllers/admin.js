/* global moment */
/* global io */
/* global _ */
/* jshint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    setup: function() {
        var self = this;
        this.set("dayOfWeek", moment().format("dddd"));
        this.set("dateString", moment().format("MMMM D YYYY"));
        io.socket.get(
            config.routeLocation + "/api/admin/orders/watch", 
            { user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }}
        );
        io.socket.on('order', function(message) {
            if(message.verb === 'created') {
                var orders = _.clone(self.get('incomingOrders'), true);
                orders.unshift(message.data);
                self.set('incomingOrders', orders);
            }
        });
        io.socket.on('connect', function() {
            io.socket.get(
                config.routeLocation + "/api/admin/orders/watch", 
                { user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }}
            );
        });
    }.on('init'),
    delivery: Ember.computed('deliveries', function () {
      const deliveries = this.get('deliveries');
      if (deliveries) {
        if (deliveries[0]) {
          return deliveries[0];
        } else {
          return null;
        }
      } else {
        return null;
      }
    }),
    currentRoute: 'admin',
    appVersion: config.appVersion,
    appVersionLabel: config.appVersionLabel,
    appCodename: config.appCodename,
    ordersChart: {
        url: config.routeLocation + "/api/analytics/orders/chart",
        data: loginUtils.getLogin()
    },
    revenueChart: {
        url: config.routeLocation + "/api/analytics/revenue/chart",
        data: loginUtils.getLogin()
    }
});