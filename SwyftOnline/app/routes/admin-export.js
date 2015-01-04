import Ember from "ember";
import config from 'swyft-online/config/environment';
import AdminRouteMixin from 'swyft-online/mixins/admin-route';

export default Ember.Route.extend(AdminRouteMixin, {
    queryParams: {
        category: {
            refreshModel: true
        }
    },
    model: function(params) {
        return Ember.$.getJSON(config.routeLocation + "/api/deliveries/" + params.delivery_id)
    }
});