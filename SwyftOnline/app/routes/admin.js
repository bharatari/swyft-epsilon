import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
    model: function() {
        return Ember.RSVP.hash({
            user: Ember.$.getJSON(config.routeLocation + "/api/user", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            ordersChart: Ember.$.getJSON(config.routeLocation + "/api/analytics/orders/chart", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            activeDeliveries: Ember.$.getJSON(config.routeLocation + "/api/analytics/deliveries/data", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            dashboardStats: Ember.$.getJSON(config.routeLocation + "/api/analytics/dashboard/statistics", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            revenueChart: Ember.$.getJSON(config.routeLocation + "/api/analytics/revenue/chart", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('user', model.user);
        controller.set('ordersChart', model.ordersChart);
        controller.set('activeDeliveries', model.activeDeliveries);
        controller.set('dashboardStats', model.dashboardStats);
        controller.set('revenueChart', model.revenueChart);
    }
});