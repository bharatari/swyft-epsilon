import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    verifyError: false,
    actions: {
        sendVerification: function() {
            var self = this;
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/user/verification/resend", data:{username: this.get("username"), password: this.get("password"), _csrf: this.get("model")._csrf}, success: function(data, textStatus, jqXHR){
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