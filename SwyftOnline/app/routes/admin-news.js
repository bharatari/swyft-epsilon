import Ember from "ember";
import config from 'swyft-epsilon-online/config/environment';
import loginUtils from 'swyft-epsilon-online/utils/login-utils';
import AdminRouteMixin from 'swyft-epsilon-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function(params) {
        return Ember.RSVP.hash({
            news: Ember.$.getJSON(config.routeLocation + "/api/news")
        });
    },
    setupController: function(controller, model) {
        controller.set('news', model.news);
    }
});