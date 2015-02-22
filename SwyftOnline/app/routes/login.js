import Ember from "ember";
import config from 'swyft-online/config/environment';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, SidebarRouteMixin, {
    setupController: function(controller, model) {
        this._super();
    }
});