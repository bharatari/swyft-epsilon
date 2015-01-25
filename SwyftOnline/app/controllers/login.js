import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    loginError: false,
    actions: {
        login: function() {
            var self = this;
            if(!loginUtils.checkLocalStorage()) {
                alert(loginUtils.localStorageAlert);
                return;
            }
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/login", dataType:'json', data:{username: this.get("username"), password: this.get("password"), _csrf: this.get("model")._csrf}, success: function(data, textStatus, jqXHR){
                if(data.token) {
                    localStorage.setItem(loginUtils.localStorageKey, JSON.stringify(data));
                    self.transitionToRoute('restaurants');
                }
                else {
                    self.set('loginError', true);
                }
            }, error: function(jqXHR){
                self.set('loginError', true);
            }});
        },
        close: function() {
            this.set('loginError', false);
        },
        signUp: function() {
            this.transitionToRoute('sign-up');
        },
        forgotPassword: function() {
            this.transitionToRoute('forgot-password');
        },
        resend: function () {
            this.transitionToRoute('resend-verification');
        }
    }
});