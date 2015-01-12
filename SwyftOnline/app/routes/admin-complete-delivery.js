import Ember from "ember";
import config from 'swyft-online/config/environment';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function(params) {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            deliveries: Ember.$.getJSON(config.routeLocation + "/api/deliveries")
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken);
        controller.set('deliveries', model.deliveries);
    }
});