/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import ResetScrollMixin from 'swyft-epsilon-online/mixins/reset-scroll';
import SessionRouteMixin from 'swyft-epsilon-online/mixins/session-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import AnimateOutRouteMixin from 'swyft-epsilon-online/mixins/animate-out-route';

export default Ember.Route.extend(SessionRouteMixin, AnimateOutRouteMixin, SidebarRouteMixin, ResetScrollMixin, {
    model: function() {
      var promise;
      Ember.run(function () {
        promise = Ember.$.getJSON(config.routeLocation + "/api/restaurants");
      });
      return promise;
    },
    setupController: function(controller, model) {
      this._super();
      var self = this;
      Ember.run(function () {
        controller.set('restaurants', model);
        controller.set('isAuthenticated', self.get('isAuthenticated'));
        controller.set('searchValue', "");
      });
    }
});