import Ember from "ember";
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import config from 'swyft-epsilon-online/config/environment';
import itemUtils from 'swyft-epsilon-online/utils/item-utils';
import cartUtils from 'swyft-epsilon-online/utils/cart-utils';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';
import StandardActionsMixin from 'swyft-epsilon-online/mixins/standard-actions';

export default Ember.Controller.extend(StandardActionsMixin, SidebarRouteMixin, {
    item: function() {
        return itemUtils.processItemView(this.get('model'));
    }.property('model'),
    actions: {
        addToCart: function() {
            var self = this;
            if(itemUtils.validate(this.get('item'))) {
                var cartData = itemUtils.processItem(this.get('item'));
                try {
                    if(localStorage.getItem("cart")) {
                        var cart = cartUtils.addItem(cartData);
                    }
                    else {
                        var cart = [];
                        cart.push(cartData);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        localStorage.setItem("cartVersion", config.cartVersion);
                    }
                }
                catch (exec) {
                    self.set('modalTitle', 'Something went wrong there.');
                    self.set('modalBody', loginUtils.localStorageAlert);
                    self.set('displayModal', true);
                }
                this.transitionToRoute('restaurants');
            }
            else {
                self.set('modalTitle', 'Woah there, not so fast.');
                self.set('modalBody', "You've left some required fields blank.");
                self.set('displayModal', true);
            }
        },
        goBack: function() {
            this.transitionTo('menu-items', this.get('item').restaurant);
        }
    }
});