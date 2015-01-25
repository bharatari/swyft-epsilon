import Ember from "ember";
import config from 'swyft-online/config/environment';
import DeliveryRouteMixin from 'swyft-online/mixins/delivery-route';

export default Ember.Route.extend(DeliveryRouteMixin, {
    queryParams: {
        restaurant_name: {
            order_id: true
        }
    },
    model: function() {
        return Ember.RSVP.hash({
            csrfToken: Ember.$.getJSON(config.routeLocation + "/csrfToken"),
            deliveries: Ember.$.getJSON(config.routeLocation + "/api/deliveries")
        })
    }
});