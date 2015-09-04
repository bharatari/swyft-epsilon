import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import itemUtils from 'swyft-epsilon-online/utils/item-utils';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import StandardActionsMixin from 'swyft-epsilon-online/mixins/standard-actions';

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
            this.transitionToRoute('restaurants');
        },
        setContactConsent: function() {
            var self = this;
            var data = {
                contactConsent: this.get('user').contactConsent,
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            };
            var url = config.routeLocation + "/api/user/contactConsent";
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "PUT",
                success: function(response) {
                    self.set('modalTitle', "You're all set!");
                    self.set('modalBody', 'Your preference has been saved.');
                    self.set('displayInfoModal', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', "Something went wrong with your request. Try again and if it doesn't work, let us know");
                    self.set('displayInfoModal', true);
                }
            });
        }
    }
});