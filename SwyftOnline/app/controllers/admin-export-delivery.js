import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';

export default Ember.Controller.extend({
    notDelivered: function() {
        var data = this.get('model').items;   
        var array = [];
        for(var i = 0; i < data.length; i++) {
            if(!data[i].deliveryNote) {
                array.push(data[i]);
            }
            else {
                if(!data[i].deliveryNote.isDelivered) {
                    array.push(data[i]);
                }
            }
        }
        return array;
    }.property('model'),
    delivered: function() {
        var data = this.get('model').items;   
        var array = [];
        for(var i = 0; i < data.length; i++) {
            if(data[i].deliveryNote) {
                if(data[i].deliveryNote.isDelivered) {
                    array.push(data[i]);
                }
            }
        }
        return array;
    }.property('model')
});