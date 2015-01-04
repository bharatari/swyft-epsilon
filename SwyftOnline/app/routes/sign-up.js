import Ember from "ember";
import config from 'swyft-online/config/environment';
import AuthenticatedRouteMixin from 'swyft-online/mixins/authenticated-route';

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/csrfToken");
    }
});