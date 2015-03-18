import Ember from "ember";
import config from 'swyft-online/config/environment';
import SessionRouteMixin from 'swyft-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, {
    queryParams: {
        item_id: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + "/api/item/" + params.item_id)
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('model', model);
        controller.set('isAuthenticated', this.get('isAuthenticated'));
    }
});