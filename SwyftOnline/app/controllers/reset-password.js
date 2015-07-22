import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    error: false,
    actions: {
        submit: function() {
            var self = this;
            var password1 = $("#password").val();
            var password2 = $("#confirmPassword").val();
            var data = {username: this.get("username"), password: password1, token: this.get('token')}; 
            if((password1 == password2) && this.get('username')) {
                if(password1.length >= 6 && password1.length <= 20) {
                    Ember.$.ajax({
                        type:"POST", 
                        url: config.routeLocation + "/api/user/password", 
                        headers: { 
                            Accept : "application/json; charset=utf-8",
                            "Content-Type": "application/json; charset=utf-8"
                        },
                        data: JSON.stringify(data), 
                        success: function(data, textStatus, jqXHR){
                            self.set('success', true);
                        }, error: function(jqXHR){
                            self.set('error', true);
                        }});
                }
                else {
                    self.set('error', true);
                }
            }
            else {
                self.set('error', true);
            }
        },
        close: function() {
            this.set('error', false);
        }
    }
});