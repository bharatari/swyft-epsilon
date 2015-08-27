import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';
import constants from 'swyft-epsilon-online/utils/constants-utils';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';

export default Ember.Component.extend({
    init: function() {
        this._super.apply(this, arguments);
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
            try {
                this.set('cart', cartUtils.processCart(JSON.parse(localStorage.getItem("cart"))));
            }
            catch(e) {
                this.setCart([]);
            }
       }
       else {
            this.set('cart', []);
       }
    },
    cart: [],
    setCart: function(value) {
        localStorage.setItem("cart", JSON.stringify(value));
        this.set('cart', value);
    },
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
            var array = _.clone(this.get('cart'), true);
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array.splice(i, 1);
                }
            }
            this.setCart(array);
        },
        increaseQuantity: function(item) {
            var array = _.clone(this.get('cart'), true);
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array[i].quantity++;
                }
            }
            this.setCart(array);
        },
        decreaseQuantity: function(item) {
            var array = _.clone(this.get('cart'), true);
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    var quantity = array[i].quantity;
                    if(quantity - 1 > 0) {
                        array[i].quantity--;
                    }
                }
            }
            this.setCart(array);
        },
        checkout: function() {
            this.sendAction('checkout');
        },
        toggle: function() {
            $('#nav-menu').offcanvas('toggle');
        }
    }
});
