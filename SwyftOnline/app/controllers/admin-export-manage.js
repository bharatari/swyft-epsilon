import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';

export default Ember.Controller.extend({
    orders: function() {
        return this.get('model');
    }.property('model')
});