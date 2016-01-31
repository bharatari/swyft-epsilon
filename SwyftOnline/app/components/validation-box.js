/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Component.extend({
  change() {
    this.get('updateToken')(this.get('token'));
  },
});
