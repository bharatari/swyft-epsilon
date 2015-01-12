import Ember from "ember";
import config from 'swyft-online/config/environment';
import cartUtils from 'swyft-online/utils/cart-utils';
import constants from 'swyft-online/utils/constants-utils';
import loginUtils from 'swyft-online/utils/login-utils';

export default Ember.Component.extend(Ember.TargetActionSupport, {
    cartArray: [],
    totalPrice: 0,
    totalTax: 0,
    didInsertElement: function() {
        this.triggerAction({
            action:'renderCart',
            target: this
        });
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
        calculateTotal: function() {
            var cart=JSON.parse(localStorage.getItem("cart"));
            var totalPrice=0;
            if(cart){
                for(var i = 0; i < cart.length; i++){
                    totalPrice += cart[i].price;
                }
                var tax=Math.round((totalPrice*constants.tax)*10)/10;
                this.set('totalTax', tax);
                totalPrice=totalPrice+tax;
                totalPrice=Math.round(totalPrice*10)/10;
                this.set('totalPrice', totalPrice);
            }
        },
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
                this.send('calculateTotal');
            }
            else {
                this.set('cartArray', null);
            }
        },
        removeItem: function(item){
            var array = JSON.parse(localStorage.getItem("cart"));
            for(var i = 0; i < array.length; i++){
                if(cartUtils.cartItemsEqual(item, array[i])){
                    array.splice(i, 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(array));
            this.triggerAction({
                action:'renderCart',
                target: this
            });
        },
        checkout: function() {
            this.sendAction('checkout');
        },
        toggle: function() {
            $('#nav-menu').offcanvas('toggle');
        }
    }
});
