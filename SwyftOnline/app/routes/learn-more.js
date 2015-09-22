/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(AnimateOutRouteMixin, SidebarRouteMixin, {});