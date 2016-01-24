/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';

export default Ember.Controller.extend({
    queryParams: ['url'],
    loginError: false,
    actions: {
        login() {
            var self = this;
            if(!loginUtils.checkLocalStorage()) {
                alert(loginUtils.localStorageAlert);
                return;
            }
            var data = {username: this.get("username"), password: this.get("password")};
            Ember.run(function () {
              Ember.$.ajax({
                type:"POST", 
                url: config.routeLocation + "/api/login", 
                headers: { 
                  Accept : "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data), success: function(data, textStatus, jqXHR){
                  if(data.token) {
                    //Store cart and cartVersion to restore after clear
                    var cart = cartUtils.getCartForRestore();
                    var cartVersion = cartUtils.getCartVersionForRestore();
                    localStorage.clear();
                    //Restore them 
                    cartUtils.restoreCart(cart, cartVersion);
                    localStorage.setItem(loginUtils.localStorageKey, JSON.stringify(data));
                    localStorage.setItem("app_core", "firefly_core");
                    localStorage.setItem("app_platform_label", config.appCodename);
                    localStorage.setItem("app_platform", "swyft_epsilon " + config.appVersion);
                    if(self.get('url')) {
                      window.location.assign(self.get('url'));
                    }
                    else {
                      self.transitionToRoute('restaurants');
                    }
                  }
                  else {
                    self.set('loginError', true);
                  }
                }, error: function(jqXHR){
                  self.set('loginError', true);
              }});
            });
            
        },
        close() {
            this.set('loginError', false);
        },
        signUp() {
            this.transitionToRoute('sign-up');
        },
        forgotPassword() {
            this.transitionToRoute('forgot-password');
        },
        resend() {
            this.transitionToRoute('resend-verification');
        }
    }
});