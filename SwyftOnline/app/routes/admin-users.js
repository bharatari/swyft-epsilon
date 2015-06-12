import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

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
            users: Ember.$.getJSON(config.routeLocation + '/api/admin/users', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, sort: params.sort, page: params.page, sortType: params.sortType, filters: params.filters, recordsPerPage: 100 }),
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/admin/user/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, recordsPerPage: 100 })
        });
    },
    setupController: function(controller, model) {
        this._super();
        controller.set('users', model.users);
        controller.set('metadata', model.metadata);
    }
});