import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    verifyError: false,
    actions: {
        sendVerification: function() {
            var self = this;
            var data = { username: this.get("username"), password: this.get("password") };
            Ember.$.ajax({
                type:"POST", 
                url: config.routeLocation + "/api/user/verification/resend", 
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data), 
                success: function(data, textStatus, jqXHR){
                    self.set('verifySuccess', true);
                }, error: function(jqXHR){
                    self.set('verifyError', true);
                }});
        },
        close: function() {
            this.set('verifyError', false);
        }
    }
});