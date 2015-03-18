import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    actions: {
        submit: function() {
            var self = this;
            var data={
                deliveryTime: this.get('deliveryTime'),
                orderCutoff: this.get('orderCutoff'),
                deliverers: this.get('deliverers'),
                comments: this.get('comments'),
                user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
            };
            var url = config.routeLocation + "/api/delivery";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'Success');
                    self.set('modalBody', 'You have successfully created a new delivery.');
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