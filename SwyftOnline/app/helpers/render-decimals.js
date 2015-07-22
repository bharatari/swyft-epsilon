import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
    if(params[0] === 0) {
        return "FREE";
    }
    else {
        if(params[0]) {
            return "$" + params[0].toFixed(2);
        }
        else {
            return "FREE";
        }
    }
});

