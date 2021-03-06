/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-epsilon-online/mixins/unauthenticated-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    model: function(params) {
        this.set('token', params.token);
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set('token', this.get('token'));
    }
});