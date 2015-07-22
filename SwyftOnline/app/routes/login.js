import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-epsilon-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, SidebarRouteMixin, AnimateOutRouteMixin, {
    setupController: function(controller, model) {
        this._super();
    }
});