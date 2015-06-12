import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(object, property) {
    if(object && property) {
        if(property.indexOf('.') !== -1)
        {
            var array = property.split(".");
            var value = object;
            for(var i = 0; i < array.length; i++) {
                value = value[array[i]]
            }
            return value;
        }
        else {
            return object[property];
        }
    }
});

