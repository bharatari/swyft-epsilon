import Ember from "ember";
import config from 'swyft-online/config/environment';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + "/csrfToken");
    }
});