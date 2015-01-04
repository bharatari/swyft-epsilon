import Ember from "ember";
import config from 'swyft-online/config/environment';
import SessionRouteMixin from 'swyft-online/mixins/session-route';

export default Ember.Route.extend(SessionRouteMixin, {
    queryParams: {
        item_id: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            item: Ember.$.getJSON(config.routeLocation + "/api/item/" + params.item_id)
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken._csrf);
        controller.set('model', model.item);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});