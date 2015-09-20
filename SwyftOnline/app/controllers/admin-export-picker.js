import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';

export default Ember.Controller.extend({
    currentRoute: 'admin-export-picker',
    deliveryList: Ember.computed('model', function() {
        var array = this.get('model');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }),
    actions: {
        goToExport: function(deliveryId) {
            this.transitionToRoute('admin-export', deliveryId);
        },
        goToAggregate: function(deliveryId) {
            this.transitionToRoute('admin-aggregate', deliveryId);
        },
        goToMaster: function(deliveryId) {
            this.transitionToRoute('admin-master', deliveryId);
        },
        goToDelivery: function(deliveryId) {
            this.transitionToRoute('admin-export-delivery', deliveryId);
        }
    }
});