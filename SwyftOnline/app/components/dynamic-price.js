import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Component.extend({  
    classNames: ['inline'],
    discountedAmount: Ember.computed('price', 'finalAmount', function() {
        return Math.round((this.get('price') - this.get('finalAmount')) * 100) / 100;
    }),
    computePrice: Ember.observer('price', 'discount', function() {
        if(this.get('discount')) {
            this.set('finalAmount', this.get('price') * this.get('discount'));
        }
        else {
            this.set('finalAmount', this.get('price'));
        }
    }),
    valueChanged: Ember.observer('value', 'valid', function() {
        var self = this;
        if(this.get('valid') && this.get('value')) {
            Ember.$.getJSON(config.routeLocation + "/api/coupon/token/" + this.get('value').trim(), {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            }).done(function(data) {
                if(data.hasBeenUsed) {
                    self.set('discount', null);
                }
                else {
                    self.set('discount', data.discount);
                } 
            });
        }
        else {
            this.set('discount', null);
        }
    })
});