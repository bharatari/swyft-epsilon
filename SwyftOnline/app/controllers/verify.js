import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    verifyError: false,
    actions: {
        verify: function() {
            var self = this;
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/user/verification/verify", data:{email: this.get("username"), token: this.get("token"), _csrf: this.get("model")._csrf}, success: function(data, textStatus, jqXHR){
                self.set('verifySuccess', true);
                setTimeout(function(){
                    self.transitionToRoute('login');
                }, 3000);
            }, error: function(jqXHR){
                self.set('verifyError', true);
            }});
        },
        close: function() {
            this.set('verifyError', false);
        }
    }
});