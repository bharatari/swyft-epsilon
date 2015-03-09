import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import DeliveryRouteMixin from 'swyft-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            orders: Ember.$.getJSON(config.routeLocation + "/api/deliveryOrders", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            deliveryNote: Ember.$.getJSON(config.routeLocation + "/api/deliveryNote/global", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
        });
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken._csrf);
        controller.set('orders', model.orders);
        controller.set('deliveryNote', model.deliveryNote);
        console.log(model.deliveryNote);
    }
});