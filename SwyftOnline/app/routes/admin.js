import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import DeliveryRouteMixin from 'swyft-epsilon-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, { 
    model: function() {
        return Ember.RSVP.hash({
            incomingOrders: Ember.$.getJSON(config.routeLocation + "/api/orders/adminRecent", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            user: Ember.$.getJSON(config.routeLocation + "/api/user", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            activeDeliveries: Ember.$.getJSON(config.routeLocation + "/api/analytics/deliveries/data", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            dashboardStats: Ember.$.getJSON(config.routeLocation + "/api/analytics/dashboard/statistics", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            deliveries: Ember.$.getJSON(config.routeLocation + "/api/deliveries", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('incomingOrders', model.incomingOrders);
        controller.set('user', model.user);
        controller.set('activeDeliveries', model.activeDeliveries);
        controller.set('dashboardStats', model.dashboardStats);
        controller.set('deliveries', model.deliveries);
    }
});