import Ember from "ember";
import config from 'swyft-online/config/environment';
import constants from 'swyft-online/utils/constants-utils';

export default Ember.Controller.extend({
    deliveryList: function() {
        moment.tz.add(constants.timeZones.zones);
        var array = this.get('model');
        for(var i = 0; i < array.length; i++) {
            array[i].displayTime = moment(array[i].deliveryDate).tz("America/New_York").format("dddd, MMMM Do YYYY, h:mm:ss a");
        }
        return array;
    }.property('model'),
    actions: {
        goToExport: function(deliveryId) {
            this.transitionToRoute('admin-export', deliveryId);
        },
        goToAggregate: function(deliveryId) {
            this.transitionToRoute('admin-aggregate', deliveryId);
        },
        goToMaster: function(deliveryId) {
            this.transitionToRoute('admin-master', deliveryId);
        }
    }
});