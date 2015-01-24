import Ember from "ember";
import config from 'swyft-online/config/environment';
import UnauthenticatedRouteMixin from 'swyft-online/mixins/unauthenticated-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    model: function(params) {
        this.set('token', params.token);
        return Ember.$.getJSON(config.routeLocation + "/csrfToken");
    },
    afterModel: function() {
        var self = this;
        Ember.$.ajax({
            url: config.routeLocation + '/api/user/forgotPassword/verify/' + this.get('token'),
            error: function(xhr, textStatus, error) {
                if(xhr.responseText !== "OK") {
                    self.transitionTo('index');
                }
            }
        });        
    },
    setupController: function(controller, model) {
        controller.set('model', model);
        controller.set('token', this.get('token'));
    }
});