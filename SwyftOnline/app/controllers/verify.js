/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import errorUtils from 'swyft-epsilon-online/utils/error-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    verifyError: false,
    actions: {
        verify: function() {
            var self = this;
            var data = { email: this.get("username"), token: this.get("token") };
            Ember.$.ajax({type:"POST", headers: { 
                Accept : "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
            },
            url: config.routeLocation + "/api/user/verification/verify", data: JSON.stringify(data), success: function(data, textStatus, jqXHR) {
                self.set('verifySuccess', true);
                setTimeout(function(){
                    self.transitionToRoute('login');
                }, 3000);
            }, error: function(xhr, textStatus, error) {
                var errorMessage = errorUtils.processErrorCode(xhr.responseText);
                if(errorMessage) {
                    self.set('error', errorMessage);
                    self.set('verifyError', true);
                }
                else {
                    self.set('error', "Your token doesn't seem to be valid for the given email address.");
                    self.set('verifyError', true);
                }                
            }});
        },
        close: function() {
            this.set('verifyError', false);
            this.set('error', "");
        }
    }
});