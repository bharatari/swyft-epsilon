import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(AnimateOutRouteMixin, SidebarRouteMixin, {
	model: function() {
        return Ember.RSVP.hash({
            faq: Ember.$.getJSON(config.routeLocation + "/api/faq")
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('faq', model.faq);
    }
});