import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
    return "$" + math.chain(math.bignumber(params[1])).subtract(math.bignumber(params[0])).done().toString();
});

