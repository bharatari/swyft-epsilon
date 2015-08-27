import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import itemUtils from 'swyft-epsilon-online/utils/item-utils';
import ResetScrollMixin from 'swyft-epsilon-online/mixins/reset-scroll';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, ResetScrollMixin, {
    queryParams: {
        restaurant_name: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            menuItems: Ember.$.getJSON(config.routeLocation + "/api/menuItems/" + params.restaurant_name),
            restaurant: Ember.$.getJSON(config.routeLocation + "/api/restaurant/" + params.restaurant_name)
        })
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('sortedCategories', itemUtils.sortCategories(itemUtils.getCategories(model.menuItems), model.menuItems));
        controller.set('menuItems', model.menuItems);
        controller.set('restaurant', model.restaurant);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});