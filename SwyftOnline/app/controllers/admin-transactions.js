import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    modelName: 'Transaction',
    description: 'Add, update, and edit User Transactions.',
    currentRoute: 'admin-transactions',
    queryParams: ['page', 'sort', 'sortType', 'filters'],
    page: 1,                                  
    sort: 'createdAt',
    sortType: 'desc',
    filters:[],
    actions: {
        delete: function(id) {
            this.set('dialogTitle', 'Confirmation');
            this.set('dialogBody', "You are attempting to permanently delete this transaction. Deleting a transaction does not automatically update the user's balance, this will have to be done separately.");
            this.set('displayDialog', true);
            this.set('deleteId', id);
        },
        accept: function() {
            var self = this;
            if(this.get('deleteId')) {
                Ember.$.ajax({
                    url: config.routeLocation + "/api/admin/transaction/" + this.get('deleteId'),
                    type: "DELETE",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Transaction Deleted');
                        self.set('modalBody', 'This transaction has been successfully deleted.');
                        self.set('displayModal', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your request.');
                        self.set('displayModal', true);
                    }
                });
            }
        },
        cancel: function() {
            this.set('deleteId', 0);
            this.set('displayDialog', false);
        },
        goToNewTransaction: function() {
            this.transitionToRoute('admin-transaction', 0);
        },
        goToTransaction: function(id) {
            this.transitionToRoute('admin-transaction', id);
        }
    }
});