/* jslint unused: false */
/* global $ */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Mixin.create(SidebarRouteMixin, {
    beforeModel: function() {
        var self = this;
        return loginUtils.checkLogin().then(function(data) {
            return loginUtils.isAdmin().then(function(value) { }, function(reason) {
                self.transitionTo('admin-unauthorized');
            });
        }, function(reason) {
            self.transitionTo('login', { queryParams: { url: window.location.href }});
        });
    },
    actions:{
        loading: function(transition) {
            var loading = $('.admin-loading-container');
            loading.css("display", "block");
            transition.then(function() {
                loading.css("display", "none");
            }); 
        }
    }
});