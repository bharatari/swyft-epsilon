/* jslint unused: false */
import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
    if(params[0]) {
        return params[0].toUpperCase();
    }
});

