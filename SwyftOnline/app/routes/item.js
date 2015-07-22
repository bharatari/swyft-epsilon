import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    queryParams: {
        item_id: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            item: Ember.$.getJSON(config.routeLocation + "/api/item/" + params.item_id),
            //restaurant: Ember.$.getJSON(config.routeLocation + "/api/restaurant/" + params.restaurantId)
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('model', model.item);
        //controller.set('restaurant', model.restaurant);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});