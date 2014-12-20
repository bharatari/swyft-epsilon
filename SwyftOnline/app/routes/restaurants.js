import Ember from "ember";

export default Ember.Route.extend({
    model: function() {
        return Ember.$.getJSON("http://localhost:1337/api/restaurants");
    }
});