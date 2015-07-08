import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';

export default Ember.Mixin.create(SidebarRouteMixin, {
    beforeModel: function() {
        var self = this;
        return loginUtils.isAdmin().then(function(value){ }, function(reason) {
            self.transitionTo('login');
        });
    }
});