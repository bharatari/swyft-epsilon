import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    actions: {
        goToExport: function() {
            this.transitionToRoute('admin-export-picker');
        },
        goToNewDelivery: function() {
            this.transitionToRoute('admin-new-delivery');
        },
        goToCompleteDelivery: function() {
            this.transitionToRoute('admin-complete-delivery');
        }
    }
});