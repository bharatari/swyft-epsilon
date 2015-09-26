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
        if(localStorage.getItem(loginUtils.localStorageKey)) {
            io.socket.get(
                config.routeLocation + "/api/admin/live/orders", 
                {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}
            );
            io.socket.on('order', function(message) {
                console.log(message);
                if(message.verb === 'created') {
                    var orders = _.clone(self.get('incomingOrders'), true);
                    orders.push(message.data);
                    self.set('incomingOrders', orders);
                }
            });
        }
    }.on('init'),
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