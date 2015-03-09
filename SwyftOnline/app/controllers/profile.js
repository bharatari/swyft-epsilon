import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import constants from 'swyft-online/utils/constants-utils';

export default Ember.Controller.extend({ 
    orders: function() {
        moment.tz.add(constants.timeZones.zones);
        var array = this.get('recentOrders');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryTime).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('recentOrders'),
    pending: function() {
        moment.tz.add(constants.timeZones.zones);
        var array = this.get('pendingOrders');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryTime).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('pendingOrders'),
    processedOrder: function() {
        var order = this.get('selectedOrder');    
        if(!order) {
            return null;
        }
        for(var e = 0; e < order.items.length; e++){
            var options="";
            for (var property in order.items[e].options) {
                if (order.items[e].options.hasOwnProperty(property)) {
                    options += order.items[e].options[property].name +", ";
                }
            }
            if(order.items[e].standardOptions) {
                for(var z = 0; z < order.items[e].standardOptions.length; z++){
                    if(order.items[e].standardOptions[z].isSelected){
                        options += order.items[e].standardOptions[z].name +", ";
                    }
                }
            }
            if(order.items[e].extras) {
                for(var property in order.items[e].extras){
                    if(order.items[e].extras.hasOwnProperty(property)){
                        options += order.items[e].extras[property].name +", ";
                    }
                }
            }
            options=options.substring(0, options.length-2);
            order.items[e].itemOptions=options;
        }
        return order;
    }.property('selectedOrder'),
    actions: {
        openModal: function(order) {
            this.set('selectedOrder', order);
            this.set('modalTitle', order.displayTime);
            this.set('displayModal', true);
        }
    }
});