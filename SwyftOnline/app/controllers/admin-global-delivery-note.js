import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    actions: {
        submit: function() {
            var data = {
                note: this.get('deliveryNote'),
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            };
            var url = config.routeLocation + "/api/deliveryNote/global";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    alert("Success");
                },
                error: function(xhr, textStatus, error) {
                    alert("Error");
                }
            });
        }
    }
});