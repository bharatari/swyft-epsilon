import Ember from "ember";
import config from 'swyft-online/config/environment';
import AnimateOutRouteMixin from 'swyft-online/mixins/animate-out-route';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, AnimateOutRouteMixin, { });