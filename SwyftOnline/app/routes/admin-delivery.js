/* jslint unused: false */
import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import modelUtils from 'swyft-epsilon-online/utils/model-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
    model: function(params) {
        var url = "";
        if(params.id === 0) {
            url = config.routeLocation + '/api/admin/delivery/model';
        } 
        else {
            url = config.routeLocation + '/api/admin/delivery/' + params.id;
        }
        return Ember.RSVP.hash({
            data: Ember.$.getJSON(url, {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/admin/delivery/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            id: params.id
        });
    },
    setupController: function(controller, model) {
        this._super();
        var self = this;
        if(model.id !== 0) {
            controller.set('isNew', false);
        }
        else {
            controller.set('isNew', true);
        }        
        var data = model.data;
        data.user = {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token};
        controller.set('data', data);
        controller.set('id', model.id);
        controller.set('metadata', modelUtils.transitionToMeta(data, model.metadata));
    }
});