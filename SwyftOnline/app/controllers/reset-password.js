import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    error: false,
    actions: {
        submit: function() {
            var self = this;
            var password1 = $("#password").val();
            var password2 = $("#confirmPassword").val();
            if((password1 == password2) && this.get('username')) {
                if(password1.length >= 6 && password1.length <= 20) {
                    Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/user/password", data:{username: this.get("username"), password: password1, token: this.get('token'), _csrf: this.get("model")._csrf}, success: function(data, textStatus, jqXHR){
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