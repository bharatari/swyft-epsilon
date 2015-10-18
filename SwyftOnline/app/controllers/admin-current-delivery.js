/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-current-delivery',
    actions: {
        goToOrder: function(order) {
            this.transitionToRoute('admin-current-delivery-order', order);
        }
    }
});