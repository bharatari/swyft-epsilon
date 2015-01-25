import Ember from "ember";
import config from 'swyft-online/config/environment';
import DeliveryRouteMixin from 'swyft-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, {
    model: function() {
        return Ember.$.getJSON(config.routeLocation + "/csrfToken")
    }
});