import Ember from "ember";
import config from 'swyft-online/config/environment';
import itemUtils from 'swyft-online/utils/item-utils';
import StandardActionsMixin from 'swyft-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, {
    item: function(){
        return itemUtils.processItemView(this.get('model')[0]);
    }.property('model'),
    actions: {
        addToCart: function() {
            if(itemUtils.validate(this.get('item'))){
                var cartData = itemUtils.processItem(this.get('item'));
                try {
                    if(localStorage.getItem("cart")){
                        var cart = JSON.parse(localStorage.getItem("cart"));
                        cart.push(cartData);
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                    else{
                        var cart = [];
                        cart.push(cartData);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        localStorage.setItem("cartVersion", config.cartVersion);
                    }
                }
                catch (exec) {
                    alert("It seems that your browser doesn't support modern local storage features. A common reason for this on iOS devices is being in Private Mode on Safari. Please use Chrome or disable Private Mode on Safari in order to continue.");
                }
                this.transitionToRoute('restaurants');
            }
            else{
                alert("You've haven't selected an option for all of the required fields for this item.");
            }
        }
    }
});