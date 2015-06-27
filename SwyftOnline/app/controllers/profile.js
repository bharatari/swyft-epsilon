import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import itemUtils from 'swyft-online/utils/item-utils';
import SidebarRouteMixin from 'swyft-online/mixins/sidebar-route';
import StandardActionsMixin from 'swyft-online/mixins/standard-actions';

export default Ember.Controller.extend(SidebarRouteMixin, StandardActionsMixin, { 
    orders: function() {
        var array = this.get('recentOrders');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryTime).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('recentOrders'),
    pending: function() {
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
        order.items = itemUtils.processItems(order.items);
        return order;
    }.property('selectedOrder'),
    actions: {
        openModal: function(order) {
            this.set('selectedOrder', order);
            this.set('modalTitle', order.displayTime);
            this.set('displayModal', true);
        },
        goBack: function() {
            this.transitionTo('restaurants');
        }
    }
});