import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import modelUtils from 'swyft-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-transaction',
    transitionToData: function(data, metadata) {
        for(var i = 0; i < metadata.properties.length; i++) {
            if(metadata.properties[i].editable) {
                data[metadata.properties[i].propertyName] = metadata.properties[i].value;
            }
        }
        return data;
    },
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
            data = transitionToData(data, this.get('metadata'));
            if(type === "new") {
                var url = config.routeLocation + "/api/admin/transaction";
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
                var url = config.routeLocation + "/api/admin/transaction/" + this.get('id');
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