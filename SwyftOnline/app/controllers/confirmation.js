/* global moment */
/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    queryParams: ['id'],
    deliveryTime: Ember.computed('order', function() {
        var order = this.get('order');
        return moment(order.deliveryTime).tz("America/New_York").format("h:mm a");
    })
});