import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Mixin.create({
    beforeModel: function() {
        var self = this;
        return loginUtils.checkLogin().then(function(value){ }, function(reason){
            self.transitionTo('login');
        });
    }
});