/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import DeliveryRouteMixin from 'swyft-epsilon-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, { });