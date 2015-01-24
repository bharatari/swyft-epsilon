import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    error: false,
    actions: {
        submit: function() {
            var self = this;
            var data = {
                email: this.get("username"), 
                token: this.get("token"), 
                _csrf: this.get("model")._csrf
            };
            Ember.$.ajax({
                type:"POST", 
                url: config.routeLocation + "/api/user/forgotPassword", 
                data: data, 
                success: function(data, textStatus, jqXHR){
                    self.set('success', true);
                }, error: function(jqXHR){
                    self.set('error', true);
                }
            });
        },
        close: function() {
            this.set('error', false);
        }
    }
});