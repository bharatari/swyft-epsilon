import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-delivery-group',
    modelName: 'Delivery Group',
    newDescription: "Add a new Delivery Group.",
    updateDescription: "Update a Delivery Group.",
    newHelp: "",
    updateHelp: "",
    actions: {
        submit: function(type) {
            this.set('type', type);
            if(type === "new") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to add a new delivery group.");
                this.set('displayDialog', true);
            }
            else if(type === "update") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to update this delivery group.");
                this.set('displayDialog', true);
            }
        },
        accept: function() {
            var self = this;
            var type = this.get('type');
            var data = this.get('data');
            data = modelUtils.transitionToData(data, this.get('metadata'));
            if(type === "new") {
                var url = config.routeLocation + "/api/admin/deliveryGroup";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Delivery Group Added');
                        self.set('modalBody', 'This delivery group has been successfully added.');
                        self.set('modalDisplay', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
                        self.set('modalDisplay', true);
                    }
                });
            }
            else if(type === "update") {
                var url = config.routeLocation + "/api/admin/deliveryGroup/" + this.get('id');
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "PUT",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Delivery Group Updated');
                        self.set('modalBody', 'This delivery group has been successfully updated.');
                        self.set('modalDisplay', true);
                    },
                    error: function(xhr, textStatus, error) {
                        self.set('modalTitle', 'Error');
                        self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
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