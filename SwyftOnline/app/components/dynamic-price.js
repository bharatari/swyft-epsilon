import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Component.extend({  
    classNames: ['inline'],
    discountedAmount: function() {
        return Math.round((this.get('price') - this.get('computedPrice')) * 100) / 100;
    }.property('price', 'computedPrice'),
    computedPrice: function() {
        if(this.get('discount')) {
            this.set('finalAmount', this.get('price') * this.get('discount'));
            return this.get('price') * this.get('discount');
        }
        else {
            this.set('finalAmount', this.get('price'));
            return this.get('price');
        }
    }.property('price', 'discount'),
    valueChanged: function() {
        var self = this;
        if(this.get('dynamic') && this.get('value')) {
            Ember.$.getJSON(config.routeLocation + "/api/coupon/token/" + this.get('value'), {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            }).done(function(data) {
                if(data.hasBeenUsed) {
                    self.set('discount', null);
                }
                else {
                    self.set('discount', data.discount);
                    self.get('computedPrice');
                } 
            });
        }
        else {
            this.set('discount', null);
        }
    }.observes('value', 'dynamic')
});