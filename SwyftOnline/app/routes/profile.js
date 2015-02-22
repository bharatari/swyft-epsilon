import Ember from "ember";
import config from 'swyft-online/config/environment';
import AuthenticatedRouteMixin from 'swyft-online/mixins/authenticated-route';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            user: Ember.$.getJSON(config.routeLocation + "/api/user", {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            }),
            recentOrders: Ember.$.getJSON(config.routeLocation + "/api/orders/recent", {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            }),
            pendingOrders: Ember.$.getJSON(config.routeLocation + "/api/orders/pending", {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            })
        });
    },
    setupController: function(controller, model) {
        controller.set('user', model.user);
        controller.set('recentOrders', model.recentOrders);
        controller.set('pendingOrders', model.pendingOrders);
    }
});