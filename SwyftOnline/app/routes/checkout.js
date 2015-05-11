import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';
import AuthenticatedRouteMixin from 'swyft-online/mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, SidebarRouteMixin, AnimateOutRouteMixin, {
    beforeModel: function() {
        this._super();
        if(!JSON.parse(localStorage.getItem("cart"))) {
            this.transitionTo('restaurants');
        }
        else if(JSON.parse(localStorage.getItem("cart")).length < 1) {
            this.transitionTo('restaurants');
        }
    },
    model: function() {
        return Ember.RSVP.hash({
            cart: JSON.parse(localStorage.getItem('cart')),
            user: Ember.$.getJSON(config.routeLocation + "/api/user", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            deliveries: Ember.$.getJSON(config.routeLocation + "/api/deliveries"),
            deliveryLocations: Ember.$.getJSON(config.routeLocation + "/api/deliveryLocations/simple")
        })
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('cart', model.cart);
        controller.set('user', model.user);
        controller.set('deliveries', model.deliveries);
        controller.set('buttonPressed', false);
        controller.set('deliveryLocations', model.deliveryLocations);
    }
});