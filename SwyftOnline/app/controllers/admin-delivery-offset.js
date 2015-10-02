/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';

export default Ember.Controller.extend({
    currentRoute: 'admin-delivery-offset',
    deliveryStatus: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].propertyName === "deliveryStatus") {
				return properties[i];
			}
		}
	}),	
    operationalStatus: Ember.computed('properties', function() {
		var properties = this.get('properties');
		for(var i = 0; i < properties.length; i++) {
			if(properties[i].propertyName === "operationalStatus") {
				return properties[i];
			}
		}
	}),	
    actions: {
        submit: function() {
            var self = this;
            var url = config.routeLocation + "/api/delivery/offset";
            var data = this.get('offsetData');
            data._user = { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token };
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'Success');
                    self.set('modalBody', 'Offset set successfully.');
                    self.set('modalDisplay', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
                    self.set('modalDisplay', true);
                }
            });     
        },
        submitStatus: function() {
            var self = this;
            var url = config.routeLocation + "/api/delivery/deliveryStatus";
            var data = this.get('deliveryStatusData');
            data._user = { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token };
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'Success');
                    self.set('modalBody', 'Status set successfully.');
                    self.set('modalDisplay', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
                    self.set('modalDisplay', true);
                }
            });     
        },
        submitOperationalStatus: function() {
            var self = this;
            var url = config.routeLocation + "/api/delivery/operationalStatus";
            var data = this.get('operationalStatusData');
            data._user = { token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token };
            Ember.$.ajax({
                url: url,
                headers: { 
                    Accept : "application/json; charset=utf-8",
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: JSON.stringify(data),
                type: "POST",
                success: function(response) {
                    self.set('modalTitle', 'Success');
                    self.set('modalBody', 'Status set successfully.');
                    self.set('modalDisplay', true);
                },
                error: function(xhr, textStatus, error) {
                    self.set('modalTitle', 'Error');
                    self.set('modalBody', 'Something went wrong with your request. Be sure that you filled out all fields properly.');
                    self.set('modalDisplay', true);
                }
            });     
        }
    }
});