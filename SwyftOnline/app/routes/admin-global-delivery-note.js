import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function(params) {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            deliveryNote: Ember.$.getJSON(config.routeLocation + "/api/deliveryNote/global", {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id})
        })
    },
    setupController: function(controller, model) {
        controller.set('csrfToken', model.csrfToken);
        controller.set('deliveryNote', model.deliveryNote.value);
    }
});