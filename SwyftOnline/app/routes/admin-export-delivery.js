import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    queryParams: {
        delivery_id: {
            refreshModel: true
        }
    },
    model: function(params) {
        this.set('delivery_id', params.delivery_id);
        return Ember.RSVP.hash({
            data: Ember.$.getJSON(config.routeLocation + "/api/orders/master/" + params.delivery_id, {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            deliveryLocations: Ember.$.getJSON(config.routeLocation + "/api/deliveryLocations/simple")
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('delivery_id', this.get('delivery_id'));
        controller.set('data', model.data);
        controller.set('fullData', model.data);
        controller.set('deliveryLocations', model.deliveryLocations);
    }
});