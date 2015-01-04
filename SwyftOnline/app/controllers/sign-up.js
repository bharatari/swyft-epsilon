import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Controller.extend({
    error: false,
    actions: {
        validatePassword: function() {
            var password = this.get('password');
            var confirmPassword = this.get('confirmPassword');
            if(password && confirmPassword) {
                if(password !== confirmPassword) {
                    Ember.$('#confirmPassword').css('background-color', 'red');
                }
                else {
                    Ember.$('#confirmPassword').css('background-color', 'white');
                }
            }
            
        }
    }
    
});