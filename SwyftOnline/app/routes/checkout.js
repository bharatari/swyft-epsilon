import Ember from "ember";
import config from 'swyft-online/config/environment';
import AuthenticatedRouteMixin from 'swyft-online/mixins/authenticated-route';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    beforeModel: function() {
        this._super();
        if(JSON.parse(localStorage.getItem("cart")) == false) {
            this.transitionTo('restaurants');
        }
    },
    model: function() {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            cart: JSON.parse(localStorage.getItem('cart')),
            user: Ember.$.getJSON(config.routeLocation + "/api/user", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            deliveries: Ember.$.getJSON(config.routeLocation + "/api/deliveries")
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken);
        controller.set('cart', model.cart);
        controller.set('user', model.user);
        controller.set('deliveries', model.deliveries);
    }
});