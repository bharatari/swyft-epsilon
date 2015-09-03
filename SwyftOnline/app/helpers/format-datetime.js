import Ember from "ember";

export default Ember.Helper.helper(function(params, hash) {
	if(params[0] && params[1]) {
        if(params[1].indexOf('.') !== -1)
        {
            var array = params[1].split(".");
            var value = params[0];
            for(var i = 0; i < array.length; i++) {
                if(value[array[i]]) {
                    value = value[array[i]]
                }
                else {
                    return "";
                }
            }
            return moment(value).tz("America/New_York").format("MM-DD-YYYY hh:mm a Z");
        }
        else {
            return moment(params[0][params[1]]).tz("America/New_York").format("MM-DD-YYYY hh:mm a Z");
        }
    } 
});

