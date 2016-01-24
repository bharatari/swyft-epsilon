import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';
import ResetScrollMixin from 'swyft-epsilon-online/mixins/reset-scroll';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, ResetScrollMixin, {
    queryParams: {
        item_id: {
            refreshModel: true
        }
    },
    model: function(params) {
      var promise;
      Ember.run(function () {
        promise = {
          item: Ember.$.getJSON(config.routeLocation + "/api/item/" + params.item_id)
        }; 
      });
      return Ember.RSVP.hash(promise);
    },
    setupController: function(controller, model) {
        this._super();
        var self = this;
        Ember.run(function () {
          controller.set('model', model.item);
          controller.set('isAuthenticated', self.get('isAuthenticated'));
        });
    }
});