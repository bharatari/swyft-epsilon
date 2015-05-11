import Ember from "ember";
import config from 'swyft-online/config/environment';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, AnimateOutRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            deliveryLocations: Ember.$.getJSON(config.routeLocation + "/api/deliveryLocations")
        })
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('deliveryLocations', model.deliveryLocations);
    }
});