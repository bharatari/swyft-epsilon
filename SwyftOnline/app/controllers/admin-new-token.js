/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-new-token',
    actions: {
        submit: function() {
            var self = this;
            var data = {
                discount: this.get('discount'),
                comments:this.get('comments'),
                user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
            };
            var url = config.routeLocation + "/api/coupon/token";
            Ember.$.ajax({
                url: url,
                data: data,
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'Success');
                    self.set('modalBody', 'The new token is ' + response.token);
                    self.set('displayModal', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
                    self.set('displayModal', true);
                }
            });
        }
    }
});