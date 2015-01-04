import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(value, options) {
    if(value===0) {
        return "FREE";
    }
    else {
        if(value){
            return "$" + value.toFixed(2);
        }
        else {
            return "FREE";
        }
    }
});

