import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + '/api/orders/all', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id});
    }
});