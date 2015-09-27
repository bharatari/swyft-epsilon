/* jslint unused: false */
import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    studentTypes: [
        'Day Student',
        'Boarding Student'
    ],
    years: [
        'Senior',
        'Upper',
        'Lower',
        'Prep'
    ],
    error: false,
    actions: {
        submit: function() {
            self.set('buttonPressed', true);
            var self = this;
            var data = {
                email: this.get("email"), 
                firstName: this.get("firstName"),
                lastName: this.get("lastName"),
                phoneNumber: this.get("phoneNumber"),
                type: this.get("type"),
                year: this.get("year"),
                interests: this.get("interests")
            };
            Ember.$.ajax({
                type: "POST", 
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                url: config.routeLocation + "/api/email/join", 
                data: JSON.stringify(data), 
                success: function(data, textStatus, jqXHR){
                    self.set('success', true);
                }, error: function(jqXHR){
                    self.set('error', true);
                    self.set('buttonPressed', false);
                }
            });
        },
        close: function() {
            this.set('error', false);
        }
    }
});