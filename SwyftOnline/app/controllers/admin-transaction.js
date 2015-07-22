import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-transaction',
    modelName: 'Transaction',
    newDescription: "Add a new User Transaction. The user's balance will not be automatically updated.",
    updateDescription: "Update a User Transaction. The user's balance will not be automatically updated.",
    newHelp: "You can look up User ID's from the Users page of Swyft Admin. To add balance to a user's account, enter a positive transaction amount, to deduct balance, enter a negative balance. Don't fill in the Final Balance, Admin ID, Order ID fields unless you really know what you're doing, these are normally automatically managed by the system.",
    updateHelp: "You can look up User ID's from the Users page of Swyft Admin. To add balance to a user's account, enter a positive transaction amount, to deduct balance, enter a negative balance. Don't fill in the Final Balance, Admin ID, Order ID fields unless you really know what you're doing, these are normally automatically managed by the system.",
    actions: {
        submit: function(type) {
            this.set('type', type);
            if(type === "new") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to add a new transaction. Adding a transaction does not automatically update the user's balance, use the Balance page if you're attempting to edit a user's balance.");
                this.set('displayDialog', true);
            }
            else if(type === "update") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to update this transaction. Updating a transaction does not automatically update the user's balance, this will have to be done separately.");
                this.set('displayDialog', true);
            }
        },
        accept: function() {
            var self = this;
            var type = this.get('type');
            var data = this.get('data');
            data = modelUtils.transitionToData(data, this.get('metadata'));
            if(type === "new") {
                var url = config.routeLocation + "/api/admin/userTransaction";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Transaction Added');
                        self.set('modalBody', 'This transaction has been successfully added.');
                        self.set('modalDisplay', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your transaction request. Be sure that you filled out all fields properly.');
                        self.set('modalDisplay', true);
                    }
                });
            }
            else if(type === "update") {
                var url = config.routeLocation + "/api/admin/userTransaction/" + this.get('id');
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "PUT",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Transaction Update');
                        self.set('modalBody', 'This transaction has been successfully updated.');
                        self.set('modalDisplay', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your transaction request. Be sure that you filled out all fields properly.');
                        self.set('modalDisplay', true);
                    }
                });
            }
        },
        cancel: function() {
            this.set('displayDialog', false);
            this.set('type', "");
        }
    }
});