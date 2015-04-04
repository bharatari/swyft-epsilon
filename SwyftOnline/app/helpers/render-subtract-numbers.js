import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value1, value2) {
    return "$" + math.chain(math.bignumber(value2)).subtract(math.bignumber(value1)).done().toString();
});

