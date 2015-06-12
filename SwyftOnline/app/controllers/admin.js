import Ember from "ember";
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    setup: function() {
        this.set("dayOfWeek", moment().format("dddd"));
        this.set("dateString", moment().format("MMMM D YYYY"));
    }.on('init'),
    currentRoute: 'admin',
    actions: {
        goToExport: function() {
            this.transitionToRoute('admin-export-picker');
        },
        goToNewDelivery: function() {
            this.transitionToRoute('admin-new-delivery');
        },
        goToCompleteDelivery: function() {
            this.transitionToRoute('admin-complete-delivery');
        },
        goToUsers: function() {
            this.transitionToRoute('admin-users');
        },
        goToEditBalance: function() {
            this.transitionToRoute('admin-edit-balance');
        },
        goToTransactions: function() {
            this.transitionToRoute('admin-transactions');
        },
        goToGlobalDeliveryNote: function() {
            this.transitionToRoute('admin-global-delivery-note');
        },
        goToCloseDelivery: function() {
            this.transitionToRoute('admin-close-delivery');
        },
        goToNews: function() {
            this.transitionToRoute('admin-news');
        },
        goToTokens: function() {
            this.transitionToRoute('admin-tokens');
        },
        goToNewToken: function() {
            this.transitionToRoute('admin-new-token');
        }
    }
});