import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    queryParams: {
        sort: {
            refreshModel: true
        },
        page: {
            refreshModel: true
        },
        sortType: {
            refreshModel: true
        },
        filters: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.RSVP.hash({
            transactions: Ember.$.getJSON(config.routeLocation + '/api/admin/userTransaction', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, sort: params.sort + " " + params.sortType, skip: (params.page - 1) * 100, where: params.filters, limit: 100 }),
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/admin/userTransaction/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, limit: 100, where: params.filters })
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('transactions', model.transactions);
        controller.set('metadata', model.metadata);
    }
});