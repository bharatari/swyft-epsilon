import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import AuthenticatedRouteMixin from 'swyft-epsilon-online/mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, SidebarRouteMixin, AnimateOutRouteMixin, {
    model: function(params) {
        return Ember.RSVP.hash({
            order: Ember.$.getJSON(config.routeLocation + "/api/order/safe", {orderId: params.id, token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
        });
    },
    afterModel: function(model) {
        if(new Date() > new Date(model.order.deliveryTime)) {
            /*** 
             * 
             * @note - This functionality needs more testing before it's used,
             * moreover, it's not necessary to redirect away. It makes things
             * needlessly more complex.
             * 
             */
            //this.transitionTo('restaurants');
        }
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('order', model.order);
    }
});