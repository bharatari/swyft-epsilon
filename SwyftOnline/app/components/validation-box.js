/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Component.extend({
    valueChanged: function() {
        var self = this;
        if(this.get('value').trim()) {
            Ember.$.ajax({
                url: config.routeLocation + "/api/coupon/discount/" + this.get('value').trim(),
                data: {
                    token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                    tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
                },
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                success: function(response) {
                    self.set('isValid', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('isValid', false);
                }
            });
        }
        else {
            self.set('isValid', true);
        }
    }.observes('value')
});
