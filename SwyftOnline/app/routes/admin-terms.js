/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
    model: function() {
        return Ember.RSVP.hash({
            terms: Ember.$.getJSON(config.routeLocation + "/api/terms")
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('terms', model.terms);
    }
});