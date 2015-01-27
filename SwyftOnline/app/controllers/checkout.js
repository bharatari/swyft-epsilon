import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import constants from 'swyft-online/utils/constants-utils';

export default Ember.Controller.extend({
    buttonPressed: false,
    totalPrice: function() {
        var cart = this.get("cart");
        if(cart){
            var totalPrice=0;
            if(cart) {
                for(var i = 0; i < cart.length; i++) {
                    totalPrice += cart[i].price;
                }
                var tax = Math.round((totalPrice*constants.tax)*10)/10;
                totalPrice=totalPrice+tax;
                totalPrice=Math.round(totalPrice*10)/10;
                return totalPrice;
            }
        }
    }.property('cart'),
    deliveryList: function() {
        var array = this.get('deliveries');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('deliveries'),
    paymentOptions: function() {
        return [
            { id: "swyftdebit", name: "Swyft Debit" },
            { id: "cash", name: "Cash" }
        ];
    }.property(),
    actions: {
        checkout: function() {
            var self = this;
            this.set('buttonPressed', true);
            if(this.get('deliveryList').value && this.get('paymentOptions').value) {
                var data={
                    items:this.get('cart'),
                    paymentType: this.get('paymentOptions').value,
                    deliveryLocation:this.get('user').dormitory,
                    contactPhone:this.get('user').phoneNumber,
                    userComments:this.get('additionalRequests'),
                    userId:this.get('user').id,
                    deliveryId: this.get('deliveryList').value,
                    _csrf:this.get('csrfToken')._csrf,
                    user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
                };
                var url = config.routeLocation + "/api/order";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        self.set('modalTitle', 'Your order has been submitted.');
                        self.set('modalBody', 'Thanks for ordering with Swyft. Your order will be delivered at the specified delivery time.');
                        self.set('displayModal', true);
                        localStorage.removeItem('cart');
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('modalTitle', 'Whoops.');
                        self.set('modalBody', "Something went wrong with your request. Your order has not been submitted. If you're using Swyft Debit as your payment type, ensure you have enough balance in your account to proceed. If that doesn't seem to be the issue, try emptying your cart and starting over. Please contact us at development@orderswyft.com if you have any further questions.");
                        self.set('displayModal', true);
                        self.set('buttonPressed', false);
                    }
                });
            }
            else {
                self.set('modalTitle', 'Woah there, not so fast.');
                self.set('modalBody', "You haven't selected a payment option and/or a delivery time.");
                self.set('displayModal', true);
            }
        }
    }
});