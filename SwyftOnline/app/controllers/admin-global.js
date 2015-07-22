import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-global',
    modelName: 'Global',
    newDescription: "Add a new Global.",
    updateDescription: "Update a Global.",
    newHelp: "This is generally an action that should be handled by a developer.",
    updateHelp: "",
    actions: {
        submit: function(type) {
            this.set('type', type);
            if(type === "new") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to add a new global.");
                this.set('displayDialog', true);
            }
            else if(type === "update") {
                this.set('dialogTitle', 'Confirmation');
                this.set('dialogBody', "You are attempting to update this global.");
                this.set('displayDialog', true);
            }
        },
        accept: function() {
            var self = this;
            var type = this.get('type');
            var data = this.get('data');
            data = modelUtils.transitionToData(data, this.get('metadata'));
            if(type === "new") {
                var url = config.routeLocation + "/api/admin/global";
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Global Added');
                        self.set('modalBody', 'This global has been successfully added.');
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
                var url = config.routeLocation + "/api/admin/global/" + this.get('id');
                Ember.$.ajax({
                    url: url,
                    data: data,
                    type: "PUT",
                    success: function(response) {
                        self.set('displayDialog', false);
                        self.set('modalTitle', 'Global Updated');
                        self.set('modalBody', 'This global has been successfully updated.');
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