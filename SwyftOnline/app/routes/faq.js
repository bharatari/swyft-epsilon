import Ember from "ember";
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(AnimateOutRouteMixin, SidebarRouteMixin, {});