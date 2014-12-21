import Ember from "ember";

export default Ember.Route.extend({
    model: function(params) {
        return Ember.$.getJSON("http://localhost:1337/api/item/" + params.item_id);
    }
});