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
        return Ember.RSVP.hash({
            orders: Ember.$.getJSON(config.routeLocation + "/api/orders/master/" + params.delivery_id, {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/admin/order/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, limit: 100, where: params.filters })
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('model', model.orders);
        controller.set('data', model.orders);
        controller.set('metadata', model.metadata);
    }
});