export default {
    cartItemsEqual: function(cartItem, arrayItem){
        if(cartItem.id === arrayItem.id && this.optionsEqual(cartItem.options, arrayItem.options) && this.standardOptionsEqual(cartItem.standardOptions, arrayItem.standardOptions) && this.extrasEqual(cartItem.extras, arrayItem.extras)) {
            return true;
        }
        else {
            return false;
        }
    },
    optionsEqual: function(cartItemOptions, arrayItemOptions){
        if(cartItemOptions.length === arrayItemOptions.length) {
            for(var i = 0; i < cartItemOptions.length; i++) {
                if(cartItemOptions[i].name === arrayItemOptions[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    standardOptionsEqual: function(cartItemOptions, arrayItemOptions) {
        if(cartItemOptions.length === arrayItemOptions.length) {
            for(var i = 0; i < cartItemOptions.length; i++) {
                if(cartItemOptions[i].name === arrayItemOptions[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    extrasEqual: function(cartItemExtras, arrayItemExtras) {
        if(cartItemExtras.length === arrayItemExtras.length) {
            for(var i = 0; i < cartItemExtras.length; i++) {
                if(cartItemExtras[i].name === arrayItemExtras[i].name) { } 
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;   
        }
    },
    processCart: function() {
        var array=JSON.parse(localStorage.getItem("cart"));
        for(var i = 0; i < array.length; i++){
            var options="";
            for (var property in array[i].options) {
                if (array[i].options.hasOwnProperty(property)) {
                    options+=array[i].options[property].name +", ";
                }
            }
            for(var e=0; e<array[i].standardOptions.length;e++){
                if(array[i].standardOptions[e].isSelected){
                    options+=array[i].standardOptions[e].name +", ";
                }
            }
            for(var property in array[i].extras){
                if(array[i].extras.hasOwnProperty(property)){
                    options+=array[i].extras[property].name +", ";
                }
            }
            options=options.substring(0, options.length-2);
            array[i].itemOptions=options;
        }
        return array;
    }
}