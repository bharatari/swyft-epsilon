import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Mixin.create({
    beforeModel: function() {
        this._super();
        var self = this;
        return loginUtils.checkLogin().then(function(data){
            self.set('isAuthenticated', true);
        }, function(reason) {
            self.set('isAuthenticated', false);
        })
    }
});