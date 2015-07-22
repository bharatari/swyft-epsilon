import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/api/news");
    },
    setupController: function(controller, model) {
        controller.set('isAuthenticated', this.get('isAuthenticated'));
        controller.set('news', model);
        controller.set('delay', 1000);
    }
});