import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-about',
    appVersion: config.appVersion,
    appVersionLabel: config.appVersionLabel,
    appCodename: config.appCodename
});