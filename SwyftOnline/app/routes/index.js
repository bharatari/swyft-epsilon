import Ember from "ember";
import config from 'swyft-online/config/environment';
import SessionRouteMixin from 'swyft-online/mixins/session-route';

export default Ember.Route.extend(SessionRouteMixin, {
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/api/news");
    },
    setupController: function(controller, model) {
        controller.set('isAuthenticated', this.get('isAuthenticated'));
        controller.set('news', model);
    }
});