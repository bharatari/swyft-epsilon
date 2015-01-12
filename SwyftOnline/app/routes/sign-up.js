import Ember from "ember";
import config from 'swyft-online/config/environment';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/csrfToken");
    }
});