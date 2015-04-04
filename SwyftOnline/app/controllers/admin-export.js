import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';
import itemUtils from 'swyft-online/utils/item-utils';

export default Ember.Controller.extend({
    deliveryItems: function() {
        var data = this.get('model');   
        for(var i = 0; i < data.length; i++) {
            data[i].items = itemUtils.processItems(data[i].items);
        }
        return data;
    }.property('model')
});