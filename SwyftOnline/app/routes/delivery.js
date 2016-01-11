import Ember from "ember";
import DeliveryRouteMixin from 'swyft-epsilon-online/mixins/delivery-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(DeliveryRouteMixin, SidebarRouteMixin, {});