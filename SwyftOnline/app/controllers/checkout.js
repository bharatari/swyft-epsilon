/* global moment */
/* jslint unused: false */
/* global fbq, mixpanel */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import constants from 'swyft-epsilon-online/utils/constants-utils';

export default Ember.Controller.extend({
    cartArray: function() {
        if(this.get('cart')) {
            return cartUtils.processCart(this.get('cart'));
        }
    }.property('cart'),
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
                this.set('finalAmount', totalPrice);
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
    paymentOptions: Ember.computed('finalAmount', function() {
        if(this.get('user').balance <= 0) {
            return [
                { id: "swyftdebit", name: "Swyft Debit", disabled: true },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit", disabled: true } /*,
                //{ id: "creditcard", name:"Credit Card" } */
            ];
        }
        else if(this.get('finalAmount') > this.get('user').balance) {
            return [
                { id: "swyftdebit", name: "Swyft Debit", disabled: true },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit" } /*,
                //{ id: "creditcard", name:"Credit Card" } */
            ];
        }
        else {
            return [
                { id: "swyftdebit", name: "Swyft Debit" },
                { id: "cash", name: "Cash" },
                { id: "cash+swyftdebit", name:"Cash + Swyft Debit" }/*,
                //{ id: "creditcard", name:"Credit Card" }  */
            ];
        }
    }),
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
    creditCardSelected: Ember.computed('paymentOptions.value', function() {
        if(this.get('paymentOptions').value === "creditcard") {
            return true;
        }
        else {
            return false;
        }
    }),
    remainingTotal: Ember.computed('sliderValue', function() {
        return Math.round((this.get('finalAmount') - this.get('sliderValue')) * 100) / 100;
    }),
    finalAmountCents: Ember.computed('finalAmount', function() {
        return this.get("finalAmount") * 100;
    }),
    checkoutDisabled: Ember.computed('user.dormitory', 'deliveryList.value', 'paymentOptions.value', 'tokenValid', function() {
        if(!this.get('user').dormitory || !this.get('deliveryList').value || !this.get('paymentOptions').value || !this.get('tokenValid')) {
            return true;
        }
        else {
            return false;
        }
    }),
    trackCheckout: function(value, request, response) {
        fbq('track', 'Purchase', {value: value, currency: 'USD'});
    },
    checkoutError: function(request, response) {
        mixpanel.track("Checkout Error", { "request": request, "response": response });
    },
    actions: {
        checkoutCreditCard: function(token) {
            var self = this;
            this.set('displayLoading', true);
            this.set('checkoutPressed', true);
            var data = {
                items: this.get('cart'),
                paymentType: this.get('paymentOptions').value,
                deliveryLocation: this.get('user').dormitory,
                contactPhone: this.get('user').phoneNumber,
                userComments: this.get('additionalRequests'),
                userId: this.get('user').id,
                token: this.get('token'),
                stripeToken: token.id,
                deliveryId: this.get('deliveryList').value,
                user: { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token }
            };
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
                        localStorage.removeItem('cart');
                        self.trackCheckout(response.actualAmount.toFixed(2), data, response);
                        self.transitionToRoute('confirmation', { queryParams: { id: response.id }});
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayLoading', false);
                        self.set('modalTitle', 'Whoops.');
                        self.set('modalBody', "Something went wrong with your request. You should check your profile page to see if this order has been submitted. If it hasn't, try emptying your cart and starting over or contact us for help.");
                        self.set('displayModal', true);
                        self.set('checkoutPressed', false);
                        self.checkoutError(data, xhr);
                    }
                });
        },
        checkout: function() {
            var self = this;
            this.set('checkoutPressed', true);
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
                if(!this.get('user').dormitory) {
                    self.set('modalTitle', 'Woah there, not so fast.');
                    self.set('modalBody', "You haven't selected a delivery location.");
                    self.set('displayModal', true);
                    self.set('checkoutPressed', false);
                    self.set('displayLoading', false);
                    return;
                }
                if(this.get('paymentOptions').value === "cash+swyftdebit") {
                    data.cashPayment = this.get('remainingTotal');
                    data.debitPayment = parseFloat(this.get('sliderValue'));
                }
                var url = config.routeLocation + "/api/order";
                Ember.run(function() {
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
                            localStorage.removeItem('cart');
                            self.trackCheckout(response.actualAmount.toFixed(2), data, response);
                            self.transitionToRoute('confirmation', { queryParams: { id: response.id }});
                        },
                        error: function(xhr, textStatus, error) {
                            self.set('displayLoading', false);
                            self.set('modalTitle', 'Whoops.');
                            self.set('modalBody', "Something went wrong with your request. You should check your profile page to see if this order has been submitted. If it hasn't, try emptying your cart and starting over or contact us for help.");
                            self.set('displayModal', true);
                            self.set('checkoutPressed', false);
                            self.checkoutError(data, xhr);
                        }
                    });
                });
                
            }
            else {
                self.set('modalTitle', 'Woah there, not so fast.');
                self.set('modalBody', "You haven't selected a payment option and/or a delivery time.");
                self.set('displayModal', true);
                self.set('checkoutPressed', false);
            }
        }
    }
});
