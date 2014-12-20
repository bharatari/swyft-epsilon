import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        return this.store.find('menuItems', params.restaurant_name);
    }
});