import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import DeliveryRouteMixin from 'swyft-epsilon-online/mixins/delivery-route';
import SidebarRouteMixin from 'swyft-epsilon-online/mixins/sidebar-route';

export default Ember.Route.extend(DeliveryRouteMixin, SidebarRouteMixin, {
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + '/api/order', {orderId: params.order_id, token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id});
    }
});