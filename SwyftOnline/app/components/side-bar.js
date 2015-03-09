import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';
import constants from 'swyft-online/utils/constants-utils';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Component.extend({
    cartArray: [],
    totalPrice: 0,
    totalTax: 0,
    setup: function() {
        $('#nav-menu').offcanvas({ autohide: false, toggle: false });   
        this.renderCart();
    }.on('didInsertElement'),
    renderCart: function() {
        if(localStorage.getItem("cart")){
            if(localStorage.getItem("cartVersion")){
                if(localStorage.getItem("cartVersion")<config.cartVersion){
                    localStorage.removeItem("cart");
                    localStorage.removeItem("cartVersion");
                }
            }
            else{
                localStorage.removeItem("cart");
                localStorage.removeItem("cartVersion");      
            }
            var array = cartUtils.processCart();
            this.set('cartArray', array);
            this.calculateTotal();
        }
        else {
            this.set('cartArray', null);
        }
    }.on('didInsertElement'),
    calculateTotal: function() {
        var cart=JSON.parse(localStorage.getItem("cart"));
        var totalPrice=0;
        if(cart){
            for(var i = 0; i < cart.length; i++){
                totalPrice += cart[i].price * cart[i].quantity;
            }
            var tax=Math.round((totalPrice*constants.tax)*10)/10;
            this.set('totalTax', tax);
            totalPrice=totalPrice+tax;
            totalPrice=Math.round(totalPrice*10)/10;
            this.set('totalPrice', totalPrice);
        }
    },
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
            localStorage.setItem("cart", JSON.stringify(array));
            this.renderCart();
        },
        increaseQuantity: function(item) {
            var array = JSON.parse(localStorage.getItem("cart"));
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array[i].quantity++;
                }
            }
            localStorage.setItem("cart", JSON.stringify(array));
            this.renderCart();
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
            localStorage.setItem("cart", JSON.stringify(array));
            this.renderCart();
        },
        checkout: function() {
            this.sendAction('checkout');
        },
        toggle: function() {
            $('#nav-menu').offcanvas('toggle');
        }
    }
});
