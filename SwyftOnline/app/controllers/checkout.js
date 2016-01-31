/* global moment */
/* jslint unused: false */
/* global fbq, mixpanel */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import constants from 'swyft-epsilon-online/utils/constants-utils';

export default Ember.Controller.extend({
    cartArray: Ember.computed('cart', function () {
      if (this.get('cart')) {
        return cartUtils.processCart(this.get('cart'));
      }
    }),
    totalPrice: Ember.computed('cart', function() {
      let cart = this.get("cart");
      if (cart) {
        var totalPrice = 0;
        if (cart) {
          for (let i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price * cart[i].quantity;
          }
          let tax = Math.round((totalPrice * constants.tax) * 10) / 10;
          totalPrice = totalPrice + tax;
          totalPrice = Math.round(totalPrice * 10) / 10;
          this.set('finalAmount', totalPrice);
          return totalPrice;
        }
      }
    }),
    deliveryList: Ember.computed('deliveries', function () {
      let array = this.get('deliveries');
      for(let i = 0; i < array.length; i++) {
        array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        array[i].displayCutoff = moment(array[i].orderCutoff).tz("America/New_York").format("hh:mm");
      }
      return array;
    }),
    paymentOptions: Ember.computed('finalAmount', function () {
      if (this.get('user').balance <= 0) {
        return [
          { id: "swyftdebit", name: "Swyft Debit", disabled: true },
          { id: "cash", name: "Cash" },
          { id: "cash+swyftdebit", name:"Cash + Swyft Debit", disabled: true } /*,
          //{ id: "creditcard", name:"Credit Card" } */
        ];
      } else if (this.get('finalAmount') > this.get('user').balance) {
        return [
          { id: "swyftdebit", name: "Swyft Debit", disabled: true },
          { id: "cash", name: "Cash" },
          { id: "cash+swyftdebit", name:"Cash + Swyft Debit" } /*,
          //{ id: "creditcard", name:"Credit Card" } */
        ];
      } else {
        return [
          { id: "swyftdebit", name: "Swyft Debit" },
          { id: "cash", name: "Cash" },
          { id: "cash+swyftdebit", name:"Cash + Swyft Debit" }/*,
          //{ id: "creditcard", name:"Credit Card" }  */
        ];
      }
    }),
    showSlider: Ember.observer('paymentOptions.value', function () {
      if (this.get('paymentOptions').value === "cash+swyftdebit") {
        if (this.get('user').balance < this.get('finalAmount')) {
          this.set('sliderMax', this.get('user').balance);
        } else {
          this.set('sliderMax', Math.round((this.get('finalAmount') - 0.01) * 100) / 100);
        }
        this.set('sliderValue', 0.01);
        this.set('displaySlider', true);
      } else {
        this.set('displaySlider', false);
      }
    }),
    creditCardSelected: Ember.computed('paymentOptions.value', function () {
      if (this.get('paymentOptions').value === "creditcard") {
        return true;
      } else {
        return false;
      }
    }),
    remainingTotal: Ember.computed('sliderValue', function () {
      return Math.round((this.get('finalAmount') - this.get('sliderValue')) * 100) / 100;
    }),
    finalAmountCents: Ember.computed('finalAmount', function () {
      return this.get("finalAmount") * 100;
    }),
    checkoutDisabled: Ember.computed('user.dormitory', 'deliveryList.value', 'paymentOptions.value', 'isValid', function () {
      if (!this.get('user').dormitory || !this.get('deliveryList').value || !this.get('paymentOptions').value || !this.get('isValid')) {
        return true;
      } else {
        return false;
      }
    }),
    trackCheckout(value, request, response) {
      fbq('track', 'Purchase', {value: value, currency: 'USD'});
    },
    checkoutError(request, response) {
      mixpanel.track("Checkout Error", { "request": request, "response": response });
    },
    isValid: Ember.computed('discountedAmount', 'token', function () {
      // discountedAmount null means untouched
      // false means an error response
      if (this.get('discountedAmount')) {
        return true;
      } else if (this.get('discountedAmount') == null) {
        return true;
      } else {
        if (this.get('token')) {
          return false;
        } else if (this.get('token') === '') {
          return true;
        } else if (!this.get('token')) {
          return true;
        } else {
          return false;
        }
      }
    }),
    updateFinalAmount(discount) {
      let paymentOption;
      if (this.get('paymentOptions').value) {
        paymentOption = this.get('paymentOptions').value;   
      }

      if (discount) {
        this.set('finalAmount', this.get('totalPrice') * discount);
        this.set('discountedAmount', Math.round((this.get('totalPrice') - this.get('finalAmount')) * 100) / 100);
        
        if (paymentOption) {
          Ember.set(this.get('paymentOptions'), 'value', paymentOption);
        }
      } else {
        this.set('finalAmount', this.get('totalPrice'));
        this.set('discountedAmount', discount);
      }
    },
    actions: {
      updateToken(token) {
        var self = this;
        this.set('token', token);
        this.set('discountedAmount', null);
        
        if (this.get('token')) {
          Ember.$.getJSON(config.routeLocation + "/api/coupon/discount/" + this.get('token').trim(), {
            token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, 
            tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id
          }).done(function (data) {
            self.updateFinalAmount(data.discount);
          }).fail(function () {
            self.updateFinalAmount(false);
          });
        } else {
          this.updateFinalAmount(null);
        }
      },      
      checkoutCreditCard(token) {
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
          success: function (response) {
            self.set('displayLoading', false);
            localStorage.removeItem('cart');
            self.trackCheckout(response.actualAmount.toFixed(2), data, response);
            self.transitionToRoute('confirmation', { queryParams: { id: response.id }});
          },
          error: function (xhr, textStatus, error) {
            self.set('displayLoading', false);
            self.set('modalTitle', 'Whoops.');
            self.set('modalBody', "Something went wrong with your request. You should check your profile page to see if this order has been submitted. If it hasn't, try emptying your cart and starting over or contact us for help.");
            self.set('displayModal', true);
            self.set('checkoutPressed', false);
            self.checkoutError(data, xhr);
          }
        });
      },
      checkout() {
        var self = this;
        this.set('checkoutPressed', true);
        if (this.get('deliveryList').value && this.get('paymentOptions').value) {
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
          if (!this.get('user').dormitory) {
            self.set('modalTitle', 'Woah there, not so fast.');
            self.set('modalBody', "You haven't selected a delivery location.");
            self.set('displayModal', true);
            self.set('checkoutPressed', false);
            self.set('displayLoading', false);
            return;
          }
          if (this.get('paymentOptions').value === "cash+swyftdebit") {
            data.cashPayment = this.get('remainingTotal');
            data.debitPayment = parseFloat(this.get('sliderValue'));
          }
          var url = config.routeLocation + "/api/order";
          Ember.run(function () {
            Ember.$.ajax({
              url: url,
              headers: {
                Accept : "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
              },
              data: JSON.stringify(data),
              type: "POST",
              success: function (response) {
                self.set('displayLoading', false);
                localStorage.removeItem('cart');
                self.trackCheckout(response.actualAmount.toFixed(2), data, response);
                self.transitionToRoute('confirmation', { queryParams: { id: response.id }});
              },
              error: function (xhr, textStatus, error) {
                self.set('displayLoading', false);
                self.set('modalTitle', 'Whoops.');
                self.set('modalBody', "Something went wrong with your request. You should check your profile page to see if this order has been submitted. If it hasn't, try emptying your cart and starting over or contact us for help.");
                self.set('displayModal', true);
                self.set('checkoutPressed', false);
                self.checkoutError(data, xhr);
              }
            });
          });
        } else {
          self.set('modalTitle', 'Woah there, not so fast.');
          self.set('modalBody', "You haven't selected a payment option and/or a delivery time.");
          self.set('displayModal', true);
          self.set('checkoutPressed', false);
        }
      }
    }
});
