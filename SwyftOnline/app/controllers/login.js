import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    loginError: false,
    actions: {
        login: function() {
            var _this = this;
            Ember.$.ajax({type:"POST", url: config.routeLocation + "/api/login", dataType:'json', data:{username: this.get("username"), password: this.get("password"), _csrf: this.get("model")._csrf}, success: function(data, textStatus, jqXHR){
                if(data.token) {
                    localStorage.setItem(loginUtils.localStorageKey, JSON.stringify(data));
                    _this.transitionToRoute('restaurants');
                }
                else {
                    _this.set('loginError', true);
                }
            }});
        }
    }
});