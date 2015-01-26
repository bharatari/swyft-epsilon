import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    queryParams: {
        delivery_id: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + "/api/delivery/" + params.delivery_id + "/orders", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
    }
});