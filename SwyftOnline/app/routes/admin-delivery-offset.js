/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
	model: function(params) {
        return Ember.RSVP.hash({
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/admin/delivery/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
        });
    },
	setupController: function(controller, model) { 
		controller.set('properties', model.metadata.properties);
		controller.set('offsetData', {
			deliveryId: "",
			offset: null
		});
		controller.set('deliveryStatusData', {
			deliveryId: "",
			status: null
		});
		controller.set('operationalStatusData', {
			deliveryId: "",
			status: null
		});
	}
});