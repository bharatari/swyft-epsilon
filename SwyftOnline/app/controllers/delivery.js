import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    actions: {
        goToOrder: function(order) {
            this.transitionToRoute('delivery-order', order.id);
        }
    }
});