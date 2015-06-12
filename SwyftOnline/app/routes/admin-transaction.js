import Ember from "ember";
import config from 'swyft-online/config/environment';
import loginUtils from 'swyft-online/utils/login-utils';
import modelUtils from 'swyft-online/utils/model-utils';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, { 
    model: function(params) {
        return Ember.RSVP.hash({
            data: Ember.$.getJSON(config.routeLocation + '/api/transaction/' + params.id, {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id, admin: true}),
            metadata:  Ember.$.getJSON(config.routeLocation + '/api/transaction/metadata', {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.token, tokenId: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token.id}),
            id: params.id
        });
    },
    setupController: function(controller, model) {
        this._super();
        var self = this;
        if(model.id != 0) {
            controller.set('isNew', false);
        }
        else {
            controller.set('isNew', true);
        }        
        controller.set('id', this.get('id'));
        var data = model.data;
        data.user = {token: JSON.parse(localStorage.getItem(loginUtils.localStorageKey)).token};
        controller.set('data', data);
        controller.set('metadata', this.transitionToMeta(data, model.metadata));
    },
    transitionToMeta: function(data, metadata) {
        for(var i = 0; i < metadata.properties.length; i++) {
            if(metadata.properties[i].editable) {
                metadata.properties[i].value = data[metadata.properties[i].propertyName];
            }
        }
        return metadata;
    }
});