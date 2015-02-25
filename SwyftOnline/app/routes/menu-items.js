import Ember from "ember";
import config from 'swyft-online/config/environment';
import itemUtils from 'swyft-online/utils/item-utils';
import SessionRouteMixin from 'swyft-online/mixins/session-route';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, {
    queryParams: {
        restaurant_name: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            menuItems: Ember.$.getJSON(config.routeLocation + "/api/menuItems/" + params.restaurant_name)
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken._csrf);
        controller.set('sortedCategories', itemUtils.sortCategories(itemUtils.getCategories(model.menuItems), model.menuItems));
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});