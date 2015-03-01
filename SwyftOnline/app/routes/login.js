import Ember from "ember";
import config from 'swyft-online/config/environment';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, SidebarRouteMixin, AnimateOutRouteMixin, {
    setupController: function(controller, model) {
        this._super();
    }
});