/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Mixin.create({
    beforeModel: function() {
      var self = this;
      var promise;
      Ember.run(function () {
        promise = loginUtils.checkLogin().then(function(value){ }, function(reason) {
          self.transitionTo('login', { queryParams: { url: window.location.href }});
        });
      });
      return promise;
    }
});