import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/api/restaurants");
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('restaurants', model);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});