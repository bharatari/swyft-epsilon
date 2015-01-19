import Ember from "ember";
import loginUtils from 'swyft-online/utils/login-utils';
import config from 'swyft-online/config/environment';

export default Ember.Controller.extend({
    actions: {
        submit: function() {
            var self = this;
            var data={
                userId:this.get('userId'),
                transactionAmount:this.get('transactionAmount'),
                comments:this.get('comments'),
                _csrf:this.get('model')._csrf,
                user: {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token}
            };
            var url = config.routeLocation + "/api/user/balance/preliminary";
            Ember.$.ajax({
                url: url,
                data: data,
                type: "POST",
                success: function(response) {
                    self.set('dialogTitle', 'Confirmation');
                    self.set('dialogBody', 'You are attempting to add ' + response.transactionAmount + ' dollars to the Swyft Debit account of ' + response.firstName + ' ' + response.lastName + '. ' + 'This Swyft Debit account will have a total balance of ' + response.balance + ' following this transaction.');
                    self.set('responseData', response);
                    self.set('displayDialog', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your transaction request. Be sure that you filled out all fields properly.');
                    self.set('displayModal', true);
                }
            });
        },
        accept: function() {
            var self = this;
            if(this.get('responseData')){
                var data = this.get('responseData');
                data._csrf = this.get('model')._csrf;
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
                        self.set('displayModal', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your transaction request.');
                        self.set('displayModal', true);
                    }
                });
            }
            else {
                //Handle Error
            }
        },
        cancel: function() {
            this.set('displayDialog', false);
        }
    }
});