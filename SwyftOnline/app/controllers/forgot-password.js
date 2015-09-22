/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    error: false,
    actions: {
        submit: function() {
            var self = this;
            var data = {
                email: this.get("username"), 
                token: this.get("token")
            };
            Ember.$.ajax({
                type:"POST", 
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                url: config.routeLocation + "/api/user/forgotPassword", 
                data: JSON.stringify(data), 
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