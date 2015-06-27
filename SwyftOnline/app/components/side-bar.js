import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';
import constants from 'swyft-online/utils/constants-utils';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Component.extend({
    cart: [],
    cartArray: Ember.computed('cart', {
        get(key) {
            if(localStorage.getItem("cart")) {
                if(localStorage.getItem("cartVersion")) {
                    if(localStorage.getItem("cartVersion") < config.cartVersion) {
                        localStorage.removeItem("cart");
                        localStorage.removeItem("cartVersion");
                    }
                }
                else {
                    localStorage.removeItem("cart");
                    localStorage.removeItem("cartVersion");      
                }
                this.set('cart', cartUtils.processCart());
                return this.get('cart');
            }
            else {
                this.set('cart', []);
                return this.get('cart');
            }
        },
        set(key, value) {
            localStorage.setItem("cart", JSON.stringify(value));
            this.set('cart', value)
        }
    }),
    totalPrice: function() {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var totalPrice = 0;
        if(cart) {
            for(var i = 0; i < cart.length; i++) {
                totalPrice += cart[i].price * cart[i].quantity;
            }
            var tax = Math.round((totalPrice * constants.tax) * 10) / 10;
            totalPrice = totalPrice + tax;
            var beforeRoundTotal = totalPrice;
            totalPrice = Math.round(totalPrice * 10) / 10;
            return totalPrice;
        }
    }.property('cart'),
    totalTax: function() {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var totalPrice = 0;
        if(cart) {
            for(var i = 0; i < cart.length; i++) {
                totalPrice += cart[i].price * cart[i].quantity;
            }
            var tax = Math.round((totalPrice * constants.tax) * 10) / 10;
            totalPrice = totalPrice + tax;
            var beforeRoundTotal = totalPrice;
            totalPrice = Math.round(totalPrice * 10) / 10;
            tax += totalPrice - beforeRoundTotal;
            return tax;
        }
    }.property('cart'),
    setup: function() {
        $('#nav-menu').offcanvas({ autohide: false, toggle: false });   
    }.on('didInsertElement'),
    actions: {
        login: function() {
            this.sendAction('login');
        },
        profile: function() {
            this.sendAction('profile');
        },
        logout: function() {
            this.sendAction('logout');
        },
        removeItem: function(item){
            var array = JSON.parse(localStorage.getItem("cart"));
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array.splice(i, 1);
                }
            }
            this.set('cartArray', array);
        },
        increaseQuantity: function(item) {
            var array = JSON.parse(localStorage.getItem("cart"));
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array[i].quantity++;
                }
            }
            this.set('cartArray', array);
        },
        decreaseQuantity: function(item) {
            var array = JSON.parse(localStorage.getItem("cart"));
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    var quantity = array[i].quantity;
                    if(quantity - 1 > 0) {
                        array[i].quantity--;
                    }
                }
            }
            this.set('cartArray', array);
        },
        checkout: function() {
            this.sendAction('checkout');
        },
        toggle: function() {
            $('#nav-menu').offcanvas('toggle');
        }
    }
});
