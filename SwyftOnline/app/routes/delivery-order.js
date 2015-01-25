import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import DeliveryRouteMixin from 'swyft-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, {
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + '/api/order', {orderId: params.order_id, token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id});
    }
});