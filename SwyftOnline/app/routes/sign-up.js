import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-epsilon-online/mixins/unauthenticated-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            deliveryLocations: Ember.$.getJSON(config.routeLocation + "/api/deliveryLocations")
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('deliveryLocations', model.deliveryLocations);
        controller.set('contactConsent', true);
    }
});