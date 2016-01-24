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
    tokenValueChanged: Ember.observer('tokenValue', 'tokenValid', function() {
        var self = this;
        if (this.get('tokenValid') && this.get('tokenValue')) {
            Ember.$.getJSON(config.routeLocation + "/api/coupon/discount/" + this.get('tokenValue').trim(), {
                token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
                tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
            }).done(function(data) {
                self.set('discount', data.discount);
            }).fail(function() {
                self.set('discount', null);
            });
        } else {
            // FIXME finalAmount doesn't update properly on view when discount
            // goes back to null
            this.set('discount', null);
        }
    })
});
