import Ember from "ember";
import config from 'swyft-online/config/environment';
import SessionRouteMixin from 'swyft-online/mixins/session-route';

export default Ember.Route.extend(SessionRouteMixin, {
    queryParams: {
        restaurant_name: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            menuItems: Ember.$.getJSON(config.routeLocation + "/api/menuItems/" + params.restaurant_name)
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken._csrf);
        controller.set('menuItems', model.menuItems);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});