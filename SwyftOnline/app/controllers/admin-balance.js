import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-balance',
    actions: {
        submit: function() {
            var self = this;
            var url = config.routeLocation + "/api/user/balance/preliminary";
            Ember.$.ajax({
                url: url,
                data: this.get('data'),
                type: "POST",
                success: function(response) {
                    self.set('displayDialog', false);
                    self.set('dialogTitle', 'Confirmation');
                    self.set('dialogBody', 'You are attempting to add ' + response.amount + ' dollars to the Swyft Debit account of ' + response.firstName + ' ' + response.lastName + '. ' + 'This Swyft Debit account will have a total balance of ' + response.balance + ' following this transaction.');
                    self.set('responseData', response);
                    self.set('displayDialog', true);

                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your transaction request. Be sure that you filled out all fields properly.');
                    self.set('modalDisplay', true);
                }
            });     
        },
        accept: function() {
            var self = this;
            if(this.get('responseData')){
                var data = this.get('responseData');
                data.user = {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token};
                var url = config.routeLocation + "/api/user/balance";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Transaction Completed');
                        self.set('modalBody', 'This transaction has been successfully processed.');
                        self.set('modalDisplay', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your transaction request.');
                        self.set('modalDisplay', true);
                    }
                });
            }
            else {
                self.set('displayDialog', false);
                self.set('modalTitle', 'Error');
                self.set('modalBody', 'Something went wrong with your transaction request.');
                self.set('modalDisplay', true);
            }
        },
        cancel: function() {
            this.set('displayDialog', false);
        }
    }
});