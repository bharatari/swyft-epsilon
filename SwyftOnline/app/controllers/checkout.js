import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import constants from 'swyft-online/utils/constants-utils';

export default Ember.Controller.extend({
    conversionTracking: function() {
        (function() {
            var _fbq = window._fbq || (window._fbq = []);
            if (!_fbq.loaded) {
                var fbds = document.createElement('script');
                fbds.async = true;
                fbds.src = '//connect.facebook.net/en_US/fbds.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(fbds, s);
                _fbq.loaded = true;
            }
        })();
        window._fbq = window._fbq || [];
        window._fbq.push(['track', '6021240611293', {'value':'0.00','currency':'USD'}]);
    }.on('init'),
    buttonPressed: false,
    totalPrice: function() {
        var cart = this.get("cart");
        if(cart) {
            var totalPrice = 0;
            if(cart) {
                for(var i = 0; i < cart.length; i++) {
                    totalPrice += cart[i].price * cart[i].quantity;
                }
                var tax = Math.round((totalPrice * constants.tax) * 10) / 10;
                totalPrice = totalPrice + tax;
                totalPrice = Math.round(totalPrice * 10) / 10;
                return totalPrice;
            }
        }
    }.property('cart'),
    deliveryList: function() {
        var array = this.get('deliveries');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
            array[i].displayCutoff = moment(array[i].orderCutoff).tz("America/New_York").format("hh:mm");
        }
        return array;
    }.property('deliveries'),
    paymentOptions: function() {
        if(this.get('user').balance <= 0) {
            return [
                { id: "swyftdebit", name: "Swyft Debit", disabled: true },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit", disabled: true } 
            ];
        }
        else if(this.get('finalAmount') > this.get('user').balance) {
            return [
                { id: "swyftdebit", name: "Swyft Debit", disabled: true },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit" } 
            ];
        }
        else {
            return [
                { id: "swyftdebit", name: "Swyft Debit" },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit" } 
            ];
        }
        
    }.property('finalAmount'),
    showSlider: function() {
        if(this.get('paymentOptions').value === "cash+swyftdebit") {
            if(this.get('user').balance < this.get('finalAmount')) {
                this.set('sliderMax', this.get('user').balance);
            }
            else {
                this.set('sliderMax', Math.round((this.get('finalAmount') - 0.01) * 100) / 100);
            }            
            this.set('sliderValue', 0.01);
            this.set('displaySlider', true);
        }
        else {
            this.set('displaySlider', false);
        }
    }.observes('paymentOptions.value'),
    remainingTotal: function() {
        return Math.round((this.get('finalAmount') - this.get('sliderValue')) * 100) / 100;
    }.property('sliderValue'),
    actions: {
        checkout: function() {
            var self = this;
            this.set('buttonPressed', true);
            if(this.get('deliveryList').value && this.get('paymentOptions').value) {
                this.set('displayLoading', true);
                var data = {
                    items: this.get('cart'),
                    paymentType: this.get('paymentOptions').value,
                    deliveryLocation: this.get('user').dormitory,
                    contactPhone: this.get('user').phoneNumber,
                    userComments: this.get('additionalRequests'),
                    userId: this.get('user').id,
                    token: this.get('token'),
                    deliveryId: this.get('deliveryList').value,
                    user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
                };
                if(this.get('paymentOptions').value === "cash+swyftdebit") {
                    data.cashPayment = this.get('remainingTotal');
                    data.debitPayment = this.get('sliderValue');
                }
                var url = config.routeLocation + "/api/order";
                Ember.$.ajax({
                    url: url,
                    headers: { 
                        Accept : "application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify(data),
                    type: "POST",
                    success: function(response) {
                        self.set('displayLoading', false);
                        self.set('modalTitle', 'Your order has been submitted.');
                        self.set('modalBody', 'Thanks for ordering with Swyft. Your order will be delivered at the specified delivery time.');
                        self.set('displayModal', true);
                        localStorage.removeItem('cart');
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayLoading', false);
                        self.set('modalTitle', 'Whoops.');
                        self.set('modalBody', "Something went wrong with your request. Your order has not been submitted. If you're using Swyft Debit as your payment type, ensure you have enough balance in your account to proceed. If you attempted to use a one-time coupon, it's either invalid or it has already been used. Otherwise, try emptying your cart and starting over. Please contact us at development@orderswyft.com if you have any further questions.");
                        self.set('displayModal', true);
                        self.set('buttonPressed', false);
                    }
                });
            }
            else {
                self.set('modalTitle', 'Woah there, not so fast.');
                self.set('modalBody', "You haven't selected a payment option and/or a delivery time.");
                self.set('displayModal', true);
                self.set('buttonPressed', false);
            }
        }
    }
});