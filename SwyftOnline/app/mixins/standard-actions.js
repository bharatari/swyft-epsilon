import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Mixin.create({
    actions: {
        checkout: function() {
            this.transitionToRoute("checkout");
        },
        login: function() {
            this.transitionToRoute("login");
        },
        logout: function() {
            var self = this;
            loginUtils.logout().then(function(response){
                self.transitionToRoute("index");
            }, function(reason){ });
        },
        profile: function() {
            this.transitionToRoute("profile");
        }
    }
});