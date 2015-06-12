import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import modelUtils from 'swyft-online/utils/model-utils';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
    model: function() {
        return Ember.RSVP.hash({
            data: Ember.$.getJSON(config.routeLocation + '/api/admin/transaction/' + 0, {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, admin: true})
        });
    },
    setupController: function(controller, model) {
        this._super();
        var self = this;
        var data = model.data;
        data.user = {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token};
        controller.set('data', data);
    }
});