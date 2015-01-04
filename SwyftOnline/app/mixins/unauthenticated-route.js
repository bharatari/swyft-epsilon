import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Mixin.create({
    beforeModel: function() {
        var self = this;
        loginUtils.checkLogin().then(function(value){
            self.transitionTo('restaurants');
        }, function(reason){
            self.set('isAuthenticated', false);
        });
    }
});