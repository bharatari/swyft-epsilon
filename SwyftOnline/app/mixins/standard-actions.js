import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Mixin.create({
    actions: {
        toggleSidebar: function() {
            $('#nav-menu').offcanvas('toggle');
        },
        checkout: function() {
            this.transitionToRoute("checkout");
        },
        login: function() {
            this.transitionToRoute("login");
        },
        logout: function() {
        },
        profile: function() {
            this.transitionToRoute("profile");
        }
    }
});