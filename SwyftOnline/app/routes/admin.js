import Ember from "ember";
import config from 'swyft-online/config/environment';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken")
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken);
    }
});