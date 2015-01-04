import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
    if(value===0) {
        return "$0.00";
    }
    else {
        if(value){
            return "$" + value.toFixed(2);
        }
        else {
            return "$0.00";
        }
    }
});

