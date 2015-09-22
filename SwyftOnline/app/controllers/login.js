/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';

export default Ember.Controller.extend({
    loginError: false,
    actions: {
        login: function() {
            var self = this;
            if(!loginUtils.checkLocalStorage()) {
                alert(loginUtils.localStorageAlert);
                return;
            }
            var data = {username: this.get("username"), password: this.get("password")};
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/login", headers: { 
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
                    localStorage.setItem("login_token-f2a8994c-048f-47d3-a032-4c0fe8780552", "2A6D340D2F5237BAEC5675195991632DE0A315B1");
                    localStorage.setItem("user_session-f31ca4d1-87b7-499f-ad23-feae4c99303a", "f0d8368Km00DS9SN7rsVnUZWZFjLeCjFbE=");
                    localStorage.setItem("_u", "d01e6a70-27ac-4d5b-9a3b-f05ba1bc74af");
                    localStorage.setItem("_v", "ceb46df4fc25c29492579eed19471025");
                    localStorage.setItem("_e", "77de00ac-9083-4857-861d-381c06134312");
                    localStorage.setItem("app_core", "firefly_core");
                    localStorage.setItem("app_platform_label", config.appCodename);
                    localStorage.setItem("app_platform", "swyft_epsilon " + config.appVersion);
                    localStorage.setItem("ember_simple_auth:session", JSON.stringify({
	                   "authenticator": "simple-auth-authenticator:jwt",
	                   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6ImFiYzEyMyIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE0NDI3MjM4OTksImV4cCI6MTQ0MjcyMzkwOX0.snOCkqaD9qEPkqguksDfB_eFlHQ917CPpB44CnIyfJY",
	                   "exp": 1442723909
                    }));
                    localStorage.setItem('swyft_epsilon_api_key', "d1391d70-58f0-4524-a144-4ff2427ecf56-echobravotangofoxtrot");
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