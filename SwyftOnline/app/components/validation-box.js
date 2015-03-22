import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Component.extend({
    setup: function() {
        this.set('isValid', true);
        this.set('value', "");
    }.on('didInsertElement'),
    valueChanged: function() {
        var self = this;
        if(this.get('value')) {
            Ember.$.ajax({
                url: config.routeLocation + "/api/coupon/checkCoupon/" + this.get('value'),
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