import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

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
            url: config.routeLocation + "/api/user/verification/verify", data: JSON.stringify(data), success: function(data, textStatus, jqXHR){
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