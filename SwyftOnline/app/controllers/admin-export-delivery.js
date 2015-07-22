import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Controller.extend({
    notDelivered: function() {
        var data = this.get('data').items;   
        var array = [];
        if(data) {
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
        }
        return array;
    }.property('data'),
    delivered: function() {
        var data = this.get('data').items; 
        var array = [];
        if(data) {
            for(var i = 0; i < data.length; i++) {
                if(data[i].deliveryNote) {
                    if(data[i].deliveryNote.isDelivered) {
                        array.push(data[i]);
                    }
                }
            }
        }
        return array;
    }.property('data'),
    deliveryLocationChange: function() {
        var filter = this.get('deliveryLocation');
        if(!this.get('deliveryLocation')) {
            this.set('data', this.get('fullData'));
        }
        else {
            var filteredData = {
                items: []
            }
            var fullData = this.get('fullData').items;
            for(var i = 0; i < fullData.length; i++) {
                if(fullData[i].deliveryLocation.toLowerCase() === this.get('deliveryLocation').toLowerCase()) {
                    filteredData.items.push(fullData[i]);
                }
            }
            this.set('data', filteredData);
        }
    }.observes('deliveryLocation').on('init')
});