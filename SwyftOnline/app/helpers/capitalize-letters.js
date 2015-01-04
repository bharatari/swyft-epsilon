import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
    if(value) {
        return value.toUpperCase();
    }
});

