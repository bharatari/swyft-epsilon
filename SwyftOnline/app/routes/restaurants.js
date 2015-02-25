import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import SessionRouteMixin from 'swyft-online/mixins/session-route';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            restaurants: Ember.$.getJSON(config.routeLocation + "/api/restaurants")
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken._csrf);
        controller.set('restaurants', model.restaurants);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});